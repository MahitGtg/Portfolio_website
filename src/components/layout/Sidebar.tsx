import React, { useState, useEffect, useCallback } from 'react';
import { Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiIcon, CyberIcon, DevIcon } from '../../assets/icons/project_types';

interface Project {
    id: string;
    name: string;
    type: 'dev' | 'security' | 'ai';
    path: string;
}

const projects: Project[] = [
    { id: 'fittraker', name: 'FitTraker', type: 'dev', path: '/projects/fitTracker' },
    { id: 'penni', name: 'Penni', type: 'dev', path: '/projects/penni' },
    { id: 'editor-portfolio', name: 'Editor Portfolio', type: 'dev', path: '/projects/editor_portfolio' },
    { id: 'kazooey', name: 'Kazooey', type: 'dev', path: '/projects/kazooey' },
    { id: 'virusware', name: 'Virusware', type: 'security', path: '/projects/virusware' },
    { id: 'mtd-file-system', name: 'MTD File System', type: 'security', path: '/projects/mtdfile' },
    { id: 'resistance', name: 'The Resistance', type: 'ai', path: '/projects/resistance' }
];

const getIcon = (type: Project['type']) => {
    const iconClass = "w-5 h-5 opacity-75 flex items-center";

    switch (type) {
        case 'dev':
            return <div className={iconClass}><DevIcon /></div>;
        case 'security':
            return <div className={iconClass}><CyberIcon /></div>;
        case 'ai':
            return <div className={iconClass}><AiIcon /></div>;
        default:
            return null;
    }
};

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [scrollY, setScrollY] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        setScrollY(target.scrollTop);
        if (!isScrolling) {
            setIsScrolling(true);
            requestAnimationFrame(() => setIsScrolling(false));
        }
    }, [isScrolling]);

    useEffect(() => {
        const currentProject = projects.find(project => project.path === location.pathname);
        if (currentProject) {
            setSelectedProject(currentProject.id);
        } else {
            setSelectedProject(null);
        }
    }, [location.pathname]);

    const getScale = (index: number) => {
        if (hoveredIndex === null) {
            return 1;
        }
        const distance = Math.abs(index - hoveredIndex);
        if (distance === 0) {
            return 1.08;
        }
        if (distance === 1) {
            return 1.04;
        }
        return 1;
    };

    const getParallaxStyle = (index: number) => {
        const baseTransform = `scale(${getScale(index)})`;
        const parallaxY = isScrolling ? scrollY * -0.1 * (index + 1) : 0;
        return {
            transform: `${baseTransform} translateY(${parallaxY}px)`,
            transformOrigin: 'center center',
            zIndex: hoveredIndex === index ? 10 : 1,
        };
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project.id);
        navigate(project.path);
    };

    return (
        <div className="h-screen py-4 px-6">
            <div 
                className="w-80 h-full rounded-xl shadow-[0_8px_32px_rgb(0,0,0,0.25)] transition-shadow duration-300 relative overflow-hidden"
                style={{
                    background: `linear-gradient(165deg, 
                        rgba(33, 51, 61, 0.4) 0%, 
                        rgba(33, 51, 61, 0.6) 50%, 
                        rgba(33, 51, 61, 0.4) 100%)`
                }}
            >
                {/* Animated background gradient */}
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#21333D]/20 to-transparent"
                    style={{
                        transform: `translateY(${scrollY * 0.05}px)`,
                        transition: 'transform 0.2s ease-out'
                    }}
                />

                <div className="h-full p-6 text-gray-400 backdrop-blur-sm rounded-xl relative">
                    {/* Header */}
                    <div 
                        className="flex flex-col items-center mb-12"
                        style={{
                            transform: `translateY(${scrollY * -0.02}px)`,
                            transition: 'transform 0.2s ease-out'
                        }}
                    >
                        <div className="w-full flex items-center justify-between">
                            <button 
                                onClick={() => {
                                    navigate('/');
                                    setSelectedProject(null);
                                }}
                                className="hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-[#394E5F]/50 hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)] active:shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
                            >
                                <Home className="w-6 h-6" />
                            </button>
                            <div className="flex-1 text-center">
                                <h1 className="text-white text-2xl font-nunito font-extrabold">Projects</h1>
                            </div>
                            <div className="w-6" />
                        </div>
                    </div>

                    {/* Projects List Container */}
                    <div className="relative">
                        <div 
                            className="overflow-y-auto max-h-[calc(100vh-220px)] px-3 -mx-3"
                            onScroll={handleScroll}
                        >
                            <div className="space-y-2 py-4">
                                {projects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        onClick={() => handleProjectClick(project)}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        style={getParallaxStyle(index)}
                                        className={`
                                            flex items-center justify-between py-3 px-4 
                                            rounded-lg transition-all duration-300 ease-out
                                            cursor-pointer font-jetbrains text-lg
                                            hover:backdrop-blur-lg
                                            ${selectedProject === project.id 
                                                ? 'bg-[#394E5F]/50 text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:shadow-[0_6px_20px_rgba(0,0,0,0.35)]' 
                                                : 'hover:bg-[#707778]/25 hover:text-gray-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)] active:shadow-[0_4px_12px_rgba(0,0,0,0.25)]'
                                            }
                                        `}
                                    >
                                        <span>{project.name}</span>
                                        <div className={`opacity-60 transition-transform duration-200 ${
                                            selectedProject === project.id ? 'transform scale-110' : ''
                                        }`}>
                                            {getIcon(project.type)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;