'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Consultant } from '@/types/consultant';
import { FeaturedConsultantsProps } from '@/types/components';

const FeaturedConsultants: React.FC<FeaturedConsultantsProps> = ({ consultants }) => {
    const router = useRouter();

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">مشاورین برجسته</h2>
                <p className="text-muted-foreground">با تجربه‌ترین و متخصص‌ترین مشاور ها در خدمت شما</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {consultants.map((consultant) => (
                    <Card key={consultant.id} className="overflow-hidden">
                        <div className="relative h-48">
                            <img
                                src={consultant.imageUrl}
                                alt={consultant.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-foreground">{consultant.name}</CardTitle>
                            <CardDescription className="text-muted-foreground">{consultant.expertise}</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(consultant.rating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-muted-foreground'
                                            }`}
                                    />
                                ))}
                                <span className="mr-2 text-muted-foreground">{consultant.rating}</span>
                            </div>
                            <p className="text-muted-foreground text-sm">{consultant.description}</p>
                        </CardContent>

                        <CardFooter>
                            <Button className="w-full  bg-walletyar-purple text-white hover:bg-walletyar-purple/90" onClick={() => router.push(`/consultants/${consultant.id}`)}>
                                مشاهده پروفایل
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeaturedConsultants;
