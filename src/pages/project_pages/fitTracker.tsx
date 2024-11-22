import ProjectPage from '../../components/projects/ProjectPage';
import { HTMLIcon, CSSIcon, JsIcon, BootstrapIcon, FlaskIcon, PostgresIcon } from '../../assets/icons/technologies';
import FitTrakerDemo from '../../assets/project_images/FitTraker/FitTraker_demo.mp4';
import { useEffect, useRef, useState } from 'react';

const FitTrackerProject = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.75;
            
            const handleTimeUpdate = () => {
                if (videoRef.current) {
                    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
                    setProgress(progress);
                }
            };

            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
            return () => videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, []);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const bar = e.currentTarget;
            const rect = bar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = percent * videoRef.current.duration;
        }
    };

    const content = {
        title: {
            type: 'text' as const,
            text: 'FitTracker'
        },
        description: "A full-stack fitness assessment platform enabling tracking and visualization of student fitness data across university units. Built for UWA's Sport Science department, it features comprehensive data analysis tools with integrated outlier detection to provide real-time, cohort-specific fitness benchmarks.",
        techStack: [
            { name: 'HTML', icon: <HTMLIcon /> },
            { name: 'CSS', icon: <CSSIcon /> },
            { name: 'JavaScript', icon: <JsIcon /> },
            { name: 'Bootstrap', icon: <BootstrapIcon /> },
            { name: 'Flask', icon: <FlaskIcon />},
            { name: 'PostgreSQL ', icon: <PostgresIcon /> }

        ],
        contributors: [
            {
                name: "The University of Western Australia",
                role: "Capstone Project",
                link: "https://www.uwa.edu.au/"
            },
            {
                name: "Mahit Gupta",
                role: "Frontend Developer",
                link: "https://github.com/MahitGtg"
            },
            {
                name: "Davin Do",
                role: "Frontend Developer",
                link: "https://github.com/rubbaduk"
            },
            {
                name: "Harrison Harun",
                role: "Frontend Developer",
                link: "https://github.com/HeathenH?tab=overview&from=2024-11-01&to=2024-11-21"
            },
            {
                name: "Nathan Foley",
                role: "Backend Developer",
                link: "https://github.com/Nathan-Foley"
            },
            {
                name: "Radin Mansouri",
                role: "Backend Developer",
                link: "https://github.com/RadinMan"
            },
            {
                name: "Samuel Chew",
                role: "Data Science",
                link: "https://github.com/chewkjs"
            }

        ],

        demo: {
            type: 'video' as const,
            content: (
                <div className="w-full h-full overflow-hidden relative group">
                    <video 
                        ref={videoRef}
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover object-top"
                    >
                        <source src={FitTrakerDemo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* Custom Progress Bar */}
                    <div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600/50 cursor-pointer transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        onClick={handleSeek}
                    >
                        <div 
                            className="h-full bg-blue-500/80 hover:bg-blue-400 transition-all duration-200"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            ),
            isDesktop: true
        }
    };

    return <ProjectPage content={content} />;
};

export default FitTrackerProject