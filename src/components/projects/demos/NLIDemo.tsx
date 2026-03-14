import { Brain } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useIsVisible from "./useIsVisible";

const MODELS = ["BiGRU", "VSAE", "Transformer"] as const;
const NLI_PREMISE = "A man is reading a book.";
const NLI_HYPOTHESIS = "A person is reading.";

const NLIDemo = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<"entails" | "neutral">("entails");
  const [resultKey, setResultKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVisible) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setStep((prev) => {
        if (prev < 3) return prev + 1;
        if (prev === 3) return 4;
        setResult((r) => (r === "entails" ? "neutral" : "entails"));
        setResultKey((k) => k + 1);
        return 0;
      });
    }, 1600);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible]);

  const phase = step < 3 ? "model" : step === 3 ? "attention" : "result";
  const activeModel = MODELS[step];
  const tokens = ["A", "person", "is", "reading"];

  return (
    <div ref={containerRef} className="w-full h-full bg-black/50 p-4">
      <div className="relative w-full h-full rounded-lg border border-slate-200/20 bg-black/80 backdrop-blur-sm overflow-hidden flex flex-col justify-center p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-[#aab8d4] text-[10px]">
          <Brain className="w-3.5 h-3.5 opacity-80" />
        </div>
        <div className="space-y-2 flex-1 flex flex-col justify-center">
          <div className="bg-white/5 rounded-lg border border-slate-200/20 px-2.5 py-1.5">
            <div className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">
              Premise
            </div>
            <div className="text-white/90 text-xs">{NLI_PREMISE}</div>
          </div>
          <div className="bg-white/5 rounded-lg border border-slate-200/20 px-2.5 py-1.5">
            <div className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">
              Hypothesis
            </div>
            <div className="text-white/90 text-xs">{NLI_HYPOTHESIS}</div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-200/20 space-y-1.5">
          {phase === "model" && (
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/50 uppercase tracking-wider">
                Model
              </span>
              <span className="text-xs font-medium text-white/90">
                {activeModel}
              </span>
            </div>
          )}
          {phase === "attention" && (
            <div className="space-y-1">
              <span className="text-[9px] text-white/50 uppercase tracking-wider">
                Attention
              </span>
              <div className="flex flex-wrap gap-1">
                {tokens.map((t, i) => (
                  <span
                    key={t}
                    className="inline-block px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300/90 text-[10px] border border-amber-500/30 animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          {phase === "result" && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] text-white/50 uppercase tracking-wider">
                Output
              </span>
              <div
                key={resultKey}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-500 border ${
                  result === "entails"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(52,211,153,0.15)]"
                    : "bg-amber-500/15 text-amber-300 border-amber-500/35 shadow-[0_0_12px_rgba(245,158,11,0.12)]"
                }`}
              >
                {result === "entails" ? "Entails" : "Neutral"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NLIDemo;
