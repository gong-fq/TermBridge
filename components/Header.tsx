import React from 'react';
import { Languages, Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm shrink-0 z-10">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <Languages size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">ProTerm Trans</h1>
          <p className="text-xs text-slate-500 font-medium">Professional Technical Translation</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Gemini 2.5 Flash</span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors" title="About">
          <Info size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
