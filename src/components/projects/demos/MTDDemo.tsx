import { FileSearch, Lock } from 'lucide-react';

const cells = [
  'protected', 'protected', 'scanning',
  'clean',     'protected', 'clean',
  'clean',     'clean',     'clean',
];

const MTDDemo = () => (
  <div className="w-full h-full min-h-0 flex flex-col bg-black/50 p-2">
    <div className="flex-1 min-h-0 rounded-lg border border-slate-200/20 bg-black/80 backdrop-blur-sm overflow-hidden grid grid-cols-3 grid-rows-3 gap-1.5 p-2 shadow-lg">
      {cells.map((s, i) => (
        <div
          key={i}
          className={`rounded-md border flex items-center justify-center ${
            s === 'scanning'  ? 'bg-blue-500/20 border-blue-500/40' :
            s === 'protected' ? 'bg-emerald-500/15 border-emerald-500/35' :
                                'bg-white/5 border-slate-200/15'
          }`}
        >
          {s === 'scanning'  && <FileSearch className="w-5 h-5 text-blue-400" />}
          {s === 'protected' && <Lock       className="w-5 h-5 text-emerald-400" />}
        </div>
      ))}
    </div>
  </div>
);

export default MTDDemo;
