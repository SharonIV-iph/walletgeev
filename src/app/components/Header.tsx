'use client';

import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import SearchModal from './SearchModal';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

//

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const handleSearch = () => {
        // Handle search logic here
        console.log('Searching for:', searchQuery);
    };

    return (
        <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between py-20">
                    {/* Text Content */}
                    <div className="text-center md:text-right md:w-1/2 mb-8 md:mb-0">
                        <h2 className="text-4xl font-bold mb-4">ولت یار از مشاوره تا حل مشکلات بلاکچینی شما</h2>
                        <p className="text-xl mb-8">با بهترین متخصص ها در خدمت دارایی شما هستیم</p>

                        {/* Buttons */}
                        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mb-8">
                            {isAuthenticated ? (
                                <>
                                    <Button
                                        size="lg"
                                        className="bg-white text-purple-600 hover:bg-white/90 px-8 py-6 text-lg font-bold"
                                    >
                                        شروع مشاوره
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="bg-background/10 hover:bg-background/20 border-white text-white px-8 py-6 text-lg font-bold"
                                        onClick={() => router.push('/dashboard')}
                                    >
                                        داشبورد
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    size="lg"
                                    className="bg-white text-purple-600 hover:bg-white/90 px-8 py-6 text-lg font-bold"
                                    onClick={() => router.push('/signup')}
                                >
                                    ثبت نام و شروع مشاوره
                                </Button>
                            )}
                        </div>

                        {/* Search Section */}
                        <div className="max-w-2xl mx-auto">
                            <div
                                onClick={() => setIsSearchOpen(true)}
                                className="relative cursor-pointer bg-background/10 backdrop-blur-sm rounded-full p-2 transition-colors hover:bg-background/20"
                            >
                                <div className="flex items-center justify-between py-3 px-4">
                                    <span className="text-white/90">جستجو در بین متخصصین و خدمات...</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white/90 hover:text-white hover:bg-background/20"
                                    >
                                        <Search className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vector Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <Image
                            src="/images/hero-vector.png"
                            alt="Hero Vector"
                            width={400}
                            height={400}
                            className="w-full max-w-md"
                        />
                    </div>
                </div>
            </div>
            <SearchModal
                isOpen={isSearchOpen}
                onOpenChange={setIsSearchOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
            />
        </header>
    );
}