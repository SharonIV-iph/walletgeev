'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, LogOut, Home, Calendar, User, Settings, MessageSquare } from 'lucide-react';

export default function Addide() {
    const pathname = usePathname();
    const navItems = [
        { icon: Home, label: 'داشبورد', href: '/dashboard' },
        { icon: User, label: 'پروفایل', href: '/dashboard/profile' },
        { icon: LogOut, label: 'خروج', href: '/dashboard/exit' },
    ];

    return (
        <aside className="w-16 md:w-40 bg-white dark:bg-gray-800 shadow-sm h-screen sticky top-0">
            <div className="p-2 md:p-4 flex flex-col h-full">

                {/* Navigation */}
                <nav className="flex-1">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center justify-center md:justify-start space-x-3 space-x-reverse p-2 md:p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        title={item.label}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="hidden md:inline">{item.label}</span>
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