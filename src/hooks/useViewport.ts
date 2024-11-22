// src/hooks/useViewport.ts
import { useState, useEffect } from 'react';
import type { ViewportType } from '../types/viewport';

export const useViewport = () => {
    const [viewportType, setViewportType] = useState<ViewportType>('desktop');
    const [isMobileLike, setIsMobileLike] = useState(false);

    useEffect(() => {
        const checkViewport = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Now checking for minimum dimensions for desktop view
            if (width >= 1180 && height >= 820) {
                setViewportType('desktop');
                setIsMobileLike(false);
            } else {
                // Everything else gets mobile treatment
                setViewportType(width > height ? 'tablet-landscape' : 'tablet-portrait');
                setIsMobileLike(true);
            }
        };

        checkViewport();
        window.addEventListener('resize', checkViewport);
        window.addEventListener('orientationchange', checkViewport);

        return () => {
            window.removeEventListener('resize', checkViewport);
            window.removeEventListener('orientationchange', checkViewport);
        };
    }, []);

    return { viewportType, isMobileLike };
};