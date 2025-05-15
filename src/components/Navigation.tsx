'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/registry/new-york-v4/ui/sheet';
import { BellIcon, Menu, LogOut, User, ChevronDown, HomeIcon, UserIcon, Briefcase, MessageSquare, Info, Phone, LogIn, UserPlus, X } from 'lucide-react';
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

const SkeletonNavigation = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-6">
                    {/* Logo Skeleton */}
                    <div className="h-6 w-24 bg-muted rounded animate-pulse" />

                    {/* Navigation Links Skeleton */}
                    <nav className="hidden md:flex items-center gap-6">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div key={index} className="h-4 w-16 bg-muted rounded animate-pulse" />
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {/* Auth State Skeleton */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                    </div>

                    {/* Notification Bell Skeleton */}
                    <div className="h-5 w-5 bg-muted rounded-full animate-pulse" />

                    {/* Theme Toggle Skeleton */}
                    <div className="h-5 w-5 bg-muted rounded-full animate-pulse" />

                    {/* Mobile Menu Button Skeleton */}
                    <div className="md:hidden h-5 w-5 bg-muted rounded animate-pulse" />
                </div>
            </div>
        </nav>
    );
};

const Navigation: React.FC = () => {
    // Navigation hooks
    const pathname = usePathname();
    const router = useRouter();

    // Auth hooks
    const { isAuthenticated, logout, setIsAuthenticated } = useAuth();
    const { get, loading } = useApi();

    // State hooks
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Memoized callbacks
    const isActive = useCallback((path: string) => pathname === path, [pathname]);

    const handleLogout = useCallback(() => {
        logout();
        setNotifications([]);
        setIsAuthenticated(false);
        router.push('/');
    }, [logout, router, setIsAuthenticated]);

    // Effects
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

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

    if (!mounted || loading) {
        return <SkeletonNavigation />;
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
                        <nav className="hidden md:flex items-center gap-4">
                            <Link
                                href="/"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                خانه
                            </Link>


                            <Link
                                href="/services"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/services') ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                خدمات
                            </Link>
                            <Link
                                href="/consultants"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/consultants') ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                              مشاورین
                            </Link>
                            <Link
                                href="/specialists"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/specialists') ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                متخصصین
                            </Link>
                            <Link
                                href="/blog"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/blog') ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                بلاگ
                            </Link>
                            <Link
                                href="/about"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                درباره ما
                            </Link>

                            <Link
                                href="/contact"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                تماس با ما
                            </Link>

                            <Link
                                href="/tradeyar"
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/tradeyar') ? 'text-primary' : 'text-muted-foreground'
                                    } py-1 px-2 bg-red-400 rounded text-white`}
                            >
                                ترید یار
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <Link href="/dashboard" className="flex items-center justify-end gap-2 w-24 cursor-pointer py-3 px-3">
                                    داشبورد
                                </Link>

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
                                                        className={`p-4 border-b text-left ${notification.read ? 'bg-muted/50' : 'bg-background'
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
                                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/login') ? 'text-primary' : 'text-muted-foreground'
                                        }`}
                                >
                                    ورود
                                </Link>
                                <Link
                                    href="/signup"
                                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/signup') ? 'text-primary' : 'text-muted-foreground'
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
                        <SheetContent side="right" className="w-[280px] sm:w-[300px] p-0 [&>button]:hidden">
                            <SheetTitle className="sr-only">ولت یار</SheetTitle>
                            <div className="flex flex-col h-full">
                                <div className="p-4 border-b flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">ولت یار</h2>
                                    <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">بستن منو</span>
                                    </SheetClose>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    <nav className="flex flex-col space-y-1 p-4">
                                        <Link
                                            href="/"
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/')
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-accent'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <HomeIcon className="h-5 w-5" />
                                            <span>خانه</span>
                                        </Link>
                                        <Link
                                            href="/services"
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/services')
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-accent'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Briefcase className="h-5 w-5" />
                                            <span>خدمات</span>
                                        </Link>
                                        <Link
                                            href="/consultants"
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/consultants')
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-accent'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <User className="h-5 w-5" />
                                            <span>متخصصین</span>
                                        </Link>
                                        <Link
                                            href="/specialists"
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/specialists')
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-accent'
                                                }`}
                                        >
                                            <User className="h-5 w-5" />
                                            <span>مشاورین</span>
                                        </Link>
                                        <Link
                                            href="/blog"
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/blog')
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-accent'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <MessageSquare className="h-5 w-5" />
                                            <span>بلاگ</span>
                                        </Link>
                                        <Link
                                            href="/about"
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/about')
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-accent'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Info className="h-5 w-5" />
                                            <span>درباره ما</span>
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/contact')
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-accent'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Phone className="h-5 w-5" />
                                            <span>تماس با ما</span>
                                        </Link>
                                        <Link
                                            href="/tradeyar"
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/tradeyar')
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-accent'
                                                } `}
                                        >
                                            <span className="bg-red-400 text-white py-1 px-2 rounded">ترید یار</span>
                                        </Link>
                                    </nav>
                                </div>
                                {isAuthenticated ? (
                                    <div className="p-4 border-t">
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <UserIcon className="h-5 w-5" />
                                            <span>داشبورد</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
                                            }}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-red-500"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            <span>خروج</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4 border-t">
                                        <Link
                                            href="/login"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <LogIn className="h-5 w-5" />
                                            <span>ورود</span>
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <UserPlus className="h-5 w-5" />
                                            <span>ثبت‌نام</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
