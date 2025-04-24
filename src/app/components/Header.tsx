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
        <div className="py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">به کلینیک تخصصی ما خوش آمدید</h2>
          <p className="text-xl mb-8">با بهترین پزشکان متخصص در خدمت سلامت شما هستیم</p>
          
          <div className="max-w-2xl mx-auto relative cursor-pointer" onClick={() => setIsSearchOpen(true)}>
            <div className='flex justify-center items-center bg-white rounded-full p-2 text-gray-900 py-3 px-4'>
            جستجو در بین پزشکان و خدمات...
            <Button
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
              size="icon"
              
              >
              <Search className="h-5 w-5" />
              </Button>
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