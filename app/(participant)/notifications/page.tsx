// app/(participant)/notifications/page.tsx

const NotificationsPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Notifications</h1>
          <button className="text-sm text-gray-400 hover:text-white">
            Mark all as read
          </button>
        </div>

        {/* Placeholder for future notification items */}
        <div className="space-y-4">
           <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <p className="text-gray-300">Your notifications will appear here.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;