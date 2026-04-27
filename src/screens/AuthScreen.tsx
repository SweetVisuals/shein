import React, { useState } from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';

export const AuthScreen = ({ setScreen, goBack }: { setScreen: (s: string) => void, goBack: () => void }) => {
  const [email, setEmail] = useState('');
  const { login } = useAppContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
    setScreen('HOME');
  };

  return (
    <MobileLayout hideNav setScreen={setScreen}>
      <div className="bg-white px-3 py-2 sticky top-0 z-50 flex items-center gap-3">
        <button onClick={() => goBack()}>
          <ChevronLeft size={28} className="text-black" />
        </button>
        <h2 className="text-lg font-bold">Sign In / Register</h2>
      </div>

      <div className="p-6 bg-white min-h-[calc(100vh-60px)]">
        <h1 className="text-2xl font-bold mb-6">Welcome</h1>
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
  );
};
