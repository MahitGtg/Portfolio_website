// src/data/projects.ts

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import {
  AndroidIcon,
  AppleIcon,
  BootstrapIcon,
  CIcon,
  CSSIcon,
  DjangoIcon,
  ExpoIcon,
  FlaskIcon,
  GitIcon,
  HTMLIcon,
  JsIcon,
  JupyterIcon,
  NextjsIcon,
  PostgresIcon,
  PyTorchIcon,
  PythonIcon,
  ReactIcon,
  StrapiIcon,
  SupabaseIcon,
  SvelteIcon,
  SwiftIcon,
  TailwindIcon,
  TypeScriptIcon,
  VueIcon,
} from "../../assets/icons/technologies";
import ProjectCard from "./ProjectCard";
import ProjectFilters, { ProjectCategory } from "./ProjectFilters";
import BattleshipDemo from "./demos/BattleshipDemo";
import CafeSimulatorDemo from "./demos/CafeSimulatorDemo";
import MTDDemo from "./demos/MTDDemo";
import NLIDemo from "./demos/NLIDemo";
import ResistanceDemo from "./demos/ResistanceDemo";
import SecureAccessDemo from "./demos/SecureAccessDemo";
import TabKeysDemo from "./demos/TabKeysDemo";
import VirusWareDemo from "./demos/VirusWareDemo";

// Import your assets
import AraTang from "../../assets/project_images/AraTang.jpg";
import Bookify from "../../assets/project_images/Bookify.jpg";
import WeightPalImage from "../../assets/project_images/WeightPal Group 36763.png";
import BlueCrewImage from "../../assets/project_images/bluecrew.jpg";
import FitTrakerImgae from "../../assets/project_images/fitTrakerImage.jpeg";
import PenniShowcase from "../../assets/project_images/iphone_image.png";

