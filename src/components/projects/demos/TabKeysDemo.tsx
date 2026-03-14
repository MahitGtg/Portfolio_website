import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useIsVisible from "./useIsVisible";

const TabKeysDemo = () => {
  const [phase, setPhase] = useState<"typing" | "suggestion" | "accept">(
    "typing",
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVisible) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setPhase((prev) =>
        prev === "typing"
          ? "suggestion"
          : prev === "suggestion"
            ? "accept"
            : "typing",
      );
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full h-full bg-black/50 p-4">
      <div className="relative w-full h-full rounded-lg border border-slate-200/20 bg-black/80 backdrop-blur-sm overflow-hidden flex flex-col justify-center px-4 shadow-lg">
        <div className="flex items-center gap-2 mb-3 text-[#aab8d4] text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200/40" />
          <span>Menu bar</span>
        </div>
        <div className="relative min-h-[3.5rem] flex items-center">
          <div className="bg-white/5 rounded-lg border border-slate-200/20 px-3 py-2.5 font-mono text-xs text-white/90 w-full">
            {phase === "typing" && <span>The quick brown fox jum</span>}
            {phase === "suggestion" && <span>The quick brown fox jum</span>}
            {phase === "accept" && (
              <span className="text-white">
                The quick brown fox jumps over the lazy dog
              </span>
            )}
          </div>
          {phase === "suggestion" && (
            <div
              className="absolute left-3 top-0 -translate-y-full -mt-1
                bg-black/90 backdrop-blur-sm rounded-lg border border-slate-200/30
                shadow-xl px-3 py-2 font-mono text-xs
                flex items-center gap-2 min-w-[12rem]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400/90 flex-shrink-0" />
              <span className="text-[#aab8d4]">ps over the lazy dog</span>
              <span className="text-[10px] text-white/50 ml-auto">Tab</span>
            </div>
          )}
        </div>
        <p className="text-[10px] text-white/50 mt-2">
          {phase === "typing" && "Typing..."}
          {phase === "suggestion" &&
            "Suggestion shown in hover — press Tab to accept"}
          {phase === "accept" && "Accepted"}
        </p>
      </div>
    </div>
  );
};

export default TabKeysDemo;
