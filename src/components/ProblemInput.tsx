import React from 'react';
import { IconCode, IconTerminal, IconSparkles, IconBookOpen } from './Icons';

interface ProblemInputProps {
  problemTitle: string;
  setProblemTitle: (val: string) => void;
  problemDescription: string;
  setProblemDescription: (val: string) => void;
  userAttempt: string;
  setUserAttempt: (val: string) => void;
  onGetHint: () => void;
  isLoading: boolean;
  onOpenSamples: () => void;
  currentHintCount: number;
}

export function ProblemInput({
  problemTitle,
  setProblemTitle,
  problemDescription,
  setProblemDescription,
  userAttempt,
  setUserAttempt,
  onGetHint,
  isLoading,
  onOpenSamples,
  currentHintCount,
}: ProblemInputProps) {
  const isFormValid = problemDescription.trim().length > 0;

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-6">
      
      {/* Header of Left Area */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200/60 text-blue-700 shadow-2xs icon-glow-blue">
            <IconCode className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
              Problem & Attempt Context
            </h2>
            <p className="text-[11px] text-slate-500 font-sans">
              Provide problem constraints and your current line of thinking
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenSamples}
          className="text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-blue-50/70 hover:border-blue-200 transition-all font-sans shadow-2xs group"
        >
          <IconBookOpen className="w-3.5 h-3.5" />
          <span>Load Preset</span>
        </button>
      </div>

      {/* Problem Title Input */}
      <div className="space-y-1.5">
        <label htmlFor="problem-title" className="block text-xs font-bold text-slate-800 tracking-tight font-sans">
          Problem Name / Identifier <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <input
          id="problem-title"
          type="text"
          value={problemTitle}
          onChange={(e) => setProblemTitle(e.target.value)}
          placeholder="e.g. Container With Most Water, Two Sum II..."
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50/70 border border-slate-200/90 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all font-mono shadow-2xs"
        />
      </div>

      {/* Problem Statement Area */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="problem-desc" className="block text-xs font-bold text-slate-800 tracking-tight font-sans">
            Problem Description / Constraints <span className="text-blue-600 font-extrabold">*</span>
          </label>
          <span className="text-[11px] text-slate-400 font-sans">Paste problem text or LeetCode description</span>
        </div>
        <textarea
          id="problem-desc"
          rows={6}
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="Paste the problem statement, inputs, outputs, and constraints here..."
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50/70 border border-slate-200/90 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all font-mono leading-relaxed shadow-2xs"
        />
      </div>

      {/* What I Tried So Far */}
      <div className="space-y-1.5">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-slate-100 border border-slate-200/60">
            <IconTerminal className="w-3.5 h-3.5" />
          </div>
          <label htmlFor="user-attempt" className="block text-xs font-bold text-slate-800 tracking-tight font-sans">
            What I Have Tried So Far
          </label>
        </div>
        <p className="text-[11px] text-slate-500 font-sans">
          Describe your initial idea, code attempt, bottleneck, or why your current solution fails.
        </p>
        <textarea
          id="user-attempt"
          rows={5}
          value={userAttempt}
          onChange={(e) => setUserAttempt(e.target.value)}
          placeholder="e.g. I tried a nested loop giving O(N^2) which got TLE. I'm stuck trying to optimize it to O(N)..."
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50/70 border border-slate-200/90 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all font-mono leading-relaxed shadow-2xs"
        />
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!isFormValid || isLoading}
          onClick={onGetHint}
          className={`w-full py-3 px-5 rounded-lg font-bold text-sm flex items-center justify-center space-x-2.5 transition-all shadow-sm font-sans ${
            !isFormValid || isLoading
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
              : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.99] border border-blue-700/30 shadow-blue-200'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="tracking-wide">Analyzing Attempt with Gemma AI...</span>
            </>
          ) : (
            <>
              <div className="p-1 rounded bg-white/20">
                <IconSparkles className="w-4 h-4 text-sky-200" />
              </div>
              <span className="tracking-wide">
                {currentHintCount === 0 ? 'Get Hint 1' : 'Update & Request Hint'}
              </span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
