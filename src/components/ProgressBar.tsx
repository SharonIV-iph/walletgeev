"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const ProgressBar = () => {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true);
        NProgress.start();


        let progress = 0;
        const interval = setInterval(() => {
            if (progress < 90) {
                progress += 5;
                NProgress.set(progress / 100);
            }
        }, 100);


        const handleComplete = () => {
            setIsLoading(false);
            clearInterval(interval);
            NProgress.done();
        };


        const timer = setTimeout(handleComplete, 500);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
            NProgress.done();
        };
    }, [pathname]);

    return null;
};

export default ProgressBar;