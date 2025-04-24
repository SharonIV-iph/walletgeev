import React from 'react';
import { Card } from "@/registry/new-york-v4/ui/card";
import { HeroProps } from '@/types/components';

const Hero: React.FC<HeroProps> = ({ heading, description, imageSrc }) => {
  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
        <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
          <div className="flex items-center justify-between flex-col lg:flex-row-reverse px-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
                {heading}
              </h1>
              <p className="mt-4 text-center lg:text-right text-sm md:text-base lg:text-lg font-medium leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <Card className="rounded-lg h-96 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${imageSrc})` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 