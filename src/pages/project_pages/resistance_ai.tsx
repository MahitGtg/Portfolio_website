import ProjectPage from '../../components/projects/ProjectPage';
import { PythonIcon, GitIcon } from '../../assets/icons/technologies';
import { ShieldCheck, Swords, CircleDot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useViewport } from '../../hooks/useViewport';

const ResistanceProject = () => {
    const { isMobileLike } = useViewport();
    const [selectedRole, setSelectedRole] = useState<'spy'|'resistance'>('resistance');
    const [missionResults, setMissionResults] = useState<Array<'success'|'fail'|'pending'>>(['success', 'fail', 'success', 'pending', 'pending']);
    const [aiLinePos, setAiLinePos] = useState(0);

    useEffect(() => {
        const roleInterval = setInterval(() => {
            setSelectedRole(prev => prev === 'spy' ? 'resistance' : 'spy');
        }, 2000);

        const missionInterval = setInterval(() => {
            setMissionResults(prev => {
                const newResults = [...prev];
                const pendingIndex = newResults.findIndex(r => r === 'pending');
                if (pendingIndex !== -1) {
                    newResults[pendingIndex] = Math.random() > 0.5 ? 'success' : 'fail';
                    if (pendingIndex < prev.length - 1) {
                        newResults[pendingIndex + 1] = 'pending';
                    }
                } else {
                    return ['pending', 'pending', 'pending', 'pending', 'pending'];
                }
                return newResults;
            });
        }, 3000);

        const aiInterval = setInterval(() => {
            setAiLinePos(prev => (prev + 1) % 100);
        }, 50);

        return () => {
            clearInterval(roleInterval);
            clearInterval(missionInterval);
            clearInterval(aiInterval);
        };
    }, []);

    const DemoContent = () => (
        <div className="w-full h-full bg-black p-4 md:p-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Role Card */}
            <div className={`
                relative w-full md:w-[280px] h-[300px] md:h-[400px] rounded-xl overflow-hidden 
                transition-all duration-1000 transform
                ${selectedRole === 'spy' ? 'bg-red-950/20 border-red-500/30' : 'bg-blue-950/20 border-blue-500/30'}
                border-2 flex items-center justify-center
            `}>
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div 
                        className="absolute inset-0 opacity-10 transition-all duration-1000"
                        style={{
                            backgroundImage: `radial-gradient(circle, ${selectedRole === 'spy' ? '#f00' : '#00f'} 1px, transparent 1px)`,
                            backgroundSize: '20px 20px',
                        }}
                    />
                </div>

                {/* Role Icons */}
                <div className={`
                    relative transform transition-all duration-1000
                    ${selectedRole === 'spy' ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                `}>
                    <Swords className="w-24 h-24 md:w-32 md:h-32 text-red-500" />
                </div>

                <div className={`
                    absolute inset-0 flex items-center justify-center
                    transform transition-all duration-1000
                    ${selectedRole === 'resistance' ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                `}>
                    <ShieldCheck className="w-24 h-24 md:w-32 md:h-32 text-blue-500" />
                </div>

                {/* Floating particles */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className={`
                            absolute w-1 h-1 rounded-full 
                            ${selectedRole === 'spy' ? 'bg-red-500' : 'bg-blue-500'}
                            opacity-20 transition-all duration-1000
                        `}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            transform: `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`,
                            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`
                        }}
                    />
                ))}
            </div>

            {/* Mission Tracker Card */}
            <div className="relative w-full md:w-[280px] h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-slate-950/30 border-2 border-slate-800 flex flex-col items-center justify-center">
                {/* AI Background Animation */}
                <div className="absolute inset-0">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                            style={{
                                top: `${i * 10 + ((aiLinePos + i * 5) % 100)}%`,
                                left: 0,
                                right: 0,
                                transform: `translateY(-50%) translateX(${Math.sin((aiLinePos + i * 30) / 50) * 20}%)`,
                                opacity: 0.2
                            }}
                        />
                    ))}
                </div>

                {/* Mission Results */}
                <div className="relative flex flex-col items-center gap-6 md:gap-8">
                    {/* Mission Status Indicators */}
                    <div className="flex flex-col gap-3 md:gap-4">
                        {missionResults.map((result, index) => (
                            <div 
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <CircleDot className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${
                                    result === 'success' ? 'text-green-500' :
                                    result === 'fail' ? 'text-red-500' :
                                    'text-blue-500 animate-pulse'
                                }`} />
                                <div className={`w-20 md:w-24 h-1 rounded-full transition-colors duration-500 ${
                                    result === 'success' ? 'bg-green-500' :
                                    result === 'fail' ? 'bg-red-500' :
                                    'bg-blue-500/30'
                                }`} />
                            </div>
                        ))}
                    </div>

                    {/* Mission Count Display */}
                    <div className="font-mono text-xs md:text-sm text-slate-400">
                        {missionResults.filter(r => r === 'success').length} / 3 Required
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translate(-50%, -50%) translateY(-10px); }
                    100% { transform: translate(-50%, -50%) translateY(10px); }
                }
            `}</style>
        </div>
    );

    const content = {
        title: {
            type: 'text' as const,
            text: 'The Resistance'
        },
        description: 'An intelligent game agent for The Resistance using Q-Learning and probabilistic reasoning to detect spies and make strategic decisions. The system combines dynamic trust scoring with expert player heuristics.',
        githubLink: 'https://github.com/MahitGtg/The-Resistance-Agent',
        techStack: [
            { name: 'Python', icon: <PythonIcon /> },
            { name: 'Git', icon: <GitIcon /> }
        ],
        demo: {
            type: 'interactive' as const,
            isDesktop: true,
            content: <DemoContent />
        }
    };

    return <ProjectPage content={content} />;
};

export default ResistanceProject;