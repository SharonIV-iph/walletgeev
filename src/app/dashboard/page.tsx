'use client';

import { Home, MessageSquare, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/new-york-v4/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import { useApi } from '@/hooks/useApi';
import { Consultation } from '@/types/doctor';
import { useRouter } from 'next/navigation';

export default function MessagesPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { get, loading, error } = useApi();
  const [consultations, setConsultations] = useState<Consultation[]>([]);

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

  return (
    <main className="p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">پرونده‌ها و پیام‌ها</h2>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="جستجو در پرونده‌ها..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
          <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
            <option value="">همه پرونده‌ها</option>
            <option value="active">پرونده‌های فعال</option>
            <option value="closed">پرونده‌های بسته شده</option>
          </select>
        </div>

        {/* Messages List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 dark:text-red-400 p-4">
                {error.message}
              </div>
            ) : (
              consultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => router.push(`/dashboard/chats/${consultation.uuid}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {consultation.assigned.map((doctor, index) => (
                          <Avatar key={doctor.id} className="h-10 w-10 border-2 border-white dark:border-gray-800">
                            <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
                            <AvatarFallback>{doctor.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{consultation.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {consultation.assigned.map(doctor => doctor.name).join('، ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(consultation.createdAt).toLocaleDateString('fa-IR')}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${consultation.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                        {consultation.status === 'active' ? 'فعال' : 'بسته شده'}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {consultation.lastMessage || 'بدون پیام'}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 