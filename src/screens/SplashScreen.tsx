import React, { useEffect } from 'react';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); // 1.5 seconds mock loading
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
       <svg 
        viewBox="0 0 100 20" 
        className="h-10 md:h-16 object-contain fill-black" 
       >
       </svg>
    </div>
  );
};
