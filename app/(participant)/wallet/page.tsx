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
      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
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
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(amount).replace('₹', '₹ ');
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div className="flex flex-col gap-12">

            <div className="w-full">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold font-spectral">Amount in Wallet</h2>
                <button onClick={() => setIsBalanceVisible(!isBalanceVisible)} className="text-gray-400 hover:text-white">
                  {isBalanceVisible ? ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg> ) : ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0_ 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg> )}
                </button>
              </div>
              <div className={`transition-all duration-300 ease-in-out ${isBalanceVisible ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {/* --- CHANGE: Added a bold white border --- */}
                <div className="bg-white/5 backdrop-blur-lg border border-white p-6 rounded-2xl shadow-lg">
                  <p className="text-3xl font-bold">{formatCurrency(walletBalance)}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-spectral mb-6">Payment methods</h2>
              {/* --- CHANGE: Removed background box, added glow effect, and increased icon size --- */}
              <div className="grid grid-cols-3 gap-8">
                <div title="Visa" className="flex items-center justify-center transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-12 object-contain"><path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path><path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"></path><path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"></path></svg></div>
                <div title="Mastercard" className="flex items-center justify-center transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 64" className="h-12 object-contain"><circle cx="30" cy="32" r="22" fill="#eb001b"/><circle cx="70" cy="32" r="22" fill="#f7951a"/><path fill="#ff5f00" d="M40 32a22 22 0 0 1 20 0 22 22 0 0 1-20 0"/></svg></div>
                <div title="Paytm" className="flex items-center justify-center transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-12 object-contain"><path fill="#0d47a1" d="M5.446 18.01H.548c-.277 0-.502.167-.503.502L0 30.519c-.001.3.196.45.465.45.735 0 1.335 0 2.07 0C2.79 30.969 3 30.844 3 30.594 3 29.483 3 28.111 3 27l2.126.009c1.399-.092 2.335-.742 2.725-2.052.117-.393.14-.733.14-1.137l.11-2.862C7.999 18.946 6.949 18.181 5.446 18.01zM4.995 23.465C4.995 23.759 4.754 24 4.461 24H3v-3h1.461c.293 0 .534.24.534.535V23.465zM13.938 18h-3.423c-.26 0-.483.08-.483.351 0 .706 0 1.495 0 2.201C10.06 20.846 10.263 21 10.552 21h2.855c.594 0 .532.972 0 1H11.84C10.101 22 9 23.562 9 25.137c0 .42.005 1.406 0 1.863-.008.651-.014 1.311.112 1.899C9.336 29.939 10.235 31 11.597 31h4.228c.541 0 1.173-.474 1.173-1.101v-8.274C17.026 19.443 15.942 18.117 13.938 18zM14 27.55c0 .248-.202.45-.448.45h-1.105C12.201 28 12 27.798 12 27.55v-2.101C12 25.202 12.201 25 12.447 25h1.105C13.798 25 14 25.202 14 25.449V27.55zM18 18.594v5.608c.124 1.6 1.608 2.798 3.171 2.798h1.414c.597 0 .561.969 0 .969H19.49c-.339 0-.462.177-.462.476v2.152c0 .226.183.396.422.396h2.959c2.416 0 3.592-1.159 3.591-3.757v-8.84c0-.276-.175-.383-.342-.383h-2.302c-.224 0-.355.243-.355.422v5.218c0 .199-.111.316-.29.316H21.41c-.264 0-.409-.143-.409-.396v-5.058C21 18.218 20.88 18 20.552 18c-.778 0-1.442 0-2.22 0C18.067 18 18 18.263 18 18.594L18 18.594z"></path><path fill="#00adee" d="M27.038 20.569v-2.138c0-.237.194-.431.43-.431H28c1.368-.285 1.851-.62 2.688-1.522.514-.557.966-.704 1.298-.113L32 18h1.569C33.807 18 34 18.194 34 18.431v2.138C34 20.805 33.806 21 33.569 21H32v9.569C32 30.807 31.806 31 31.57 31h-2.14C29.193 31 29 30.807 29 30.569V21h-1.531C27.234 21 27.038 20.806 27.038 20.569L27.038 20.569zM42.991 30.465c0 .294-.244.535-.539.535h-1.91c-.297 0-.54-.241-.54-.535v-6.623-1.871c0-1.284-2.002-1.284-2.002 0v8.494C38 30.759 37.758 31 37.461 31H35.54C35.243 31 35 30.759 35 30.465V18.537C35 18.241 35.243 18 35.54 18h1.976c.297 0 .539.241.539.537v.292c1.32-1.266 3.302-.973 4.416.228 2.097-2.405 5.69-.262 5.523 2.375 0 2.916-.026 6.093-.026 9.033 0 .294-.244.535-.538.535h-1.891C45.242 31 45 30.759 45 30.465c0-2.786 0-5.701 0-8.44 0-1.307-2-1.37-2 0v8.44H42.991z"></path></svg></div>
                <div title="Google Pay" className="flex items-center justify-center transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-12 object-contain"><path fill="#e64a19" d="M42.858,11.975c-4.546-2.624-10.359-1.065-12.985,3.481L23.25,26.927	c-1.916,3.312,0.551,4.47,3.301,6.119l6.372,3.678c2.158,1.245,4.914,0.506,6.158-1.649l6.807-11.789	C48.176,19.325,46.819,14.262,42.858,11.975z"></path><path fill="#fbc02d" d="M35.365,16.723l-6.372-3.678c-3.517-1.953-5.509-2.082-6.954,0.214l-9.398,16.275	c-2.624,4.543-1.062,10.353,3.481,12.971c3.961,2.287,9.024,0.93,11.311-3.031l9.578-16.59	C38.261,20.727,37.523,17.968,35.365,16.723z"></path><path fill="#43a047" d="M36.591,8.356l-4.476-2.585c-4.95-2.857-11.28-1.163-14.137,3.787L9.457,24.317	c-1.259,2.177-0.511,4.964,1.666,6.22l5.012,2.894c2.475,1.43,5.639,0.582,7.069-1.894l9.735-16.86	c2.017-3.492,6.481-4.689,9.974-2.672L36.591,8.356z"></path><path fill="#1e88e5" d="M19.189,13.781l-4.838-2.787c-2.158-1.242-4.914-0.506-6.158,1.646l-5.804,10.03	c-2.857,4.936-1.163,11.252,3.787,14.101l3.683,2.121l4.467,2.573l1.939,1.115c-3.442-2.304-4.535-6.92-2.43-10.555l1.503-2.596	l5.504-9.51C22.083,17.774,21.344,15.023,19.189,13.781z"></path></svg></div>
                <div title="Apple Pay" className="flex items-center justify-center transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" className="h-12 object-contain"><g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(5.12,5.12)"><path d="M9.98438,15.00195c-0.835,0.04 -1.86608,0.57136 -2.45508,1.31836c-0.54,0.644 -1.00177,1.68988 -0.88477,2.67188c0.943,0.082 1.88561,-0.49175 2.47461,-1.21875c0.58,-0.747 0.96323,-1.74848 0.86523,-2.77148zM18,17v15h2.375v-5h3.25c2.983,0 5.125,-2.075 5.125,-5c0,-2.925 -2.10288,-5 -5.04687,-5zM20.375,19h2.75c2.047,0 3.25,1.105 3.25,3c0,1.895 -1.193,3 -3.25,3h-2.75zM9.875,19.5c-1.375,0 -2.358,0.75 -3,0.75c-0.652,0 -1.625,-0.74023 -2.75,-0.74023c-1.375,0 -2.72164,0.86309 -3.43164,2.12109c-1.459,2.515 -0.37875,6.23816 1.03125,8.28516c0.691,1.014 1.52539,2.08398 2.65039,2.08398c1.031,-0.039 1.38,-0.625 2.625,-0.625c1.254,0 1.625,0.625 2.75,0.625c1.125,0 1.80609,-1.03092 2.49609,-2.04492c0.788,-1.15 1.10991,-2.27108 1.12891,-2.33008c-0.019,-0.019 -2.17727,-0.84775 -2.19727,-3.34375c-0.019,-2.086 1.7013,-3.08067 1.7793,-3.13867c-0.973,-1.442 -2.58203,-1.64258 -2.95703,-1.64258zM34.19922,21c-2.489,0 -4.32849,1.39545 -4.39648,3.31445h2.10938c0.174,-0.912 1.03675,-1.50977 2.21875,-1.50977c1.433,0 2.24219,0.65628 2.24219,1.86328l0.00195,0.83203l-2.93164,0.1543c-2.721,0.161 -4.19336,1.2543 -4.19336,3.1543c0,1.919 1.52022,3.19336 3.69922,3.19336c1.472,0 2.83803,-0.73163 3.45703,-1.89062h0.04883v1.77539h2.16797v-7.37109c0.001,-2.139 -1.74083,-3.51562 -4.42383,-3.51562zM39.5,21l4.00781,10.94922l-0.21484,0.66602c-0.362,1.129 -0.94814,1.5625 -1.99414,1.5625c-0.179,0 -0.51783,-0.01811 -0.67383,-0.03711v1.80469c0.158,0.035 0.70791,0.05469 0.87891,0.05469c2.307,0 3.3928,-0.86795 4.3418,-3.50195l4.1543,-11.49805h-2.4043l-2.78711,8.88477h-0.04883l-2.78711,-8.88477zM36.375,27l-0.00781,0.86719c0,1.387 -1.20106,2.375 -2.78906,2.375c-1.249,0 -2.04297,-0.58823 -2.04297,-1.49023c0,-0.931 0.76552,-1.47259 2.22852,-1.55859z"></path></g></g></svg></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4 font-spectral">Transaction History</h1>
            <SearchInput
              placeholder="Search transactions..."
              value={transactionSearch}
              onChange={(e: any) => setTransactionSearch(e.target.value)}
            />
            <div className="space-y-4 bg-white/5 p-4 rounded-lg flex-grow">
              {filteredTransactions.length > 0 ? filteredTransactions.map((tx, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{tx.description}</h3>
                    <p className="text-sm text-gray-400">{tx.date}</p>
                  </div>
                  <span className={tx.amount > 0 ? 'text-green-400' : 'text-red-400'}>
                    {tx.amount > 0 ? `+₹${tx.amount.toFixed(2)}` : `-₹${Math.abs(tx.amount).toFixed(2)}`}
                  </span>
                </div>
              )) : <p className="text-gray-500">No transactions found.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;