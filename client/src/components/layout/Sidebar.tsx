'use client';

import Image from 'next/image';
import { useSidebar } from '@/src/context/SidebarContext';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Activity, 
  ChevronLeft, 
  ChevronRight,
  LogOut 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // Updated navigation to match your screenshot
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Student List', icon: Users, href: '/students' },
    { name: 'Create User', icon: UserPlus, href: '/users' },
    { name: 'Activity Logs', icon: Activity, href: '/logs' },
  ];

  return (
    <aside
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } transition-all duration-300 ease-in-out hidden md:flex flex-col bg-[#111111] border-r border-gray-800 h-screen sticky top-0`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        {isExpanded && (
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.jpg" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="rounded-full object-cover"
            />
            <span className="font-bold text-lg text-white truncate">OJT Monitoring</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`cursor-pointer p-1.5 rounded-lg bg-[#0a0a0a] hover:bg-gray-800 text-gray-400 transition-colors ${
            !isExpanded && 'mx-auto'
          }`}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center ${
                isExpanded ? 'justify-start px-3' : 'justify-center px-0'
              } py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              {isExpanded && (
                <span className="ml-3 text-sm font-medium truncate">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Profile Section */}
      <div className="p-4 border-t border-gray-800">
        {isExpanded ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">Juan Dela Cruz</p>
                <p className="text-xs text-gray-400 truncate">name@example.com</p>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 w-full py-2 bg-[#1a1a1a] hover:bg-gray-800 text-sm text-gray-300 rounded-lg transition-colors border border-gray-800">
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
            <button className="p-2 bg-[#1a1a1a] hover:bg-gray-800 text-gray-300 rounded-lg transition-colors border border-gray-800">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}