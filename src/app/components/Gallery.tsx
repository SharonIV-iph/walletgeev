'use client';

import React from 'react';
import { Card, CardContent } from '@/registry/new-york-v4/ui/card';

interface GalleryItem {
  id: number;
  imageUrl: string;
  caption: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">گالری تصاویر</h2>
        <p className="text-muted-foreground">
          نگاهی به فضا و امکانات کلینیک ما
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden transform transition-transform hover:scale-105"
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-card-foreground text-sm">{item.caption}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
} 