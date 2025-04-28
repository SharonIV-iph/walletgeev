'use client';

import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import Services from '@/app/components/Services';
import { Consultant, Testimonial, Service, GalleryItem, TeamMember } from '@/types';

export default function ServicesPage() {
    const api = useApi();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData] = await Promise.all([
                    api.get<Service[]>('/services'),
                ]);

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
        <main className="container mx-auto px-4" dir="rtl">
            <Services services={services} />
        </main>
    );
}