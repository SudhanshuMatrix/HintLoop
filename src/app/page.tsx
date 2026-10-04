'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ProblemInput } from '@/components/ProblemInput';
import { HintPanel } from '@/components/HintPanel';
import { SampleProblems } from '@/components/SampleProblems';
import { HintStep, HintLevel, SampleProblem, HintApiResponse } from '@/lib/types';
import { IconCpu, IconSparkles, IconLogo } from '@/components/Icons';

export default function Home() {
  const [problemTitle, setProblemTitle] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [userAttempt, setUserAttempt] = useState('');
  
  const [hints, setHints] = useState<HintStep[]>([]);
  const [currentLevel, setCurrentLevel] = useState<HintLevel | 0>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [isSamplesOpen, setIsSamplesOpen] = useState(false);

  const handleSelectSample = (sample: SampleProblem) => {
    setProblemTitle(sample.title);
    setProblemDescription(sample.description);
    setUserAttempt(sample.userAttempt);
    setHints([]);
    setCurrentLevel(0);
  };

  const handleReset = () => {
    setProblemTitle('');
    setProblemDescription('');
    setUserAttempt('');
    setHints([]);
    setCurrentLevel(0);
  };

  const requestHintLevel = async (targetLevel: HintLevel, customNote?: string) => {
    if (!problemDescription.trim()) return;

    setIsLoading(true);

    try {
      const res = await fetch('/api/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: problemTitle || 'DSA Problem',
          problemDescription,
          userAttempt: userAttempt || 'No attempt specified yet.',
          targetLevel,
          customQuery: customNote,
        }),
      });

      const data: HintApiResponse = await res.json();

      if (data.success) {
        const newStep: HintStep = {
          level: targetLevel,
          title: data.title,
          content: data.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSimulated: data.isSimulated,
          modelName: data.modelUsed,
        };

        setHints((prev) => [...prev, newStep]);
        setCurrentLevel(targetLevel);
        setIsSimulated(data.isSimulated);
      } else {
        alert(`Error generating hint: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      console.error('Failed to request hint:', err);
      alert('Failed to connect to the hint server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetHint = () => {
    if (currentLevel === 0) {
      requestHintLevel(1);
    } else if (typeof currentLevel === 'number' && currentLevel < 4) {
      requestHintLevel((currentLevel + 1) as HintLevel);
    } else if (currentLevel === 4) {
      requestHintLevel('approach');
    } else {
      requestHintLevel(1);
    }
  };

  const handleNextHint = (customNote?: string) => {
    if (customNote === 'reset') {
      handleReset();
      return;
    }

    if (currentLevel === 0) {
      requestHintLevel(1, customNote);
    } else if (currentLevel === 1) {
      requestHintLevel(2, customNote);
    } else if (currentLevel === 2) {
      requestHintLevel(3, customNote);
    } else if (currentLevel === 3) {
      requestHintLevel(4, customNote);
    } else if (currentLevel === 4) {
      requestHintLevel('approach', customNote);
    }
  };

  const handleShowApproach = () => {
    requestHintLevel('approach');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        onReset={handleReset}
        onOpenSamples={() => setIsSamplesOpen(true)}
        isSimulated={isSimulated}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Banner introducing Open-weight Gemma model context */}
        <div className="mb-6 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/60 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-800/60 border border-indigo-700/60 text-white shadow-2xs icon-glow-indigo">
              <IconCpu className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white tracking-tight font-sans">
                Open-Weight AI Tutor Powered by Gemma-2-9B
              </p>
              <p className="text-xs text-indigo-200/80 font-sans mt-0.5">
                Built for Hacktoberfest 2026. Delivers progressive Socratic DSA hints to sharpen your problem solving.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs self-end sm:self-center">
            <button
              onClick={() => setIsSamplesOpen(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-bold font-sans transition-all shadow-md active:scale-[0.99] flex items-center space-x-2 border border-indigo-400/30"
            >
              <IconSparkles className="w-4 h-4 text-amber-300" />
              <span>Try Demo Problem</span>
            </button>
          </div>
        </div>

        {/* Desktop Split Layout / Mobile Stack Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left / Main Area: Problem & Attempt Input */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ProblemInput
              problemTitle={problemTitle}
              setProblemTitle={setProblemTitle}
              problemDescription={problemDescription}
              setProblemDescription={setProblemDescription}
              userAttempt={userAttempt}
              setUserAttempt={setUserAttempt}
              onGetHint={handleGetHint}
              isLoading={isLoading}
              onOpenSamples={() => setIsSamplesOpen(true)}
              currentHintCount={hints.length}
            />
          </div>

          {/* Right Area: AI Hint Panel */}
          <div className="lg:col-span-6 xl:col-span-5">
            <HintPanel
              hints={hints}
              currentLevel={currentLevel}
              onNextHint={handleNextHint}
              onShowApproach={handleShowApproach}
              isLoading={isLoading}
              hasInput={!!problemDescription.trim()}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-5 mt-10 text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <IconLogo className="w-5 h-5" />
            <p className="font-medium text-slate-600">
              © 2026 HintLoop. Built with open-weight Gemma models for DSA interview mastery.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-mono">
            <span className="text-indigo-600 font-semibold">Hacktoberfest 2026</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">Open Source</span>
            <span>•</span>
            <span>Vibrant Typography & Icons</span>
          </div>
        </div>
      </footer>

      {/* Sample Problem Picker Modal */}
      {isSamplesOpen && (
        <SampleProblems
          onSelect={handleSelectSample}
          onClose={() => setIsSamplesOpen(false)}
        />
      )}

    </div>
  );
}
