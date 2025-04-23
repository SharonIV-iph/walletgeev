'use client';

import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';

const features = [
  {
    icon: '/images/icon1.svg',
    title: 'اتاق‌های لوکس',
    description: 'اتاق‌های مجلل و راحت با طراحی مدرن و امکانات کامل'
  },
  {
    icon: '/images/icon2.svg',
    title: 'رستوران‌های متنوع',
    description: 'رستوران‌های مجلل با منوهای متنوع و غذاهای خوشمزه'
  },
  {
    icon: '/images/icon3.svg',
    title: 'خدمات ویژه',
    description: 'خدمات VIP، اسپا، استخر و سالن ورزشی مجهز'
  }
];

export default function Home() {
  return (
    <main>
      <Hero
        heading="به هتل لوکس ما خوش آمدید"
        description="تجربه‌ای متفاوت از اقامتی لوکس و راحت"
        imageSrc="/images/hotel-hero.jpg"
      />
      <Features features={features} />
    </main>
  );
}
