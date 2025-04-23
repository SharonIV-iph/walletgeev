'use client';

import React from 'react';
import { Card } from "@/registry/new-york-v4/ui/card";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Check } from "lucide-react";

interface PricingPlan {
  title: string;
  price: string;
  features: string[];
}

const plans: PricingPlan[] = [
  {
    title: 'پایه',
    price: '۹۹ دلار',
    features: [
      'اتاق استاندارد',
      'صبحانه رایگان',
      'اینترنت رایگان',
      'پشتیبانی ۲۴/۷'
    ]
  },
  {
    title: 'پرمیوم',
    price: '۱۹۹ دلار',
    features: [
      'اتاق دلوکس',
      'صبحانه و شام',
      'اینترنت رایگان',
      'دسترسی به اسپا',
      'پشتیبانی ۲۴/۷'
    ]
  },
  {
    title: 'لوکس',
    price: '۲۹۹ دلار',
    features: [
      'سوئیت',
      'تمام وعده‌های غذایی',
      'اینترنت رایگان',
      'دسترسی کامل به اسپا',
      'استخر اختصاصی',
      'پشتیبانی ۲۴/۷'
    ]
  }
];

export default function Pricing() {
  return (
    <main>
      <div className="relative">
        <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
          <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
            <h1 className="text-3xl font-bold text-center mb-8 text-foreground">طرح مورد نظر خود را انتخاب کنید</h1>
            <div className="flex flex-wrap -mx-4">
              {plans.map((plan, index) => (
                <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                  <Card className="p-8">
                    <h3 className="text-xl font-bold text-center text-foreground mb-4">{plan.title}</h3>
                    <div className="text-4xl font-bold text-center text-primary mb-4">{plan.price}</div>
                    <ul className="space-y-2 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-muted-foreground">
                          <Check className="w-5 h-5 ml-2 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">
                      انتخاب طرح
                    </Button>
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