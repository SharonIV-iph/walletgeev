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

//

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log('Searching for:', searchQuery);
    };

    return (
        <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <div className="container mx-auto px-4">

                {/* Hero Section with Search */}
                <div className="py-20 text-center">
                    <h2 className="text-4xl font-bold mb-4">ولت یار از مشاوره تا حل مشکلات بلاکچینی شما</h2>
                    <p className="text-xl mb-8">با بهترین متخصص ها در خدمت دارایی شما هستیم</p>

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