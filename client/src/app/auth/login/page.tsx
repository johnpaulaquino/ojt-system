'use client';

import { useTheme } from 'next-themes';
import { Mail, Lock, Sun, Moon, ArrowRight } from 'lucide-react';
import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    router.push('/admin/create-user');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-gray-50 dark:bg-[#0a0a0a]">
      
      {/*Theme Toggle Button */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}

      {/*Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-[#111111] rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800 p-8">
        
        {/*Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            OJT Monitor
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        {/*Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Student ID or Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                id="email"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors sm:text-sm"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          {/*Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="password"
                id="password"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors sm:text-sm"
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          {/*Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-[#0a0a0a]"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me for 30 days
            </label>
          </div>

          {/*Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 dark:text-gray-900 dark:bg-white dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-offset-[#111111] dark:focus:ring-white transition-colors"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/*Footer */}
        <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-800 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help accessing your account?
          </p>
          <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 mt-1 inline-block">
            Contact IT Support
          </a>
        </div>
      </div>
    </div>
  );
}