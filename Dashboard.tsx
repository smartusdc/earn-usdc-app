import React, { useState } from 'react';
import { Shield, Copy, ExternalLink, Wallet, ChevronRight, Users, DollarSign, ArrowUpCircle, ArrowDownCircle, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [enteredReferralCode, setEnteredReferralCode] = useState("");
  const [isEnteringCode, setIsEnteringCode] = useState(false);
  
  const [currentAPR] = useState(24);
  const [referralCode] = useState("ABC123");
  const [websiteUrl] = useState("https://earnusdc.base.org");
  const [referrerBonus] = useState(5);
  const [referredBonus] = useState(7);

  // Balance Card Component
  const BalanceCard = () => (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-600">Your Deposit Balance</h2>
          <div className="text-4xl font-bold mt-2">1,234.56 USDC</div>
          <div className="text-green-600 text-lg mt-1">Earning {currentAPR}% APR</div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            <ArrowUpCircle className="h-5 w-5" />
            Deposit
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            <ArrowDownCircle className="h-5 w-5" />
            Withdraw
          </button>
        </div>
      </CardContent>
    </Card>
  );

  // Referral Status Card Component
  const ReferralStatusCard = () => (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-600">Your Referral Code</h3>
            <div className="flex items-center gap-2 text-lg">
              <span className="font-bold">{referralCode}</span>
              <button
                onClick={() => navigator.clipboard.writeText(referralCode)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-600">Referral Code You Used</h3>
            {enteredReferralCode ? (
              <div className="text-lg font-bold text-green-600">
                {enteredReferralCode}
                <span className="ml-2 text-sm">
                  (+{referredBonus}% bonus active)
                </span>
              </div>
            ) : (
              <button
                onClick={() => setIsEnteringCode(true)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Edit2 className="h-4 w-4" />
                Enter code to get +{referredBonus}% bonus
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Referral Input Modal Component
  const ReferralInputModal = () => (
    <Dialog open={isEnteringCode} onOpenChange={setIsEnteringCode}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Referral Code</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p>Get +{referredBonus}% bonus on your earnings!</p>
          </div>
          <input
            type="text"
            placeholder="Enter referral code"
            className="w-full p-3 border rounded-lg"
            value={enteredReferralCode}
            onChange={(e) => setEnteredReferralCode(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEnteringCode(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsEnteringCode(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Code
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Connected View Component
  const ConnectedView = () => (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <BalanceCard />
      <ReferralStatusCard />
      <ReferralInputModal />
      
      {/* Rewards Overview */}
      <Card>
        <CardContent className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Deposit Rewards</h3>
            <div className="text-3xl font-bold text-green-600">123.45 USDC</div>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
              Claim Rewards
            </button>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Referral Rewards</h3>
            <div className="text-3xl font-bold text-blue-600">45.67 USDC</div>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
              Claim Rewards
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Pre-Connect View Component
  const PreConnectView = () => (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/api/placeholder/32/32" alt="Coinbase Logo" className="h-8" />
          <h1 className="text-4xl font-bold">EarnUSDC on Base</h1>
        </div>
        <p className="text-xl">The safest way to earn on your USDC</p>
        <p className="text-xl text-gray-600">Currently earning</p>
        <div className="text-5xl font-bold text-green-600">{currentAPR}% APR</div>
      </div>

      {/* Trust Badge */}
      <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-center gap-2">
        <Shield className="text-blue-600" />
        <span>Powered by Coinbase's Base network</span>
      </div>

      {/* Wallet Connection */}
      <div className="text-center space-y-4">
        <div className="flex justify-center gap-4 mb-4">
          <img src="/api/placeholder/40/40" alt="MetaMask" />
          <img src="/api/placeholder/40/40" alt="WalletConnect" />
          <img src="/api/placeholder/40/40" alt="Coinbase Wallet" />
        </div>
        
        <button 
          onClick={() => setIsConnected(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full max-w-md mx-auto"
        >
          <Wallet className="h-5 w-5" />
          Connect Wallet
          <ChevronRight className="h-5 w-5" />
        </button>
        
        <button 
          onClick={() => setShowReferralModal(true)}
          className="text-blue-600 hover:underline"
        >
          Have a referral code? Get +{referredBonus}% bonus!
        </button>
      </div>

      {/* Footer Links */}
      <div className="flex justify-center space-x-6 text-sm">
        <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
          New to crypto? Start here <ExternalLink className="h-4 w-4" />
        </a>
        <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
          Learn about APR <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );

  return isConnected ? <ConnectedView /> : <PreConnectView />;
};

export default Dashboard;
