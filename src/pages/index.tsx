// src/pages/index.tsx
import { useAccount, useConnect, useContractWrite } from 'wagmi';
import { parseUnits } from 'viem';
import { useAppStore } from '../store';
import { CONFIG } from '../config';

export default function Home() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const store = useAppStore();

  const { write: deposit } = useContractWrite({
    address: CONFIG.CONTRACT_ADDRESS as `0x${string}`,
    abi: CONFIG.CONTRACT_ABI,
    functionName: 'deposit'
  });

  const handleDeposit = async () => {
    if (!address || !store.depositAmount) return;
    try {
      await deposit({
        args: [
          parseUnits(store.depositAmount, CONFIG.DECIMALS),
          store.referralCode || '0'
        ]
      });
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Earn USDC</h1>
          <p className="text-gray-600 mb-8 text-center">
            Connect your wallet to start earning {CONFIG.APR}% APR on your USDC
          </p>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl mb-4 hover:bg-blue-700 transition-colors"
            >
              Connect {connector.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6">Deposit USDC</h1>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Amount (USDC)</label>
            <input
              type="number"
              value={store.depositAmount}
              onChange={(e) => store.setDepositAmount(e.target.value)}
              className="w-full p-3 border rounded-xl"
              placeholder="Enter amount"
              min={CONFIG.MIN_DEPOSIT_USDC}
              max={CONFIG.MAX_DEPOSIT_USDC}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Referral Code (Optional)</label>
            <input
              type="text"
              value={store.referralCode}
              onChange={(e) => store.setReferralCode(e.target.value)}
              className="w-full p-3 border rounded-xl"
              placeholder="Enter referral code"
            />
          </div>
          <button
            onClick={handleDeposit}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}