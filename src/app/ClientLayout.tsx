'use client';

import { usePathname } from 'next/navigation';
import Footer from "./components/Footer";
import Addide from "./components/Addide";
import Navigation from "./components/Navigation";
import ProgressBar from "./components/ProgressBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <ProgressBar />
      <Navigation />
      {children}
      {!pathname.startsWith('/dashboard') && <Footer />}
    </>
  );
}
