// pages/projects/editor_portfolio.tsx
import ProjectPage from '../../components/projects/ProjectPage';
import { HTMLIcon, CSSIcon, JsIcon } from '../../assets/icons/technologies';

const EditorPortfolioProject = () => {
    const content = {
        title: {
            type: 'text' as const,
            text: 'Kazoeey'
        },
        description: 'A gamified sustainability platform built during a 48-hour Infosys x CFC hackathon, securing 3rd place ($800). The platform empowers workplace sustainability through an intuitive dashboard tracking environmental metrics, automated energy management, and administrative tools for analyzing departmental performance. Features real-time monitoring and smart shutdown capabilities to incentivize eco-friendly practices.',
        deployedLink: 'https://techno-uwa.wixsite.com/kasooey/tracker',
        contributors: [
            {
                name: "Coders For Causes",
                role: "Hackathon",
                link: "https://codersforcauses.org"
            },
            {
                name: "Mahit Gupta",
                link: "https://github.com/MahitGtg"
            },
            {
                name: "Dempsey Thompson",
                link: "https://github.com/demstar16"
            },
            {
                name: "John Kosonlawat",
                link: "https://github.com/Techno-UWA"
            },
            {
                name: "Josey Thomas",
            },
            {
                name: "Fritz",
            }

        ],
        techStack: [
            { name: 'HTML', icon: <HTMLIcon /> },
            { name: 'CSS', icon: <CSSIcon /> },
            { name: 'JavaScript', icon: <JsIcon /> },

        ],
        demo: {
            type: 'interactive' as const,
            isDesktop: true,
            content: (
                <iframe
                    src="https://techno-uwa.wixsite.com/kasooey/tracker"
                    className="w-full h-full border-none rounded bg-white"
                    title="Editor Portfolio Demo"
                />
            )
        }
    };

    return <ProjectPage content={content} />;
};

export default EditorPortfolioProject;