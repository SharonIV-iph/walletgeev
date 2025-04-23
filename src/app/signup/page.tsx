'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/registry/new-york-v4/ui/input";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card } from "@/registry/new-york-v4/ui/card";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('رمزهای عبور مطابقت ندارند');
      return;
    }
    // Handle signup here
    console.log('Signup attempt:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-foreground">ایجاد حساب کاربری</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="نام و نام خانوادگی"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="ایمیل"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="رمز عبور"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="تکرار رمز عبور"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-center">
              <Link href="/login" className="text-primary hover:text-primary/80">
                قبلاً حساب کاربری دارید؟ ورود
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
            >
              ثبت‌نام
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
} 