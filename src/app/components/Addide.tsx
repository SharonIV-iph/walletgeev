'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, LogOut, Home, Calendar, User, Settings, MessageSquare } from 'lucide-react';
export default function Addide() {
  const pathname = usePathname();
  const navItems = [
    { icon: Home, label: 'داشبورد', href: '/dashboard' },
    { icon: MessageSquare, label: 'پرونده ها', href: '/dashboard/messages' },
    { icon: User, label: 'پروفایل', href: '/dashboard/profile' },
  ];
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm h-screen sticky top-0">
    <div className="p-4 flex flex-col h-full">
      {/* User Profile */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">سمیرا حیدری کیا</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 space-x-reverse p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  </aside>
  );
} 