'use client';

import { usePathname } from 'next/navigation';
import Footer from "./components/Footer";
import Addide from "./components/Addide";
import Navigation from "./components/Navigation";
import ProgressBar from "./components/ProgressBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith('/dashboard');

    return (
        <>
            <ProgressBar />
            <Navigation />
            <div className="flex">
                {isDashboard && <Addide />}
                <main className={`${isDashboard ? 'flex-1' : 'w-full'}`}>
                    {children}
                </main>
            </div>
            {!isDashboard && <Footer />}
        </>
    );
}
