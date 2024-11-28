import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitHubIcon } from '../../assets/icons/socials';
import { ExternalLink } from 'lucide-react';
import { useViewport } from '../../hooks/useViewport';

interface ProjectCardProps {
    title: string;
    description: string;
    type: string;
    techStack: {
        name: string;
        icon: React.ReactNode;
    }[];
    demo: {
        type: 'image' | 'video' | 'interactive';
        content: string | React.ReactNode;
        isMobile?: boolean;
        fallbackImage?: string;
    };
    githubLink?: string;
    deployedLink?: string;
    contributors?: {
        name: string;
        role?: string;
        link?: string;
    }[];
    custom?: number;
    transition?: {
        delay?: number;
        duration?: number;
    };
    link?: string;
}

const animations = {
    card: {
        initial: { 
            opacity: 0,
            y: 20 
        },
        animate: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                delay: Math.min(custom * 0.1, 0.3)
            }
        })
    },
    content: {
        initial: { opacity: 0 },
        animate: { 
            opacity: 1,
            transition: {
                duration: 0.2
            }
        }
    }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ 
    title,
    description,
    type,
    techStack,
    githubLink,
    deployedLink,
    contributors,
    demo,
    custom = 0,
    link
}) => {
    const { isMobileLike } = useViewport();
    const [isLoaded, setIsLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [loadTimeout, setLoadTimeout] = useState(false);

    useEffect(() => {
        if (typeof demo.content === 'string') {
            if (demo.type === 'image') {
                const img = new Image();
                img.src = demo.content;
                img.onload = () => setIsLoaded(true);
            } else if (demo.type === 'video') {
                if (isMobileLike) {
                    setIsLoaded(true); // For mobile, immediately ready with fallback
                } else {
                    const video = document.createElement('video');
                    video.src = demo.content;
                    video.onloadeddata = () => setIsLoaded(true);
                }
            }
        } else {
            setIsLoaded(true);
        }
    }, [demo, isMobileLike]);
    
    const renderDemo = () => {
        if (!isLoaded) {
            return <div className="w-full aspect-[16/10] bg-black/50" />;
        }
    
        // For interactive demos
        if (demo.type === 'interactive' && React.isValidElement(demo.content)) {
            return (
                <motion.div 
                    variants={animations.content}
                    initial="hidden"
                    animate="visible"
                    className="w-full aspect-[16/10]"
                >
                    {demo.content}
                </motion.div>
            );
        }
    
        // For mobile device mockups
        if (demo.isMobile && typeof demo.content === 'string') {
            return (
                <div className="relative w-full aspect-[16/10] bg-black">
                    <motion.div 
                        variants={animations.content}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img
                            src={demo.content}
                            alt={title}
                            className="h-[90%] w-auto object-contain mx-auto"
                            onLoad={() => setIsLoaded(true)}
                            loading="eager"
                        />
                    </motion.div>
                </div>
            );
        }
    
        // For videos
        if (demo.type === 'video') {
            if (isMobileLike) {
                return (
                    <motion.img
                        variants={animations.content}
                        initial="hidden"
                        animate="visible"
                        src={demo.fallbackImage}
                        alt={title}
                        className="w-full aspect-[16/10] object-cover"
                        onLoad={() => setIsLoaded(true)}
                        loading="eager"
                    />
                );
            }
            
            return (
                <motion.video
                    variants={animations.content}
                    initial="hidden"
                    animate="visible"
                    src={demo.content as string}
                    className="w-full aspect-[16/10] object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={() => setIsLoaded(true)}
                />
            );
        }
    
        // Regular images
        return (
            <motion.img
                variants={animations.content}
                initial="hidden"
                animate="visible"
                src={demo.content as string}
                alt={title}
                className="w-full aspect-[16/10] object-cover"
                onLoad={() => setIsLoaded(true)}
                loading="eager"
            />
        );
    };
    
    

    return (
        <motion.div 
            className={`
                bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden 
                border border-slate-200/20 shadow-lg
                hover:border-slate-200/30 hover:shadow-xl
                transition-all duration-300 ease-out
                max-w-md mx-auto w-full
                ${link ? 'cursor-pointer' : ''}
            `}
            onClick={() => link && (window.location.href = link)}
            variants={animations.card}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-10%" }}
            custom={custom}
        >
            <div className="relative bg-white/5">
                {renderDemo()}
            </div>

            <motion.div 
                className="p-6"
                variants={animations.content}
                initial="initial"
                animate="animate"
            >
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="min-w-0 flex-1">
                        <h3 className="font-main text-base font-bold text-white mb-0.5 truncate">
                            {title}
                        </h3>
                        <p className="font-main text-xs text-white/75">{type}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        {githubLink && (
                            <a href={githubLink} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-white hover:text-white transition-colors duration-200"
                               onClick={(e) => e.stopPropagation()}>
                                <GitHubIcon className="w-5 h-5" />
                            </a>
                        )}
                        {deployedLink && (
                            <a href={deployedLink} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-white hover:text-white transition-colors duration-200"
                               onClick={(e) => e.stopPropagation()}>
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

                <p className="font-secondary text-sm leading-relaxed text-[#aab8d4] mb-4">
                    {description}
                </p>

                <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                        {techStack.map((tech, index) => (
                            <div key={index}
                                 className="bg-black/50 px-2 py-1 rounded-full flex items-center gap-1.5
                                          hover:bg-slate hover:shadow-sm transition-all duration-200">
                                <div className="w-4 h-4 flex items-center justify-center">
                                    {tech.icon}
                                </div>
                                <span className="font-main text-[10px] text-white/75">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {contributors && contributors.length > 0 && (
                        <div className="pt-3 border-t border-slate-200/20">
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                {contributors.map((contributor, index) => (
                                    <div key={index} 
                                         className="font-secondary text-xs text-[#aab8d4]">
                                        {contributor.link ? (
                                            <a href={contributor.link}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               className="hover:text-white transition-colors"
                                               onClick={(e) => e.stopPropagation()}>
                                                {contributor.name}
                                            </a>
                                        ) : (
                                            <span>{contributor.name}</span>
                                        )}
                                        {contributor.role && (
                                            <span className="text-navy-400 ml-1 text-xs">
                                                ({contributor.role})
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectCard;