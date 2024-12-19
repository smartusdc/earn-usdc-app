// src/config.ts
export const CONFIG = {
  CHAIN_ID: 8453,
  APR: 24,
  MIN_DEPOSIT_USDC: 0.1,
  MAX_DEPOSIT_USDC: 1000000000000,
  DECIMALS: 6,
  ADMIN_WALLET: process.env.NEXT_PUBLIC_ADMIN_WALLET,
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  CONTRACT_ABI: [
    // ABIÇÇ±Ç±Ç…íºê⁄ãLèq
  ]
} as const;
