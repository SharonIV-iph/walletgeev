'use client';

import React, { Suspense } from 'react';
import { Card } from "@/registry/new-york-v4/ui/card";
import { Button } from "@/registry/new-york-v4/ui/button";
import Link from 'next/link';

const NotFoundContent: React.FC = () => {
    return (
        <main>
            <div className="relative">
                <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                    <div className="max-w-md mx-auto text-center">
                        <Card className="p-8">
                            <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
                            <p className="text-xl text-muted-foreground mb-8">صفحه مورد نظر یافت نشد</p>
                            <Link href="/">
                                <Button className="w-full">
                                    بازگشت به صفحه اصلی
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default function NotFound() {
    return (
        <Suspense fallback={
            <main>
                <div className="relative">
                    <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                        <div className="max-w-md mx-auto text-center">
                            <Card className="p-8">
                                <div className="h-8 w-24 bg-muted animate-pulse rounded-md mx-auto mb-4" />
                                <div className="h-6 w-48 bg-muted animate-pulse rounded-md mx-auto mb-8" />
                                <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        }>
            <NotFoundContent />
        </Suspense>
    );
}
