'use client';

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/registry/new-york-v4/ui/accordion";
import { Card } from "@/registry/new-york-v4/ui/card";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    title?: string;
    description?: string;
    items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({
    title = "سوالات متداول",
    description = "پاسخ به سوالات پرتکرار شما",
    items
}) => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                            {title}
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-full mt-8">
                    <Card className="p-6 bg-background/50 backdrop-blur-sm border-border">
                        <Accordion type="single" collapsible className="w-full">
                            {items.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-b border-border last:border-0"
                                >
                                    <AccordionTrigger className="text-right hover:no-underline">
                                        <span className="text-xl font-medium text-foreground">
                                            {item.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-left">
                                        <p className="text-muted-foreground leading-relaxed flex justify-start text-lg px-4 py-1">
                                            {item.answer}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
