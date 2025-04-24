'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/registry/new-york-v4/ui/sheet';
import { BellIcon, Menu, LogOut } from 'lucide-react';
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from '@/hooks/useAuth';
import { useApi } from '@/hooks/useApi';
import Cookies from 'js-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu";

interface Notification {
  id: string;
  message: string;
  time: string;
  isRead: boolean;
}

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { get, loading } = useApi();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isAuthenticated) {
        const response = await get<Notification[]>('/notifications');
        if (response) {
          setNotifications(response.data);
        }
      }
    };

    fetchNotifications();
  }, [isAuthenticated, get]);


  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    setNotifications([]);
    router.push('/');
  };

  if (!mounted) {
    return null;
  }


  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-lg">
                هتل ما
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                خانه
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/about') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                درباره ما
              </Link>
              <Link
                href="/blog"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/blog') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                بلاگ
              </Link>
              <Link
                href="/pricing"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/pricing') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                قیمت‌ها
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/contact') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                تماس با ما
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  داشبورد
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <BellIcon className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-80 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 text-left">اعلان‌ها</h3>
                      <div className="max-h-[300px] overflow-y-auto text-left">
                        {notifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className="flex flex-col items-end p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-right"
                          >
                            <p className={`text-sm text-left ${notification.isRead ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</span>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <nav className="flex items-center gap-4">
                <Link
                  href="/login"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/login') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  ورود
                </Link>
                <Link
                  href="/signup"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/signup') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  ثبت‌نام
                </Link>
              </nav>
            )}
            <ThemeToggle />
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pl-0">
              <SheetTitle className="sr-only">منوی اصلی</SheetTitle>
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className={`flex items-center ${
                    isActive('/') ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>خانه</span>
                </Link>
                <Link
                  href="/about"
                  className={`flex items-center ${
                    isActive('/about') ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>درباره ما</span>
                </Link>
                <Link
                  href="/blog"
                  className={`flex items-center ${
                    isActive('/blog') ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>بلاگ</span>
                </Link>
                <Link
                  href="/pricing"
                  className={`flex items-center ${
                    isActive('/pricing') ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>قیمت‌ها</span>
                </Link>
                <Link
                  href="/contact"
                  className={`flex items-center ${
                    isActive('/contact') ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>تماس با ما</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navigation; 