import React from 'react';

export const SignInOverlay = ({ setScreen }: { setScreen?: (s: string) => void }) => {
  return (
    <div className="fixed lg:block lg:relative lg:mt-8 bottom-[60px] lg:bottom-auto left-0 right-0 max-w-[1200px] mx-auto bg-black/80 lg:bg-[#f5f5f5] lg:border lg:border-gray-300 backdrop-blur-sm text-white lg:text-black py-3 px-4 flex items-center justify-between z-40">
      <span className="font-semibold text-sm lg:text-lg">Sign in and enjoy more</span>
      <button 
        onClick={() => setScreen && setScreen('AUTH')}
        className="bg-white lg:bg-black text-black lg:text-white px-5 py-1.5 text-sm font-bold rounded-sm"
      >
        Sign In
      </button>
    </div>
  );
};
