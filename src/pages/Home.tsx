import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Layout from '../components/layout/layout';
import { useViewport } from '../hooks/useViewport';
import { GmailIcon, LinkedinIcon, DiscordIcon, GitHubIcon, XIcon, ResumeIcon } from '../assets/icons/socials';
import {
    CIcon, CSSIcon, DockerIcon, FigmaIcon, FlaskIcon, GitIcon, 
    HTMLIcon, JavaIcon, JsIcon, NodeIcon, PandaIcon, PostgresIcon, 
    PythonIcon, ReactIcon, TailwindIcon, TypeScriptIcon, UbuntuIcon, 
    VSCodeIcon, BootstrapIcon, NextjsIcon
} from '../assets/icons/technologies';
import TypingText from '../components/ui/TypingTest';

const Home = () => {
    const { isMobileLike } = useViewport();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const socialLinks = [
        { platform: 'github', Icon: GitHubIcon, href: "https://github.com/MahitGtg" },
        { platform: 'linkedin', Icon: LinkedinIcon, href: "https://www.linkedin.com/in/mahit-gupta-961a12218/" },
        { platform: 'gmail', Icon: GmailIcon, href: "mailto:mahit.gupta64@gmail.com?subject=Contact from Website" },
        { platform: 'discord', Icon: DiscordIcon, href: "https://discord.com/users/545539618519646212" },
        { platform: 'twitter', Icon: XIcon, href: "https://x.com/GuptaMahit" },
        { platform: 'resume', Icon: ResumeIcon, href: "/Mahit_Gupta_Resume.pdf" }
    ];

    const technologies = {
        row1: [
            { name: "Git", Icon: GitIcon },
            { name: "VSCode", Icon: VSCodeIcon },
            { name: "CSS", Icon: CSSIcon },
            { name: "HTML", Icon: HTMLIcon },
            { name: "JavaScript", Icon: JsIcon },
            { name: "React", Icon: ReactIcon },
            { name: "Tailwind", Icon: TailwindIcon },
            { name: "TypeScript", Icon: TypeScriptIcon },
            { name: "Bootstrap", Icon: BootstrapIcon }
        ],
        row2: [
            { name: "Node.js", Icon: NodeIcon },
            { name: "Next.js", Icon: NextjsIcon },
            { name: "Flask", Icon: FlaskIcon },
            { name: "Docker", Icon: DockerIcon },
            { name: "PostgreSQL", Icon: PostgresIcon },
            { name: "Figma", Icon: FigmaIcon }
        ],
        row3: [
            { name: "C", Icon: CIcon },
            { name: "Java", Icon: JavaIcon },
            { name: "Python", Icon: PythonIcon },
            { name: "Pandas", Icon: PandaIcon },
            { name: "Ubuntu", Icon: UbuntuIcon }
        ]
    };

    const experiences = [
        {
            title: (
                <>
                    Full-Stack Developer @
                    <a href="https://www.0x3f.online/" target="_blank" rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-200">
                        0x3f Labs
                    </a>
                </>
            ),
            period: "November 2024 - Present",
        },
        {
            title: (
                <>
                    IT Security Intern @
                    <a href="https://www.prodt.co/" target="_blank" rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-200">
                        ProDT Consultancy
                    </a>
                </>
            ),
            period: "December 2023 - March 2024",
        },
        {
            title: (
                <>
                    IT Programmer Intern @
                    <a href="https://www.splc.org.au/" target="_blank" rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-200">
                        South Perth Learning Centre
                    </a>
                </>
            ),
            period: "June 2022 - July 2023",
        },
    ];

    const handleMobileClick = () => {
        document.dispatchEvent(new CustomEvent('toggleSidebar'));
    };

    return (
        <Layout>
            <div className="w-full max-w-6xl mx-auto px-2 sm:px-8">
                {/* Hero Section */}
                <div className={`
                    space-y-2 pt-4 
                    transform transition-all duration-700 ease-out
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}>
                    <h2 className="font-azerat font-extrabold text-white text-xl sm:text-2xl">
                        Hi I am
                    </h2>
                    <h1 className="font-nunito font-extrabold text-white text-4xl sm:text-6xl">
                        Mahit Gupta
                    </h1>
                    <div className="font-cutive text-gray-400 text-base sm:text-lg">
                        {'< Software Developer / Cybersecurity / AI >'}
                    </div>
                    <div className="font-cutive text-gray-400 flex items-center gap-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                        Perth, Western Australia
                    </div>
                </div>

                {/* Social Links */}
                <div className={`
                    flex gap-4 mt-4 mb-8
                    transition-all duration-500 delay-300 ease-out
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}>
                    {socialLinks.map((link) => (
                        <a
                            key={link.platform}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grayscale hover:grayscale-0 transition-all duration-300"
                        >
                            <link.Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                        </a>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className={`
                    grid gap-6 
                    ${isMobileLike ? 'grid-cols-1' : 'grid-cols-2'}
                    transition-all duration-500 delay-500 ease-out
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}>
                    {/* Technologies Section */}
                    <div>
                        <h2 className="font-azerat underline font-bold text-white text-2xl sm:text-3xl mb-4 sm:mb-6">
                            Technologies
                        </h2>
                        <div className="space-y-6">
                            {Object.values(technologies).map((row, rowIndex) => (
                                <div key={rowIndex} className="flex flex-wrap gap-4 sm:gap-6 items-center">
                                    {row.map((tech) => (
                                        <div key={tech.name} className="group relative">
                                            <div className="transition-all duration-300 hover:scale-110">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8">
                                                    <tech.Icon />
                                                </div>
                                            </div>
                                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                                                        opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                                        whitespace-nowrap text-xs sm:text-sm font-mono text-gray-400">
                                                {tech.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div>
                        <h2 className="font-azerat underline font-bold text-white text-2xl sm:text-3xl mb-4 sm:mb-6">
                            Experience
                        </h2>
                        <div className="space-y-3">
                            {experiences.map((exp, index) => (
                                <div key={index} className="font-azerat">
                                    <div className="text-white text-sm sm:text-base">
                                        {exp.title}
                                    </div>
                                    <div className="text-gray-400 font-cutive text-xs sm:text-sm">
                                        {exp.period}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Text */}
                <div className={`
                    mt-6
                    transition-all duration-500 delay-700 ease-out
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}>
                    <TypingText onMobileClick={handleMobileClick} />
                </div>
            </div>
        </Layout>
    );
};

export default Home;