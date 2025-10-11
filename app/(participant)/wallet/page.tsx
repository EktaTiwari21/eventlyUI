// app/(participant)/wallet/page.tsx
'use client';

import { useState } from 'react';

// --- We move the SearchInput component here ---
const SearchInput = ({ placeholder, value, onChange }: any) => (
    <div className="relative mb-6">
      <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
);

const PaymentIcon = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div title={title} className="w-[110px] h-[93px] p-4 flex items-center justify-center filter drop-shadow-lg">
      {children}
    </div>
);

const WalletPage = () => {
  const walletBalance = 12500;
  const [transactionSearch, setTransactionSearch] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('₹', '₹ ');
  };

  const transactionHistoryData = [
    { description: 'Ticket Purchase: Tech Conference 2023', date: 'Oct 20, 2023', amount: -75.00 },
    { description: 'Refund: Music Festival 2023', date: 'Aug 16, 2023', amount: 120.00 },
    { description: 'Ticket Purchase: Art Exhibition 2023', date: 'Jul 15, 2023', amount: -30.00 },
  ];

  const filteredTransactions = transactionHistoryData.filter(transaction =>
      transaction.description.toLowerCase().includes(transactionSearch.toLowerCase())
  );

  return (
      <div className="bg-black text-white min-h-screen p-4">
        <div className="container mx-auto px-4 lg:px-20 py-12">
          {/* --- The top section of your page is preserved --- */}
          <div className="w-full flex flex-col items-center justify-center gap-16 mb-16">
            <div className="w-full max-w-[614px] h-[364px] bg-white/10 rounded-[16px] border border-white/[.18] backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center p-6 text-center">
              <h2 className="font-space text-[64px] font-bold leading-[40px] text-white">
                Amount in Wallet
              </h2>
              <p className="font-space text-[64px] font-bold leading-[48px] text-white mt-12">
                {formatCurrency(walletBalance)}
              </p>
            </div>
            <div className="flex flex-col items-center gap-8">
              <h3 className="font-stylish text-[64px] font-normal leading-[40px] text-white">
                Payment methods
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <PaymentIcon title="Visa">{/* ... svg ... */}</PaymentIcon>
                <PaymentIcon title="Paytm">{/* ... svg ... */}</PaymentIcon>
                <PaymentIcon title="Google Pay">{/* ... svg ... */}</PaymentIcon>
                <PaymentIcon title="Apple Pay">{/* ... svg ... */}</PaymentIcon>
              </div>
            </div>
          </div>

          {/* --- THIS IS THE NEW TRANSACTION HISTORY SECTION --- */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 font-spectral">Transaction History</h2>
            <SearchInput
                placeholder="Search transactions..."
                value={transactionSearch}
                onChange={(e: any) => setTransactionSearch(e.target.value)}
            />
            <div className="space-y-4">
              {filteredTransactions.map((tx, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{tx.description}</h3>
                      <p className="text-sm text-gray-400">{tx.date}</p>
                    </div>
                    <span className={tx.amount > 0 ? 'text-green-400' : 'text-red-400'}>
                  {tx.amount > 0 ? `+₹${tx.amount.toFixed(2)}` : `-₹${Math.abs(tx.amount).toFixed(2)}`}
                </span>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default WalletPage;