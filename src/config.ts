// src/config.ts
type ContractConfig = {
  CHAIN_ID: number;
  APR: number;
  MIN_DEPOSIT_USDC: number;
  MAX_DEPOSIT_USDC: number;
  DECIMALS: number;
  ADMIN_WALLET: string | undefined;
  CONTRACT_ADDRESS: `0x${string}` | undefined;
  CONTRACT_ABI: any[];
};

export const CONFIG: ContractConfig = {
  CHAIN_ID: 8453,
  APR: 24,
  MIN_DEPOSIT_USDC: 0.1,
  MAX_DEPOSIT_USDC: 1000000000000,
  DECIMALS: 6,
  ADMIN_WALLET: process.env.NEXT_PUBLIC_ADMIN_WALLET,
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  CONTRACT_ABI: [
    // ABI contents
  ]
} as const;
