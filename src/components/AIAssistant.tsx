"use client";
import { Button } from '@/components/ui/button';
import { BotIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                variant="default"
                size="icon"
                className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg w-16 h-16 bg-primary hover:bg-primary/90 transition-all duration-200"
                onClick={() => setIsOpen(true)}
            >
                <BotIcon className="h-10 w-10" />
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold">مشاوره هوش مصنوعی</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center gap-6 py-8">
                        <div className="bg-primary/10 p-6 rounded-full">
                            <BotIcon className="h-24 w-24 text-primary" />
                        </div>
                        <p className="text-center text-muted-foreground text-xl">
                            به زودی مشاوره با هوش مصنوعی اضافه خواهد شد
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
