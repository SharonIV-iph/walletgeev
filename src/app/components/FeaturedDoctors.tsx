'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Button } from '@/registry/new-york-v4/ui/button';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  description: string;
}

interface FeaturedDoctorsProps {
  doctors: Doctor[];
}

export default function FeaturedDoctors({ doctors }: FeaturedDoctorsProps) {
  const router = useRouter();
  
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">پزشکان برجسته</h2>
        <p className="text-muted-foreground">با تجربه‌ترین و متخصص‌ترین پزشکان در خدمت شما</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">{doctor.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{doctor.specialty}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(doctor.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="mr-2 text-muted-foreground">{doctor.rating}</span>
              </div>
              <p className="text-muted-foreground text-sm">{doctor.description}</p>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full" onClick={() => router.push(`/doctors/${doctor.id}`)}>
                مشاهده پروفایل
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
} 