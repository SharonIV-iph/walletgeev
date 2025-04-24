'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/registry/new-york-v4/ui/sheet';
import { Menu } from 'lucide-react';
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from '@/hooks/useAuth';

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => pathname === path;

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
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                داشبورد
              </Link>
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