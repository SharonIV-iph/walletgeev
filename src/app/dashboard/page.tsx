'use client';

import React, { useEffect, useState } from 'react';
import { Bell, LogOut, Home, Calendar, User, Settings, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/new-york-v4/ui/avatar";
import { Card } from "@/registry/new-york-v4/ui/card";
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area";
import { useAuth } from '@/hooks/useAuth';
import { useApi } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';

interface Doctor {
  id: string;
  name: string;
  imageUrl: string;
}

interface Consultation {
  id: string;
  uuid: string;
  name: string;
  assigned: Doctor[];
}

interface Notification {
  id: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { get, loading, error } = useApi();
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      message: 'مشاوره شما با دکتر رضایی تأیید شد',
      time: '۱۵ دقیقه پیش',
      isRead: false,
    },
    {
      id: '2',
      message: 'زمان مشاوره با دکتر محمدی فردا ساعت ۱۵:۰۰ است',
      time: '۱ ساعت پیش',
      isRead: true,
    },
  ]);

  useEffect(() => {
    const fetchConsultations = async () => {
      const response = await get<Consultation[]>('/chats');
      if (response) {
        setConsultations(response.data);
      }
    };

    if (isAuthenticated) {
      fetchConsultations();
    }
  }, [isAuthenticated, get]);

  const navItems = [
    { icon: Home, label: 'داشبورد', href: '/dashboard' },
    { icon: Calendar, label: 'نوبت‌ها', href: '/dashboard/appointments' },
    { icon: MessageSquare, label: 'پیام‌ها', href: '/dashboard/messages' },
    { icon: User, label: 'پروفایل', href: '/dashboard/profile' },
    { icon: Settings, label: 'تنظیمات', href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm h-screen sticky top-0">
        <div className="p-4 flex flex-col h-full">
          {/* User Profile */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">سمیرا حیدری کیا</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 space-x-reverse p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">آخرین مشاوره‌ها</h2>
          <ScrollArea className="h-[400px] pr-4">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 dark:text-red-400 p-4">
                {error.message}
              </div>
            ) : (
              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <button onClick={() => router.push(`/dashboard/chats/${consultation.uuid}`)} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm">
                      مشاهده جزئیات
                    </button>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="text-left">
                        <p className="font-medium text-gray-900 dark:text-white">{consultation.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {consultation.assigned.map(doctor => doctor.name).join('، ')}
                        </p>
                      </div>
                      <div className="flex -space-x-2">
                        {consultation.assigned.map((doctor, index) => (
                          <Avatar key={doctor.id} className="h-12 w-12 border-2 border-white dark:border-gray-800">
                            <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
                            <AvatarFallback>{doctor.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>
      </main>
    </div>
  );
} 