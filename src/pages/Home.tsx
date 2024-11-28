import React, { useState, useEffect } from 'react';
import { MapPin, Code, Library, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LinkedinIcon, DiscordIcon, GitHubIcon, XIcon } from '../assets/icons/socials';
import { Mail } from 'lucide-react';
import {
    CIcon, CSSIcon, DockerIcon, FigmaIcon, FlaskIcon, GitIcon,
    HTMLIcon, JavaIcon, JsIcon, NodeIcon, PostgresIcon,
    PythonIcon, ReactIcon, TailwindIcon, TypeScriptIcon, NextjsIcon, BootstrapIcon, VSCodeIcon,
    PandaIcon,
    UbuntuIcon
} from '../assets/icons/technologies';
import { useViewport } from '../hooks/useViewport';
import ProjectsModalComponent from '../components/projects/ProjectsModal';


declare global {
    namespace JSX {
        interface IntrinsicElements {
            'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                url: string;
            };
        }
    }
}


const TechnologySection = () => {
    const categories = {
        'Languages': {
            icon: Code,
            techs: [
                { Icon: TypeScriptIcon, name: 'TypeScript' },
                { Icon: JsIcon, name: 'JavaScript' },
                { Icon: PythonIcon, name: 'Python' },
                { Icon: JavaIcon, name: 'Java' },
                { Icon: CIcon, name: 'C' }
            ]
        },
        'Library & Frameworks': {
            icon: Library,
            techs: [
                { Icon: HTMLIcon, name: 'HTML' },
                { Icon: CSSIcon, name: 'CSS' },
                { Icon: ReactIcon, name: 'React.js' },
                { Icon: NextjsIcon, name: 'Next.js' },
                { Icon: NodeIcon, name: 'Node.js' },
                { Icon: TailwindIcon, name: 'Tailwind' },
                { Icon: FlaskIcon, name: 'Flask' },
                { Icon: BootstrapIcon, name: 'Bootstrap' }
            ]
        },
        'Tools': {
            icon: Wrench,
            techs: [
                { Icon: VSCodeIcon, name: 'VSCode' },
                { Icon: GitIcon, name: 'Git' },
                { Icon: DockerIcon, name: 'Docker' },
                { Icon: PostgresIcon, name: 'PostgreSQL' },
                { Icon: FigmaIcon, name: 'Figma' },
                { Icon: PandaIcon, name: 'Pandas' },
                { Icon: UbuntuIcon, name: 'Ubuntu' }
            ]
        }
    };

    // In the TechnologySection component, keep the existing code but update the return statement:
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(categories).map(([category, { icon: CategoryIcon, techs }]) => (
                <div key={category} 
                     className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200/20
                              shadow-soft hover:shadow-card transition-all duration-300"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <CategoryIcon className="w-4 h-4 text-navy-600" />
                        <h3 className="text-xl font-secondary font-semibold text-navy-800">{category}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1.5">
                        {techs.map(({ Icon, name }) => (
                            <div 
                                key={name}
                                className="group flex items-center gap-1.5 p-1.5 rounded-lg
                                         bg-/50 hover:bg-white/95
                                         transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <div className="w-4 h-4 flex items-center justify-center
                                              opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Icon />
                                </div>
                                <span className="text-m font-secondary font-semi text-navy-600 
                                               group-hover:text-navy-800 transition-colors">
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}



// Custom background component with enhanced gradient
const EnhancedBackground = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen relative bg-gradient-to-br from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8]">
            {/* Grain overlay */}
            <div 
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '100px 100px',
                }}
            />
            
            {/* Radial gradient overlay for depth */}
            <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 mix-blend-overlay"
                style={{
                    background: 'radial-gradient(circle at top center, transparent 0%, rgba(255,255,255,0.5) 100%)'
                }}
            />
            
            {/* Content */}
            <div className="relative">{children}</div>
        </div>
    );
};

