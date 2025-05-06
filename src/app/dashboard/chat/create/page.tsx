'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import dynamic from 'next/dynamic';

interface ChatResponse {
    id: string;
    uuid: string;
    name: string;
    assigned: Array<{
        id: string;
        name: string;
        imageUrl: string;
    }>;
}

function CreateConsultationPage() {
    const [problemDescription, setProblemDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { post, loading: apiLoading } = useApi();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await post<ChatResponse>('/chats',
                {
                    discription: problemDescription,
                    status: 'active',
                    created_at: new Date().toISOString(),
                    assigned: [
                        {
                            id: "1",
                            name: "متخصص علی محمدی",
                            imageUrl: "/images/consultants/consultant.png"
                        },
                        {
                            id: "2",
                            name: "متخصص علی محمدی",
                            imageUrl: "/images/consultants/consultant.png"
                        }
                    ]
                }
            );

            if (response) {
                console.log(response);
                router.push(`/dashboard/chat/${response.data.id}`);
            }
        } catch (error) {
            console.error('Error creating consultation:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6" dir="rtl">
            <h1 className="text-2xl font-bold mb-6 text-left">شروع مشاوره جدید</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="problem" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                        توضیح مشکل خود را بنویسید
                    </label>
                    <textarea
                        id="problem"
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left placeholder:text-right"
                        rows={6}
                        placeholder="لطفاً مشکل خود را به طور خلاصه توضیح دهید..."
                        required
                        dir="rtl"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !problemDescription.trim() || apiLoading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium ${isSubmitting || !problemDescription.trim() || apiLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isSubmitting || apiLoading ? 'در حال ارسال...' : 'شروع مشاوره'}
                </button>
            </form>
        </div>
    );
}

export default dynamic(() => Promise.resolve(CreateConsultationPage), { ssr: false });
