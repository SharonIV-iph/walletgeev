'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Input } from "@/registry/new-york-v4/ui/input";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card } from "@/registry/new-york-v4/ui/card";
import { useAuth } from '@/hooks/useAuth';
import { useApi } from '@/hooks/useApi';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/registry/new-york-v4/ui/input-otp";

interface LoginResponse {
    id: string;
}

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const { post, get, loading, error: apiError } = useApi();
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<'phone' | 'verify'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [localError, setLocalError] = useState<string>('');

    // Handle mounting state
    useEffect(() => {
        setMounted(true);
    }, []);

    const validatePhoneNumber = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 11 || cleaned.length === 10;
    };

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (!validatePhoneNumber(phoneNumber)) {
            setLocalError('شماره تلفن باید ۱۰ یا ۱۱ رقم باشد');
            return;
        }

        try {
            const response = await get('/verify');
            if (response) {
                localStorage.setItem('loginPhone', phoneNumber);
                setStep('verify');
            }
        } catch (error) {
            setLocalError('خطا در ارسال کد تایید');
        }
    };

    const handleVerifySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (verificationCode.length !== 5) {
            setLocalError('کد تایید باید ۵ رقم باشد');
            return;
        }

        const savedPhone = localStorage.getItem('loginPhone');

        try {
            const response = await post<LoginResponse>('/users', {
                phoneNumber: savedPhone,
                code: verificationCode
            });

            if (response?.data?.id) {
                localStorage.removeItem('loginPhone');
                const loginSuccess = await login(response.data.id);
                if (loginSuccess) {
                    router.push('/dashboard');
                } else {
                    setLocalError('خطا در ورود به سیستم. لطفا دوباره تلاش کنید.');
                }
            } else {
                setLocalError('کد تایید اشتباه است');
            }
        } catch (error) {
            setLocalError('کد تایید اشتباه است');
        }
    };

    const getBackgroundImage = () => {
        if (!mounted) return '';
        return resolvedTheme === 'dark'
            ? "url('/images/vector/9260f3f3-187e-4a73-aa4c-de947d05ebe6-removebg-preview.png')"
            : "url('/images/IMG_1997.PNG')";
    };

    return (
        <main className="relative min-h-screen"
            style={{
                backgroundImage: getBackgroundImage(),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Bottom background image
            <img
                src={theme === 'dark'
                    ? "/images/vector/9260f3f3-187e-4a73-aa4c-de947d05ebe6-removebg-preview.png"
                    : "/images/IMG_1997.PNG"
                }
                alt="Background Vector Bottom"
                className="object-cover pointer-events-none select-none absolute top-12 dark:top-0 bottom-0 left-0 w-full dark:opacity-80 "
                style={{ zIndex: -1 }}
            /> */}
            <div className="min-h-screen flex items-center justify-center relative z-20">
                {/* Vector Images Container */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
                    <img
                        src="/images/vector/aa4d0cee-672a-44f8-99ca-1085be36d729-removebg-preview.png"
                        alt="Vector 3"
                        className="absolute top-[35%] right-[10%] w-36 h-36 opacity-100 animate-float z-10"
                    />
                    <img
                        src="/images/vector/0b1c026f-6f86-4632-a379-4481247f4114-removebg-preview.png"
                        alt="Vector 4"
                        className="absolute top-[15%] right-[85%] rotate-12 w-40 h-40 opacity-100 animate-float z-10"
                    />
                </div>

                <Card className="max-w-md w-full p-8 relative z-10 bg-background/25 backdrop-blur-sm">
                    <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
                        {step === 'phone' ? 'ورود' : 'تایید شماره تلفن'}
                    </h1>

                    {(localError || apiError) && (
                        <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-center">
                            {localError || apiError?.message}
                        </div>
                    )}

                    {step === 'phone' ? (
                        <form onSubmit={handlePhoneSubmit} className="space-y-6">
                            <div>
                                <Input
                                    type="tel"
                                    placeholder="شماره تلفن"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex justify-between">
                                <Link href="/forgot-password" className="text-primary hover:text-primary/80">
                                    رمز عبور را فراموش کرده‌اید؟
                                </Link>
                                <Link href="/signup" className="text-primary hover:text-primary/80">
                                    ایجاد حساب کاربری
                                </Link>
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'در حال ارسال کد...' : 'ارسال کد تایید'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifySubmit} className="space-y-6">
                            <div className="text-center mb-4">
                                <p className="text-sm text-muted-foreground">شماره تلفن:</p>
                                <p className="font-medium">{phoneNumber}</p>
                            </div>
                            <div className="flex justify-center" dir='ltr'>
                                <InputOTP
                                    maxLength={5}
                                    value={verificationCode}
                                    onChange={(value) => setVerificationCode(value)}
                                    disabled={loading}
                                    className="direction-ltr"
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setStep('phone')}
                                    disabled={loading}
                                >
                                    تغییر شماره تلفن
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={loading}
                                >
                                    {loading ? 'در حال تایید...' : 'تایید'}
                                </Button>
                            </div>
                        </form>
                    )}
                </Card>
            </div>
        </main>
    );
}

const styles = `
@keyframes float {
    0% {
        transform: translateY(0px) rotate(2deg);
    }
    50% {
        transform: translateY(-10px) rotate(0deg);
    }
    100% {
        transform: translateY(0px) rotate(2deg);
    }
}

@keyframes float-slow {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0px);
    }
}

.animate-float {
    animation: float 1.3s ease-in-out infinite;
}

.animate-float-slow {
    animation: float-slow 2s ease-in-out infinite;
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
