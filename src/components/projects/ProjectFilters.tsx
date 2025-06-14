import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield, Brain, Grid, MoreHorizontal } from 'lucide-react';
import AnimatedButton from '../AnimatedButton';

export type ProjectCategory = 'all' | 'web' | 'cybersecurity' | 'ai' | 'other';

interface ProjectFiltersProps {
    activeCategory: ProjectCategory;
    onCategoryChange: (category: ProjectCategory) => void;
}

const categories = [
    { id: 'all' as ProjectCategory, label: 'All Projects', icon: Grid },
    { id: 'web' as ProjectCategory, label: 'Web Development', icon: Code },
    { id: 'cybersecurity' as ProjectCategory, label: 'Cybersecurity', icon: Shield },
    { id: 'ai' as ProjectCategory, label: 'AI & ML', icon: Brain },
    { id: 'other' as ProjectCategory, label: 'Other', icon: MoreHorizontal }
];

const ProjectFilters = ({ activeCategory, onCategoryChange }: ProjectFiltersProps) => {
    return (
        <div className="flex flex-wrap gap-4 mb-6">
            {categories.map(({ id, label, icon: Icon }) => (
                <AnimatedButton
                    key={id}
                    onClick={() => onCategoryChange(id)}
                    variant="filter"
                    isActive={activeCategory === id}
                    icon={<Icon />}
                >
                    {label}
                </AnimatedButton>
            ))}
        </div>
    );
};



export default ProjectFilters;