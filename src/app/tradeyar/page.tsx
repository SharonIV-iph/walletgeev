'use client';

import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card';
import Image from 'next/image';

export default function ServiceDetailPage() {
    return (
        <div className="min-h-screen bg-background dark:bg-gray-900">
            {/* Header Image */}
            <div className="relative w-full h-64 md:h-96">
                <Image
                    src="/images/services/calendar.png"
                    alt="tradeyar-banner"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-end justify-start pb-5">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                        ترید یار - دستیار هوشمند ترید
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
                                        dangerouslySetInnerHTML={{ __html: `
                                            <h2>به زودی ...</h2>
                                            ` }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
