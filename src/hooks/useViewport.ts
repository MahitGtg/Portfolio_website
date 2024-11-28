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