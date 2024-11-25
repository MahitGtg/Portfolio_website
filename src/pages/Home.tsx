import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    GmailIcon, LinkedinIcon, DiscordIcon, GitHubIcon, 
    XIcon, ResumeIcon
} from '../assets/icons/socials';
import {
    CIcon, CSSIcon, DockerIcon, FigmaIcon, FlaskIcon, GitIcon,
    HTMLIcon, JavaIcon, JsIcon, NodeIcon, PandaIcon, PostgresIcon,
    PythonIcon, ReactIcon, TailwindIcon, TypeScriptIcon, UbuntuIcon,
    VSCodeIcon, BootstrapIcon, NextjsIcon
} from '../assets/icons/technologies';

// Add Spline viewer type declaration
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                url: string;
            };
        }
    }
}

const Home = () => {
    const navigate = useNavigate();
    const projectsRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    // Add Spline script dynamically
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.46/build/spline-viewer.js';
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const socialLinks = [
        { platform: 'github', Icon: GitHubIcon, href: "https://github.com/MahitGtg" },
        { platform: 'linkedin', Icon: LinkedinIcon, href: "https://www.linkedin.com/in/mahit-gupta-961a12218/" },
        { platform: 'gmail', Icon: GmailIcon, href: "mailto:mahit.gupta64@gmail.com?subject=Contact from Website" },
        { platform: 'discord', Icon: DiscordIcon, href: "https://discord.com/users/545539618519646212" },
        { platform: 'twitter', Icon: XIcon, href: "https://x.com/GuptaMahit" },
        { platform: 'resume', Icon: ResumeIcon, href: "/Mahit_Gupta_Resume.pdf" }
    ];

    type IconComponent = React.ComponentType<{ className?: string }>;
    
    const technologies = {
        row1: [
            { name: "TypeScript", Icon: TypeScriptIcon as IconComponent },
            { name: "JavaScript", Icon: JsIcon as IconComponent },
            { name: "C", Icon: CIcon as IconComponent },
            { name: "Python", Icon: PythonIcon as IconComponent },
            { name: "Java", Icon: JavaIcon as IconComponent }
        ],
        row2: [
            { name: "React", Icon: ReactIcon },
            { name: "Next.js", Icon: NextjsIcon },
            { name: "Node.js", Icon: NodeIcon },
            { name: "Flask", Icon: FlaskIcon }
        ],
        row3: [
            { name: "HTML", Icon: HTMLIcon },
            { name: "CSS", Icon: CSSIcon },
            { name: "Tailwind", Icon: TailwindIcon },
            { name: "Bootstrap", Icon: BootstrapIcon }
        ]
    };

    const projects = [
        { id: 'fittraker', name: 'FitTraker', path: '/projects/fitTracker', type: 'Full Stack Development' },
        { id: 'penni', name: 'Penni', path: '/projects/penni', type: 'Web Development' },
        { id: 'editor-portfolio', name: 'Editor Portfolio', path: '/projects/editor_portfolio', type: 'Web Development' },
        { id: 'kazooey', name: 'Kazooey', path: '/projects/kazooey', type: 'Web Development' },
        { id: 'virusware', name: 'Virusware', path: '/projects/virusware', type: 'Cybersecurity' },
        { id: 'mtd-file-system', name: 'MTD File System', path: '/projects/mtdfile', type: 'Cybersecurity' },
        { id: 'resistance', name: 'The Resistance', path: '/projects/resistance', type: 'Artificial Intelligence' }
    ];

    const scroll = (direction: 'left' | 'right') => {
        const container = projectsRef.current;
        if (!container) return;

        const scrollAmount = container.offsetWidth;
        const maxScroll = container.scrollWidth - container.offsetWidth;
        
        let newPosition = scrollPosition + (direction === 'right' ? scrollAmount : -scrollAmount);
        newPosition = Math.max(0, Math.min(newPosition, maxScroll));
        
        container.scrollTo({
            left: newPosition,
            behavior: 'smooth'
        });
        
        setScrollPosition(newPosition);
    };

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header Section with Spline */}
            {/* Header Section with Spline */}
<div className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-center">
    {/* Text Content */}
    <div className="w-full md:w-1/2 p-8 md:p-16">
        <div className="max-w-xl">
            <h1 className="font-main text-6xl font-bold mb-4">Mahit Gupta</h1>
            <p className="font-secondary text-lg text-gray-600 mb-2">
                {"< Software Developer / Cybersecurity / AI >"}
            </p>
            <div className="flex items-center gap-2 text-gray-600 mb-8">
                <MapPin className="w-4 h-4" />
                <span className="font-secondary">Perth, Western Australia</span>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-6">
                {socialLinks.map(({ platform, Icon, href }) => (
                    <a
                        key={platform}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors"
                    >
                        <Icon className="w-6 h-6" />
                    </a>
                ))}
            </div>
        </div>
    </div>

    {/* Spline Viewer */}
    <div className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center">
        <div className="w-[500px] h-[500px]">
            <spline-viewer 
                url="https://prod.spline.design/EL2uRfTPZM9xdCkz/scene.splinecode"
                loading-anim-type="spinner-small-light"
                className="w-full h-full"
                
            />
        </div>
    </div>
</div>
    
            {/* Rest of the content */}
            <div className="bg-white py-16">
                {/* Technologies Section */}
                <div className="container mx-auto px-4">
                    <h2 className="font-main text-3xl font-bold mb-12 text-center">Technologies</h2>
                    <div className="flex flex-col items-center gap-12">
                        {Object.values(technologies).map((row, rowIndex) => (
                            <div key={rowIndex} className="flex gap-12 flex-wrap justify-center">
                                {row.map((tech) => (
                                    <div key={tech.name} className="group relative">
                                        <tech.Icon className="w-10 h-10 text-gray-600 group-hover:text-black transition-colors" />
                                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 
                                                     opacity-0 group-hover:opacity-100 transition-opacity
                                                     text-sm whitespace-nowrap">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    

            {/* Projects Section */}
            <div className="relative bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="font-main text-2xl font-bold text-center mb-12">Projects</h2>
                    
                    {/* Scroll Buttons */}
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg
                                 text-gray-600 hover:text-black transition-colors disabled:opacity-50"
                        disabled={scrollPosition === 0}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg
                                 text-gray-600 hover:text-black transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Projects Container */}
                    <div 
                        ref={projectsRef}
                        className="overflow-x-hidden whitespace-nowrap"
                    >
                        <div className="inline-flex gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => navigate(project.path)}
                                    className="w-80 bg-white p-6 rounded-lg shadow-lg cursor-pointer
                                             transform transition-all duration-300 hover:-translate-y-2"
                                >
                                    <h3 className="font-main text-xl font-bold mb-2">{project.name}</h3>
                                    <p className="font-secondary text-sm text-gray-600">{project.type}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;