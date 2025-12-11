import React, { useState, useCallback, useRef } from 'react';
import { ArrowRight, Sparkles, AlertCircle, Copy, RotateCcw, FileText, Check } from 'lucide-react';
import Header from './components/Header';
import TermList from './components/TermList';
import LoadingState from './components/LoadingState';
import { translateContent } from './services/geminiService';
import { TranslationState, TranslationResponse } from './types';

function App() {
  const [inputText, setInputText] = useState('');
  const [translationState, setTranslationState] = useState<TranslationState>({
    status: 'idle',
    data: null,
    error: null,
  });
  const [copied, setCopied] = useState(false);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) return;

    setTranslationState({ status: 'loading', data: null, error: null });
    
    try {
      const result = await translateContent(inputText);
      setTranslationState({
        status: 'success',
        data: result,
        error: null
      });
    } catch (err: any) {
      setTranslationState({
        status: 'error',
        data: null,
        error: err.message || "An unexpected error occurred."
      });
    }
  }, [inputText]);

  const handleCopy = useCallback(() => {
    if (translationState.data?.translatedText) {
      navigator.clipboard.writeText(translationState.data.translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [translationState.data]);

  const handleClear = useCallback(() => {
    setInputText('');
    setTranslationState({ status: 'idle', data: null, error: null });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header />

      <main className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Editor Area */}
          <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
            
            {/* Input Section */}
            <div className="flex-1 flex flex-col min-h-[50%] md:min-h-0 bg-white">
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span> English (Source)
                </span>
                {inputText && (
                   <button 
                     onClick={handleClear}
                     className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                   >
                     <RotateCcw size={12} /> Clear
                   </button>
                )}
              </div>
              <textarea
                className="flex-1 p-6 resize-none focus:outline-none text-slate-700 leading-relaxed text-lg font-serif placeholder:text-slate-300 placeholder:font-sans"
                placeholder="Paste your technical article or text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                spellCheck={false}
              />
              <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || translationState.status === 'loading'}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all
                    ${!inputText.trim() || translationState.status === 'loading'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow shadow-indigo-200'}
                  `}
                >
                  {translationState.status === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-b-white"></div>
                      Translating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Translate
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="flex-1 flex flex-col min-h-[50%] md:min-h-0 bg-slate-50/30">
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Chinese (Result)
                </span>
                {translationState.status === 'success' && (
                  <button 
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                    title="Copy translation"
                  >
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 relative">
                {translationState.status === 'idle' && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                      <ArrowRight size={24} className="text-slate-300" />
                    </div>
                    <p>Translation will appear here</p>
                  </div>
                )}

                {translationState.status === 'loading' && (
                  <LoadingState />
                )}

                {translationState.status === 'error' && (
                  <div className="h-full flex flex-col items-center justify-center text-red-500 space-y-2">
                    <AlertCircle size={32} />
                    <p className="font-medium">Translation Failed</p>
                    <p className="text-sm text-red-400 max-w-xs text-center">{translationState.error}</p>
                  </div>
                )}

                {translationState.status === 'success' && translationState.data && (
                  <div className="prose prose-slate max-w-none text-lg text-slate-800 leading-loose whitespace-pre-wrap font-serif animate-in fade-in duration-500">
                    {translationState.data.translatedText}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Glossary - Hidden on small screens, toggleable logic could be added for mobile */}
        {translationState.data?.technicalTerms && (
           <TermList terms={translationState.data.technicalTerms} />
        )}
      </main>
    </div>
  );
}

export default App;