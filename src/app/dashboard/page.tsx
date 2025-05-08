'use client';

import { Home, MessageSquare, User, Plus as PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/new-york-v4/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import { useApi } from '@/hooks/useApi';
import { Consultation } from '@/types/consultant';
import { useRouter } from 'next/navigation';
import { Input } from "@/registry/new-york-v4/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select";
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton";
import { Button } from "@/registry/new-york-v4/ui/button";

const ConsultationSkeleton = () => (
    <div className="p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                    {[1, 2].map((i) => (
                        <Skeleton key={i} className="h-10 w-10 rounded-full" />
                    ))}
                </div>
                <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
        <Skeleton className="h-4 w-full mt-2" />
    </div>
);

export default function MessagesPage() {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { get, loading, error } = useApi();
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isSearching, setIsSearching] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await get<Consultation[]>('/chats');
                if (response) {
                    console.log('Consultations data:', response.data);
                    const transformedData = response.data.map(chat => ({
                        ...chat,
                        created_at: chat.created_at || new Date().toISOString()
                    }));
                    setConsultations(transformedData);
                }
            } finally {
                setInitialLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchConsultations();
        } else {
            setInitialLoading(false);
        }
    }, [isAuthenticated, get]);

    // Add debounced search effect
    useEffect(() => {
        setIsSearching(true);
        const timer = setTimeout(() => {
            setIsSearching(false);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery, statusFilter]);

    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch = searchQuery === '' ||
            consultation.discription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.assigned.some(consultant =>
                consultant.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

        const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const showSkeletons = loading || isSearching || initialLoading;

    return (
        <main className="p-8" dir="rtl">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">پرونده‌ها و پیام‌ها</h2>
                    <Button variant="outline" onClick={() => router.push('/dashboard/chat/create')}>
                        <PlusIcon className="w-4 h-4 mr-2" />
                        پرونده جدید
                    </Button>
                </div>

                {/* Search and Filter */}
                <div className="mb-6 flex gap-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="وضعیت پرونده" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">همه پرونده‌ها</SelectItem>
                            <SelectItem value="active">پرونده‌های فعال</SelectItem>
                            <SelectItem value="closed">پرونده‌های بسته شده</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        type="text"
                        placeholder="جستجو در پرونده‌ها..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                    />
                </div>

                {/* Messages List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {showSkeletons ? (
                            <>
                                <ConsultationSkeleton />
                                <ConsultationSkeleton />
                                <ConsultationSkeleton />
                            </>
                        ) : error ? (
                            <div className="text-center text-red-500 dark:text-red-400 p-4">
                                {error.message}
                            </div>
                        ) : filteredConsultations.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                                {searchQuery || statusFilter ? 'نتیجه‌ای یافت نشد' : 'پرونده‌ای وجود ندارد'}
                            </div>
                        ) : (
                            filteredConsultations.map((consultation) => {
                                const date = new Date(consultation.created_at);
                                const isValidDate = !isNaN(date.getTime());

                                return (
                                    <div
                                        key={consultation.id}
                                        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                                        onClick={() => router.push(`/dashboard/chat/${consultation.id}`)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex -space-x-2">
                                                    {(consultation.assigned || []).map((consultant, index) => (
                                                        <Avatar key={consultant.id} className="h-10 w-10 border-2 border-white dark:border-gray-800">
                                                            <AvatarImage src={consultant.imageUrl} alt={consultant.name} />
                                                            <AvatarFallback>{consultant.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                    ))}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800 dark:text-white">{consultation.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {(consultation.assigned || []).map(consultant => consultant.name).join('، ')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-2 py-1 text-xs rounded-full ${consultation.status === 'active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                    }`}>
                                                    {consultation.status === 'active' ? 'فعال' : 'بسته شده'}
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {isValidDate
                                                        ? date.toLocaleDateString('fa-IR', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })
                                                        : 'بدون تاریخ'}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                            {consultation.discription || 'بدون توضیح'}
                                        </p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
