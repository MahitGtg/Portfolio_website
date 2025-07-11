// src/data/projects.ts

import React, { useState, useEffect, useRef } from 'react';
import {
  HTMLIcon, CSSIcon, JsIcon, ReactIcon, TailwindIcon, TypeScriptIcon,
  NextjsIcon, FlaskIcon, PostgresIcon, PythonIcon, GitIcon, DjangoIcon, VueIcon, StrapiIcon, SvelteIcon, BootstrapIcon,
  CIcon
} from '../../assets/icons/technologies';
import { FileSearch, Lock, ShieldCheck, Swords } from 'lucide-react';
import ProjectFilters, { ProjectCategory } from './ProjectFilters';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

// Import your assets
import PenniShowcase from '../../assets/project_images/iphone_image.png';
import VirusWare from '../../assets/project_images/virusware.jpg';
import FitTrakerImgae from '../../assets/project_images/fitTrakerImage.jpeg';
import BlueCrewImage from '../../assets/project_images/bluecrew.jpg';
import AraTang from '../../assets/project_images/AraTang.jpg';
import Bookify from '../../assets/project_images/Bookify.jpg';
import Networks from '../../assets/project_images/networks.jpg';
import SecureAccess from '../../assets/project_images/Access_Control.jpg';

// This hook checks if the component is visible in the viewport
const useIsVisible = (ref: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
};

