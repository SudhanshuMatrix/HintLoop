import React, { useEffect } from 'react';
import { SAMPLE_PROBLEMS } from '@/lib/samples';
import { SampleProblem } from '@/lib/types';
import { IconBookOpen, IconArrowRight, IconShield, IconZap, IconFlame } from './Icons';

interface SampleProblemsProps {
  onSelect: (problem: SampleProblem) => void;
  onClose: () => void;
}

export function SampleProblems({ onSelect, onClose }: SampleProblemsProps) {
  // Close popup on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200/90 rounded-2xl shadow-xl max-w-2xl w-full p-6 space-y-5 transform transition-all"
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 shadow-2xs icon-glow-blue">
              <IconBookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 font-sans tracking-tight">
                Select Demo Problem
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Pick a sample DSA problem to test HintLoop instantly in under 2 minutes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-sm font-bold w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
            title="Close modal (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Sample Problems List */}
        <div className="space-y-3 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto pr-1">
          {SAMPLE_PROBLEMS.map((prob) => {
            const DiffIcon =
              prob.difficulty === 'Easy'
                ? IconShield
                : prob.difficulty === 'Medium'
                ? IconZap
                : IconFlame;

            return (
              <div
                key={prob.id}
                onClick={() => {
                  onSelect(prob);
                  onClose();
                }}
                className="group border border-slate-200/90 hover:border-blue-400/80 rounded-xl p-4.5 bg-slate-50/50 hover:bg-white transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors font-sans tracking-tight">
                        {prob.title}
                      </h3>
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border flex items-center space-x-1 shadow-2xs ${
                          prob.difficulty === 'Easy'
                            ? 'bg-slate-100 text-slate-700 border-slate-200/80'
                            : prob.difficulty === 'Medium'
                            ? 'bg-blue-50 text-blue-700 border-blue-200/80'
                            : 'bg-slate-900 text-white border-slate-800'
                        }`}
                      >
                        <DiffIcon className="w-3 h-3 mr-1" />
                        <span>{prob.difficulty}</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                      {prob.tags.map((t) => (
                        <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono border border-slate-200/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors font-sans shrink-0">
                    <span>Load</span>
                    <IconArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mt-2.5 leading-relaxed font-sans">
                  {prob.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400 font-sans">
          <span>Click outside or press <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 border border-slate-200 rounded">Esc</kbd> to exit</span>
          <button
            onClick={onClose}
            className="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-sans"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
