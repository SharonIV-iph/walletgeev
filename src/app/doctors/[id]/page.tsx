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

interface Doctor {
  id: string;
  name: string;
  specialty: string;
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
  insurances: string[];
}

export default function DoctorDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { get, loading, error } = useApi();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const response = await get<Doctor>(`/doctors/${params.id}`);
      if (response) {
        setDoctor(response.data);
      }
    };

    if (params.id) {
      fetchDoctor();
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
  if (loading || !doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gray-50 dark:bg-gray-800 rounded-b-lg shadow-sm p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 relative">
              <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
              <AvatarFallback>{doctor.name[0]}</AvatarFallback>
              {doctor.isOnline && (
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800" />
              )}
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{doctor.name}</h1>
              <p className="text-muted-foreground">{doctor.specialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>کد: {doctor.id}</span>
            <span className="text-green-600">نظرات: {doctor.recommendationCount} 👍</span>
            <span>{doctor.rating} ⭐</span>
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
                <h2 className="text-xl font-semibold">درباره پزشک</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">توضیحات</h3>
                  <p className="text-muted-foreground">{doctor.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">آدرس</h3>
                  <p className="text-muted-foreground">{doctor.address}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">اطلاعات تماس</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>تلفن: {doctor.contactInfo.phone}</p>
                    <p>ایمیل: {doctor.contactInfo.email}</p>
                    <p>وبسایت: {doctor.contactInfo.website}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">ساعات کاری</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {doctor.availableTimes.map((time, index) => (
                      <li key={index}>{time}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">تحصیلات</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {doctor.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">بیمه‌های طرف قرارداد</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {doctor.insurances.map((insurance, index) => (
                      <li key={index}>{insurance}</li>
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
                onClick={() => router.push(`/doctors/${doctor.id}/profile`)}
              >
                <UserIcon className="h-5 w-5" />
                مشاهده پروفایل
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push(`/doctors/${doctor.id}/chat`)}
              >
                <ChatBubbleLeftIcon className="h-5 w-5" />
                متن پیام
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.location.href = `tel:${doctor.contactInfo.phone}`}
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