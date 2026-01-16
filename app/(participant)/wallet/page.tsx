// app/(participant)/wallet/page.tsx
'use client';

import { useState } from 'react';

const SearchInput = ({ placeholder, value, onChange }: any) => (
  <div className="relative mb-6">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 pl-10 text-white focus:ring-1 focus:ring-white/30 focus:outline-none transition-all"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  </div>
);

const WalletPage = () => {
  const [transactionSearch, setTransactionSearch] = useState('');
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const walletBalance = 12500;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount).replace('₹', '₹ ');
  };

  const transactionHistoryData = [
    { description: 'Ticket Purchase: Tech Conference 2023', date: 'Oct 20, 2023', amount: -75.00 },
    { description: 'Refund: Music Festival 2023', date: 'Aug 16, 2023', amount: 120.00 },
    { description: 'Wallet Top-up', date: 'Jul 20, 2023', amount: 1000.00 },
    { description: 'Ticket Purchase: Art Exhibition 2023', date: 'Jul 15, 2023', amount: -30.00 },
  ];

  const filteredTransactions = transactionHistoryData.filter(transaction =>
    transaction.description.toLowerCase().includes(transactionSearch.toLowerCase())
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Column: Wallet Management */}
          <div className="flex flex-col gap-8">

            {/* Balance Module */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-spectral tracking-tight text-gray-200">Wallet Balance</h2>
                <button
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {isBalanceVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
                  )}
                </button>
              </div>

              <div className="relative h-20 flex items-center">
                <div className={`transition-all duration-500 ease-in-out absolute w-full ${isBalanceVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-lg -translate-y-2 pointer-events-none'}`}>
                  <p className="text-5xl font-bold tracking-tighter text-white">{formatCurrency(walletBalance)}</p>
                </div>
                {!isBalanceVisible && (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-3 h-3 bg-white/20 rounded-full animate-pulse" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods Module */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold font-spectral tracking-tight mb-8 text-gray-200">Methods</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                {/* Visa - Increased Size */}
                <div title="Visa" className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-10 w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"><path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path><path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"></path><path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"></path></svg>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-300 transition-colors">Visa</span>
                </div>

                {/* Mastercard - Increased Size */}
                <div title="Mastercard" className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 64" className="h-10 w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"><circle cx="30" cy="32" r="22" fill="#eb001b"/><circle cx="70" cy="32" r="22" fill="#f7951a"/><path fill="#ff5f00" d="M40 32a22 22 0 0 1 20 0 22 22 0 0 1-20 0"/></svg>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-300 transition-colors">Mastercard</span>
                </div>

                {/* Paytm - Increased Size */}
                <div title="Paytm" className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-10 w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"><path fill="#0d47a1" d="M5.446 18.01H.548c-.277 0-.502.167-.503.502L0 30.519c-.001.3.196.45.465.45.735 0 1.335 0 2.07 0C2.79 30.969 3 30.844 3 30.594 3 29.483 3 28.111 3 27l2.126.009c1.399-.092 2.335-.742 2.725-2.052.117-.393.14-.733.14-1.137l.11-2.862C7.999 18.946 6.949 18.181 5.446 18.01zM4.995 23.465C4.995 23.759 4.754 24 4.461 24H3v-3h1.461c.293 0 .534.24.534.535V23.465zM13.938 18h-3.423c-.26 0-.483.08-.483.351 0 .706 0 1.495 0 2.201C10.06 20.846 10.263 21 10.552 21h2.855c.594 0 .532.972 0 1H11.84C10.101 22 9 23.562 9 25.137c0 .42.005 1.406 0 1.863-.008.651-.014 1.311.112 1.899C9.336 29.939 10.235 31 11.597 31h4.228c.541 0 1.173-.474 1.173-1.101v-8.274C17.026 19.443 15.942 18.117 13.938 18zM14 27.55c0 .248-.202.45-.448.45h-1.105C12.201 28 12 27.798 12 27.55v-2.101C12 25.202 12.201 25 12.447 25h1.105C13.798 25 14 25.202 14 25.449V27.55zM18 18.594v5.608c.124 1.6 1.608 2.798 3.171 2.798h1.414c.597 0 .561.969 0 .969H19.49c-.339 0-.462.177-.462.476v2.152c0 .226.183.396.422.396h2.959c2.416 0 3.592-1.159 3.591-3.757v-8.84c0-.276-.175-.383-.342-.383h-2.302c-.224 0-.355.243-.355.422v5.218c0 .199-.111.316-.29.316H21.41c-.264 0-.409-.143-.409-.396v-5.058C21 18.218 20.88 18 20.552 18c-.778 0-1.442 0-2.22 0C18.067 18 18 18.263 18 18.594L18 18.594z"></path><path fill="#00adee" d="M27.038 20.569v-2.138c0-.237.194-.431.43-.431H28c1.368-.285 1.851-.62 2.688-1.522.514-.557.966-.704 1.298-.113L32 18h1.569C33.807 18 34 18.194 34 18.431v2.138C34 20.805 33.806 21 33.569 21H32v9.569C32 30.807 31.806 31 31.57 31h-2.14C29.193 31 29 30.807 29 30.569V21h-1.531C27.234 21 27.038 20.806 27.038 20.569L27.038 20.569zM42.991 30.465c0 .294-.244.535-.539.535h-1.91c-.297 0-.54-.241-.54-.535v-6.623-1.871c0-1.284-2.002-1.284-2.002 0v8.494C38 30.759 37.758 31 37.461 31H35.54C35.243 31 35 30.759 35 30.465V18.537C35 18.241 35.243 18 35.54 18h1.976c.297 0 .539.241.539.537v.292c1.32-1.266 3.302-.973 4.416.228 2.097-2.405 5.69-.262 5.523 2.375 0 2.916-.026 6.093-.026 9.033 0 .294-.244.535-.538.535h-1.891C45.242 31 45 30.759 45 30.465c0-2.786 0-5.701 0-8.44 0-1.307-2-1.37-2 0v8.44H42.991z"></path></svg>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-300 transition-colors">Paytm</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Transaction History */}
          <div className="flex flex-col bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-sm h-fit">
            <h1 className="text-xl font-bold mb-8 font-spectral tracking-tight text-gray-200">Recent Activity</h1>
            <SearchInput
              placeholder="Filter transactions..."
              value={transactionSearch}
              onChange={(e: any) => setTransactionSearch(e.target.value)}
            />
            <div className="space-y-6">
              {filteredTransactions.length > 0 ? filteredTransactions.map((tx, index) => (
                <div key={index} className="flex justify-between items-center group transition-all">
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">{tx.description}</h3>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                  <span className={`text-sm font-bold tracking-tight ${tx.amount > 0 ? 'text-green-400' : 'text-red-400/80'}`}>
                    {tx.amount > 0 ? `+₹${tx.amount.toFixed(2)}` : `-₹${Math.abs(tx.amount).toFixed(2)}`}
                  </span>
                </div>
              )) : <p className="text-gray-500 text-sm italic">No records found for "{transactionSearch}"</p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WalletPage;