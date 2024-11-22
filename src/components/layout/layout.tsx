// components/layout/Layout.tsx
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

        document.addEventListener('toggleSidebar', handleToggleSidebar);
        return () => document.removeEventListener('toggleSidebar', handleToggleSidebar);
    }, [isMobileLike]);

    return (
        <div className="flex min-h-screen h-screen bg-black overflow-hidden"> {/* Add h-screen and overflow-hidden */}
            {isMobileLike ? (
                <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            ) : (
                <Sidebar />
            )}
            <main 
                className={`
                    flex-1 overflow-auto  /* Add overflow-auto */
                    ${isMobileLike ? 'pt-16' : ''} 
                    ${viewportType === 'tablet-landscape' ? 'p-6' : 'p-8 md:p-12'}
                `}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;