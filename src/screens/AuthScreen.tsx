import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { DesktopLayout } from '../components/layout/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export const AuthScreen = ({ setScreen }: { setScreen: (s: string) => void }) => {
  const [email, setEmail] = useState('');
  const { login } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      setScreen('HOME');
    }
  };

  return (
    <>
      <div className="block lg:hidden">
        <MobileLayout hideNav setScreen={setScreen}>
          <div className="bg-white px-3 py-4 sticky top-0 z-50 flex items-center justify-between border-b border-gray-100">
             <button onClick={() => setScreen('HOME')}><ChevronLeft size={28} className="text-black" /></button>
             <span className="font-bold">Sign In / Register</span>
             <X size={28} className="text-black cursor-pointer" onClick={() => setScreen('HOME')} />
          </div>

          <div className="p-6 bg-white min-h-[calc(100vh-60px)]">
            <h1 className="text-2xl font-bold mb-6">Welcome to SHEIN</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to demo"
                  className="border border-gray-300 p-3 rounded-sm outline-none focus:border-black"
                  required
                />
              </div>
              <button type="submit" className="bg-black text-white p-3 rounded-sm font-bold mt-2">
                CONTINUE
              </button>
            </form>
            <div className="mt-6 text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms and Conditions & Privacy Policy.
            </div>
          </div>
        </MobileLayout>
      </div>

      <div className="hidden lg:block">
        <DesktopLayout>
          <div className="max-w-md mx-auto my-16 bg-white p-8 border border-gray-200">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign In / Register</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to demo"
                  className="border border-gray-300 p-3 rounded-sm outline-none focus:border-black"
                  required
                />
              </div>
              <button type="submit" className="bg-black text-white p-3 rounded-sm font-bold mt-2">
                CONTINUE
              </button>
            </form>
          </div>
        </DesktopLayout>
      </div>
    </>
  );
};
