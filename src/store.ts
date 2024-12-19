// src/store.ts
import { create } from 'zustand';

interface AppState {
  depositAmount: string;
  referralCode: string;
  isWithdrawalsEnabled: boolean;
  currentAPR: number;
  referralRate: number;
  setDepositAmount: (amount: string) => void;
  setReferralCode: (code: string) => void;
  setWithdrawalsEnabled: (enabled: boolean) => void;
  setAPR: (apr: number) => void;
  setReferralRate: (rate: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  depositAmount: '',
  referralCode: '',
  isWithdrawalsEnabled: true,
  currentAPR: 24,
  referralRate: 10,
  setDepositAmount: (amount) => set({ depositAmount: amount }),
  setReferralCode: (code) => set({ referralCode: code }),
  setWithdrawalsEnabled: (enabled) => set({ isWithdrawalsEnabled: enabled }),
  setAPR: (apr) => set({ currentAPR: apr }),
  setReferralRate: (rate) => set({ referralRate: rate })
}));

