import React, { useState, useEffect } from 'react';
import { MapPin, Code, Library, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LinkedinIcon, DiscordIcon, GitHubIcon, XIcon } from '../assets/icons/socials';
import { Mail } from 'lucide-react';
import {
    CIcon, CSSIcon, DockerIcon, FigmaIcon, FlaskIcon, GitIcon,
    HTMLIcon, JavaIcon, JsIcon, NodeIcon, PostgresIcon,
    PythonIcon, ReactIcon, TailwindIcon, TypeScriptIcon, NextjsIcon, BootstrapIcon, VSCodeIcon,
    PandaIcon, UbuntuIcon 
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            {Object.entries(categories).map(([category, { icon: CategoryIcon, techs }]) => (
                <div key={category} 
                     className="bg-[#0F1416]/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200/20
                              shadow-soft hover:shadow-card transition-all duration-300"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <CategoryIcon className="w-4 h-4 text-white/50" />
                        <h3 className="text-xl font-secondary font-medium text-[#aab8d4]">{category}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-1.5">
                        {techs.map(({ Icon, name }) => (
                            <div 
                                key={name}
                                className="group flex items-center gap-1.5 p-1.5 rounded-lg
                                         bg-[#0F1416] hover:bg-black/95
                                         transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <div className="w-4 h-4 flex items-center justify-center
                                              opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Icon />
                                </div>
                                <span className="text-m font-secondary font-semi text-[#aab8d4]
                                               group-hover:text-white transition-colors">
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const EnhancedBackground = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);

        return () => {
            window.removeEventListener('resize', setVH);
            window.removeEventListener('orientationchange', setVH);
        };
    }, []);

    return (
        <div 
            className="fixed inset-0 overflow-y-auto scrollbar-none touch-pan-y"
            style={{
                height: 'calc(var(--vh, 1vh) * 100)',
                WebkitOverflowScrolling: 'touch',
                position: 'relative'
            }}
        >
            {/* Base gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#18242C] via-[#23343F] to-[#253342] -z-5" />
            
            {/* Primary heavy grain */}
            <div 
                className="fixed inset-0"
                style={{
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '120px',
                    opacity: 0.25,
                    mixBlendMode: 'overlay'
                }}
            />

            {/* Secondary grain layer */}
            <div 
                className="fixed inset-0"
                style={{
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '80px',
                    opacity: 0.2,
                    mixBlendMode: 'soft-light'
                }}
            />

            {/* Fine detail grain */}
            <div 
                className="fixed inset-0"
                style={{
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '60px',
                    opacity: 0.15,
                    mixBlendMode: 'multiply'
                }}
            />
            
            {/* Light gradient overlay */}
            <div 
                className="fixed inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)'
                }}
            />
            
            {/* Content */}
            <div className="relative">
                {children}
            </div>
        </div>
    );
};

const TextButton = ({ children, onClick, className = "" }: { 
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}) => (
    <button
        onClick={onClick}
        className={`
            px-4 py-1.5 bg-black/90 backdrop-blur-sm rounded-full 
            flex items-center justify-center border border-slate-200/20
            hover:bg-black/95 hover:-translate-y-0.5
            hover:border-slate-200/30 group
            relative overflow-hidden
            transition-all duration-300 ease-out
            before:absolute before:inset-0
            before:bg-[radial-gradient(circle,rgba(120,120,255,0.15),transparent_60%)]
            before:h-[200%] before:w-[200%] before:top-[-50%] before:left-[-50%]
            before:animate-none before:hover:animate-[spin_4s_linear_infinite]
            after:absolute after:inset-0
            after:opacity-0 after:hover:opacity-100
            after:transition-opacity after:duration-500
            after:border-2 after:border-transparent after:hover:border-slate-200/40
            after:rounded-full
            hover:shadow-[0_0_20px_rgba(120,120,255,0.3)]
            ${className}
        `}
    >
        <span className="font-secondary text-lg text-white/50
                     group-hover:text-white
                     relative z-10
                     transition-all duration-300 ease-out
                     transform group-hover:scale-105">
            {children}
        </span>
    </button>
);

const SocialLink = ({ Icon, href }: {
    Icon: React.ComponentType<any>;
    href: string;
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-black/90 backdrop-blur-sm rounded-full 
                flex items-center justify-center border border-slate-200/20
                hover:bg-black hover:shadow-lg hover:-translate-y-0.5
                hover:border-slate-200/30 group
                transition-all duration-300 ease-out"
    >
        <Icon className="w-5 h-5 text-white/50
                    opacity-70 group-hover:opacity-100
                    transition-all duration-300
                    transform group-hover:scale-110 " />
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
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.46/build/spline-viewer.js';
        document.head.appendChild(script);

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
                        {/* Left Side */}
                        <div className={`
                            w-full ${isMobileLike ? 'text-center' : 'md:w-1/2 text-left'}
                        `}>
                            {/* Name and Title */}
                            <div className="space-y-1 mb-4">
                                <h2 className="font-secondary text-2xl font-medium text-[#aab8d4]">
                                    Hi I am
                                </h2>
                                <h1 className="font-main text-5xl md:text-7xl font-black text-white/80
                                             tracking-tight">
                                    Mahit Gupta
                                </h1>
                            </div>

                            {/* Role and Location */}
                            <div className="space-y-3 mb-6">
                                <p className="font-secondary text-lg text-[#aab8d4]">
                                    {"< Software Developer / Cybersecurity / AI >"}
                                </p>
                                <div className={`
                                    flex items-center gap-2
                                    ${isMobileLike ? 'justify-center' : 'justify-start'}
                                `}>
                                    <MapPin className="w-5 h-5 text-[#aab8d4]" />
                                    <span className="font-secondary text-lg text-[#aab8d4]">
                                        Perth, Western Australia
                                    </span>
                                </div>
                            </div>

                            {/* Social Links and Projects Button */}
                            <div className={`
                                flex gap-4
                                ${isMobileLike ? 'flex-col items-center' : 'flex-row justify-start'}
                            `}>
                                {/* Social Links */}
                                <div className={`
                                    flex gap-4
                                    ${isMobileLike ? 'justify-center' : 'justify-start'}
                                `}>
                                    {socialLinks.map((link) => (
                                        <SocialLink key={link.platform} {...link} />
                                    ))}
                                </div>

                                {/* Projects Button */}
                                <TextButton 
                                    onClick={() => setIsProjectsOpen(true)}
                                    className={isMobileLike ? 'mt-2' : ''}
                                >
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
                                        url="https://prod.spline.design/te72fzfaMI1EhWWA/scene.splinecode"
                                        className="bg-transparent" 
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Technology Section */}
                    <div className={`
                        mt-12 mb-8
                        transform transition-all duration-700 delay-300
                        ${revealContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}>
                        <TechnologySection />
                    </div>
                </div>
            </div>
        </EnhancedBackground>
    );
};

export default Home;

