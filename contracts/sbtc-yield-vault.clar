;; sBTC Yield Vault: Maximize Your Bitcoin Returns
;; Summary: Automated yield generation protocol for sBTC holders
;; Description: 
;; A non-custodial vault that enables sBTC holders to earn compound yields through decentralized finance strategies.
;; Features automatic reward accrual, real-time APY adjustments, and secure asset management. Users maintain full
;; control of their assets while benefiting from professional yield optimization strategies. Includes:
;; - Dynamic yield rate adjustments by protocol admin
;; - Transparent reward calculations per block
;; - Secure principal protection with revert-on-fail transfers
;; - Governance-minimized design with single-admin emergency controls
;; Integrated with the official testnet sBTC token contract (ST1F7...TVGWXT) for seamless Bitcoin DeFi participation.

;; Constants
(define-constant ERR_NOT_OWNER u100)
(define-constant ERR_INSUFFICIENT_BALANCE u101)
(define-constant ERR_INSUFFICIENT_VAULT_FUNDS u102)
(define-constant ERR_UNAUTHORIZED u103)
(define-constant ERR_DEPOSIT_FAILED u104)
(define-constant ERR_WITHDRAW_FAILED u105)

;; Data variables
(define-data-var yield-rate uint u50) ;; 0.5% represented as 50 (basis points)
(define-data-var last-yield-distribution uint u0) ;; Track the last block where yield was distributed
(define-data-var yield-period uint u144) ;; ~1 day in blocks (assuming 10 min block time)
(define-data-var vault-admin principal tx-sender) ;; Contract administrator who can update yield rates
(define-data-var global-accumulator uint u0)
(define-data-var token-contract-address principal 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token)

;; Data maps
(define-map user-deposits
  principal
  uint
)

;; Track user deposits
(define-map last-deposit-block
  principal
  uint
)

;; Track when users last deposited
(define-map user-rewards
  principal
  uint
)

;; Read-only functions

;; Get the total amount deposited by a user
(define-read-only (get-user-deposit (user principal))
  (default-to u0 (map-get? user-deposits user))
)

;; Get the accumulated rewards for a user
(define-read-only (get-user-rewards (user principal))
  (default-to u0 (map-get? user-rewards user))
)

;; Get the current yield rate (in basis points)
(define-read-only (get-yield-rate)
  (var-get yield-rate)
)

(define-read-only (get-vault-balance)
  (contract-call? 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token
    get-balance-available (as-contract tx-sender)
  )
)

;; Calculate pending rewards for a user
(define-read-only (calculate-pending-rewards (user principal))
  (let (
      (user-deposit (get-user-deposit user))
      (last-deposit (default-to u0 (map-get? last-deposit-block user)))
      (current-block stacks-block-height)
      (blocks-elapsed (if (> current-block last-deposit)
        (- current-block last-deposit)
        u0
      ))
    )
    (if (or (is-eq user-deposit u0) (is-eq blocks-elapsed u0))
      u0
      ;; Calculate rewards in parts to avoid overflow
      (let (
          ;; Prevent division by zero and cap blocks elapsed to avoid overflow
          (yield-period-value (if (is-eq (var-get yield-period) u0)
            u1
            (var-get yield-period)
          ))
          (blocks-elapsed-capped (if (> blocks-elapsed u10000)
            u10000
            blocks-elapsed
          ))
          ;; Calculate rate with increased precision to avoid underflow
          (rate-factor (/ (* (var-get yield-rate) u100000) (* u100 yield-period-value)))
          ;; Apply rate with precision adjustment
          (rewards-raw (/ (* user-deposit rate-factor blocks-elapsed-capped) u100000))
        )
        rewards-raw
      )
    )
  )
)

;; Public functions

