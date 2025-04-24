'use client';

import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import Header from './components/Header';
import FeaturedDoctors from './components/FeaturedDoctors';
import TeamSection from './components/TeamSection';
import CallToAction from './components/CallToAction';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { Doctor, Testimonial, Service, GalleryItem, TeamMember } from '@/types';

export default function Home() {
  const api = useApi();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsData, testimonialsData, servicesData, galleryData, teamData] = await Promise.all([
          api.get<Doctor[]>('/doctors'),
          api.get<Testimonial[]>('/testimonials'),
          api.get<Service[]>('/services'),
          api.get<GalleryItem[]>('/gallery'),
          api.get<TeamMember[]>('/team')
        ]);

        if (doctorsData) setDoctors(doctorsData.data);
        if (testimonialsData) setTestimonials(testimonialsData.data);
        if (servicesData) setServices(servicesData.data);
        if (galleryData) setGallery(galleryData.data);
        if (teamData) setTeam(teamData.data);
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
        <FeaturedDoctors doctors={doctors} />
        <TeamSection team={team} />
        <CallToAction />
        <Services services={services} />
        <Testimonials testimonials={testimonials} />
        <Gallery items={gallery} />
      </div>

      
    </main>
  );
}
