// src/components/ui/TypingText.tsx
import { useState, useEffect } from 'react';
import { useViewport } from '../../hooks/useViewport';
import ArrowIcon from '../../assets/icons/arrow';

interface TypingTextProps {
    onMobileClick: () => void;
}

const TypingText = ({ onMobileClick }: TypingTextProps) => {
    const { isMobileLike } = useViewport();
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const messages = ['my projects!', "the projects I've worked on :)"];
    const period = 2000;
    const [delta, setDelta] = useState(100);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text]);

    const tick = () => {
        let i = loopNum % messages.length;
        let fullText = messages[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(100);
        }
    };

    return (
        <div 
            className={`
                relative h-20 sm:h-24 md:h-48 
                ${isMobileLike ? 'cursor-pointer' : 'cursor-default'}
            `}
            onClick={isMobileLike ? onMobileClick : undefined}
        >
            {/* Arrow */}
            <div className={`
                ${isMobileLike ? 'hidden' : 'block'}
                absolute left-15 -top-6
            `}>
                <ArrowIcon className="w-45 h-45 text-white" />
            </div>
            
            {/* Text container with fixed height to prevent wrapping */}
            <div className="absolute left-4 md:left-60 top-4 md:top-12">
                <div className="font-azerat font-extrabold text-left">
                    {/* First line - fixed height */}
                    <div className="text-gray-400 text-[10px] sm:text-xs md:text-base h-4 sm:h-5 md:h-6 flex items-center">
                        Check out some of
                    </div>
                    
                    {/* Second line - fixed height and no wrapping */}
                    <div className="h-5 sm:h-6 md:h-8 flex items-center">
                        <span className="text-white text-[12px] sm:text-sm md:text-xl whitespace-nowrap relative">
                            {text}
                            <span className="absolute inset-x-0 -bottom-0.5 md:-bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                            <span className="animate-blink">|</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypingText;