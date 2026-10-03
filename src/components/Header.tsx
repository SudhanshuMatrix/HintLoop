import React from 'react';
import { IconLogo, IconCpu, IconRefresh, IconBookOpen, IconSparkles } from './Icons';

interface HeaderProps {
  onReset: () => void;
  onOpenSamples: () => void;
  isSimulated?: boolean;
}

export function Header({ onReset, onOpenSamples, isSimulated }: HeaderProps) {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Subtitle with Colorful Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-0.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-sm icon-glow-indigo transition-transform hover:scale-105">
            <IconLogo className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
                Hint<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Loop</span>
              </h1>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-2xs">
                Hacktoberfest 2026
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 hidden sm:block">
              A DSA hint tutor that helps you think, not copy.
            </p>
          </div>
        </div>

        {/* Model Info Badge & Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Gemma Model Status Badge */}
          <div className="flex items-center space-x-2 text-xs px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 shadow-2xs font-mono">
            <div className="p-1 rounded bg-indigo-100/60">
              <IconCpu className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <span className="font-semibold text-slate-800 text-[11px] tracking-tight">
              Gemma-2-9B
            </span>
            <span className="relative flex h-2 w-2 ml-0.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSimulated ? 'bg-amber-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isSimulated ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
            </span>
          </div>

          {/* Quick Load Sample Demo */}
          <button
            onClick={onOpenSamples}
            className="flex items-center space-x-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-2xs group"
            title="Load sample DSA problems for quick 2-minute demo"
          >
            <div className="p-1 rounded bg-indigo-50 group-hover:bg-indigo-100/80 transition-colors">
              <IconBookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="hidden xs:inline font-sans">Sample Demo</span>
          </button>

          {/* Reset Workspace */}
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-2xs group"
            title="Reset workspace"
          >
            <div className="p-1 rounded bg-rose-50 group-hover:bg-rose-100/80 transition-colors">
              <IconRefresh className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline font-sans">Reset</span>
          </button>

        </div>

      </div>
    </header>
  );
}
