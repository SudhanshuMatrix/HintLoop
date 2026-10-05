import React from 'react';
import { IconLogo, IconCpu, IconRefresh, IconBookOpen } from './Icons';

interface HeaderProps {
  onReset: () => void;
  onOpenSamples: () => void;
  isSimulated?: boolean;
}

export function Header({ onReset, onOpenSamples, isSimulated }: HeaderProps) {
  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Subtitle with Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-1 rounded-xl bg-slate-50 shadow-2xs border border-slate-200/80 flex items-center justify-center transition-transform hover:scale-105">
            <IconLogo className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">
                Hint<span className="text-blue-600">Loop</span>
              </h1>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs">
                Hacktoberfest 2026
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 hidden sm:block">
              A DSA tutor that helps you think, not copy.
            </p>
          </div>
        </div>

        {/* Model Info Badge & Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Gemma Model Status Badge */}
          <div className="flex items-center space-x-2 text-xs px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 shadow-2xs font-mono">
            <div className="p-1 rounded bg-blue-50">
              <IconCpu className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="font-semibold text-slate-800 text-[11px] tracking-tight">
              Gemma-2-9B
            </span>
            <span className="relative flex h-2 w-2 ml-0.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSimulated ? 'bg-sky-400' : 'bg-blue-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isSimulated ? 'bg-sky-500' : 'bg-blue-600'}`}></span>
            </span>
          </div>

          {/* Quick Load Sample Demo */}
          <button
            onClick={onOpenSamples}
            className="flex items-center space-x-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-white border border-slate-200/90 text-slate-700 hover:bg-blue-50/70 hover:text-blue-600 hover:border-blue-200 transition-all shadow-2xs group font-sans"
            title="Load sample DSA problems for quick 2-minute demo"
          >
            <div className="p-1 rounded bg-slate-100 group-hover:bg-blue-100/70 transition-colors">
              <IconBookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="hidden xs:inline">Sample Demo</span>
          </button>

          {/* Reset Workspace */}
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-2xs group font-sans"
            title="Reset workspace"
          >
            <div className="p-1 rounded bg-slate-100 transition-colors">
              <IconRefresh className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">Reset</span>
          </button>

        </div>

      </div>
    </header>
  );
}
