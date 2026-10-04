import React from 'react';
import { SAMPLE_PROBLEMS } from '@/lib/samples';
import { SampleProblem } from '@/lib/types';
import { IconBookOpen, IconArrowRight, IconShield, IconZap, IconFlame } from './Icons';

interface SampleProblemsProps {
  onSelect: (problem: SampleProblem) => void;
  onClose: () => void;
}

export function SampleProblems({ onSelect, onClose }: SampleProblemsProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl max-w-2xl w-full p-6 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-100 border border-indigo-200/60 text-indigo-600 shadow-2xs icon-glow-indigo">
              <IconBookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 font-sans tracking-tight">Select Demo Problem</h2>
              <p className="text-xs text-slate-500 font-sans">Pick a sample DSA problem to test HintLoop instantly in under 2 minutes.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-sm font-bold w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Sample Problems List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
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
                className="group border border-slate-200/90 hover:border-indigo-400/80 rounded-xl p-4.5 bg-slate-50/50 hover:bg-white transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors font-sans tracking-tight">
                        {prob.title}
                      </h3>
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border flex items-center space-x-1 shadow-2xs ${
                          prob.difficulty === 'Easy'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                            : prob.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                            : 'bg-rose-50 text-rose-700 border-rose-200/80'
                        }`}
                      >
                        <DiffIcon className="w-3 h-3 mr-1" />
                        <span>{prob.difficulty}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 mt-2">
                      {prob.tags.map((t) => (
                        <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono border border-slate-200/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors font-sans">
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
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="text-xs font-bold px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-sans"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
