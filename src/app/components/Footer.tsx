'use client';

import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = [
  {
    title: 'درباره ما',
    links: [
      { label: 'معرفی کلینیک', href: '/about' },
      { label: 'تیم پزشکی', href: '/team' },
      { label: 'تماس با ما', href: '/contact' },
    ],
  },
  {
    title: 'خدمات',
    links: [
      { label: 'مشاوره آنلاین', href: '/services/online' },
      { label: 'نوبت‌دهی', href: '/services/appointment' },
      { label: 'خدمات ویژه', href: '/services/special' },
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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <img src="/images/logo-white.svg" alt="Logo" className="h-10 mb-4" />
            <p className="text-gray-400 text-sm">
              ارائه خدمات درمانی با بالاترین استانداردها و تجهیزات پیشرفته پزشکی
            </p>
            <div className="flex space-x-4 space-x-reverse mt-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
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
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} کلینیک تخصصی. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
} 