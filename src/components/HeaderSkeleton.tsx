'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function HeaderSkeleton() {
    return (
        <header className="bg-gradient-to-r from-walletyar-primary to-purple-800 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between py-20">
                    {/* Text Content Skeleton */}
                    <div className="text-center md:text-right md:w-1/2 mb-8 md:mb-0">
                        <Skeleton className="h-12 w-3/4 mb-4 bg-white/20" />
                        <Skeleton className="h-6 w-1/2 mb-8 bg-white/20" />

                        {/* Buttons Skeleton */}
                        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mb-8">
                            <Skeleton className="h-14 w-48 bg-white/20" />
                            <Skeleton className="h-14 w-48 bg-white/20" />
                        </div>

                        {/* Search Section Skeleton */}
                        <div className="max-w-2xl mx-auto">
                            <Skeleton className="h-14 w-full rounded-full bg-white/20" />
                        </div>
                    </div>

                    {/* Vector Image Skeleton */}
                    <div className="md:w-1/2 flex justify-center">
                        <Skeleton className="w-full max-w-md h-[400px] bg-white/20" />
                    </div>
                </div>
            </div>
        </header>
    );
}
