// File: app/(participant)/history/page.tsx

export default function HistoryPage() {
    // Mock data
    const eventHistory = [
        { name: 'Tech Conference 2023', date: 'Oct 20, 2023', status: 'Attended' },
        { name: 'Music Festival 2023', date: 'Aug 15, 2023', status: 'Cancelled' },
        { name: 'Art Exhibition 2023', date: 'Jul 22, 2023', status: 'Attended' },
    ];

    const transactionHistory = [
        { description: 'Ticket Purchase: Tech Conference 2023', date: 'Oct 20, 2023', amount: -75.00, type: 'debit' },
        { description: 'Refund: Music Festival 2023', date: 'Aug 16, 2023', amount: 120.00, type: 'credit' },
        { description: 'Ticket Purchase: Art Exhibition 2023', date: 'Jul 15, 2023', amount: -30.00, type: 'debit' },
    ];

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Event History Column */}
                <div>
                    <h1 className="text-3xl font-bold mb-6">Event History</h1>
                    <div className="space-y-4">
                        {eventHistory.map((event, index) => (
                            <div key={index} className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex justify-between items-center shadow-lg">
                                <div>
                                    <h3 className="font-semibold text-white">{event.name}</h3>
                                    <p className="text-sm text-gray-400">{event.date}</p>
                                </div>
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                                    event.status === 'Attended' ? 'bg-green-600/30 text-green-300' : 'bg-red-600/30 text-red-300'
                                }`}>
                  {event.status}
                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transaction History Column */}
                <div>
                    <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
                    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg">
                        <ul className="space-y-4">
                            {transactionHistory.map((transaction, index) => (
                                <li key={index} className="flex justify-between items-center border-b border-gray-800 pb-3 last:border-b-0 last:pb-0">
                                    <div>
                                        <p className="text-sm text-white">{transaction.description}</p>
                                        <p className="text-xs text-gray-400">{transaction.date}</p>
                                    </div>
                                    <p className={`font-semibold text-sm ${transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                                        {transaction.type === 'credit' ? `+₹${transaction.amount.toFixed(2)}` : `-₹${Math.abs(transaction.amount).toFixed(2)}`}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};