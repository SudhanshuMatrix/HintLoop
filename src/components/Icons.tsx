import React from 'react';

// Brand Logo - Colorful Hint Loop SVG
export function IconLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-grad-1)" />
      <path
        d="M10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22H11"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="2.5" fill="#FDE047" />
      <path
        d="M13 25L9 22L13 19"
        stroke="url(#logo-grad-2)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Sparkles - AI & Magic Hint Generation
export function IconSparkles({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L14.39 8.26L21 9.27L16 13.97L17.47 20.5L12 17.1L6.53 20.5L8 13.97L3 9.27L9.61 8.26L12 2Z"
        fill="url(#sparkle-grad)"
      />
      <circle cx="19" cy="4" r="1.5" fill="#38BDF8" />
      <circle cx="4" cy="18" r="1.2" fill="#F43F5E" />
    </svg>
  );
}

// Code - Brackets & Problem Input
export function IconCode({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="code-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="code-grad-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <path d="M16 18L22 12L16 6" stroke="url(#code-grad-left)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6L2 12L8 18" stroke="url(#code-grad-right)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Terminal - User Attempts & Execution
export function IconTerminal({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="term-arrow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="term-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <path d="M4 17L10 11L4 5" stroke="url(#term-arrow)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="19" x2="20" y2="19" stroke="url(#term-line)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Lightbulb - Key Insights & Solution Approaches
export function IconLightbulb({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bulb-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>
      <path
        d="M9 18H15M10 21H14M12 2C8.13401 2 5 5.13401 5 9C5 11.38 6.19 13.47 8 14.74V17H16V14.74C17.81 13.47 19 11.38 19 9C19 5.13401 15.866 2 12 2Z"
        fill="url(#bulb-glow)"
        stroke="#B45309"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 6V9" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Cpu - Gemma AI Engine Model Badge
export function IconCpu({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cpu-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="5" y="5" width="14" height="14" rx="3" fill="url(#cpu-grad)" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="#38BDF8" />
      <path d="M9 1V5M15 1V5M9 19V23M15 19V23M1 9H5M1 15H5M19 9H23M19 15H23" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Arrow Right - Action Button & Stepper Progress
export function IconArrowRight({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <line x1="4" y1="12" x2="20" y2="12" stroke="url(#arrow-grad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 6L20 12L14 18" stroke="url(#arrow-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Check - Success & Copy Confirmation
export function IconCheck({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#10B981" />
      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Copy - Clipboard Action
export function IconCopy({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="9" width="12" height="12" rx="2.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.75" />
      <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#0369A1" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// Refresh - Reset & Restart Session
export function IconRefresh({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="refresh-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>
      <path d="M21 3V8H16" stroke="url(#refresh-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 21V16H8" stroke="url(#refresh-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.51 9A9 9 0 0118 5.64L21 8M3 16L6 18.36A9 9 0 0020.49 15" stroke="url(#refresh-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// BookOpen - Sample Demo Library
export function IconBookOpen({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="book-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="book-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>
      <path d="M2 4C5 4 8 5.5 12 7V21C8 19.5 5 18 2 18V4Z" fill="url(#book-left)" opacity="0.9" />
      <path d="M22 4C19 4 16 5.5 12 7V21C16 19.5 19 18 22 18V4Z" fill="url(#book-right)" opacity="0.9" />
      <path d="M12 7V21" stroke="#312E81" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// AlertCircle - Error & Warning Notices
export function IconAlertCircle({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
      <line x1="12" y1="8" x2="12" y2="12" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.25" fill="#B91C1C" />
    </svg>
  );
}

// ChevronDown - Collapsible & Dropdown
export function IconChevronDown({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Shield - Easy Difficulty Badge
export function IconShield({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Zap - Medium Difficulty Badge
export function IconZap({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// Flame - Hard Difficulty Badge
export function IconFlame({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flame-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="70%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <path d="M8.5 14.5C8.5 16.433 10.067 18 12 18C13.933 18 15.5 16.433 15.5 14.5C15.5 12.8 14.2 11.7 13.5 11C13.2 12 12.4 12.5 11.5 12.5C10.5 12.5 10 11.5 10 10.5C9 11.8 8.5 13.2 8.5 14.5Z" fill="#FEF08A" />
      <path d="M12 2C12 2 6 8 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 8 12 2 12 2Z" stroke="url(#flame-grad)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// Progressive Stepper Level Icons
export function IconStepDirection({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M12 7V12L15 15" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconStepDataStruct({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="7" height="7" rx="1.5" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.75" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.75" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.75" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.75" />
    </svg>
  );
}

export function IconStepInsight({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <path d="M12 8V12M12 16H12.01" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconStepImpl({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2" />
      <path d="M7 10L10 12L7 14" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="14" x2="16" y2="14" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconStepSolution({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
      <path d="M9 12L11 14L15 9" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
