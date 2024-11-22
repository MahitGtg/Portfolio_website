import ProjectPage from '../../components/projects/ProjectPage';
import { PythonIcon, GitIcon } from '../../assets/icons/technologies';
import virusware from '../../assets/project_images/virusware/virusware.png'; 

const EditorPortfolioProject = () => {
    const content = {
        title: {
            type: 'text' as const,
            text: 'VirusWare'
        },
        description: 'An educational cross-platform malware simulation created under 24 hours, demonstrating virus-like behavior including self-replication, evasion techniques, and encrypted data exfiltration. Built with a client-server architecture and tested in isolated environments to showcase modern malware characteristics for academic purposes.',
        githubLink: 'https://github.com/MahitGtg/Virusware',
        techStack: [
            { name: 'Python', icon: <PythonIcon /> },
            { name: 'Git', icon: <GitIcon /> },

        ],
        demo: {
            type: 'image' as const,
            isDesktop: true,
            content: (
                <img 
                    src= {virusware}
                    alt="VirusWare Attack Simulation"
                    className="w-full h-full object-cover"
                />
            )
        }
    };

    return <ProjectPage content={content} />;
};

export default EditorPortfolioProject;