// app/(organizer)/analytics/page.tsx
'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

const EventPerformanceCard = ({ name, revenue }: { name: string, revenue: number }) => {
  const formatCurrency = (amount: number) => {
     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  };
  return (
    <div className="bg-black/25 rounded-2xl border border-white/10 backdrop-blur-lg shadow-[0_0_40px_rgba(255,255,255,0.05)] px-5 py-3">
      <div className="flex justify-between items-center font-junge text-xl text-white">
        <span>{name}</span>
        <span>{formatCurrency(revenue)}</span>
      </div>
    </div>
  );
};

const AttendeeRateCard = () => (
  <div className="bg-black/25 rounded-2xl border border-white/50 backdrop-blur-lg shadow-[0_0_40px_rgba(255,255,255,0.05)] px-6 py-5 text-center">
    <p className="font-kreon text-2xl">
      <span className="text-[#A3A3A3]">Attendee’s Rate </span>
      <span className="text-white">90%</span>
      <span className="text-[#CDFFDF]"> +3</span>
    </p>
  </div>
);

const AttendeeDemographicsChart = () => {
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' as const, labels: { color: '#A3A3A3', boxWidth: 10, font: { size: 10 } } }, title: { display: false } }, scales: { y: { ticks: { color: '#A3A3A3', font: { size: 10 } }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }, x: { ticks: { color: '#A3A3A3', font: { size: 10 } }, grid: { display: false } } } };
  const labels = ['Minors', 'Teenagers', 'Adults', 'Senior Citizen'];
  const data = { labels, datasets: [ { label: '2024', data: [13.3, 97.48, 24.47, 87.48], backgroundColor: '#999494', borderRadius: 4 }, { label: '2025', data: [47.48, 89.11, 84.09, 60.34], backgroundColor: '#D8C6AE', borderRadius: 4 } ] };
  return <Bar options={options} data={data} />;
};

const TicketsSoldChart = () => {
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const, labels: { color: '#A3A3A3', usePointStyle: true, boxWidth: 6, font: { size: 10 } } }, title: { display: false } }, scales: { y: { ticks: { color: '#A3A3A3', font: { size: 10 } }, grid: { color: 'rgba(255, 255, 255, 0.1)' }, max: 100 }, x: { ticks: { color: '#A3A3A3', font: { size: 10 } }, grid: { display: false } } }, elements: { line: { tension: 0.4 } } };
  const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const data = { labels, datasets: [ { fill: true, label: '2024', data: [65, 59, 80, 81, 56, 55, 40, 62, 75, 88, 91, 110], borderColor: '#8979FF', backgroundColor: 'rgba(137, 121, 255, 0.3)' }, { fill: true, label: '2025', data: [28, 48, 40, 19, 86, 27, 90, 45, 68, 50, 78, 99], borderColor: '#FF928A', backgroundColor: 'rgba(255, 146, 138, 0.3)' } ] };
  return <Line options={options} data={data} />;
};

const AnalyticsPage = () => {
  const topEvents = [
    { name: 'Tech Conference', revenue: 88590 },
    { name: 'Music Fest', revenue: 82690 },
    { name: 'Art & Design Expo', revenue: 180500 },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        {/* --- CHANGE: The grid layout is now two main columns --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">

          {/* --- Left Column --- */}
          <div className="space-y-12">
            {/* Top Performing Events */}
            <div className="flex flex-col gap-4">
              <h2 className="font-kreon text-3xl text-center">Top Performing Events</h2>
              <div className="flex flex-col gap-3">
                {topEvents.map(event => (<EventPerformanceCard key={event.name} {...event} />))}
              </div>
            </div>

            {/* Tickets Sold Over Time */}
            <div className="flex flex-col gap-4">
              <h2 className="font-kreon text-3xl text-center">Tickets Sold Over Time</h2>
              <div className="bg-black/20 p-4 rounded-2xl h-[350px] border border-white/10">
                <TicketsSoldChart />
              </div>
            </div>
          </div>

          {/* --- Right Column --- */}
          <div className="space-y-12">
             {/* Attendee's Overview */}
            <div className="flex flex-col gap-4">
              <h2 className="font-kreon text-3xl text-center">Attendee’s Overview</h2>
              <AttendeeRateCard />
              <div className="bg-black/20 p-4 rounded-2xl h-[250px] border border-white/10">
                <AttendeeDemographicsChart />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;