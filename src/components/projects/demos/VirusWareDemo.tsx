import React from 'react';

const FooFile = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    {/* File shape with folded corner */}
    <div className="relative w-14 h-[4.25rem]">
      {/* File body */}
      <div className="absolute inset-0 rounded-sm bg-red-950/60 border border-red-500/50" />
      {/* Folded corner cut-out */}
      <div
        className="absolute top-0 right-0 w-0 h-0"
        style={{
          borderStyle: 'solid',
          borderWidth: '0 14px 14px 0',
          borderColor: 'transparent #0a0a0a transparent transparent',
        }}
      />
      {/* Fold crease */}
      <div
        className="absolute top-0 right-0 w-0 h-0"
        style={{
          borderStyle: 'solid',
          borderWidth: '14px 0 0 14px',
          borderColor: 'transparent transparent transparent rgba(239,68,68,0.3)',
        }}
      />
      {/* .foo extension label */}
      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
        <span className="text-[10px] font-mono text-red-400/90 tracking-wide">.foo</span>
      </div>
    </div>
    {/* Filename below */}
    <span className="text-[10px] font-mono text-red-300/70">{name}</span>
  </div>
);

const VirusWareDemo = () => (
  <div className="w-full h-full bg-black/50 p-2 flex flex-col min-h-0">
    <div className="relative flex-1 min-h-0 rounded-lg border border-slate-200/20 bg-black/80 backdrop-blur-sm overflow-hidden flex items-center justify-center p-4 shadow-lg">
      <div className="grid grid-cols-2 gap-5">
        {['file1', 'file2', 'file3', 'file4'].map(name => (
          <FooFile key={name} name={name} />
        ))}
      </div>
    </div>
  </div>
);

export default VirusWareDemo;
