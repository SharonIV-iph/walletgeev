'use client';

import React from 'react';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
          <div className="max-w-screen-xl mx-auto py-2 lg:py-4">
            <h1 className="text-3xl font-bold text-center mb-8">شرایط استفاده از خدمات</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">۱. پذیرش شرایط</h2>
              <p className="mb-4 text-muted-foreground">
                با دسترسی و استفاده از خدمات هتل ما، شما موافقت می‌کنید که به این شرایط استفاده از خدمات پایبند باشید.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">۲. رزرو و لغو رزرو</h2>
              <p className="mb-4 text-muted-foreground">
                سیاست‌های رزرو و لغو رزرو ما شامل موارد زیر است:
              </p>
              <ul className="list-disc pr-6 mb-4 text-muted-foreground">
                <li>نیاز به رزرو از قبل</li>
                <li>مهلت و هزینه‌های لغو رزرو</li>
                <li>سیاست‌های تغییر رزرو</li>
                <li>رویه‌های بازپرداخت</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">۳. مسئولیت‌های مهمان</h2>
              <p className="mb-4 text-muted-foreground">
                به عنوان مهمان، شما موافقت می‌کنید که:
              </p>
              <ul className="list-disc pr-6 mb-4 text-muted-foreground">
                <li>اطلاعات دقیق در هنگام رزرو ارائه دهید</li>
                <li>قوانین و مقررات هتل را رعایت کنید</li>
                <li>به سایر مهمانان و اموال هتل احترام بگذارید</li>
                <li>هزینه هرگونه خسارت ناشی از اقامت خود را پرداخت کنید</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">۴. مسئولیت‌های هتل</h2>
              <p className="mb-4 text-muted-foreground">
                ما متعهد می‌شویم که:
              </p>
              <ul className="list-disc pr-6 mb-4 text-muted-foreground">
                <li>خدمات را مطابق با توضیحات ارائه دهیم</li>
                <li>محیطی امن و تمیز را حفظ کنیم</li>
                <li>از حریم خصوصی و امنیت مهمانان محافظت کنیم</li>
                <li>به نگرانی‌های مهمانان به سرعت رسیدگی کنیم</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">۵. مسئولیت</h2>
              <p className="mb-4 text-muted-foreground">
                مسئولیت ما محدود به موارد زیر است:
              </p>
              <ul className="list-disc pr-6 mb-4 text-muted-foreground">
                <li>خسارات مستقیم ناشی از سهل‌انگاری ما</li>
                <li>از دست دادن یا آسیب به اموال مهمان در اختیار ما</li>
                <li>آسیب‌های شخصی ناشی از امکانات ما</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">۶. تغییرات در شرایط</h2>
              <p className="mb-4 text-muted-foreground">
                ما حق داریم این شرایط را در هر زمان تغییر دهیم. تغییرات بلافاصله پس از انتشار مؤثر خواهند بود.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">۷. اطلاعات تماس</h2>
              <p className="mb-4 text-muted-foreground">
                برای سوالات در مورد این شرایط استفاده از خدمات، لطفاً با ما تماس بگیرید:
              </p>
              <p className="mb-4 text-muted-foreground">
                ایمیل: legal@hotel.com<br />
                تلفن: ۰۲۱-۱۲۳۴۵۶۷۸<br />
                آدرس: خیابان هتل، پلاک ۱۲۳، شهر، کشور
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
