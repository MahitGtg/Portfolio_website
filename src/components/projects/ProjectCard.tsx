import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        hidden: { 
            opacity: 0,
            y: 20 
        },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.21, 0.45, 0.05, 0.95],
                delay: custom * 0.1,
            }
        })
    },
    content: {
        hidden: { 
            opacity: 0,
            scale: 0.98 
        },
        visible: { 
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.21, 0.45, 0.05, 0.95]
            }
        }
    },
    loading: {
        hidden: { 
            opacity: 0, 
            scale: 0.9 
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.2,
                ease: "easeIn"
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
    const [isLoading, setIsLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);
    const [loadTimeout, setLoadTimeout] = useState(false);

    useEffect(() => {
        if (typeof demo.content === 'string') {
            if (demo.type === 'image') {
                const img = new Image();
                img.src = demo.content;
                img.onload = () => {
                    setIsLoaded(true);
                    setIsLoading(false);
                };
            } else if (demo.type === 'video' && !isMobileLike) {
                const timeoutId = setTimeout(() => {
                    if (!isLoaded) {
                        setLoadTimeout(true);
                        setIsLoading(false);
                    }
                }, 5000);

                const video = document.createElement('video');
                video.src = demo.content;
                video.onloadeddata = () => {
                    setIsLoaded(true);
                    setIsLoading(false);
                };
                video.onerror = () => {
                    setVideoError(true);
                    setIsLoading(false);
                };

                return () => clearTimeout(timeoutId);
            }
        } else {
            setIsLoaded(true);
            setIsLoading(false);
        }
    }, [demo, isMobileLike, isLoaded]);

    const LoadingPlaceholder = () => (
        <motion.div 
            variants={animations.loading}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center bg-slate-50"
        >
            <div className="w-8 h-8 border-2 border-navy-600/20 border-t-navy-600 rounded-full animate-spin" />
        </motion.div>
    );

    const renderVideo = () => {
        if ((isMobileLike || videoError || loadTimeout) && demo.fallbackImage) {
            return (
                <motion.img
                    variants={animations.content}
                    initial="hidden"
                    animate="visible"
                    src={demo.fallbackImage}
                    alt={title}
                    className="w-full aspect-[16/10] object-cover"
                    loading="eager"
                />
            );
        }

        if (!isMobileLike) {
            return (
                <motion.video
                    variants={animations.content}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    src={demo.content as string}
                    className="w-full aspect-[16/10] object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={() => {
                        setIsLoaded(true);
                        setLoadTimeout(false);
                    }}
                    onError={() => setVideoError(true)}
                />
            );
        }

        return null;
    };

    const renderDemo = () => {
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

        if (demo.type === 'video') {
            return renderVideo();
        }

        if (demo.isMobile && typeof demo.content === 'string') {
            return (
                <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-black-50 to-black-100">
                    <motion.div 
                        variants={animations.content}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="relative h-[90%] py-2">
                            <img
                                src={demo.content}
                                alt={title}
                                className="h-full w-auto object-contain mx-auto rounded-xl shadow-lg"
                                onLoad={() => setIsLoaded(true)}
                                loading="eager"
                            />
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -left-2 top-1/3 w-1 h-1 bg-white-200 rounded-full" />
                                <div className="absolute -left-2 top-2/3 w-1 h-1 bg-white-200 rounded-full" />
                                <div className="absolute -right-2 top-1/3 w-1 h-1 bg-white-200 rounded-full" />
                                <div className="absolute -right-2 top-2/3 w-1 h-1 bg-white-200 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            );
        }

        return (
            <motion.img
                variants={animations.content}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                src={demo.content as string}
                alt={title}
                className="w-full aspect-[16/10] object-cover"
                onLoad={() => setIsLoaded(true)}
                loading="eager"
            />
        );
    };

    const DemoContainer = () => {
        if (!demo.isMobile) {
            return (
                <div className="relative">
                    <AnimatePresence>
                        {isLoading && <LoadingPlaceholder />}
                    </AnimatePresence>

                    <div className="absolute top-0 left-0 right-0 h-7 bg-black rounded-t-lg flex items-center px-3 z-20">
                        <motion.div 
                            className="flex items-center gap-1.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57]/80 group-hover:bg-[#FF5F57] transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]/80 group-hover:bg-[#FEBC2E] transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-[#28C840]/80 group-hover:bg-[#28C840] transition-colors" />
                        </motion.div>
                        
                        <motion.div 
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="font-mono text-[10px] text-white/50">
                                {title}
                            </span>
                        </motion.div>
                    </div>

                    <div className="pt-7">
                        {renderDemo()}
                    </div>
                </div>
            );
        }

        return (
            <div className="relative">
                <AnimatePresence>
                    {isLoading && <LoadingPlaceholder />}
                </AnimatePresence>
                {renderDemo()}
            </div>
        );
    };

    return (
        <motion.div 
            className={`
                bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden 
                border border-slate-200/20 
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]
                hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)]
                hover:border-slate-200/30
                transition-all duration-500 ease-out
                max-w-md mx-auto w-full flex flex-col group relative
                ${link ? 'cursor-pointer' : ''}
            `}
            onClick={() => link && (window.location.href = link)}
            variants={animations.card}
            initial="hidden"
            animate="visible"
            custom={custom}
            layout
            whileHover={{ y: -4 }}
        >
            <motion.div className="relative bg-white/5 flex-shrink-0" layout>
                <DemoContainer />
            </motion.div>

            <motion.div 
                className="p-6 flex flex-col flex-grow"
                variants={animations.content}
                initial="hidden"
                animate="visible"
                layout
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
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white transition-colors duration-200"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <GitHubIcon className="w-5 h-5" />
                            </a>
                        )}
                        {deployedLink && (
                            <a
                                href={deployedLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white transition-colors duration-200"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

                <p className="font-secondary text-sm leading-relaxed text-[#aab8d4] mb-4 flex-grow">
                    {description}
                </p>

                <div className="mt-auto space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                        {techStack.map((tech, index) => (
                            <div 
                                key={index}
                                className="bg-black/50 px-2 py-1 rounded-full flex items-center gap-1.5
                                         hover:bg-slate hover:shadow-sm transition-all duration-200"
                            >
                                <div className="w-4 h-4 flex items-center justify-center opacity-70
                                            group-hover:opacity-100 transition-opacity">
                                    {tech.icon}
                                </div>
                                <span className="font-main text-[10px] text-white/75">{tech.name}</span>
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
                                            <a
                                                href={contributor.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-white transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
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