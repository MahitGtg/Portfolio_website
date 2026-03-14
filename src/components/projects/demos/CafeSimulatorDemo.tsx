import { Coffee, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import useIsVisible from './useIsVisible';

const MAX_QUEUE = 6;

const CafeSimulatorDemo = () => {
  const initialQueue = () => Array.from({ length: 2 + Math.floor(Math.random() * 4) }, (_, i) => i + 1);
  const [queue, setQueue] = useState<number[]>(initialQueue);
  const [b1, setB1] = useState<number | null>(null);
  const [b2, setB2] = useState<number | null>(null);
  const [nextId, setNextId] = useState(10);
  const cafeRef = useRef<HTMLDivElement>(null);
  const cafeVisible = useIsVisible(cafeRef);
  const cafeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!cafeVisible) {
      if (cafeInterval.current) clearInterval(cafeInterval.current);
      return;
    }
    cafeInterval.current = setInterval(() => {
      setQueue(q => {
        const newQ = [...q];
        let newB1 = b1;
        let newB2 = b2;
        let id = nextId;

        if (newB1 !== null && Math.random() > 0.4) newB1 = null;
        if (newB2 !== null && Math.random() > 0.4) newB2 = null;

        if (newB1 === null && newQ.length > 0) newB1 = newQ.shift()!;
        if (newB2 === null && newQ.length > 0) newB2 = newQ.shift()!;

        const arrivals = Math.random() > 0.3 ? 1 + (Math.random() > 0.6 ? 1 : 0) : 0;
        for (let i = 0; i < arrivals; i++) { newQ.push(id++); }

        setB1(newB1);
        setB2(newB2);
        setNextId(id);
        return newQ.slice(-MAX_QUEUE);
      });
    }, 1100);
    return () => { if (cafeInterval.current) clearInterval(cafeInterval.current); };
  }, [cafeVisible, b1, b2, nextId]);

  return (
    <div ref={cafeRef} className="w-full h-full bg-black/50 p-2">
      <div className="relative w-full h-full rounded-lg border border-slate-200/20 bg-black/80 backdrop-blur-sm overflow-hidden flex flex-row shadow-lg">

        {/* Left: Baristas */}
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-3 w-2/5">
          {[b1, b2].map((customer, idx) => (
            <div
              key={idx}
              className={`w-full flex flex-col items-center justify-center gap-1.5 rounded-lg border py-3 transition-all duration-300 ${
                customer !== null
                  ? 'bg-emerald-500/15 border-emerald-500/40'
                  : 'bg-white/5 border-slate-200/20'
              }`}
            >
              <Coffee className={`w-5 h-5 transition-colors duration-300 ${customer !== null ? 'text-emerald-400' : 'text-white/25'}`} />
              {customer !== null && <User className="w-3.5 h-3.5 text-emerald-300/80" />}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px bg-slate-200/15 self-stretch my-3" />

        {/* Right: Queue */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3 py-3">
          {Array.from({ length: MAX_QUEUE }).map((_, i) => {
            const customer = queue[i];
            return (
              <div
                key={i}
                className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  customer !== undefined
                    ? 'bg-black/40 border-slate-200/25 opacity-100'
                    : 'bg-white/5 border-slate-200/10 opacity-20'
                }`}
              >
                {customer !== undefined && <User className="w-3.5 h-3.5 text-[#aab8d4]" />}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CafeSimulatorDemo;
