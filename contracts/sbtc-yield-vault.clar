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
(define-constant ERR_DEPOSIT_LIMIT_REACHED u106)
(define-constant ERR_INVALID_YIELD_RATE u107)
(define-constant ERR_INVALID_TOKEN_CONTRACT u108)
(define-constant ERR_INVALID_DEPOSIT_LIMIT u109)
(define-constant MIN_DEPOSIT_LIMIT u1000000) ;; 0.01 sBTC assuming 8 decimals
(define-constant MAX_DEPOSIT_LIMIT u100000000000) ;; 1,000 sBTC assuming 8 decimals

;; Data variables
(define-data-var yield-rate uint u50) ;; 0.5% represented as 50 (basis points)
(define-data-var last-yield-distribution uint u0) ;; Track the last block where yield was distributed
(define-data-var yield-period uint u144) ;; ~1 day in blocks (assuming 10 min block time)
(define-data-var vault-admin principal tx-sender) ;; Contract administrator who can update yield rates
(define-data-var global-accumulator uint u0)
(define-data-var token-contract-address principal 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token)
(define-data-var emergency-mode bool false)
(define-data-var admin-actions-timelock uint u144) ;; 1 day delay
(define-data-var max-deposit-limit uint u1000000000) ;; Set a reasonable limit
(define-data-var next-event-id uint u0)


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

(define-map pending-admin-actions
  {
    action: (string-ascii 20),
    param: uint,
  }
  { scheduled-at: uint }
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

(define-public (enable-emergency-mode)
  (begin
    (asserts! (is-eq tx-sender (var-get vault-admin)) (err ERR_UNAUTHORIZED))
    (var-set emergency-mode true)
    (ok true)
  )
)

(define-public (emergency-withdraw)
  (begin
    (asserts! (var-get emergency-mode) (err ERR_UNAUTHORIZED))
    (let ((user-deposit (get-user-deposit tx-sender)))
      (asserts! (> user-deposit u0) (err ERR_INSUFFICIENT_BALANCE))
      ;; Clear user's deposit first
      (map-set user-deposits tx-sender u0)
      ;; Then transfer tokens
      (match (as-contract (contract-call? 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token
        transfer user-deposit tx-sender tx-sender none
      ))
        success (ok user-deposit)
        error (begin
          ;; Restore state on failure
          (map-set user-deposits tx-sender user-deposit)
          (err ERR_WITHDRAW_FAILED)
        )
      )
    )
  )
)

(define-public (schedule-yield-rate-change (new-rate uint))
  (begin
    (asserts! (is-eq tx-sender (var-get vault-admin)) (err ERR_UNAUTHORIZED))
    ;; Validate yield rate (same check as in set-yield-rate)
    (asserts! (and (>= new-rate u0) (<= new-rate u1000))
      (err ERR_INVALID_YIELD_RATE)
    )
    (map-set pending-admin-actions {
      action: "set-yield-rate",
      param: new-rate,
    } { scheduled-at: stacks-block-height }
    )
    (ok true)
  )
)

(define-public (execute-yield-rate-change (new-rate uint))
  (let ((scheduled-action (default-to { scheduled-at: u0 }
      (map-get? pending-admin-actions {
        action: "set-yield-rate",
        param: new-rate,
      })
    )))
    (asserts! (is-eq tx-sender (var-get vault-admin)) (err ERR_UNAUTHORIZED))
    ;; Validate yield rate again, in case requirements changed between scheduling and execution
    (asserts! (and (>= new-rate u0) (<= new-rate u1000))
      (err ERR_INVALID_YIELD_RATE)
    )
    (asserts!
      (>= stacks-block-height
        (+ (get scheduled-at scheduled-action) (var-get admin-actions-timelock))
      )
      (err ERR_UNAUTHORIZED)
    )
    (var-set yield-rate new-rate)
    (ok true)
  )
)

(define-public (update-token-contract (new-address principal))
  (begin
    (asserts! (is-eq tx-sender (var-get vault-admin)) (err ERR_UNAUTHORIZED))
    (var-set token-contract-address new-address)
    (ok true)
  )
)

(define-public (set-max-deposit-limit (new-limit uint))
  (begin
    (asserts! (is-eq tx-sender (var-get vault-admin)) (err ERR_UNAUTHORIZED))
    ;; Validate that the new limit is within reasonable bounds
    (asserts!
      (and (>= new-limit MIN_DEPOSIT_LIMIT) (<= new-limit MAX_DEPOSIT_LIMIT))
      (err ERR_INVALID_DEPOSIT_LIMIT)
    )
    (var-set max-deposit-limit new-limit)
    (ok true)
  )
)

(define-public (log-deposit
    (user principal)
    (amount uint)
  )
  (begin
    (print {
      event: "deposit",
      user: user,
      amount: amount,
      id: (var-get next-event-id),
    })
    (var-set next-event-id (+ (var-get next-event-id) u1))
    (ok true)
  )
)

(define-public (log-withdrawal
    (user principal)
    (amount uint)
  )
  (begin
    (print {
      event: "withdrawal",
      user: user,
      amount: amount,
      id: (var-get next-event-id),
    })
    (var-set next-event-id (+ (var-get next-event-id) u1))
    (ok true)
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