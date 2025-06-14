// src/components/AnimatedButton.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: 'primary' | 'filter';
    isActive?: boolean;
    icon?: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
    children, 
    onClick, 
    className = "",
    variant = 'primary',
    isActive = false,
    icon
}) => {
    // Base classes - exactly matching your TextButton
    const baseClasses = `
        bg-black/90 backdrop-blur-sm rounded-full 
        flex items-center justify-center border border-slate-200/20
        hover:bg-black/95 hover:-translate-y-0.5
        hover:border-slate-200/30 group
        relative overflow-hidden
        transition-all duration-300 ease-out
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle,rgba(120,120,255,0.15),transparent_60%)]
        before:h-[200%] before:w-[200%] before:top-[-50%] before:left-[-50%]
        before:animate-none before:hover:animate-[spin_4s_linear_infinite]
        after:absolute after:inset-0
        after:opacity-0 after:hover:opacity-100
        after:transition-opacity after:duration-500
        after:border-2 after:border-transparent after:hover:border-slate-200/40
        after:rounded-full
        hover:shadow-[0_0_20px_rgba(120,120,255,0.3)]
    `;

    // Variant-specific classes
    const variantClasses = variant === 'primary' 
        ? 'px-4 py-1.5' // Original TextButton size
        : 'px-3 py-1'; // Smaller for filters

    // Active state classes (for filter buttons when selected)
    const activeClasses = isActive ? `
        bg-black/95 border-slate-200/50 shadow-[0_0_15px_rgba(120,120,255,0.2)]
        before:animate-[spin_4s_linear_infinite] 
        after:opacity-100 after:border-slate-200/30
    ` : '';

    // Icon and text spacing
    const contentClasses = icon ? 'gap-1.5' : '';

    // Text size based on variant
    const textSize = variant === 'primary' ? 'text-lg' : 'text-sm';

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseClasses} ${variantClasses} ${activeClasses} ${contentClasses} ${className}`}
        >
            {icon && (
                <span className={`
                    flex items-center justify-center
                    text-white/50
                    opacity-70 group-hover:opacity-100
                    transition-all duration-300
                    transform group-hover:scale-110
                    relative z-10
                    ${isActive ? 'opacity-100 text-white/80' : ''}
                `}>
                    {React.cloneElement(icon as React.ReactElement, { 
                        className: 'w-3.5 h-3.5' 
                    })}
                </span>
            )}
            <span className={`
                font-secondary ${textSize} text-white/50
                group-hover:text-white
                relative z-10
                transition-all duration-300 ease-out
                transform group-hover:scale-105
                whitespace-nowrap
                ${isActive ? 'text-white/90' : ''}
            `}>
                {children}
            </span>
        </motion.button>
    );
};

export default AnimatedButton;