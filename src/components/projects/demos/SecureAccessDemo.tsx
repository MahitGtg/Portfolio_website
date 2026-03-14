import React from 'react';
import { KeyRound } from 'lucide-react';

const SecureAccessDemo = () => (
  <div className="w-full h-full min-h-0 flex bg-black/50 p-2">
    <div className="flex-1 rounded-lg border border-slate-200/20 bg-black/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
      <KeyRound className="w-14 h-14 text-[#aab8d4]/60" />
    </div>
  </div>
);

export default SecureAccessDemo;
