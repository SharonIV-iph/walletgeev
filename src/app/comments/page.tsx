'use client';

import React, { useState } from 'react';
import { Input } from "@/registry/new-york-v4/ui/input";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card } from "@/registry/new-york-v4/ui/card";

export default function CommentsPage() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        comment: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: ارسال داده به سرور
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen container flex flex-col md:mt-10 bg-background py-8 px-2 md:px-10">
            <Card className="flex flex-col md:flex-row-reverse w-full shadow-lg overflow-hidden bg-background/90">
                <div className="relative flex-1 p-1 md:pl-8 flex items-center justify-center">
                    <img
                        src="/images/hero-vector21.png"
                        alt="نظر کاربران"
                        className="
                         object-contain rounded-lg shadow-md"
                    />
                    <div className="absolute top-3 md:top-12 left-4 md:left-10 bg-white border border-border rounded-xl px-4 py-2 shadow text-muted-foreground text-sm"
                        style={{ direction: 'rtl', minWidth: 120 }}>
                        نظر خود را با ما به اشتراک بگذارید!
                    </div>
                </div>
                {/* فرم ثبت نظر */}
                <div className="flex-1 flex flex-col justify-center p-6 md:p-10 bg-background">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground text-center md:text-right">
                        اگر انتقاد و پیشنهادی دارید می‌توانید با ما در میان بگذارید
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Input
                                    name="name"
                                    placeholder="نام و نام خانوادگی"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="text-left"
                                />
                            </div>
                            <div className="flex-1">
                                <Input
                                    name="phone"
                                    placeholder="شماره تلفن"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="text-left"
                                />
                            </div>
                        </div>
                        <div>
                            <textarea
                                name="comment"
                                placeholder="توضیحات"
                                value={form.comment}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full rounded-md border border-border bg-background/80 p-3 text-left text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-walletyar-primary hover:bg-walletyar-primary/90 text-white font-bold"
                        >
                            ارسال پیام
                        </Button>
                    </form>

                </div>
                {/* تصویر و حباب گفت‌وگو */}

            </Card>
            {/* باکس‌های اطلاعات تماس */}
            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* باکس تماس */}
                <div className="flex flex-col items-center justify-center bg-muted rounded-xl p-5 shadow border border-border">
                    <span className="text-3xl mb-2">📞</span>
                    <div className="font-bold text-foreground mb-1">تماس با پشتیبانی</div>
                    <div className="text-muted-foreground text-sm">021-12345678 | 021-22334455</div>
                </div>
                {/* باکس ایمیل */}
                <div className="flex flex-col items-center justify-center bg-muted rounded-xl p-5 shadow border border-border">
                    <span className="text-3xl mb-2">✉️</span>
                    <div className="font-bold text-foreground mb-1">نشانی پست الکترونیک</div>
                    <div className="text-muted-foreground text-sm">smatrix@yahoo.com</div>
                </div>
                {/* باکس آدرس */}
                <div className="flex flex-col items-center justify-center bg-muted rounded-xl p-5 shadow border border-border">
                    <span className="text-3xl mb-2">🏢</span>
                    <div className="font-bold text-foreground mb-1">نشانی</div>
                    <div className="text-muted-foreground text-sm text-center">
                        تهران، میدان آرژانتین، خیابان الوند، کوچه ماند، پلاک ۱۸
                    </div>
                </div>
            </div>
        </main>
    );
}
