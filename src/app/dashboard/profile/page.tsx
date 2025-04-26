'use client';

import { Home, MessageSquare, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/teal.css"
import type { DateObject } from "react-multi-date-picker";
import { useTheme } from "next-themes";

const navItems = [
    { icon: Home, label: 'داشبورد', href: '/dashboard' },
    { icon: MessageSquare, label: 'پرونده ها', href: '/dashboard/messages' },
    { icon: User, label: 'پروفایل', href: '/dashboard/profile' },
];

export default function ProfilePage() {
    const pathname = usePathname();
    const { theme } = useTheme();

    const [formData, setFormData] = useState({
        firstName: 'سمیرا',
        lastName: 'حیدری کیا',
        email: 's.heydari@example.com',
        phone: '۰۹۱۲۳۴۵۶۷۸۹',
        birthDate: null as DateObject | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add form submission logic
        console.log('Form submitted:', formData);
    };

    return (
        <main className="p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">پروفایل کاربری</h2>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">

                    {/* Profile Information */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    نام
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    نام خانوادگی
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                ایمیل
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                شماره تماس
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                تاریخ تولد
                            </label>
                            <DatePicker
                                value={formData.birthDate}
                                onChange={(date: DateObject | null) => setFormData(prev => ({ ...prev, birthDate: date }))}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                inputClass="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                                containerClassName="w-full"
                                format="YYYY/MM/DD"
                                placeholder="تاریخ تولد را انتخاب کنید"
                                className={theme === 'dark' ? "bg-dark" : "teal"}
                                shadow={false}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-end gap-4">

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-primary dark:text-black text-white hover:bg-primary/90 dark:bg-primary/80 dark:hover:bg-primary/70 transition-colors"
                        >
                            ذخیره تغییرات
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
} 