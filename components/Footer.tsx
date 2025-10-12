// components/Footer.tsx

const Footer = () => {
  return (
      // --- THIS IS THE REDESIGNED FOOTER ---
      // Background is now black to match the theme.
      // A faint top border is added for subtle separation.
      <footer className="w-full bg-black flex items-center justify-center py-6 border-t border-black/10">
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