import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#f5f5f5] mt-12 py-12 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} SHEIN Clone. All rights reserved.</p>
        <p className="mt-2">This is a demo clone application.</p>
      </div>
    </footer>
  );
};
