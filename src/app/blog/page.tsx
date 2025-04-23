'use client';

import React from 'react';
import { Card } from "@/registry/new-york-v4/ui/card";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '۱۰ مقصد برتر سفر در سال ۱۴۰۳',
    date: '۲۶ فروردین ۱۴۰۳',
    excerpt: 'مقاصد هیجان‌انگیز سفر را برای تعطیلات بعدی خود کشف کنید.',
    image: '/images/blog1.jpg'
  },
  {
    id: 2,
    title: 'انواع اتاق‌های هتل به زبان ساده',
    date: '۲۱ فروردین ۱۴۰۳',
    excerpt: 'با انواع مختلف اتاق‌های هتل آشنا شوید و مناسب‌ترین را برای اقامت خود انتخاب کنید.',
    image: '/images/blog2.jpg'
  },
  {
    id: 3,
    title: 'نکات سفر برای مسافران تازه‌کار',
    date: '۱۶ فروردین ۱۴۰۳',
    excerpt: 'نکات ضروری برای اقامت راحت و لذت‌بخش در هتل برای اولین بار.',
    image: '/images/blog3.jpg'
  }
];

export default function BlogIndex() {
  return (
    <main>
      <div className="relative">
        <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
          <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
            <h1 className="text-3xl font-bold text-center mb-8 text-foreground">بلاگ ما</h1>
            <div className="flex flex-wrap -mx-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="w-full md:w-1/3 px-4 mb-8">
                  <Card className="overflow-hidden">
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url("${post.image}")` }}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{post.date}</p>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 