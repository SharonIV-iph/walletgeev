'use client';

import { usePathname } from 'next/navigation';
import Footer from "./Footer";
import Addide from "./Addide";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <>
      {pathname.startsWith('/dashboard') && <Addide />}
      {children}
      {!pathname.startsWith('/dashboard') && <Footer />}
    </>
  );
} 