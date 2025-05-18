'use client';

import { useRouter } from 'next/navigation';
import { Star, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';

import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import SearchModal from '@/components/SearchModal';

import { Specialist } from '@/types/specialist';

// Skeleton Components
const SpecialistCardSkeleton = () => (
    <Card className="overflow-hidden">
        <div className="relative h-48">
            <Skeleton className="w-full h-full" />
        </div>
        <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5 mr-1" />
                ))}
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
        </CardContent>
        <CardFooter>
            <Skeleton className="h-10 w-full" />
        </CardFooter>
    </Card>
);

const HeaderSkeleton = () => (
    <div className="bg-gradient-to-r from-walletyar-primary to-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
            <div className="text-center mb-8">
                <Skeleton className="h-10 w-48 mx-auto mb-4" />
                <Skeleton className="h-6 w-72 mx-auto" />
            </div>
            <div className="max-w-2xl mx-auto">
                <Skeleton className="h-14 w-full rounded-full" />
            </div>
        </div>
    </div>
);

export default function Specialists() {
    //TODO: handle best pagination

    const router = useRouter();
    const api = useApi();
    const [specialists, setSpecialists] = useState<Specialist[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalSpecialists, setTotalSpecialists] = useState(0);
    const specialistsPerPage = 5;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearchOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<Specialist[]>(`/specialists?_page=${currentPage}&_limit=${specialistsPerPage}`);
                console.log('API Response:', response); // Debug log

                if (response?.data) {
                    setSpecialists(response.data || []);
                    setTotalSpecialists(20); // Since we don't have total from API, using a default value
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setSpecialists([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const totalPages = Math.ceil(totalSpecialists / specialistsPerPage);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background text-foreground rtl" dir="rtl">
                <HeaderSkeleton />
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, index) => (
                            <SpecialistCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground rtl" dir="rtl">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-walletyar-primary to-purple-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">متخصصین ما</h1>
                        <p className="text-xl text-white/80">با بهترین متخصص ها در خدمت دارایی شما هستیم</p>
                    </div>

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

            {/* Specialists Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {specialists?.length > 0 ? (
                        specialists.map((specialist) => (
                            <Card key={specialist.id} className="overflow-hidden">
                                <div className="relative h-48">
                                    <img
                                        src={specialist.imageUrl}
                                        alt={specialist.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-foreground">{specialist.name}</CardTitle>
                                    <CardDescription className="text-muted-foreground">{specialist.expertise}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(specialist.rating)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-muted-foreground'
                                                    }`}
                                            />
                                        ))}
                                        <span className="mr-2 text-muted-foreground">{specialist.rating}</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{specialist.description}</p>
                                </CardContent>

                                <CardFooter>
                                    <Button className="w-full text-white" onClick={() => router.push(`/specialists/${specialist.id}`)}>
                                        مشاهده پروفایل
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-muted-foreground">هیچ متخصصی یافت نشد</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 0 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="icon"
                                onClick={() => paginate(page)}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            <SearchModal
                isOpen={isSearchOpen}
                onOpenChange={setIsSearchOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
            />
        </main>
    );
}
