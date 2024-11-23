// pages/projects/penni.tsx
import ProjectPage from '../../components/projects/ProjectPage';
import { ReactIcon, TypeScriptIcon, TailwindIcon, NextjsIcon } from '../../assets/icons/technologies';
import penniLogo from '../../assets/project_images/penni/logo.png';
import penniShowcase from '../../assets/project_images/penni/iphone_image.png';

const PenniProject = () => {
    const content = {
        title: {
            type: 'combined' as const,  // Add 'as const' here
            text: 'Penni',
            image: penniLogo
        },
        description: 'A web platform helping pensioners find small, manageable jobs to earn supplementary income. As part of the frontend team, I developed user profiles and payout interfaces for this large-scale project. The platform connects seniors with job opportunities while ensuring secure and reliable compensation, developed in collaboration with Coders for Causes to empower the elderly community.',
        githubLink: 'https://github.com/codersforcauses/penni',
        deployedLink: 'https://penni.codersforcauses.org/',
        contributors: [
            {
                name: "Coders For Causes",
                role: "Organization",
                link: "https://codersforcauses.org"
            },
            {
                name: "Mahit Gupta",
                link: "https://github.com/MahitGtg"
            },
            {
                name: "Alexandra Harrison",
                link: "https://github.com/allyharrison"
            },
            {
                name: "Arthur Lian",
                link: "https://github.com/Mingyu-Lian"
            },

        ],
        techStack: [
            { name: 'TypeScript', icon: <TypeScriptIcon /> },
            { name: 'React', icon: <ReactIcon /> },
            { name: 'Tailwind', icon: <TailwindIcon /> },
            { name: 'Next.js', icon: <NextjsIcon /> }

        ],
        demo: {
            type: 'image' as const,
            isMobile: true,
            content: penniShowcase
        }
    };

    return <ProjectPage content={content} />;
};

export default PenniProject;