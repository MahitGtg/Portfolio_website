import React from 'react';
import { ShieldCheck, Swords } from 'lucide-react';

const ResistanceDemo = () => (
  <div className="w-full h-full min-h-0 flex bg-black/50 p-2 gap-2">
    <div className="flex-1 rounded-lg border border-emerald-500/25 bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
      <ShieldCheck className="w-12 h-12 text-emerald-400/80" />
    </div>
    <div className="flex-1 rounded-lg border border-red-500/25 bg-red-500/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
      <Swords className="w-12 h-12 text-red-400/80" />
    </div>
  </div>
);

export default ResistanceDemo;
