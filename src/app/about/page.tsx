'use client';

import React from 'react';

export default function AboutUs() {
  return (
    <main>
      <div className="relative">
        <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
          <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
            <div className="flex items-center justify-between flex-col lg:flex-row-reverse px-8">
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
                  درباره هتل ما
                </h1>
                <p className="mt-4 text-center lg:text-right text-sm md:text-base lg:text-lg font-medium leading-relaxed text-muted-foreground">
                  به هتل لوکس ما خوش آمدید، جایی که راحتی و زیبایی با هم تلاقی می‌کنند.
                  ما به ارائه خدمات استثنایی و خلق تجربیات فراموش‌نشدنی برای مهمانان‌مان افتخار می‌کنیم.
                </p>
                <p className="mt-4 text-center lg:text-right text-sm md:text-base lg:text-lg font-medium leading-relaxed text-muted-foreground">
                  تیم ما متعهد به اطمینان از اقامت بی‌نقص شماست،
                  با توجه به جزئیات و تعهد به برتری در هر جنبه از خدمات.
                </p>
              </div>
              <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
                <div 
                  className="rounded bg-contain bg-no-repeat bg-center h-96"
                  style={{ backgroundImage: 'url("/images/about-hotel.jpg")' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 