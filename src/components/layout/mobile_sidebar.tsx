// MobileSidebar.tsx
import { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AiIcon, CyberIcon, DevIcon } from '../../assets/icons/project_types';

interface Project {
    id: string;
    name: string;
    type: 'dev' | 'security' | 'ai';
    path: string; // Added path property
}

interface MobileSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
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

const MobileSidebar = ({ isOpen, setIsOpen }: MobileSidebarProps) => {
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project.id);
        navigate(project.path);
        setIsOpen(false); // Close sidebar after navigation
    };

    return (
        <>
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 bg-[#21333D]/95 backdrop-blur-sm z-50 px-4 py-3">
                <div className="w-full flex items-center justify-between">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className=" text-white hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-[#394E5F]/50 hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)] active:shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <button 
                        onClick={() => {
                            navigate('/');
                            setSelectedProject(null);
                            setIsOpen(false);
                        }}
                        className="text-white hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-[#394E5F]/50 hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)] active:shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
                    >
                        <Home className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Slide-out Menu */}
            <div 
                className={`fixed inset-0 bg-black/100 backdrop-blur-sm z-40 transition-all duration-300 
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            >
                <div 
                    className={`fixed left-0 top-0 h-full w-80 transform transition-transform duration-300 ease-in-out
                        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="h-full rounded-r-xl shadow-[0_8px_32px_rgba(255,255,255,0.1)]">
                        <div className="h-full bg-[#21333D]/50 p-6 text-gray-400 backdrop-blur-sm rounded-r-xl pt-20">
                            <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
                                <div className="space-y-2 py-4">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            onClick={() => handleProjectClick(project)}
                                            className={`
                                                flex items-center justify-between py-3 px-4 
                                                rounded-lg transition-all duration-200 ease-in-out
                                                cursor-pointer font-jetbrains text-lg
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
        </>
    );
};

export default MobileSidebar;