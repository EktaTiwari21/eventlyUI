// File: app/(participant)/wallet/page.tsx

// SVG Icons for Payment Methods
const VisaIcon = () => (
    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" rx="4" fill="#1A1A1A"/>
        <path d="M21.375 29.5H17.4375L12.5 10.5H16.8125L20 23.9062L23.1875 10.5H27.5L21.375 29.5ZM33.8047 29.5H30.0547L30.8359 26.0938H26.9609L26.1797 29.5H22.4297L27.0547 10.5H31.1484L33.8047 29.5ZM28.9297 14.5312L27.4297 22.8125H30.375L28.9297 14.5312ZM47.5 10.5L44.1562 21.0312L40.8125 10.5H37.0625L42.2812 29.5H45.9688L51.1875 10.5H47.5Z" fill="white"/>
    </svg>
);

const MasterCardIcon = () => (
    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" rx="4" fill="#1A1A1A"/>
        <circle cx="23" cy="20" r="8" fill="#EB001B"/>
        <circle cx="37" cy="20" r="8" fill="#F79E1B" fillOpacity="0.8"/>
    </svg>
);


export default function WalletPage() {
    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl font-bold mb-8">My Wallet</h1>

                {/* Balance Card */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-8 mb-16 shadow-2xl max-w-lg mx-auto">
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Current Balance</p>
                    <p className="text-5xl font-bold mt-2 text-white">₹1,250.00</p>
                </div>

                {/* Payment Methods */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
                    <div className="flex justify-center items-center space-x-6">
                        <VisaIcon />
                        <MasterCardIcon />
                        {/* Add more icons as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};