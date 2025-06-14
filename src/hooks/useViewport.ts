// src/hooks/useViewport.ts
import { useState, useEffect, useCallback } from 'react';
import type { ViewportType } from '../types/viewport';

// Simple throttle implementation
const throttle = <T extends (this: any, ...args: any[]) => any>(
    func: T,
    limit: number
): ((this: ThisParameterType<T>, ...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    let lastFunc: ReturnType<typeof setTimeout>;
    let lastRan: number;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            lastRan = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

export const useViewport = () => {
    const [viewportType, setViewportType] = useState<ViewportType>('desktop');
    const [isMobileLike, setIsMobileLike] = useState(false);

    const checkViewport = useCallback(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Desktop view (landscape screens >= 1180px wide)
        if (width >= 1180) {
            setViewportType('desktop');
            setIsMobileLike(false);
        }
        // Tablet landscape
        else if (width >= 768 && width > height) {
            setViewportType('tablet-landscape');
            setIsMobileLike(false); // Use desktop layout
        }
        // Tablet portrait and mobile (stacked layout)
        else {
            setViewportType(width >= 768 ? 'tablet-portrait' : 'mobile');
            setIsMobileLike(true); // Use mobile layout
        }
    }, []);

    useEffect(() => {
        const throttledCheckViewport = throttle(checkViewport, 100);

        // Initial check
        throttledCheckViewport();

        // Add event listeners
        window.addEventListener('resize', throttledCheckViewport);
        window.addEventListener('orientationchange', throttledCheckViewport);

        return () => {
            window.removeEventListener('resize', throttledCheckViewport);
            window.removeEventListener('orientationchange', throttledCheckViewport);
        };
    }, [checkViewport]);

    return { viewportType, isMobileLike };
};