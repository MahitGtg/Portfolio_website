import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileSidebar from './mobile_sidebar';
import { useViewport } from '../../hooks/useViewport';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { viewportType, isMobileLike } = useViewport();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleToggleSidebar = () => {
            if (isMobileLike) {
                setIsSidebarOpen(prev => !prev);
            }
        };

        // Handle mobile viewport height
        const setMobileHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // Initial setup
        setMobileHeight();

        // Event listeners
        document.addEventListener('toggleSidebar', handleToggleSidebar);
        window.addEventListener('resize', setMobileHeight);
        window.addEventListener('orientationchange', setMobileHeight);

        // Cleanup
        return () => {
            document.removeEventListener('toggleSidebar', handleToggleSidebar);
            window.removeEventListener('resize', setMobileHeight);
            window.removeEventListener('orientationchange', setMobileHeight);
        };
    }, [isMobileLike]);

    return (
        <div 
            className="flex bg-black fixed inset-0 overflow-hidden"
            style={{ 
                height: isMobileLike ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
            }}
        >
            {isMobileLike ? (
                <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            ) : (
                <Sidebar />
            )}
            <main 
                className={`
                    flex-1 
                    overflow-y-auto 
                    scrollbar-none 
                    relative 
                    touch-pan-y 
                    ${isMobileLike ? 'pt-16' : ''} 
                    ${viewportType === 'tablet-landscape' ? 'p-6' : 'p-8 md:p-12'}
                `}
                style={{
                    height: isMobileLike ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;