const TextButton = ({ children, onClick, className = "" }: { 
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full 
                flex items-center justify-center border border-slate-200/20
                hover:bg-white hover:shadow-lg hover:-translate-y-0.5
                hover:border-slate-200/30 group
                transition-all duration-300 ease-out
                ${className}
            `}
        >
            <span className="font-secondary text-lg text-navy-600 
                         group-hover:text-navy-800
                         transition-all duration-300">
                {children}
            </span>
        </button>
    );
};

const SocialLink = ({ Icon, href }: {
    Icon: React.ComponentType<any>;
    href: string;
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full 
                flex items-center justify-center border border-slate-200/20
                hover:bg-white hover:shadow-lg hover:-translate-y-0.5
                hover:border-slate-200/30 group
                transition-all duration-300 ease-out"
    >
        <Icon className="w-5 h-5 text-navy-600
                    opacity-70 group-hover:opacity-100
                    transition-all duration-300
                    transform group-hover:scale-110" />
    </a>
);

const LoadingSpinner = () => (
    <div className="h-32 w-32 relative">
        <div className="absolute inset-0 border-8 border-blue-500/30 rounded-full 
                    animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-2 border-8 border-navy-600/40 rounded-full 
                    animate-[spin_2s_linear_infinite_reverse]" />
        <div className="absolute inset-4 border-8 border-slate-300/50 rounded-full 
                    animate-[spin_1s_linear_infinite]" />
    </div>
);

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [revealContent, setRevealContent] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const navigate = useNavigate();
    const { isMobileLike } = useViewport();

    const socialLinks = [
        { platform: 'github', Icon: GitHubIcon, href: "https://github.com/MahitGtg" },
        { platform: 'linkedin', Icon: LinkedinIcon, href: "https://www.linkedin.com/in/mahit-gupta-961a12218/" },
        { platform: 'mail', Icon: Mail, href: "mailto:mahit.gupta64@gmail.com" },
        { platform: 'discord', Icon: DiscordIcon, href: "https://discord.com/users/545539618519646212" },
        { platform: 'twitter', Icon: XIcon, href: "https://x.com/GuptaMahit" },
    ];

    useEffect(() => {
        // Load Spline viewer
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.46/build/spline-viewer.js';
        document.head.appendChild(script);

        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => setRevealContent(true), 300);
        }, 1500);

        return () => {
            clearTimeout(timer);
            document.head.removeChild(script);
        };
    }, []);

    return (
        <EnhancedBackground>
            {/* Loading Screen */}
            <div className={`
                fixed inset-0 z-50 bg-gradient-to-br from-slate-50 to-white
                flex items-center justify-center
                transition-transform duration-700 ease-out
                ${isLoading ? 'translate-y-0' : '-translate-y-full'}
            `}>
                <LoadingSpinner />
            </div>

            {/* Projects Modal */}
            <ProjectsModalComponent 
                isOpen={isProjectsOpen}
                onClose={() => setIsProjectsOpen(false)}
                navigate={navigate}
            />

            {/* Main Content */}
            <div className="min-h-screen flex items-center justify-center">
                <div className={`
                    w-full max-w-6xl mx-auto 
                    ${isMobileLike ? 'px-6' : 'px-8 md:px-12'}
                    transition-all duration-700 ease-out
                    ${revealContent ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}
                    ${isProjectsOpen ? 'blur-sm' : ''}
                `}>
                    {/* Hero Section */}
                    <div className={`
                        flex gap-8 
                        ${isMobileLike ? 'flex-col items-center py-8' : 'flex-row items-center justify-center md:py-0'}
                    `}>
                        {/* Left Side - Text Content */}
                        <div className={`
                            w-full ${isMobileLike ? 'text-center' : 'md:w-1/2 text-left'}
                        `}>
                            {/* Name and Title */}
                            <div className="space-y-1 mb-4">
                                <h2 className="font-secondary text-2xl font-medium text-navy-600/90">
                                    Hi I am
                                </h2>
                                <h1 className="font-main text-5xl md:text-7xl font-black text-navy-800
                                             tracking-tight">
                                    Mahit Gupta
                                </h1>
                            </div>

                            {/* Role and Location */}
                            <div className="space-y-3 mb-6">
                                <p className="font-secondary text-lg text-navy-600/90">
                                    {"< Software Developer / Cybersecurity / AI >"}
                                </p>
                                <div className={`
                                    flex items-center gap-2
                                    ${isMobileLike ? 'justify-center' : 'justify-start'}
                                `}>
                                    <MapPin className="w-5 h-5 text-navy-600/80" />
                                    <span className="font-secondary text-lg text-navy-600/90">
                                        Perth, Western Australia
                                    </span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className={`
                                flex gap-4 mb-6
                                ${isMobileLike ? 'justify-center' : 'justify-start'}
                            `}>
                                {socialLinks.map((link) => (
                                    <SocialLink key={link.platform} {...link} />
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className={`
                                flex gap-4 
                                ${isMobileLike ? 'justify-center' : 'justify-start'}
                            `}>
                                <TextButton onClick={() => window.open("/Mahit_Gupta_Resume.pdf", "_blank")}>
                                    Resume
                                </TextButton>
                                <TextButton onClick={() => setIsProjectsOpen(true)}>
                                    Projects
                                </TextButton>
                            </div>
                        </div>

                        {/* Right Side - Spline Animation */}
                        {!isMobileLike && (
                            <div className="w-full md:w-1/2 flex items-center justify-center">
                                <div className="w-[500px] h-[300px]">
                                    <spline-viewer 
                                        loading-anim-type="spinner-small-dark" 
                                        url="https://prod.spline.design/EL2uRfTPZM9xdCkz/scene.splinecode"
                                        className="bg-transparent" 
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Technology Section */}
                    <div className="mt-12">
                        <TechnologySection />
                    </div>
                </div>
            </div>
        </EnhancedBackground>
    );
};

export default Home;