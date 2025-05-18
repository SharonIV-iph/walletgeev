'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Specialist } from '@/types/specialist';
import { FeaturedSpecialistsProps } from '@/types/components';

const FeaturedSpecialists: React.FC<FeaturedSpecialistsProps> = ({ specialists }) => {
    const router = useRouter();

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">متخصصین برجسته</h2>
                <p className="text-muted-foreground">با تجربه‌ترین و متخصص‌ترین متخصصین در خدمت شما</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {specialists.map((specialist) => (
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
                ))}
            </div>
        </section>
    );
};

export default FeaturedSpecialists;
