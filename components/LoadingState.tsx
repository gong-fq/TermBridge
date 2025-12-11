import React from 'react';
import { Loader2, Sparkles, BrainCircuit } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50/50">
      <div className="w-full max-w-md flex flex-col items-center space-y-8 animate-in fade-in duration-500">
        
        {/* Icon Container */}
        <div className="relative">
          {/* Pulsing background ring */}
          <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping opacity-75 duration-1000"></div>
          
          <div className="relative bg-white p-5 rounded-2xl shadow-xl shadow-indigo-100 border border-indigo-50 flex items-center justify-center">
            <BrainCircuit className="w-10 h-10 text-indigo-600" />
            
            {/* Corner sparkle */}
            <div className="absolute -top-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm transform rotate-12 animate-pulse">
               <Sparkles size={14} />
            </div>
          </div>
        </div>

        {/* Text Status */}
        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">
            Translating Content
          </h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
            Analyzing technical context and generating professional Chinese translation...
          </p>
        </div>

        {/* Dynamic Skeleton */}
        <div className="w-full space-y-3 px-6 py-6 bg-white rounded-xl border border-slate-100 shadow-sm">
           {/* Line 1 */}
           <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-indigo-400 opacity-60 animate-bounce"></div>
             <div className="h-2.5 bg-slate-100 rounded-full w-full animate-pulse"></div>
           </div>
           {/* Line 2 */}
           <div className="flex items-center gap-3 pl-2">
             <div className="h-2.5 bg-slate-100 rounded-full w-5/6 animate-pulse"></div>
           </div>
           {/* Line 3 */}
           <div className="flex items-center gap-3">
              <div className="h-2.5 bg-slate-100 rounded-full w-full animate-pulse"></div>
           </div>
           {/* Line 4 */}
           <div className="flex items-center gap-3 pl-4">
              <div className="h-2.5 bg-slate-100 rounded-full w-4/6 animate-pulse"></div>
           </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium bg-indigo-50/50 px-3 py-1.5 rounded-full">
           <Loader2 size={12} className="animate-spin" />
           <span>Powered by Gemini 2.5</span>
        </div>

      </div>
    </div>
  );
};

export default LoadingState;