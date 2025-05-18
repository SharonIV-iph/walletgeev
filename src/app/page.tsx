'use client';

import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import Header from '../components/Header';
import HeaderSkeleton from '@/components/HeaderSkeleton';
import FeaturedConsultants from '../components/FeaturedConsultants';
import CallToAction from '../components/CallToAction';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import { Consultant, Testimonial, Service, Specialist } from '@/types';
import FeaturedSpecialists from '@/components/FeaturedSpecialists';
import FAQ from '@/components/FandQ';
import Details from '@/components/Details';

// Skeleton components
const ServicesSkeleton = () => (
    <section className="py-16">
        <div className="text-center mb-12">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-muted rounded animate-pulse mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-sm">
                    <div className="mb-4 p-3 bg-muted rounded-full w-16 h-16 animate-pulse"></div>
                    <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    </section>
);

const CallToActionSkeleton = () => (
    <section className="py-16">
        <div className="text-center">
            <div className="h-8 w-64 bg-muted rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-muted rounded animate-pulse mx-auto mb-8"></div>
            <div className="h-12 w-48 bg-muted rounded animate-pulse mx-auto"></div>
        </div>
    </section>
);

const FeaturedConsultantsSkeleton = () => (
    <section className="py-16">
        <div className="text-center mb-12">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-muted rounded animate-pulse mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-sm">
                    <div className="mb-4 w-32 h-32 bg-muted rounded-full animate-pulse"></div>
                    <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    </section>
);

const TestimonialsSkeleton = () => (
    <section className="py-16">
        <div className="text-center mb-12">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-muted rounded animate-pulse mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6 rounded-lg bg-card border shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-muted rounded-full animate-pulse mr-4"></div>
                        <div>
                            <div className="h-4 w-32 bg-muted rounded animate-pulse mb-2"></div>
                            <div className="h-3 w-24 bg-muted rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="h-4 w-full bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    </section>
);

export default function Home() {
    const api = useApi();
    const [consultants, setConsultants] = useState<Consultant[]>([]);
    const [specialists, setSpecialists] = useState<Specialist[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [consultantsData, specialistsData, testimonialsData, servicesData] = await Promise.all([
                    api.get<Consultant[]>('/consultants?_limit=4'),
                    api.get<Specialist[]>('/specialists?_limit=4'),
                    api.get<Testimonial[]>('/testimonials'),
                    api.get<Service[]>('/services'),
                ]);

                if (consultantsData) setConsultants(consultantsData.data);
                if (specialistsData) setSpecialists(specialistsData.data);
                if (testimonialsData) setTestimonials(testimonialsData.data);
                if (servicesData) setServices(servicesData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground rtl" dir="rtl">
            {loading ? <HeaderSkeleton /> : <Header />}

            <div className="container mx-auto px-4">
                {loading ? (
                    <>

                        <ServicesSkeleton />
                        <CallToActionSkeleton />
                        <FeaturedConsultantsSkeleton />
                        <FeaturedConsultantsSkeleton />
                        <TestimonialsSkeleton />
                    </>
                ) : (
                    <>
                        <Details/>
                        <Services services={services} />
                        <FeaturedSpecialists specialists={specialists} />
                        <CallToAction />
                        <FeaturedConsultants consultants={consultants} />
                        <FAQ items={[{
                            question: "ولتیار چیست ؟",
                            answer: "ولت یار یک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شهر کرمان داره کارشو شروع میکنه . میخواد بهتین خودشو شنشون بده ",
                        },{
                            question: "ولتیار چیست ؟",
                            answer: "ولت یار یک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شهر کرمان داره کارشو شروع میکنه . میخواد بهتین خودشو شنشون بده ",
                        },{
                            question: "ولتیار چیست ؟",
                            answer: "ولت یار یک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شهر کرمان داره کارشو شروع میکنه . میخواد بهتین خودشو شنشون بده ",
                        },{
                            question: "ولتیار چیست ؟",
                            answer: "ولت یار یک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شیک سیستم مشاوره و حل مشکلات بلاکچنینی در ایران هستش که به صورت پایلوت در شهر کرمان داره کارشو شروع میکنه . میخواد بهتین خودشو شنشون بده ",
                        },]} />
                        <Testimonials testimonials={testimonials} />

                    </>
                )}
            </div>
        </main>
    );
}
