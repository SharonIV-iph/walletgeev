'use client';

import React from 'react';
import { Video, Calendar, ClipboardList, MessageCircle } from 'lucide-react';
import { Service, ServicesProps } from '@/types/components';

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface ServicesProps {
  services: Service[];
}

const iconMap = {
  VideoCamera: Video,
  Calendar: Calendar,
  ClipboardList: ClipboardList,
  ChatAlt: MessageCircle,
};

export default function Services({ services }: ServicesProps) {
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || Video;
    return <Icon className="h-8 w-8 text-primary" />;
  };

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">خدمات ما</h2>
        <p className="text-muted-foreground">
          ارائه خدمات پزشکی با بالاترین استانداردها
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:bg-accent transition-colors border shadow-sm hover:shadow-md"
          >
            <div className="mb-4 p-3 bg-primary/10 rounded-full">
              {getIcon(service.icon)}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {service.title}
            </h3>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 