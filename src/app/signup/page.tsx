'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/registry/new-york-v4/ui/input";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card } from "@/registry/new-york-v4/ui/card";
import { useApi } from '@/hooks/useApi';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/registry/new-york-v4/ui/input-otp";
import { useCookies } from 'react-cookie';
import { useTheme } from 'next-themes';
interface SignupFormData {
    name: string;
    phoneNumber: string;
}

interface UserResponse {
    data: {
        id: string;
        name: string;
        phoneNumber: string;
    };
}

export default function Signup() {
    const router = useRouter();
    const [cookies, setCookie] = useCookies();
    const { post, get, loading, error: apiError } = useApi();
    const [step, setStep] = useState<'register' | 'verify'>('register');
    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        phoneNumber: '',
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [localError, setLocalError] = useState<string>('');

    const validatePhoneNumber = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 11 || cleaned.length === 10;
    };
    // Handle mounting state
    useEffect(() => {
        setMounted(true);
    }, []);


    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (!validatePhoneNumber(formData.phoneNumber)) {
            setLocalError('شماره تلفن باید ۱۰ یا ۱۱ رقم باشد');
            return;
        }

        //TODO: post phoneNumber to real server for verification
        const response = await get('/verify');

        if (response) {
            localStorage.setItem('tempUserData', JSON.stringify(formData));
            setStep('verify');
        }
    };

    const handleVerifySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (verificationCode.length !== 5) {
            setLocalError('کد تایید باید ۵ رقم باشد');
            return;
        }

        const tempUserData = JSON.parse(localStorage.getItem('tempUserData') || '{}');

        const response = await post('/users', {
            name: tempUserData.name,
            phoneNumber: tempUserData.phoneNumber,
        }) as UserResponse;

        if (response) {
            localStorage.removeItem('tempUserData');
            localStorage.setItem('user', JSON.stringify(response.data));
            setCookie('token', response.data.id, {
                path: '/',
                maxAge: 3600, // 1 hour
                sameSite: 'strict'
            });
            router.push('/dashboard');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
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
                        {step === 'register' ? 'ایجاد حساب کاربری' : 'تایید شماره تلفن'}
                    </h1>

                    {(localError || apiError) && (
                        <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-center">
                            {localError || apiError?.message}
                        </div>
                    )}

                    {step === 'register' ? (
                        <form onSubmit={handleRegisterSubmit} className="space-y-6">
                            <div>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="نام و نام خانوادگی"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <Input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="شماره تلفن"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifySubmit} className="space-y-6">
                            <div className="text-center mb-4">
                                <p className="text-sm text-muted-foreground">شماره تلفن:</p>
                                <p className="font-medium">{formData.phoneNumber}</p>
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
                                    onClick={() => setStep('register')}
                                    disabled={loading}
                                >
                                    تغییر شماره تلفن
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={loading}
                                >
                                    {loading ? 'در حال تایید...' : 'تایید شماره تلفن'}
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
