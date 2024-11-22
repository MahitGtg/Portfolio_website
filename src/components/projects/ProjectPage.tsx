import React, { useState } from 'react';
import { GitHubIcon } from '../../assets/icons/socials';
import { ExternalLink } from 'lucide-react';
import { useViewport } from '../../hooks/useViewport';
import Sidebar from '../layout/Sidebar';
import MobileSidebar from '../layout/mobile_sidebar';
import { motion } from 'framer-motion';

interface ProjectTitle {
    type: 'combined' | 'image' | 'text';  
    text?: string;
    image?: any;  
    imageComponent?: React.ReactNode;
    link?: string;
}

interface ProjectContent {
    title: ProjectTitle;
    description: string;
    githubLink?: string;
    deployedLink?: string;
    contributors?: {
        name: string;
        role?: string;
        link?: string;  
    }[];
    techStack: {
        name: string;
        icon: React.ReactNode;
    }[];
    demo: {
        type: 'image' | 'video' | 'interactive';
        content: string | React.ReactNode;
        isDesktop?: boolean;
        isMobile?: boolean;
    };
}

const ProjectPage = ({ content }: { content: ProjectContent }) => {
    const { isMobileLike } = useViewport();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderTitle = () => {
        const titleContent = (
            <motion.div 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-center">
                    {(content.title.type === 'image' || content.title.type === 'combined') && 
                        (content.title.image ? (
                            <img 
                                src={content.title.image} 
                                alt="Project logo" 
                                className="h-12 object-contain"
                            />
                        ) : content.title.imageComponent)
                    }
                    {(content.title.type === 'text' || content.title.type === 'combined') && (
                        <span className="text-white text-4xl font-azerat font-bold">
                            {content.title.text}
                        </span>
                    )}
                    <motion.div 
                        className="flex items-center gap-2 ml-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15, delay: 0.1 }}
                    >
                        {content.githubLink && (
                            <a 
                                href={content.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-60 hover:opacity-100 transition-all duration-200"
                            >
                                <GitHubIcon/>
                            </a>
                        )}
                        {content.deployedLink && (
                            <a 
                                href={content.deployedLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-60 hover:opacity-100 transition-all duration-200"
                            >
                                <ExternalLink className="w-8 h-8 text-white" />
                            </a>
                        )}
                    </motion.div>
                </div>
    
                <motion.div 
                    className="flex flex-wrap gap-3 mt-4 sm:mt-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                >
                    {content.techStack.map((tech, index) => (
                        <div 
                            key={index} 
                            className="group relative cursor-pointer"
                        >
                            <motion.div 
                                className="w-7 h-7 opacity-60 hover:opacity-100 transition-all duration-150"
                                whileHover={{ scale: 1.15 }}
                            >
                                {tech.icon}
                            </motion.div>
                            <div 
                                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                                    pointer-events-none opacity-0 group-hover:opacity-100
                                    transition-all duration-150 ease-out"
                            >
                                <div className="bg-[#1a1a1a]/80 px-2 py-1 rounded-md backdrop-blur-sm">
                                    <span className="whitespace-nowrap text-xs font-mono text-gray-400">
                                        {tech.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        );
    
        return content.title.link ? (
            <a 
                href={content.title.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-all duration-200"
            >
                {titleContent}
            </a>
        ) : titleContent;
    };

    const renderDeviceFrame = () => {
        const demoContent = content.demo.content;
        
        if (content.demo.isMobile) {
            return (
                <motion.div 
                    className="relative max-w-[350px]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="rounded-3xl overflow-hidden">
                        {typeof demoContent === 'string' ? (
                            content.demo.type === 'video' ? (
                                <video 
                                    src={demoContent} 
                                    controls 
                                    className="w-full object-cover"
                                />
                            ) : (
                                <img 
                                    src={demoContent} 
                                    alt="Project demo" 
                                    className="w-full object-cover"
                                />
                            )
                        ) : (
                            demoContent
                        )}
                    </div>
                </motion.div>
            );
        }

        if (content.demo.isDesktop) {
            return (
                <motion.div 
                    className="relative w-full aspect-[16/9] bg-[#1a1a1a] rounded-lg p-3 shadow-xl mt-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex gap-2 absolute top-2 left-4">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="w-full h-full overflow-hidden rounded bg-white mt-4">
                        {typeof demoContent === 'string' ? (
                            content.demo.type === 'interactive' ? (
                                <iframe
                                    src={demoContent}
                                    className="w-full h-full border-none"
                                    title="Project Demo"
                                />
                            ) : content.demo.type === 'video' ? (
                                <video 
                                    src={demoContent} 
                                    controls 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img 
                                    src={demoContent} 
                                    alt="Project demo" 
                                    className="w-full h-full object-cover"
                                />
                            )
                        ) : (
                            demoContent
                        )}
                    </div>
                </motion.div>
            );
        }

        return null;
    };

    const renderContributors = () => (
        <motion.div 
            className="flex flex-wrap gap-x-4 gap-y-0 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
        >
            {content.contributors?.map((contributor, index) => (
                <div 
                    key={index}
                    className="flex items-center gap-2"
                >
                    {contributor.link ? (
                        <a 
                            href={contributor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <span className="font-cutive">{contributor.name}</span>
                        </a>
                    ) : (
                        <span className="text-gray-400 font-cutive">{contributor.name}</span>
                    )}
                    {contributor.role && (
                        <span className="text-gray-500 font-cutive text-sm">
                            ({contributor.role})
                        </span>
                    )}
                </div>
            ))}
        </motion.div>
    );

    const renderInfo = () => (
        <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="space-y-3">
                <p className="text-gray-400 font-roboto font-medium">
                    {content.description}
                </p>
                {content.contributors && content.contributors.length > 0 && renderContributors()}
            </div>
        </motion.div>
    );

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
            <motion.main 
                className={`
                    flex-1 
                    overflow-y-auto 
                    scrollbar-none 
                    relative 
                    touch-pan-y
                `}
                style={{
                    height: isMobileLike ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
                    WebkitOverflowScrolling: 'touch'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                <div className={`w-full ${isMobileLike ? 'pt-20 px-6 pb-8' : 'p-6'}`}>
                    {isMobileLike ? (
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-4">
                                {renderTitle()}
                                {renderDeviceFrame()}
                            </div>
                            <div className="space-y-4 mt-6">
                                {renderInfo()}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto">
                            {content.demo.isMobile ? (
                                <>
                                    {renderTitle()}
                                    <div className="grid grid-cols-[400px_1fr] gap-10 mt-8">
                                        <div className="pt-4">
                                            {renderDeviceFrame()}
                                        </div>
                                        <div className="pt-4 -ml-6">
                                            {renderInfo()}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    {renderTitle()}
                                    {renderInfo()}
                                    <div className="w-full">
                                        {renderDeviceFrame()}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.main>
        </div>
    );
};

export default ProjectPage;