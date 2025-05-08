import React from 'react';
import { Card } from "@/registry/new-york-v4/ui/card";
import { Feature, FeaturesProps } from '@/types/components';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
        <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
          <div className="flex flex-wrap -mx-4">
            {features.map((feature, index) => (
              <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                <Card className="rounded-lg shadow-lg p-8">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${feature.icon})` }}
                  />
                  <h3 className="text-xl font-bold text-center text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-center text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features; 