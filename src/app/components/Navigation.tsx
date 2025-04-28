'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/registry/new-york-v4/ui/sheet';
import { BellIcon, Menu, LogOut, User, ChevronDown, HomeIcon, UserIcon } from 'lucide-react';
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
import { Notification } from '@/types/components';

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, logout, setIsAuthenticated } = useAuth();
  const { get, loading } = useApi();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsAuthenticated(false);
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
               ولت یار
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
                href="/services"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/services') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                خدمات
              </Link>
              <Link
                href="/consultants"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/consultants') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                متخصصین
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
                href="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/about') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                درباره ما
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
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <User className="h-6 w-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-28 items-center justify-center flex flex-col gap-1">
                  <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="flex items-center justify-end gap-2 w-24 cursor-pointer py-3 px-3">
                        پروفایل
                        <UserIcon className="h-6 w-6" />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center justify-end gap-2 w-24 cursor-pointer py-3 px-3">
                        داشبورد
                        <HomeIcon className="h-6 w-6" />
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center justify-end gap-2 w-24 cursor-pointer py-3 px-3"
                    >
                      خروج
                      <LogOut className="h-6 w-6" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                    <BellIcon className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-80">
                    <div className="p-2">
                      <h3 className="text-sm font-medium mb-2 text-left">اعلان‌ها</h3>
                      <div className="max-h-[300px] overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b text-left ${
                              notification.read ? 'bg-muted/50' : 'bg-background'
                            }`}
                          >
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.createdAt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
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