'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/registry/new-york-v4/ui/input";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card } from "@/registry/new-york-v4/ui/card";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login here
    console.log('Login attempt:', formData);
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
          <h1 className="text-3xl font-bold text-center mb-8 text-foreground">ورود</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            >
              ورود
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
} 