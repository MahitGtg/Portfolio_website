// src/data/projects.ts

import React from 'react';
import {
    HTMLIcon, CSSIcon, JsIcon, ReactIcon, TailwindIcon, TypeScriptIcon,
    NextjsIcon, FlaskIcon, PostgresIcon, PythonIcon, GitIcon, 
} from '../../assets/icons/technologies';
import { FileSearch, Lock, ShieldCheck, Swords } from 'lucide-react';

// Import your assets
import FitTrackerDemo from '../../assets/project_images/FitTraker_demo.mp4';
import PenniShowcase from '../../assets/project_images/iphone_image.png';
import VirusWare from '../../assets/project_images/virusware.png';
import kazooey from '../../assets/project_images/Kazooey.png';
import EditorPortfolio from '../../assets/project_images/Toymeet.png';

import { useState, useEffect } from 'react';


// MTD Demo Component
const MTDDemo = () => {
    const [scanIndex, setScanIndex] = React.useState(0);
    const [activeNodes, setActiveNodes] = React.useState<number[]>([]);

    React.useEffect(() => {
        const scanInterval = setInterval(() => {
            setScanIndex(prev => (prev + 1) % 24);
            const numActiveNodes = Math.floor(Math.random() * 3) + 2;
            const newActiveNodes = Array.from(
                { length: numActiveNodes }, 
                () => Math.floor(Math.random() * 24)
            );
            setActiveNodes(newActiveNodes);
        }, 1500);

        return () => clearInterval(scanInterval);
    }, []);

    return (
        <div className="w-full h-full bg-[#0a0f1e] p-4">
            <div className="relative w-full h-full bg-[#141b2d]/50 rounded-lg border border-[#1b2438] overflow-hidden">
                {/* Grid lines */}
                <div className="absolute inset-0" 
                    style={{
                        backgroundImage: 'radial-gradient(circle at center, transparent 0%, transparent 90%, rgba(59, 130, 246, 0.05) 100%)',
                        backgroundSize: '4rem 4rem'
                    }}
                />
                
                {/* Grid */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 p-3">
                    {Array.from({ length: 24 }).map((_, index) => (
                        <div
                            key={index}
                            className={`
                                relative rounded-lg transition-all duration-500 border
                                ${index === scanIndex 
                                    ? 'bg-[#0051d4]/10 border-[#0051d4]/30' 
                                    : activeNodes.includes(index)
                                        ? 'bg-[#024b2c]/20 border-[#024b2c]/40'
                                        : 'bg-[#141b2d]/50 border-[#1b2438]'}
                            `}
                        >
                            <div className={`
                                absolute inset-0 flex items-center justify-center
                                transition-opacity duration-300
                                ${index === scanIndex || activeNodes.includes(index) ? 'opacity-100' : 'opacity-0'}
                            `}>
                                {index === scanIndex ? (
                                    <FileSearch className="w-1/4 h-1/4 min-w-3 min-h-3 text-[#3b82f6]" />
                                ) : activeNodes.includes(index) ? (
                                    <Lock className="w-1/4 h-1/4 min-w-3 min-h-3 text-[#22c55e]" />
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0a0f1e]/80 backdrop-blur-sm px-4 py-2 border-t border-[#1b2438]">
                    <div className="flex items-center justify-between">
                        {/* Left side - status indicators */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                                <span className="text-[#3b82f6] font-mono text-xs">Scanning</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                                <span className="text-[#22c55e] font-mono text-xs">Protected</span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

const ResistanceDemo = () => {
    const [missionStatus, setMissionStatus] = useState<'success'|'fail'>('success');

    useEffect(() => {
        // Alternate between success and fail states
        const statusInterval = setInterval(() => {
            setMissionStatus(prev => prev === 'success' ? 'fail' : 'success');
        }, 2000);

        

        return () => {
            clearInterval(statusInterval);
        };
    }, []);

    return (
        <div className="w-full h-full bg-[#0a0f1e] p-4">
            <div className={`
                relative w-full h-full rounded-lg overflow-hidden border
                transition-all duration-1000
                ${missionStatus === 'fail' 
                    ? 'bg-[#1a0f0f] border-[#ef4444]/30' 
                    : 'bg-[#0f1a1a] border-[#3b82f6]/30'}
            `}>
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div 
                        className="absolute inset-0 opacity-10 transition-all duration-1000"
                        style={{
                            backgroundImage: `radial-gradient(circle, ${missionStatus === 'fail' ? '#ef4444' : '#3b82f6'} 1px, transparent 1px)`,
                            backgroundSize: '20px 20px',
                        }}
                    />
                </div>

                {/* Floating particles */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className={`
                            absolute w-1 h-1 rounded-full transition-all duration-1000
                            ${missionStatus === 'fail' ? 'bg-[#ef4444]' : 'bg-[#3b82f6]'}
                            opacity-20
                        `}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            transform: `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`,
                            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`
                        }}
                    />
                ))}

                {/* Central Icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Fail Icon */}
                    <div className={`
                        absolute transition-all duration-1000 transform
                        ${missionStatus === 'fail' ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                    `}>
                        <Swords className="w-16 h-16 text-[#ef4444]" />
                    </div>
                    
                    {/* Success Icon */}
                    <div className={`
                        absolute transition-all duration-1000 transform
                        ${missionStatus === 'success' ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                    `}>
                        <ShieldCheck className="w-16 h-16 text-[#3b82f6]" />
                    </div>
                </div>

                <style>{`
                    @keyframes float {
                        0% { transform: translate(-50%, -50%) translateY(-10px); }
                        100% { transform: translate(-50%, -50%) translateY(10px); }
                    }
                `}</style>
            </div>
        </div>
    );
};



export interface ProjectData {
    title: string;
    type: string;
    description: string;
    techStack: {
        name: string;
        icon: React.ReactNode;
    }[];
    demo: {
        type: 'image' | 'video' | 'interactive';
        content: string | React.ReactNode;
        isMobile?: boolean;
    };
    githubLink?: string;
    deployedLink?: string;
    contributors?: {
        name: string;
        role?: string;
        link?: string;
    }[];
}

export const projectsData: ProjectData[] = [
    {
        title: 'FitTraker',
        type: 'Full Stack Development',
        description: "A full-stack fitness assessment platform enabling tracking and visualization of student fitness data across university units. Built for UWA's Sport Science department, it features comprehensive data analysis tools with integrated outlier detection to provide real-time, cohort-specific fitness benchmarks.",
        techStack: [
            { name: 'Python', icon: <PythonIcon /> },
            { name: 'Flask', icon: <FlaskIcon /> },
            { name: 'PostgreSQL', icon: <PostgresIcon /> },
            { name: 'JavaScript', icon: <JsIcon /> }
        ],
        demo: {
            type: 'video',
            content: FitTrackerDemo
        },
        contributors: [
            { name: "The University of Western Australia", role: "Capstone Project", link: "https://www.uwa.edu.au/" },
        ]
    },
    {
        title: 'Penni',
        type: 'Front-End Development',
        description: 'A web platform helping pensioners find small, manageable jobs to earn supplementary income. As part of the frontend team, I developed user profiles and payout interfaces for this large-scale project.',
        techStack: [
            { name: 'TypeScript', icon: <TypeScriptIcon /> },
            { name: 'React', icon: <ReactIcon /> },
            { name: 'Next.js', icon: <NextjsIcon /> },
            { name: 'Tailwind', icon: <TailwindIcon /> }
        ],
        demo: {
            type: 'image',
            content: PenniShowcase,
            isMobile: true
        },
        githubLink: 'https://github.com/codersforcauses/penni',
        contributors: [
            { name: "Coders For Causes", role: "Organization", link: "https://codersforcauses.org" }
            
        ],
        deployedLink: 'https://penni.codersforcauses.org/',
    },
    {
        title: 'Editor Portfolio',
        type: 'Web Development',
        description: 'A showcase website for a video editor featuring their creative works, services, and professional journey. Built with fluid animations and a modern design to highlight portfolio pieces.',
        techStack: [
            { name: 'HTML', icon: <HTMLIcon /> },
            { name: 'CSS', icon: <CSSIcon /> },
            { name: 'JavaScript', icon: <JsIcon /> }
        ],
        demo: {
            type: 'image',
            content: EditorPortfolio
        },
        githubLink: 'https://github.com/MahitGtg/Toymeet_Portfolio_Website',
        deployedLink: 'https://toymeetedits.netlify.app/work'
    },
    {
        title: 'Kazooey',
        type: 'Web Development',
        description: 'A gamified sustainability platform built during a 48-hour Infosys x CFC hackathon, securing 3rd place ($800). The platform empowers workplace sustainability through an intuitive dashboard tracking environmental metrics, automated energy management, and administrative tools for analyzing departmental performance.',
        techStack: [
            { name: 'HTML', icon: <HTMLIcon /> },
            { name: 'CSS', icon: <CSSIcon /> },
            { name: 'JavaScript', icon: <JsIcon /> }
        ],
        demo: {
            type: 'image',
            content: kazooey
        },
        deployedLink: 'https://techno-uwa.wixsite.com/kasooey/tracker',
        contributors: [
            { name: "Coders For Causes", role: "Hackathon", link: "https://codersforcauses.org" }
            
        ]
    },
    {
        title: 'VirusWare',
        type: 'Evasive Cybersecurity',
        description: 'An educational cross-platform malware simulation created under 24 hours, demonstrating virus-like behavior including self-replication, evasion techniques, and encrypted data exfiltration. Built with a client-server architecture and tested in isolated environments.',
        techStack: [
            { name: 'Python', icon: <PythonIcon /> },
            { name: 'Git', icon: <GitIcon /> }
        ],
        demo: {
            type: 'image',
            content: VirusWare
        },
        githubLink: 'https://github.com/MahitGtg/Virusware'
    },
    {
        title: 'MTD File System',
        type: 'Defensive Cybersecurity',
        description: 'An enterprise-level cybersecurity solution featuring a custom Yara Engine for threat detection, dynamic encryption with Moving Target Defense (MTD), and automated security recommendations. The system provides comprehensive file system protection through multi-layered security measures.',
        techStack: [
            { name: 'Python', icon: <PythonIcon /> },
            { name: 'Git', icon: <GitIcon /> }
        ],
        demo: {
            type: 'interactive',
            content: <MTDDemo />
        },
        githubLink: 'https://github.com/MahitGtg/Rapido-Bank-by-Pile-',
        
    },
    {
        title: 'The Resistance',
        type: 'Artificial Intelligence',
        description: 'An intelligent game agent for The Resistance using Q-Learning and probabilistic reasoning to detect spies and make strategic decisions. The system combines dynamic trust scoring with expert player heuristics.',
        techStack: [
            { name: 'Python', icon: <PythonIcon /> },
            { name: 'Git', icon: <GitIcon /> }
        ],
        demo: {
            type: 'interactive',
            content: <ResistanceDemo /> // Add actual image
        },
        githubLink: 'https://github.com/MahitGtg/The-Resistance-Agent'
    }
];

export default projectsData;