export interface ProjectData {
  title: string;
  type: string;
  description: string;
  techStack: {
    name: string;
    icon: React.ReactNode;
  }[];
  demo: {
    type: "image" | "video" | "interactive";
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
  link?: string;
}

export const projectsData: ProjectData[] = [
  {
    title: "TabKeys",
    type: "Artificial Intelligence",
    description:
      "A macOS menu bar app for system-wide AI completions. Type anywhere, pause briefly or press Tab to trigger suggestions from Claude or GPT-4o-mini, then accept with Tab. Built with Swift; uses Accessibility API for context and stores API keys in Keychain.",
    techStack: [
      { name: "macOS", icon: <AppleIcon /> },
      { name: "Git", icon: <GitIcon /> },
      { name: "Swift", icon: <SwiftIcon /> },
    ],
    demo: {
      type: "interactive",
      content: <TabKeysDemo />,
    },
    githubLink: "https://github.com/MahitGtg/TabKeys",
    link: "https://github.com/MahitGtg/TabKeys",
  },
  {
    title: "WeightPal",
    type: "Mobile App Development",
    description:
      "Holistic weight loss companion app focused on three pillars: Sleep, Stress Management, and Nutrition. Track sleep and stress with guided practices, and snap a photo of your meals to see nutrition macros with analytics across all meals. Available on App Store and Google Play.",
    techStack: [
      { name: "iOS", icon: <AppleIcon /> },
      { name: "Android", icon: <AndroidIcon /> },
      { name: "Expo", icon: <ExpoIcon /> },
      { name: "Supabase", icon: <SupabaseIcon /> },
    ],
    demo: {
      type: "image",
      content: WeightPalImage,
      isMobile: true,
    },
    deployedLink: "https://www.weightpal.app/",
    link: "https://www.weightpal.app/",
  },
  {
    title: "Natural Language Inference (NLI)",
    type: "Artificial Intelligence",
    description:
      "Comparative study of neural architectures for NLI: BiGRU, Variational Siamese Autoencoder (VSAE), and Self-Attention Transformer. My contributions: Transformer models and architecture, self-attention vs cross-attention ablation study, attention analysis and visualization.",
    techStack: [
      { name: "Python", icon: <PythonIcon /> },
      { name: "PyTorch", icon: <PyTorchIcon /> },
      { name: "Git", icon: <GitIcon /> },
    ],
    demo: {
      type: "interactive",
      content: <NLIDemo />,
    },
    githubLink: "https://github.com/MahitGtg/nlp-project",
    contributors: [
      {
        name: "James Wigfield",
        role: "VSAE, Ablation",
        link: "https://github.com/JamesW293",
      },
      {
        name: "Mitchell Otley",
        role: "BiGRU, Preprocessing",
        link: "https://github.com/just1mitch",
      },
    ],
    link: "https://github.com/MahitGtg/nlp-project",
  },
  {
    title: "Café Wait Time Simulator",
    type: "Other",
    description:
    "Stochastic agent-based simulation of a café queuing system, modelling M/M/1 dynamics with Poisson arrivals and exponential service times. Expores how arrival rates, service capacity, and staffing levels drive nonlinear congestion — validating Little's Law and demonstrating that adding a second barista at moderate load can cut average wait times by over 90%.",
    techStack: [
      { name: "Python", icon: <PythonIcon /> },
      { name: "Jupyter", icon: <JupyterIcon /> },
      { name: "Git", icon: <GitIcon /> },
    ],
    demo: {
      type: "interactive",
      content: <CafeSimulatorDemo />,
    },
    githubLink: "https://github.com/MahitGtg/computational-modeling-project",
    contributors: [
      {
        name: "Alexandra Harrison",
        role: "Collaborator",
        link: "https://github.com/allyharrison",
      },
    ],
    link: "https://github.com/MahitGtg/computational-modeling-project",
  },
  {
    title: "AraTang Portfolio Website",
    type: "Full Stack Development",
    description:
      "Working in a startup, designed and developed a portfolio website for a client's architecture firm. Utilized Svelte for the frontend, Strapi as the content management system, and TypeScript along with Dev Container for the development environment.",
    techStack: [
      { name: "Svelte", icon: <SvelteIcon /> },
      { name: "Strapi", icon: <StrapiIcon /> },
      { name: "TypeScript", icon: <TypeScriptIcon /> },
    ],
    demo: {
      type: "image",
      content: AraTang,
    },
    contributors: [
      {
        name: "0x3f Labs",
        role: "Organization",
        link: "https://www.linkedin.com/company/0x3f-labs/posts/?feedView=all",
      },
    ],
    deployedLink: "https://aratang.com/",
    link: "https://aratang.com/",
  },
  {
    title: "BlueCrew",
    type: "Full Stack Development",
    description:
      "Connect people to the ocean and inspire positive actions for local blue spaces. I worked mainly as a backend developer connecting frontend with backend api and working on user modals/views but also did some frontend and UI/UX design work.",
    techStack: [
      { name: "Vue.js", icon: <VueIcon /> },
      { name: "Django", icon: <DjangoIcon /> },
      { name: "TypeScript", icon: <TypeScriptIcon /> },
    ],
    demo: {
      type: "image",
      content: BlueCrewImage,
    },
    contributors: [
      {
        name: "Coders For Causes",
        role: "Organization",
        link: "https://codersforcauses.org",
      },
    ],
    githubLink: "https://github.com/codersforcauses/bluecrew",
    deployedLink: "https://blingo.com.au/",
    link: "https://blingo.com.au/",
  },
  {
    title: "FitTraker",
    type: "Full Stack Development",
    description:
      "A full-stack fitness assessment platform enabling tracking and visualization of student fitness data across university units. Built for UWA's Sport Science department, it features comprehensive data analysis tools with integrated outlier detection to provide real-time, cohort-specific fitness benchmarks",
    techStack: [
      { name: "JavaScript", icon: <JsIcon /> },
      { name: "HTML", icon: <HTMLIcon /> },
      { name: "CSS", icon: <CSSIcon /> },
      { name: "Flask", icon: <FlaskIcon /> },
      { name: "PostgreSQL", icon: <PostgresIcon /> },
    ],
    demo: {
      type: "image",
      content: FitTrakerImgae,
      fallbackImage: FitTrakerImgae,
    },
    contributors: [
      {
        name: "The University of Western Australia",
        role: "Capstone Project",
        link: "https://www.uwa.edu.au/",
      },
    ],
  },
  
  {
    title: "Multiplayer Battleship Server",
    type: "Computer Networks",
    description:
    "Multiplayer Battleships over raw TCP sockets, implementing a multi-threaded client-server architecture with a FIFO lobby system, real-time spectator broadcasting, 60-second reconnection windows, and a custom binary protocol with CRC-16 checksum verification.",
    techStack: [
      { name: "Python", icon: <PythonIcon /> },
      { name: "Git", icon: <GitIcon /> },
    ],
    demo: {
      type: "interactive",
      content: <BattleshipDemo />,
    },
    githubLink: "https://github.com/MahitGtg/Battleships-Computer-Networks"
  },

  {
    title: "VirusWare",
    type: "Evasive Cybersecurity",
    description:
      "An educational cross-platform malware simulation created under 24 hours, demonstrating virus-like behavior including self-replication, evasion techniques, and encrypted data exfiltration. Built with a client-server architecture and tested in isolated environments.",
    techStack: [
      { name: "Python", icon: <PythonIcon /> },
      { name: "Git", icon: <GitIcon /> },
    ],
    demo: {
      type: "interactive",
      content: <VirusWareDemo />,
    },
    githubLink: "https://github.com/MahitGtg/Virusware",
  },
  {
    title: "MTD File System",
    type: "Defensive Cybersecurity",
    description:
      "An enterprise-level cybersecurity solution featuring a custom Yara Engine for threat detection, dynamic encryption with Moving Target Defense (MTD), and automated security recommendations. The system provides comprehensive file system protection through multi-layered security measures.",
    techStack: [
      { name: "Python", icon: <PythonIcon /> },
      { name: "Git", icon: <GitIcon /> },
    ],
    demo: {
      type: "interactive",
      content: <MTDDemo />,
    },
    githubLink: "https://github.com/MahitGtg/Rapido-Bank-by-Pile-",
  },
  {
    title: "Penni",
    type: "Front-End Development",
    description:
      "A web platform helping pensioners find small, manageable jobs to earn supplementary income. As part of the frontend team, I developed user profiles and payout interfaces for this large-scale project.",
    techStack: [
      { name: "TypeScript", icon: <TypeScriptIcon /> },
      { name: "React", icon: <ReactIcon /> },
      { name: "Next.js", icon: <NextjsIcon /> },
      { name: "Tailwind", icon: <TailwindIcon /> },
    ],
    demo: {
      type: "image",
      content: PenniShowcase,
      isMobile: true,
    },
    githubLink: "https://github.com/codersforcauses/penni",
    contributors: [
      {
        name: "Coders For Causes",
        role: "Organization",
        link: "https://codersforcauses.org",
      },
    ],
  },
  {
    title: "The Resistance",
    type: "Artificial Intelligence",
    description:
      "An intelligent game agent for The Resistance using Q-Learning and probabilistic reasoning to detect spies and make strategic decisions. The system combines dynamic trust scoring with expert player heuristics.",
    techStack: [
      { name: "Python", icon: <PythonIcon /> },
      { name: "Git", icon: <GitIcon /> },
    ],
    demo: {
      type: "interactive",
      content: <ResistanceDemo />,
    },
    githubLink: "https://github.com/MahitGtg/The-Resistance-Agent",
  },

  {
    title: "Secure Access Control System",
    type: "System Design",
    description:
      "A secure authentication and account management system for an online gaming platform. Implemented in C with Argon2id password hashing, comprehensive input validation, and thread-safe operations. Features advanced security testing with fuzzing and unit testing for critical security functions.",
    techStack: [
      { name: "C", icon: <CIcon /> },
      { name: "Git", icon: <GitIcon /> },
    ],
    demo: {
      type: "interactive",
      content: <SecureAccessDemo />,
    },
    githubLink: "https://github.com/MahitGtg/Secure_Access_Control_System_OO",
  },
  {
    title: "Bookify",
    type: "Full Stack Development",
    description:
      "A web application that allows users to search for books, add them to their library, and track their reading progress. Also allows users to visualize their reading patterns. Uses Google Books API to search for books and D3.js to visualize reading patterns.",
    techStack: [
      { name: "JavaScript", icon: <JsIcon /> },
      { name: "HTML", icon: <HTMLIcon /> },
      { name: "CSS", icon: <CSSIcon /> },
      { name: "Flask", icon: <FlaskIcon /> },
      { name: "Bootstrap", icon: <BootstrapIcon /> },
    ],
    demo: {
      type: "image",
      content: Bookify,
    },
    githubLink: "https://github.com/MahitGtg/Bookify-web-app",
    contributors: [
      {
        name: "University of Western Australia",
        role: "Project",
        link: "https://www.uwa.edu.au/",
      },
    ],
    link: "https://github.com/MahitGtg/Bookify-web-app/",
  },
];

const projectCategories: Record<string, ProjectCategory> = {
  "Full Stack Development": "web",
  "Front-End Development": "web",
  "Web Development": "web",
  "Evasive Cybersecurity": "cybersecurity",
  "Defensive Cybersecurity": "cybersecurity",
  "Artificial Intelligence": "ai",
  "Computer Networks": "other",
  "System Design": "other",
  "Mobile App Development": "other",
};

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projectsData.filter(
    (project) =>
      activeCategory === "all" ||
      projectCategories[project.type] === activeCategory,
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
            <ProjectCard {...project} custom={index} />
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
