'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Bell, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#111111] border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
      
      {/* Search Bar */}
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Search students, plans, or logs..."
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="cursor-pointer relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 border-white dark:border-[#111111]"></span>
        </button>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800"></div>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
      </div>
    </header>
  );
}