// Optimized MTD Demo Component
export const MTDDemo = () => {
  const [scanIndex, setScanIndex] = useState(0);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run animations when the component is visible
    if (isVisible) {
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Start a new interval
      intervalRef.current = setInterval(() => {
        setScanIndex(prev => (prev + 1) % 24);
        const numActiveNodes = Math.floor(Math.random() * 3) + 2;
        const newActiveNodes = Array.from(
          { length: numActiveNodes },
          () => Math.floor(Math.random() * 24)
        );
        setActiveNodes(newActiveNodes);
      }, 1500);
    } else {
      // Stop animations when not visible
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#0a0f1e] p-4">
      <div className="relative w-full h-full bg-[#141b2d]/50 rounded-lg border border-[#1b2438] overflow-hidden">
        {/* Grid lines - Simplified to reduce rendering cost */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: isVisible ?
              'radial-gradient(circle at center, transparent 0%, transparent 90%, rgba(59, 130, 246, 0.05) 100%)' :
              'none',
            backgroundSize: '4rem 4rem'
          }}
        />

        {/* Grid */}
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-1 p-3">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className={`
                relative rounded-lg border
                ${isVisible ? 'transition-all duration-500' : ''}
                ${isVisible && index === scanIndex
                  ? 'bg-[#0051d4]/10 border-[#0051d4]/30'
                  : isVisible && activeNodes.includes(index)
                    ? 'bg-[#024b2c]/20 border-[#024b2c]/40'
                    : 'bg-[#141b2d]/50 border-[#1b2438]'}
              `}
            >
              {isVisible && (
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
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// Optimized Resistance Demo Component
export const ResistanceDemo = () => {
  const [missionStatus, setMissionStatus] = useState<'success' | 'fail'>('success');
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize particles to avoid recreating them on each render

  useEffect(() => {
    // Only run animations when the component is visible
    if (isVisible) {
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Alternate between success and fail states
      intervalRef.current = setInterval(() => {
        setMissionStatus(prev => prev === 'success' ? 'fail' : 'success');
      }, 2000);
    } else {
      // Stop animations when not visible
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#0a0f1e] p-4">
      <div className={`
        relative w-full h-full rounded-lg overflow-hidden border
        ${isVisible ? 'transition-all duration-1000' : ''}
        ${isVisible && missionStatus === 'fail'
          ? 'bg-[#1a0f0f] border-[#ef4444]/30'
          : 'bg-[#0f1a1a] border-[#3b82f6]/30'}
      `}>

        {/* Central Icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Fail Icon */}
          <div className={`
            absolute transition-all duration-1000 transform
            ${isVisible && missionStatus === 'fail' ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          `}>
            <Swords className="w-16 h-16 text-[#ef4444]" />
          </div>

          {/* Success Icon */}
          <div className={`
            absolute transition-all duration-1000 transform
            ${isVisible && missionStatus === 'success' ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          `}>
            <ShieldCheck className="w-16 h-16 text-[#3b82f6]" />
          </div>
        </div>

        {/* Only add the styles when the component is visible */}
        {isVisible && (
          <style>{`
            @keyframes float {
              0% { transform: translate(-50%, -50%) translateY(-10px); }
              100% { transform: translate(-50%, -50%) translateY(10px); }
            }
          `}</style>
        )}
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
    fallbackImage?: string;
  };
  githubLink?: string;
  deployedLink?: string;
  contributors?: {
    name: string;
    role?: string;
    link?: string;
  }[]
  link?: string;
}

export const projectsData: ProjectData[] = [
  {
    title: 'AraTang Portfolio Website',
    type: 'Full Stack Development',
    description: "Working in a startup, designed and developed a portfolio website for a client's architecture firm. Utilized Svelte for the frontend, Strapi as the content management system, and TypeScript along with Dev Container for the development environment.",

    techStack: [
      { name: 'Svelte', icon: <SvelteIcon /> },
      { name: 'Strapi', icon: <StrapiIcon /> },
      { name: 'TypeScript', icon: <TypeScriptIcon /> }
    ],
    demo: {
      type: 'image',
      content: AraTang
    },
    contributors: [
      { name: "0x3f Labs", role: "Organization", link: "https://www.linkedin.com/company/0x3f-labs/posts/?feedView=all" }

    ],
    deployedLink: 'https://aratang.com/',
    link: 'https://aratang.com/',
  },
  {
    title: 'BlueCrew',
    type: 'Full Stack Development',
    description: "Connect people to the ocean and inspire positive actions for local blue spaces. I worked mainly as a backend developer connecting frontend with backend api and working on user modals/views but also did some frontend and UI/UX design work.",

    techStack: [
      { name: 'Vue.js', icon: <VueIcon /> },
      { name: 'Django', icon: <DjangoIcon /> },
      { name: 'TypeScript', icon: <TypeScriptIcon /> }
    ],
    demo: {
      type: 'image',
      content: BlueCrewImage
    },
    contributors: [
      { name: "Coders For Causes", role: "Organization", link: "https://codersforcauses.org" }

    ],
    githubLink: 'https://github.com/codersforcauses/bluecrew',
    deployedLink: 'https://blingo.com.au/',
    link: 'https://blingo.com.au/'
  },
  {
    title: 'FitTraker',
    type: 'Full Stack Development',
    description: "A full-stack fitness assessment platform enabling tracking and visualization of student fitness data across university units. Built for UWA's Sport Science department, it features comprehensive data analysis tools with integrated outlier detection to provide real-time, cohort-specific fitness benchmarks",
    techStack: [
      { name: 'JavaScript', icon: <JsIcon /> },
      { name: 'HTML', icon: <HTMLIcon /> },
      { name: 'CSS', icon: <CSSIcon /> },
      { name: 'Flask', icon: <FlaskIcon /> },
      { name: 'PostgreSQL', icon: <PostgresIcon /> },
    ],
    demo: {
      type: 'image',
      content: FitTrakerImgae,
      fallbackImage: FitTrakerImgae
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
    link: 'https://penni.codersforcauses.org/'
  },
  {
    title: 'Bookify',
    type: 'Full Stack Development',
    description: 'A web application that allows users to search for books, add them to their library, and track their reading progress. Also allows users to visualize their reading patterns. Uses Google Books API to search for books and D3.js to visualize reading patterns.',
    techStack: [
      { name: 'JavaScript', icon: <JsIcon /> },
      { name: 'HTML', icon: <HTMLIcon /> },
      { name: 'CSS', icon: <CSSIcon /> },
      { name: 'Flask', icon: <FlaskIcon /> },
      { name: 'Bootstrap', icon: <BootstrapIcon /> },
    ],
    demo: {
      type: 'image',
      content: Bookify,
    },
    githubLink: 'https://github.com/MahitGtg/Bookify-web-app',
    contributors: [
      { name: "University of Western Australia", role: "Project", link: "https://www.uwa.edu.au/" }

    ],
    link: 'https://github.com/MahitGtg/Bookify-web-app/'
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
  },
  {
    title: 'Multiplayer Battleship Server',
    type: 'Computer Networks',
    description: 'A robust multiplayer Battleship server with advanced networking features including concurrent connections, spectator mode, reconnection support, and real-time chat. Implements custom protocol design with data integrity verification and comprehensive error handling.',
    techStack: [
      { name: 'Python', icon: <PythonIcon /> },
      { name: 'Git', icon: <GitIcon /> }
    ],
    demo: {
      type: 'image',
      content: Networks
    },
    githubLink: 'https://github.com/MahitGtg/Battleships-Computer-Networks'
  },
  {
    title: 'Secure Access Control System',
    type: 'System Design',
    description: 'A secure authentication and account management system for an online gaming platform. Implemented in C with Argon2id password hashing, comprehensive input validation, and thread-safe operations. Features advanced security testing with fuzzing and unit testing for critical security functions.',
    techStack: [
      { name: 'C', icon: <CIcon /> },
      { name: 'Git', icon: <GitIcon /> }
    ],
    demo: {
      type: 'image',
      content: SecureAccess
    },
    githubLink: 'https://github.com/MahitGtg/Secure_Access_Control_System_OO'
  }
];

// Add category mapping
const projectCategories: Record<string, ProjectCategory> = {
  'Full Stack Development': 'web',
  'Front-End Development': 'web',
  'Web Development': 'web',
  'Evasive Cybersecurity': 'cybersecurity',
  'Defensive Cybersecurity': 'cybersecurity',
  'Artificial Intelligence': 'ai',
  'Computer Networks': 'other',
  'System Design': 'other'
};

// Add Projects component
export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projectsData.filter(project =>
    activeCategory === 'all' || projectCategories[project.type] === activeCategory
  );

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 py-8">
      <ProjectFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProjectCard
              {...project}
              custom={index}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-white/60 text-lg">
            No projects found in this category.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
