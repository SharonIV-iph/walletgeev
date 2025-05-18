'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card';
import { UserIcon, ChatBubbleLeftIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';

interface Specialist {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  imageUrl: string;
  description: string;
  recommendationCount: number;
  viewCount: number;
  isOnline: boolean;
  address: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  availableTimes: string[];
  education: string[];
  languages: string[];
  services: string[];
}

const SpecialistDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Header Skeleton */}
      <header className="bg-gray-50 dark:bg-gray-800 rounded-b-lg shadow-sm p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Right Column Skeleton */}
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description Skeleton */}
                <div>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Address Skeleton */}
                <div>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Contact Info Skeleton */}
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>

                {/* Available Times Skeleton */}
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>

                {/* Education Skeleton */}
                <div>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                </div>

                {/* Services Skeleton */}
                <div>
                  <Skeleton className="h-5 w-40 mb-2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Left Column Skeleton */}
          <div className="md:col-span-1">
            <nav className="flex items-center gap-2 mb-6">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-48" />
            </nav>

            <div className="flex flex-col gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function SpecialistDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { get, loading, error } = useApi();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);

  useEffect(() => {
    const fetchSpecialist = async () => {
      const response = await get<Specialist>(`/specialists/${params.id}`);
      if (response) {
        setSpecialist(response.data);
      }
    };

    if (params.id) {
      fetchSpecialist();
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

  if (loading || !specialist) {
    return <SpecialistDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gray-50 dark:bg-gray-800 rounded-b-lg shadow-sm p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 relative">
              <AvatarImage src={specialist.imageUrl} alt={specialist.name} />
              <AvatarFallback>{specialist.name[0]}</AvatarFallback>
              {specialist.isOnline && (
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800" />
              )}
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{specialist.name}</h1>
              <p className="text-muted-foreground">{specialist.expertise}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>کد: {specialist.id}</span>
            <span className="text-green-600">نظرات: {specialist.recommendationCount} 👍</span>
            <span>{specialist.rating} ⭐</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Right Column */}
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <h2 className="text-xl font-semibold">درباره مشاور</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">توضیحات</h3>
                  <p className="text-muted-foreground">{specialist.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">آدرس</h3>
                  <p className="text-muted-foreground">{specialist.address}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">اطلاعات تماس</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>تلفن: {specialist.contactInfo.phone}</p>
                    <p>ایمیل: {specialist.contactInfo.email}</p>
                    <p>وبسایت: {specialist.contactInfo.website}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">ساعات کاری</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {specialist.availableTimes.map((time, index) => (
                      <li key={index}>{time}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">تحصیلات</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {specialist.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">خدمات ارائه شده</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {specialist.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Left Column */}
          <div className="md:col-span-1">
            <nav className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-primary"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
              <span className="text-muted-foreground">
                صفحه اصلی &gt; جزئیات &gt; نمایش
              </span>
            </nav>

            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push(`/specialists/${specialist.id}/profile`)}
              >
                <UserIcon className="h-5 w-5 text-white" />
                مشاهده پروفایل
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push(`/specialists/${specialist.id}/chat`)}
              >
                <ChatBubbleLeftIcon className="h-5 w-5" />
                متن پیام
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.location.href = `tel:${specialist.contactInfo.phone}`}
              >
                <PhoneIcon className="h-5 w-5" />
                تماس
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
