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
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Shein-logo.png" alt="SHEIN" className="h-[40px] md:h-[60px] object-contain" />
    </div>
  );
};