;; Deposit sBTC into the vault
(define-public (deposit (amount uint))
  (let ((current-deposit (get-user-deposit tx-sender)))
    ;; Transfer sBTC first
    ;; Add safety check for deposit amount
    (asserts! (< (+ current-deposit amount) u1000000000000000000)
      (err ERR_UNAUTHORIZED)
    )
    (asserts! (< (+ current-deposit amount) (var-get max-deposit-limit))
      (err ERR_DEPOSIT_LIMIT_REACHED)
    )
    (match (contract-call? 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token
      transfer amount tx-sender (as-contract tx-sender) none
    )
      success (let ((pending-rewards (calculate-pending-rewards tx-sender)))
        ;; Update rewards and deposit state
        (map-set user-rewards tx-sender
          (+ (get-user-rewards tx-sender) pending-rewards)
        )
        (map-set user-deposits tx-sender (+ current-deposit amount))
        (map-set last-deposit-block tx-sender stacks-block-height)
        (ok amount)
      )
      error (err ERR_DEPOSIT_FAILED)
    )
  )
)

;; Withdraw sBTC from the vault
(define-public (withdraw (amount uint))
  (let (
      (current-deposit (get-user-deposit tx-sender))
      (pending-rewards (calculate-pending-rewards tx-sender))
    )
    (asserts! (<= amount current-deposit) (err ERR_INSUFFICIENT_BALANCE))
    ;; Update state first (checks-effects-interactions pattern)
    (map-set user-deposits tx-sender (- current-deposit amount))
    (map-set user-rewards tx-sender
      (+ (get-user-rewards tx-sender) pending-rewards)
    )
    (map-set last-deposit-block tx-sender stacks-block-height)
    ;; Then perform transfer
    (match (as-contract (contract-call? 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token
      transfer amount tx-sender tx-sender none
    ))
      success (ok amount)
      error (begin
        ;; Revert state on failure
        (map-set user-deposits tx-sender current-deposit)
        (map-set user-rewards tx-sender
          (- (get-user-rewards tx-sender) pending-rewards)
        )
        (err ERR_WITHDRAW_FAILED)
      )
    )
  )
)

;; Claim accumulated rewards
(define-public (claim-rewards)
  (let ((total-rewards (+ (get-user-rewards tx-sender) (calculate-pending-rewards tx-sender))))
    (asserts! (> total-rewards u0) (err ERR_INSUFFICIENT_BALANCE))
    (asserts!
      (>= (unwrap! (get-vault-balance) (err ERR_INSUFFICIENT_VAULT_FUNDS))
        total-rewards
      )
      (err ERR_INSUFFICIENT_VAULT_FUNDS)
    )
    (map-set user-rewards tx-sender u0)
    (map-set last-deposit-block tx-sender stacks-block-height)
    (match (as-contract (contract-call? 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token
      transfer total-rewards tx-sender tx-sender none
    ))
      success (ok total-rewards)
      error (begin
        (map-set user-rewards tx-sender total-rewards)
        (err ERR_WITHDRAW_FAILED)
      )
    )
  )
)

;; Admin functions

;; Update the yield rate (admin only)
(define-public (set-yield-rate (new-rate uint))
  (begin
    (asserts! (is-eq tx-sender (var-get vault-admin)) (err ERR_UNAUTHORIZED))
    (asserts! (and (>= new-rate u0) (<= new-rate u1000)) (err ERR_UNAUTHORIZED))
    (var-set yield-rate new-rate)
    (ok true)
  )
)

;; Set a new admin (current admin only)
(define-public (set-admin (new-admin principal))
  (begin
    (asserts! (is-eq tx-sender (var-get vault-admin)) (err ERR_UNAUTHORIZED))
    (asserts! (is-standard new-admin) (err ERR_UNAUTHORIZED))
    (var-set vault-admin new-admin)
    (ok true)
  )
)

;; Fund the contract with sBTC (for paying out rewards)
(define-public (fund-vault (amount uint))
  (match (contract-call? 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token transfer
    amount tx-sender (as-contract tx-sender) none
  )
    success (ok amount)
    error (err ERR_DEPOSIT_FAILED)
  )
)

;; Update the accumulator periodically
(define-public (update-global-accumulator)
  (let ((blocks-since-last (- stacks-block-height (var-get last-yield-distribution))))
    (var-set global-accumulator
      (+ (var-get global-accumulator) (* blocks-since-last (var-get yield-rate)))
    )
    (var-set last-yield-distribution stacks-block-height)
    (ok true)
  )
)