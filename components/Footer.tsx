// components/Footer.tsx

const Footer = () => {
  return (
    // --- CHANGE: Height set to 100px, background to #242424, and top border removed ---
    <footer className="w-full h-[90px] bg-[#242424] flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-gray-400">
          © 2025 Evently. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Designed to bring people together.
        </p>
      </div>
    </footer>
  );
};

export default Footer;