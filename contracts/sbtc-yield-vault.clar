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