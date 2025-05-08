'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, LogOut, Home, Calendar, User, Settings, MessageSquare, Edit2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Addide() {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const navItems = [
        { icon: Home, label: 'داشبورد', href: '/dashboard' },
        { icon: Edit2Icon, label: 'شروع مشاوره', href: '/dashboard/chat/create' },
        { icon: User, label: 'پروفایل', href: '/dashboard/profile' },
        { icon: LogOut, label: 'خروج', href: '/dashboard/exit' },
    ];

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <aside className="w-16 md:w-40 bg-white dark:bg-gray-800 shadow-sm h-screen sticky top-0">
                <div className="p-2 md:p-4 flex flex-col h-full">
                    {/* Navigation Skeleton */}
                    <nav className="flex-1">
                        <ul className="space-y-2">
                            {[...Array(4)].map((_, index) => (
                                <li key={index}>
                                    <div className="flex items-center justify-center md:justify-start space-x-3 space-x-reverse p-2 md:p-3">
                                        {/* Icon Skeleton */}
                                        <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                        {/* Label Skeleton */}
                                        <div className="hidden md:block h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-16 md:w-48 bg-white dark:bg-gray-800 shadow-sm h-screen sticky top-0">
            <div className="p-2 md:p-4 md:px-2 flex flex-col h-full">
                {/* Navigation */}
                <nav className="flex-1">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center justify-center md:justify-start space-x-3 space-x-reverse p-2 md:p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${pathname === item.href ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
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