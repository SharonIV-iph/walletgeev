'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/registry/new-york-v4/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/registry/new-york-v4/ui/sheet';
import { Menu, Search } from 'lucide-react';
import { ThemeToggle } from "./ThemeToggle";
import SearchModal from './SearchModal';

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>منو</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActive('/') ? 'bg-accent text-accent-foreground' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">خانه</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActive('/about') ? 'bg-accent text-accent-foreground' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">درباره ما</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/blog"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActive('/blog') ? 'bg-accent text-accent-foreground' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">بلاگ</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pricing"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActive('/pricing') ? 'bg-accent text-accent-foreground' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">قیمت‌ها</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/contact"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                              isActive('/contact') ? 'bg-accent text-accent-foreground' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">تماس با ما</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button 
                variant="outline" 
                className="relative h-8 w-40 lg:w-64 justify-start text-sm text-muted-foreground"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4 ml-2" />
                <span className="hidden lg:inline-flex">جستجو...</span>
                <span className="inline-flex lg:hidden">جستجو...</span>
                <kbd className="pointer-events-none absolute left-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
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
      <SearchModal
        isOpen={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
    </>
  );
};

export default Navigation; 