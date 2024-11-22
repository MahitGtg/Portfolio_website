// pages/projects/editor_portfolio.tsx
import ProjectPage from '../../components/projects/ProjectPage';
import { HTMLIcon, CSSIcon } from '../../assets/icons/technologies';

const EditorPortfolioProject = () => {
    const content = {
        title: {
            type: 'text' as const,
            text: 'Editor Portfolio Website'
        },
        description: 'A showcase website for a video editor featuring their creative works, services, and professional journey. Built with fluid animations and a modern design to highlight portfolio pieces.',
        githubLink: 'https://github.com/MahitGtg/Toymeet_Portfolio_Website',
        deployedLink: 'https://toymeetedits.netlify.app/work',
        techStack: [
            { name: 'HTML', icon: <HTMLIcon /> },
            { name: 'CSS', icon: <CSSIcon /> },
        ],
        demo: {
            type: 'interactive' as const,
            isDesktop: true,
            content: (
                <iframe
                    src="https://toymeetedits.netlify.app/work"
                    className="w-full h-full border-none rounded bg-white"
                    title="Editor Portfolio Demo"
                />
            )
        }
    };

    return <ProjectPage content={content} />;
};

export default EditorPortfolioProject;