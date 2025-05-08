'use client';

import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import Services from '@/components/Services';
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

    return (
        <main className="container mx-auto px-4" dir="rtl">
            <Services services={services} isLoading={loading} />
        </main>
    );
}
