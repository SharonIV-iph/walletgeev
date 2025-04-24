'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="bg-purple-600 py-16 my-16 rounded-2xl overflow-hidden relative">
      <div className="absolute left-0 top-0 w-1/3 h-full">
        <img
          src="/images/doctor-cta.jpg"
          alt="Doctor with patient"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-purple-600 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mr-auto text-white">
          <h2 className="text-4xl font-bold mb-4">
            اکنون وقت مشاوره خود را رزرو کنید!
          </h2>
          <p className="text-lg mb-8 text-purple-100">
            با رزرو آنلاین نوبت، در کمترین زمان ممکن با پزشک مورد نظر خود ملاقات کنید.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 flex items-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            رزرو نوبت
          </Button>
        </div>
      </div>
    </section>
  );
} 