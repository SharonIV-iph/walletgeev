'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';

interface Message {
    sender_id: string;
    message: string;
    created_at: string;
}

interface ChatResponse {
    id: string;
    uuid: string;
    name: string;
    discription: string;
    status: 'active' | 'closed';
    assigned: Array<{
        id: string;
        name: string;
        imageUrl: string;
    }>;
    messages: Message[];
}

function ChatDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { get, put, patch, loading: apiLoading } = useApi();
    const [chat, setChat] = useState<ChatResponse | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            const fetchChat = async () => {
                try {
                    setIsLoading(true);
                    const response = await get<ChatResponse>(`/chats/${params.id}`);
                    if (response) {
                        setChat(response.data);
                    } else {
                        // If chat not found, redirect to create page
                        router.push('/dashboard/chat/create');
                    }
                } catch (error) {
                    console.error('Error fetching chat:', error);
                    router.push('/dashboard/chat/create');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchChat();
        }
    }, [params.id, get, router]);

    const handleCloseChat = async () => {
        if (!chat) return;

        try {
            const response = await put<ChatResponse>(`/chats/${chat.id}`, {
                ...chat,
                status: 'closed'
            });

            if (response) {
                setChat(response.data);
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error closing chat:', error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !chat) return;

        setIsSending(true);
        try {
            const newMessageObj = {
                sender_id: 'user',
                message: newMessage.trim(),
                created_at: new Date().toISOString()
            };

            // Initialize messages array if it's undefined
            const currentMessages = chat.messages || [];

            console.log('Sending message:', {
                chatId: chat.id,
                newMessage: newMessageObj,
                currentMessages: currentMessages
            });

            // Update UI optimistically first
            setChat(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    messages: [...(prev.messages || []), newMessageObj]
                };
            });
            setNewMessage('');

            // Then try to update the server
            const response = await put<ChatResponse>(`/chats/${chat.id}`, {
                ...chat,
                messages: [...currentMessages, newMessageObj]
            });

            console.log('Response:', response);

            if (response && response.data) {
                setChat(response.data);
            } else {
                console.error('Failed to send message: Server returned null');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    if (isLoading || apiLoading || !chat) {
        return (
            <div className="max-w-4xl mx-auto p-6" dir="rtl">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    {/* Chat Header Skeleton */}
                    <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                        <div className="space-y-2">
                            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    {/* Chat Messages Skeleton */}
                    <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className={`flex items-start gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                {index % 2 === 0 ? null : (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                )}
                                <div className={`max-w-[70%] rounded-lg p-3 ${index % 2 === 0
                                    ? 'bg-gray-200 dark:bg-gray-700'
                                    : 'bg-gray-100 dark:bg-gray-700'
                                    }`}>
                                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-2"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input Skeleton */}
                    <div className="p-4 border-t dark:border-gray-700">
                        <div className="flex space-x-2">
                            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Consultants List Skeleton */}
                <div className="mt-6">
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
                                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6" dir="rtl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                {/* Chat Header */}
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{chat.name}</h1>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{chat.discription}</p>

                    </div>
                    {chat.status === 'active' && (
                        <button
                            onClick={handleCloseChat}
                            className="flex items-center gap-2 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <X size={20} />
                            <span>بستن چت</span>
                        </button>
                    )}
                    {chat.status === 'closed' && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">پرونده بسته شده</p>
                    )}
                </div>

                {/* Chat Messages */}
                <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                    {chat.messages && chat.messages.length > 0 ? (
                        chat.messages.map((message, index) => {
                            const consultant = message.sender_id !== 'user'
                                ? chat.assigned.find(c => c.id === message.sender_id)
                                : null;

                            return (
                                <div
                                    key={index}
                                    className={`flex items-start gap-2 ${message.sender_id === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {consultant && (
                                        <img
                                            src={consultant.imageUrl}
                                            alt={consultant.name}
                                            className="w-8 h-8 rounded-full mt-1"
                                        />
                                    )}
                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 ${message.sender_id === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                            }`}
                                    >
                                        <p className="text-sm">{message.message}</p>
                                        <span className="text-xs opacity-70 mt-1 block">
                                            {new Date(message.created_at).toLocaleString('fa-IR')}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col justify-center items-center h-full text-gray-500 dark:text-gray-400 space-y-4">
                            <p>هنوز پیامی در این گفتگو وجود ندارد</p>
                            {chat.status === 'active' && (
                                <p className="text-sm text-gray-400 dark:text-gray-500">شما می‌توانید اولین پیام را ارسال کنید</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Chat Input - Only show for active chats */}
                {chat.status === 'active' && (
                    <div className="p-4 border-t dark:border-gray-700">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="پیام خود را بنویسید..."
                                className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                dir="rtl"
                                disabled={isSending}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSending || !newMessage.trim()}
                            >
                                {isSending ? 'در حال ارسال...' : 'ارسال'}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Consultants List */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">مشاوران یا متخصصین مربوطه</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {chat.assigned.map((consultant) => (
                        <div key={consultant.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <img
                                src={consultant.imageUrl}
                                alt={consultant.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <span className="font-medium text-gray-900 dark:text-white">{consultant.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatDetailPage;
