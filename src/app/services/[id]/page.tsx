'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';

interface Service {
    id: string;
    iconUrl: string;
    title: string;
    description: string;
    consultants: {
        id: string;
        name: string;
        expertise: string;
        rating: number;
        imageUrl: string;
        description: string;
    }[];
}

const ServiceDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-background dark:bg-gray-900">
            {/* Header Image Skeleton */}
            <div className="relative w-full h-64 md:h-96">
                <Skeleton className="w-full h-full" />
                <div className="absolute inset-0 flex items-end justify-start pb-5">
                    <Skeleton className="h-12 w-64 mx-4" />
                </div>
            </div>

            {/* Main Content Skeleton */}
            <main className="container mx-auto py-8">
                <div className="flex flex-col gap-8">
                    {/* Service Details Card Skeleton */}
                    <Card className="shadow-lg dark:bg-gray-800">
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Skeleton className="h-5 w-24 mb-4" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Related Consultants Skeleton */}
                    <Card className="shadow-lg dark:bg-gray-800">
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4">
                                        <Skeleton className="h-16 w-16 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-16" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default function ServiceDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { get, loading, error } = useApi();
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        const fetchService = async () => {
            const response = await get<Service>(`/services/${params.id}`);
            if (response?.data) {
                setService(response.data);
            }
        };

        if (params.id) {
            fetchService();
        }
    }, [params.id, get]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">خطا در بارگذاری اطلاعات</h1>
                <Button onClick={() => router.back()}>بازگشت</Button>
            </div>
        );
    }

    if (loading || !service) {
        return <ServiceDetailSkeleton />;
    }

    return (
        <div className="min-h-screen bg-background dark:bg-gray-900">
            {/* Header Image */}
            <div className="relative w-full h-64 md:h-96">
                <Image
                    src={service.iconUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-end justify-start pb-5">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                        {service.title}
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto py-8">
                <div className="flex flex-col gap-8">
                    {/* Right Column */}
                    <div className="w-full">
                        <Card className="shadow-lg dark:bg-gray-800">
                            <CardHeader>
                                <h2 className="text-xl font-semibold dark:text-white">جزئیات خدمت</h2>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-2 dark:text-white">توضیحات</h3>
                                    <div
                                        className="text-muted-foreground dark:text-gray-300 prose dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: service.description }}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Consultants */}
                        <Card className="shadow-lg dark:bg-gray-800 mt-8">
                            <CardHeader>
                                <h2 className="text-xl font-semibold dark:text-white">متخصصین مرتبط</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {service.consultants.map((consultant) => (
                                        <Link
                                            key={consultant.id}
                                            href={`/consultants/${consultant.id}`}
                                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent transition-colors"
                                        >
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src={consultant.imageUrl} alt={consultant.name} />
                                                <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg dark:text-white">{consultant.name}</h3>
                                                <p className="text-sm text-muted-foreground dark:text-gray-300">
                                                    {consultant.expertise}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="text-sm text-muted-foreground dark:text-gray-300">
                                                        {consultant.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
