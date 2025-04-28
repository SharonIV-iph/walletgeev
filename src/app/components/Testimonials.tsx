'use client';

import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/registry/new-york-v4/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Testimonial, TestimonialsProps } from '@/types';

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="py-16 bg-muted">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">نظرات یار فن ها</h2>
        <p className="text-muted-foreground">
          آنچه یار فن ها ما درباره خدمات ما می‌گویند
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="w-full max-w-4xl mx-auto relative">
          <Carousel
            opts={{
              align: 'center',
              loop: true,
              slidesToScroll: 1,
              containScroll: 'trimSnaps',
              breakpoints: {
                '(min-width: 1024px)': { slidesToScroll: 3 },
                '(min-width: 768px)': { slidesToScroll: 2 },
                '(min-width: 0px)': { slidesToScroll: 1 },
              },
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 basis-full sm:basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(testimonial.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-muted-foreground'
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <Quote className="absolute top-0 right-0 h-6 w-6 text-muted-foreground/50 transform -translate-y-2" />
                        <p className="text-muted-foreground pt-6 pr-8">
                          {testimonial.quote}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-background/80 hover:bg-background"
              aria-label="مشاهده نظر قبلی"
            >
              <ChevronRight className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-background/80 hover:bg-background"
              aria-label="مشاهده نظر بعدی"
            >
              <ChevronLeft className="h-4 w-4" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
