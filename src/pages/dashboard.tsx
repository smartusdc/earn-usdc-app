// src/pages/dashboard.tsx
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { parseUnits } from 'viem';
import { useAppStore } from '../store';
import { CONFIG } from '../config';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { address } = useAccount();
  const router = useRouter();
  const store = useAppStore();
  
  const isAdmin = address?.toLowerCase() === CONFIG.ADMIN_WALLET?.toLowerCase();

  // 管理者チェック
  if (!isAdmin) {
    router.push('/');
    return null;
  }

  // スマートコントラクトの操作
  const { write: withdrawFunds } = useContractWrite({
    address: CONFIG.CONTRACT_ADDRESS as `0x${string}`,
    abi: CONFIG.CONTRACT_ABI,
    functionName: 'adminWithdraw'
  });

  const { write: updateAPR } = useContractWrite({
    address: CONFIG.CONTRACT_ADDRESS as `0x${string}`,
    abi: CONFIG.CONTRACT_ABI,
    functionName: 'setAPR'
  });

  const { write: updateReferralRate } = useContractWrite({
    address: CONFIG.CONTRACT_ADDRESS as `0x${string}`,
    abi: CONFIG.CONTRACT_ABI,
    functionName: 'setReferralRate'
  });

  const { write: toggleWithdrawals } = useContractWrite({
    address: CONFIG.CONTRACT_ADDRESS as `0x${string}`,
    abi: CONFIG.CONTRACT_ABI,
    functionName: 'toggleWithdrawals'
  });

  // コントラクトの残高を取得
  const { data: balance } = useContractRead({
    address: CONFIG.CONTRACT_ADDRESS as `0x${string}`,
    abi: CONFIG.CONTRACT_ABI,
    functionName: 'getBalance'
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          {/* 残高表示 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Contract Balance</h2>
            <p className="text-2xl">{balance?.toString() || '0'} USDC</p>
          </div>

          {/* 緊急資金引き出し */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Emergency Controls</h2>
            <button
              onClick={() => withdrawFunds()}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-xl mb-4 hover:bg-red-700 transition-colors"
            >
              Withdraw All Funds
            </button>
            <button
              onClick={() => {
                toggleWithdrawals?.();
                store.setWithdrawalsEnabled(!store.isWithdrawalsEnabled);
              }}
              className={`w-full ${
                store.isWithdrawalsEnabled ? 'bg-yellow-600' : 'bg-green-600'
              } text-white py-3 px-6 rounded-xl hover:opacity-90 transition-colors`}
            >
              {store.isWithdrawalsEnabled ? 'Disable Withdrawals' : 'Enable Withdrawals'}
            </button>
          </div>

          {/* APR設定 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">APR Control</h2>
            <div className="flex gap-4">
              <input
                type="number"
                value={store.currentAPR}
                onChange={(e) => store.setAPR(Number(e.target.value))}
                className="flex-1 p-3 border rounded-xl"
                placeholder="Enter new APR"
              />
              <button
                onClick={() => updateAPR?.()}
                className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Update APR
              </button>
            </div>
          </div>

          {/* リファラル報酬設定 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Referral Rate Control</h2>
            <div className="flex gap-4">
              <input
                type="number"
                value={store.referralRate}
                onChange={(e) => store.setReferralRate(Number(e.target.value))}
                className="flex-1 p-3 border rounded-xl"
                placeholder="Enter new referral rate"
              />
              <button
                onClick={() => updateReferralRate?.()}
                className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Update Rate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}