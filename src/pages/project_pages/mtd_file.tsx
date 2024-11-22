import ProjectPage from '../../components/projects/ProjectPage';
import { PythonIcon, GitIcon } from '../../assets/icons/technologies';
import { Shield, FileSearch, Lock, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

const MTDProject = () => {
    const [scanIndex, setScanIndex] = useState(0);
    const [activeNodes, setActiveNodes] = useState<number[]>([]);

    useEffect(() => {
        // Simulate scanning animation
        const scanInterval = setInterval(() => {
            setScanIndex(prev => (prev + 1) % 24);
            
            // Randomly activate 2-4 nodes
            const numActiveNodes = Math.floor(Math.random() * 3) + 2;
            const newActiveNodes = Array.from({ length: numActiveNodes }, 
                () => Math.floor(Math.random() * 24)
            );
            setActiveNodes(newActiveNodes);
        }, 1500);

        return () => clearInterval(scanInterval);
    }, []);

    const content = {
        title: {
            type: 'text' as const,
            text: 'MTD File System'
        },
        description: 'An enterprise-level cybersecurity solution featuring a custom Yara Engine for threat detection, dynamic encryption with Moving Target Defense (MTD), and automated security recommendations. The system provides comprehensive file system protection through multi-layered security measures and advanced threat detection capabilities.',
        githubLink: 'https://github.com/MahitGtg/Rapido-Bank-by-Pile-',
        contributors: [
            {
                name: "Mahit Gupta",
                role: "Pattern Matching (Yara)",
                link: "https://github.com/MahitGtg"
            },
            {
                name: "Lucas Veloso",
                role: "Cipher System and Hashing Algorithm",
                link: "https://github.com/velosoz"
            },
            {
                name: "Will Vetter",
                role: "Moving Target Defense (MTD)",
                link: "https://github.com/WillVetter"
            }

        ],
        techStack: [
            { name: 'Python', icon: <PythonIcon /> },
            { name: 'Git', icon: <GitIcon /> }
        ],
        demo: {
            type: 'interactive' as const,
            isDesktop: true,
            content: (
                <div className="w-full h-full bg-gradient-to-br from-[#0a192f] to-[#112240] p-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Hex Grid Defense System */}
                        <div className="relative h-64 bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden">
                            {/* Grid lines */}
                            <div className="absolute inset-0" 
                                style={{
                                    backgroundImage: 'radial-gradient(circle at center, transparent 0%, transparent 90%, rgba(59, 130, 246, 0.1) 100%)',
                                    backgroundSize: '4rem 4rem'
                                }}
                            />
                            
                            {/* Hexagonal grid */}
                            <div className="absolute inset-0 grid grid-cols-6 gap-1 p-4">
                                {Array.from({ length: 24 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            relative aspect-square rounded-lg transition-all duration-500
                                            ${index === scanIndex ? 'bg-blue-500/20 border-blue-500/50' : 
                                              activeNodes.includes(index) ? 'bg-green-500/10 border-green-500/30' :
                                              'bg-slate-800/30 border-slate-700/30'}
                                            border
                                        `}
                                    >
                                        <div className={`
                                            absolute inset-0 flex items-center justify-center
                                            transition-opacity duration-300
                                            ${index === scanIndex || activeNodes.includes(index) ? 'opacity-100' : 'opacity-0'}
                                        `}>
                                            {index === scanIndex ? (
                                                <FileSearch className="w-3 h-3 text-blue-400" />
                                            ) : activeNodes.includes(index) ? (
                                                <Lock className="w-3 h-3 text-green-400" />
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Status Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm p-4 border-t border-slate-800">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                                            <span className="text-xs text-blue-400 font-mono">Scanning</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-400" />
                                            <span className="text-xs text-green-400 font-mono">Protected</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 font-mono">
                                        MTD Active • {activeNodes.length} nodes secured
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Summary */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                                <FileSearch className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                                <div className="text-gray-400 text-xs font-mono">Yara Engine</div>
                                <div className="text-blue-400 text-xs mt-1">Pattern Matching</div>
                            </div>
                            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                                <Lock className="w-5 h-5 text-green-400 mx-auto mb-2" />
                                <div className="text-gray-400 text-xs font-mono">50-Char Keys</div>
                                <div className="text-green-400 text-xs mt-1">Dynamic Encryption</div>
                            </div>
                            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                                <Shield className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                                <div className="text-gray-400 text-xs font-mono">Moving Target</div>
                                <div className="text-purple-400 text-xs mt-1">Adaptive Defense</div>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="px-4 py-3 bg-red-900/20 border border-red-900/30 rounded-lg flex items-center gap-2 text-xs text-red-400">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            System for isolated testing environments only
                        </div>
                    </div>
                </div>
            )
        }
    };

    return <ProjectPage content={content} />;
};

export default MTDProject;