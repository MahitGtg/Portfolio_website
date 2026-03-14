import React from 'react';
import { Crosshair } from 'lucide-react';

const BATTLESHIP_GRID = [
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['S', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['S', '.', '.', '.', '.', '.', 'S', 'S', 'S', '.'],
  ['.', '.', '.', '.', 'S', 'S', 'S', 'S', 'S', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', 'S', 'S', '.', '.'],
  ['.', '.', '.', '.', 'S', 'S', 'S', 'S', '.', '.'],
];

const GUESS_GRID = [
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', 'O', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', 'X', 'X', '.', '.', '.'],
  ['.', '.', '.', 'O', 'X', 'X', 'X', 'X', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', 'X', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
];

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const renderGrid = (grid: string[][], cellClass: (cell: string) => string) => (
  <div className="font-mono text-[10px] text-white/90 leading-none">
    <div className="flex gap-px mb-px">
      <span className="w-3.5 flex-shrink-0 opacity-60 text-center" />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
        <span key={n} className="w-3.5 text-center opacity-60">{n}</span>
      ))}
    </div>
    {grid.map((row, i) => (
      <div key={i} className="flex gap-px mb-px">
        <span className="w-3.5 flex-shrink-0 opacity-60 text-center">{ROWS[i]}</span>
        {row.map((cell, j) => (
          <span key={j} className={`w-3.5 text-center ${cellClass(cell)}`}>{cell}</span>
        ))}
      </div>
    ))}
  </div>
);

const BattleshipDemo = () => (
  <div className="w-full h-full bg-black/50 p-2 flex flex-col min-h-0">
    <div className="relative flex-1 min-h-0 rounded-lg border border-slate-200/20 bg-black/80 backdrop-blur-sm overflow-hidden flex flex-col p-2 shadow-lg">
      <div className="flex items-center justify-between gap-2 mb-1.5 text-[#aab8d4] text-[10px]">
        <span className="uppercase tracking-wider">[Board]</span>
        <Crosshair className="w-3.5 h-3.5 opacity-60" />
      </div>
      <div className="flex-1 min-h-0 flex gap-3 items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-white/60 uppercase mb-1">P1 · Yours</span>
          {renderGrid(BATTLESHIP_GRID, cell => cell === 'S' ? 'text-white' : 'text-white/50')}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-white/60 uppercase mb-1">P2 · Guessing</span>
          {renderGrid(GUESS_GRID, cell => cell === 'X' ? 'text-red-400' : cell === 'O' ? 'text-white/40' : 'text-white/50')}
        </div>
      </div>
    </div>
  </div>
);

export default BattleshipDemo;
