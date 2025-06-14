import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';
import { useViewport } from '../../hooks/useViewport';
import type { ViewportType } from '../../types/viewport';
import ProjectCard from './ProjectCard';
import { projectsData } from './projects';
import ProjectFilters, { ProjectCategory } from './ProjectFilters';

interface ProjectsModalProps {
    isOpen: boolean;
    onClose: () => void;
    navigate: NavigateFunction;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
    const { viewportType } = useViewport();
    const isWideLayout = ['desktop', 'tablet-landscape'].includes(viewportType as ViewportType);
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

    // Map project types to categories
    const projectCategories: Record<string, ProjectCategory> = {
        'Full Stack Development': 'web',
        'Front-End Development': 'web',
        'Web Development': 'web',
        'Evasive Cybersecurity': 'cybersecurity',
        'Defensive Cybersecurity': 'cybersecurity',
        'Artificial Intelligence': 'ai',
        'Other': 'other'
    };

    // Filter projects based on active category
    const filteredProjects = activeCategory === 'all'
        ? projectsData
        : activeCategory === 'other'
            ? projectsData.filter(project => !Object.keys(projectCategories).includes(project.type))
            : projectsData.filter(project => projectCategories[project.type] === activeCategory);

    // Prevent scroll on body when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        className="relative w-[95%] max-w-5xl h-[90vh] mx-auto
                                 bg-black/70 rounded-2xl shadow-2xl overflow-hidden 
                                 border border-slate-200/20"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="absolute top-0 inset-x-0 h-16 bg-black/50 
                                      backdrop-blur-sm border-b border-slate-200/20 
                                      px-4 flex items-center justify-between z-10">
                            <div className="flex flex-col">
                                <h2 className="font-main text-2xl font-black text-white/75">Projects</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center
                                         hover:bg-black hover:shadow-soft hover:-translate-y-0.5
                                         transition-all duration-300"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Projects Content */}
                        <div
                            className="absolute inset-0 pt-16 pb-4 px-4 
                                      overflow-y-auto scrollbar-thin scrollbar-thumb-navy-200 
                                      scrollbar-track-transparent"
                            style={{
                                willChange: 'transform',
                                transform: 'translateZ(0)'
                            }}
                        >
                            {/* Filter Buttons */}
                            <div className="sticky top-0 pt-4 pb-2 bg-black/70 backdrop-blur-sm z-10">
                                <ProjectFilters
                                    activeCategory={activeCategory}
                                    onCategoryChange={setActiveCategory}
                                />
                            </div>

                            {/* Projects Grid */}
                            <div className={`grid gap-4 py-4 ${isWideLayout ? 'md:grid-cols-2' : ''}`}>
                                {filteredProjects.map((project) => (
                                    <ProjectCard
                                        key={project.title}
                                        {...project}
                                    />
                                ))}
                            </div>

                            {/* No Projects Message */}
                            {filteredProjects.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-white/50 font-secondary">
                                        No projects found in this category.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectsModal;