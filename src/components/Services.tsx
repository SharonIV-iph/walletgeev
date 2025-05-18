'use client';

import React from 'react';
import { Service, ServicesProps } from '@/types/components';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';

const ServiceSkeleton = () => {
    return (
        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-sm">
            <div className="mb-4 p-3 bg-walletyar-secondary/10 rounded-full">
                <Skeleton className="w-12 h-12 rounded-full" />
            </div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
        </div>
    );
};

export default function Services({ services, isLoading = false }: ServicesProps & { isLoading?: boolean }) {
    if (isLoading) {
        return (
            <section className="py-16">
                <div className="text-center mb-12">
                    <Skeleton className="h-8 w-48 mx-auto mb-4" />
                    <Skeleton className="h-4 w-64 mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, index) => (
                        <ServiceSkeleton key={index} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">خدمات ما</h2>
                <p className="text-muted-foreground">
                    ارائه خدمات متخصصی با بالاترین استانداردها
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                    <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:bg-accent transition-colors border shadow-sm hover:shadow-md"
                    >
                        <div className="mb-4 p-3 bg-walletyar-secondary/10 rounded-full">
                            <div className="relative w-12 h-12">
                                <Image
                                    src={service.iconUrl}
                                    alt={service.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {service.title}
                        </h3>
                        <p className="text-muted-foreground">{service.shortDescription}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
