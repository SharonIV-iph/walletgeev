'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

interface TeamSectionProps {
  team: TeamMember[];
}

export default function TeamSection({ team }: TeamSectionProps) {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground">تیم حرفه‌ای ما</h2>
            <p className="text-muted-foreground mt-2">
              متخصصان با تجربه و متعهد در خدمت سلامت شما
            </p>
          </div>
          <Button className="flex items-center gap-2">
            بیشتر بدانید
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 