'use client';

import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
    {
        title: 'لینک ها',
        links: [
            { label: 'معرفی ولت یار', href: '/about' },
            { label: 'ارتباط با ما', href: '/contact' },
            { label: 'شرایط استفاده از خدمات', href: '/terms-of-service' },
            { label: 'قوانین مقررات', href: '/privacy-policy' },
        ],
    },
    {
        title: 'خدمات',
        links: [
            { label: 'مشاوره', href: '#' },
            { label: 'لیست متخصصین', href: '/consultants' },
            { label: 'لیست خدمات', href: '/services' },
        ],
    },
    {
        title: 'اطلاعات تماس',
        links: [
            { label: 'تلفن: ۰۲۱-۱۲۳۴۵۶۷۸', href: 'tel:02112345678' },
            { label: 'ایمیل: info@clinic.com', href: 'mailto:info@clinic.com' },
            { label: 'آدرس: تهران، خیابان ولیعصر', href: '/contact' },
        ],
    },
];

const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
];

const SkeletonFooter = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description Skeleton */}
                    <div>
                        <div className="h-10 w-32 bg-gray-700 rounded animate-pulse mb-4" />
                        <div className="h-4 w-full bg-gray-700 rounded animate-pulse mb-2" />
                        <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
                        <div className="flex space-x-4 space-x-reverse mt-6">
                            {[1, 2, 3, 4].map((index) => (
                                <div
                                    key={index}
                                    className="h-5 w-5 bg-gray-700 rounded-full animate-pulse"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer Links Skeleton */}
                    {[1, 2, 3].map((sectionIndex) => (
                        <div key={sectionIndex}>
                            <div className="h-6 w-24 bg-gray-700 rounded animate-pulse mb-4" />
                            <ul className="space-y-2">
                                {[1, 2, 3].map((linkIndex) => (
                                    <li key={linkIndex}>
                                        <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <div className="h-4 w-48 bg-gray-700 rounded animate-pulse mx-auto" />
                </div>
            </div>
        </footer>
    );
};

export default function Footer({ isLoading = false }) {
    if (isLoading) {
        return <SkeletonFooter />;
    }

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div>
                        <img src="/images/logo-white.svg" alt="Logo" className="h-10 mb-4" />
                        <p className="text-gray-400 text-sm">
                            ارائه خدمات مشاوره بلاکچین با بالاترین استانداردها و متخصص های مجرب
                        </p>
                        <div className="flex space-x-4 space-x-reverse mt-6">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
                    <p>
                        © {new Date().getFullYear()} ولت یار. تمامی حقوق محفوظ است.
                    </p>
                </div>
            </div>
        </footer>
    );
}
