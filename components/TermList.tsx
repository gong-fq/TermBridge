import React from 'react';
import { BookOpen, Copy } from 'lucide-react';
import { TechnicalTerm } from '../types';

interface TermListProps {
  terms: TechnicalTerm[];
}

const TermList: React.FC<TermListProps> = ({ terms }) => {
  if (terms.length === 0) return null;

  return (
    <div className="h-full flex flex-col bg-slate-50 border-l border-slate-200 w-80 shrink-0 overflow-hidden hidden lg:flex">
      <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-2">
        <BookOpen className="text-indigo-600" size={20} />
        <h3 className="font-semibold text-slate-800">Terminology Glossary</h3>
        <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
          {terms.length}
        </span>
      </div>
      
      <div className="overflow-y-auto p-4 space-y-4 flex-1">
        {terms.map((term, index) => (
          <div key={index} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors group">
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-indigo-700">{term.original}</span>
            </div>
            <div className="text-sm font-medium text-slate-800 mb-2">{term.translation}</div>
            <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
              {term.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermList;
