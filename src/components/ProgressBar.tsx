// Progress Bar Component for page transitions
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './ProgressBar.module.css';

export default function ProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Reset on route change
        setLoading(false);
        setProgress(0);
    }, [pathname, searchParams]);

    useEffect(() => {
        let progressInterval: ReturnType<typeof setInterval>;

        if (loading) {
            progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 100);
        } else {
            setProgress(100);
            const timeout = setTimeout(() => setProgress(0), 200);
            return () => clearTimeout(timeout);
        }

        return () => clearInterval(progressInterval);
    }, [loading]);

    if (progress === 0) return null;

    return (
        <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
        />
    );
}
