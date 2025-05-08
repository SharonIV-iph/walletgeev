'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/registry/new-york-v4/ui/input";
import { Textarea } from "@/registry/new-york-v4/ui/textarea";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card } from "@/registry/new-york-v4/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactFormData } from '@/types/forms';

const ContactSkeleton = () => {
    return (
        <main>
            <div className="relative">
                <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                    <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                        <Skeleton className="h-10 w-48 mx-auto mb-8" />
                        <div className="flex items-center justify-between flex-col lg:flex-row-reverse px-8">
                            <div className="w-full lg:w-1/2">
                                <div className="w-full max-w-md mx-auto">
                                    <Skeleton className="h-10 w-full mb-4" />
                                    <Skeleton className="h-10 w-full mb-4" />
                                    <Skeleton className="h-32 w-full mb-4" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                                <Card className="p-6">
                                    <div className="text-center">
                                        <Skeleton className="h-8 w-32 mx-auto mb-4" />
                                        <Skeleton className="h-4 w-48 mx-auto mb-4" />
                                        <Skeleton className="h-4 w-48 mx-auto mb-4" />
                                        <Skeleton className="h-4 w-48 mx-auto mb-4" />
                                        <Skeleton className="h-4 w-48 mx-auto" />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default function ContactUs() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (isLoading) {
        return <ContactSkeleton />;
    }

    return (
        <main>
            <div className="relative">
                <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                    <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">تماس با ما</h1>
                        <div className="flex items-center justify-between flex-col lg:flex-row-reverse px-8">
                            <div className="w-full lg:w-1/2">
                                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="نام شما"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="mb-4"
                                    />
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="ایمیل شما"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="mb-4"
                                    />
                                    <Textarea
                                        name="message"
                                        placeholder="پیام شما"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="mb-4 h-32"
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full"
                                    >
                                        ارسال پیام
                                    </Button>
                                </form>
                            </div>
                            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                                <Card className="p-6">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold mb-4 text-foreground">موقعیت ما</h2>
                                        <p className="mb-4 text-muted-foreground">خیابان هتل، پلاک ۱۲۳</p>
                                        <p className="mb-4 text-muted-foreground">شهر، کشور</p>
                                        <p className="mb-4 text-muted-foreground">تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
                                        <p className="text-muted-foreground">ایمیل: info@hotel.com</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}