'use client';

import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import Header from './components/Header';
import FeaturedConsultants from './components/FeaturedConsultants';
import CallToAction from './components/CallToAction';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import { Consultant, Testimonial, Service } from '@/types';

export default function Home() {
    const api = useApi();
    const [consultants, setConsultants] = useState<Consultant[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [consultantsData, testimonialsData, servicesData] = await Promise.all([
                    api.get<Consultant[]>('/consultants?_limit=4'),
                    api.get<Testimonial[]>('/testimonials'),
                    api.get<Service[]>('/services'),
                ]);

                if (consultantsData) setConsultants(consultantsData.data);
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

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>;
    }

    return (
        <main className="min-h-screen bg-background text-foreground rtl" dir="rtl">
            <Header />

            <div className="container mx-auto px-4">
                <Services services={services} />
                <CallToAction />
                <FeaturedConsultants consultants={consultants} />
                <Testimonials testimonials={testimonials} />
            </div>


        </main>
    );
}
