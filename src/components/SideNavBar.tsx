import React from 'react';
import { ActiveView } from '../types';

interface SideNavBarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenNewEvidence: () => void;
  activeEntityCount: number;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeView,
  setActiveView,
  onOpenNewEvidence,
}) => {
  return (
    <nav
      id="nightbird-sidebar"
      className="fixed h-full w-64 left-0 top-0 border-r-2 border-[#514536] bg-[#100e0b] flex flex-col h-screen overflow-y-auto p-4 z-20 select-none"
    >
      {/* Header with Mascot */}
      <div className="flex flex-col items-center mb-6 pt-2 pb-5 border-b-2 border-[#514536]">
        <div className="relative group cursor-pointer mb-3" onClick={() => setActiveView('tags')}>
          {/* Circular emblem with distressed border */}
          <div className="w-20 h-20 rounded-full border-2 border-[#FFB84D] p-1 bg-[#161310] flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(255,184,77,0.15)]">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#FFB84D]" fill="currentColor">
              {/* Stylized raven/nightbird with gas mask motif */}
              <circle cx="50" cy="50" r="46" fill="#1e1b18" stroke="#FFB84D" strokeWidth="2" strokeDasharray="3,3" />
              {/* Bird head silhouette */}
              <path
                d="M 32 30 C 45 18, 70 20, 78 36 C 85 50, 80 68, 68 76 C 55 84, 38 82, 30 70 C 22 58, 20 42, 32 30 Z"
                fill="#0F0E0D"
              />
              {/* Sharp beak */}
              <path d="M 72 38 L 94 44 L 74 52 Z" fill="#FFB84D" />
              {/* Gas mask eye lens with glowing rim */}
              <circle cx="58" cy="42" r="10" fill="#2d2926" stroke="#FFB84D" strokeWidth="2.5" />
              <circle cx="58" cy="42" r="5" fill="#e09f3e" opacity="0.8" />
              <circle cx="56" cy="40" r="2" fill="#fff" />
              {/* Filter canister */}
              <rect x="42" y="58" width="16" height="18" rx="3" fill="#383430" stroke="#9e8e7d" strokeWidth="1.5" />
              <line x1="44" y1="63" x2="56" y2="63" stroke="#514536" strokeWidth="1.5" />
              <line x1="44" y1="68" x2="56" y2="68" stroke="#514536" strokeWidth="1.5" />
              {/* Feather details */}
              <path d="M 28 48 C 24 55, 26 64, 34 68" stroke="#FFB84D" strokeWidth="1.5" fill="none" opacity="0.6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none"></div>
          </div>
          <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-[#FFB84D] text-[#0F0E0D] text-[9px] font-mono font-bold rounded">
            LVL-4
          </div>
        </div>

        <h1 className="font-['Chivo'] text-2xl font-black tracking-tight text-[#ffba56] text-center">
          NIGHTBIRD
        </h1>
        <p className="font-mono text-[10px] tracking-widest text-[#d5c4b1] mt-0.5 uppercase">
          FORENSIC ARCHIVE v1.0.4
        </p>
      </div>

      {/* CTA: NEW EVIDENCE */}
      <button
        id="btn-new-evidence"
        onClick={onOpenNewEvidence}
        className="w-full bg-[#e09f3e] hover:bg-[#FFB84D] text-[#0F0E0D] border-2 border-[#e09f3e] hover:border-[#FFB84D] font-mono text-xs py-2.5 mb-6 transition-all duration-150 flex items-center justify-center gap-2 uppercase tracking-widest font-bold shadow-[0_2px_10px_rgba(224,159,62,0.2)] active:translate-y-0.5 cursor-pointer"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
          add
        </span>
        NEW EVIDENCE
      </button>

      {/* Main Navigation Tabs */}
      <div className="flex-1 flex flex-col gap-1">
        <button
          id="nav-dashboard"
          onClick={() => setActiveView('dashboard')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-sm font-medium cursor-pointer ${
            activeView === 'dashboard'
              ? 'bg-[#221f1c] text-[#ffba56] border-l-4 border-[#FFB84D] pl-2.5'
              : 'text-[#d5c4b1] hover:text-[#e9e1db] hover:bg-[#2d2926]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">dashboard</span>
          <span>Dashboard</span>
        </button>

        <button
          id="nav-timeline"
          onClick={() => setActiveView('timeline')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-sm font-medium cursor-pointer ${
            activeView === 'timeline'
              ? 'bg-[#221f1c] text-[#ffba56] border-l-4 border-[#FFB84D] pl-2.5'
              : 'text-[#d5c4b1] hover:text-[#e9e1db] hover:bg-[#2d2926]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">view_timeline</span>
          <span>Timeline</span>
        </button>

        <button
          id="nav-documents"
          onClick={() => setActiveView('documents')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-sm font-medium cursor-pointer ${
            activeView === 'documents'
              ? 'bg-[#221f1c] text-[#ffba56] border-l-4 border-[#FFB84D] pl-2.5'
              : 'text-[#d5c4b1] hover:text-[#e9e1db] hover:bg-[#2d2926]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">description</span>
          <span>Documents</span>
        </button>

        <button
          id="nav-binders"
          onClick={() => setActiveView('binders')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-sm font-medium cursor-pointer ${
            activeView === 'binders'
              ? 'bg-[#221f1c] text-[#ffba56] border-l-4 border-[#FFB84D] pl-2.5'
              : 'text-[#d5c4b1] hover:text-[#e9e1db] hover:bg-[#2d2926]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">folder_shared</span>
          <span>Binders</span>
        </button>

        <button
          id="nav-pattern"
          onClick={() => setActiveView('pattern')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-sm font-medium cursor-pointer ${
            activeView === 'pattern'
              ? 'bg-[#221f1c] text-[#ffba56] border-l-4 border-[#FFB84D] pl-2.5'
              : 'text-[#d5c4b1] hover:text-[#e9e1db] hover:bg-[#2d2926]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">analytics</span>
          <span>Pattern Analysis</span>
        </button>
      </div>

      {/* Footer Navigation Tabs */}
      <div className="pt-4 mt-auto border-t-2 border-[#514536] flex flex-col gap-1">
        <button
          id="nav-map"
          onClick={() => setActiveView('map')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-sm font-medium cursor-pointer ${
            activeView === 'map'
              ? 'bg-[#221f1c] text-[#ffba56] border-l-4 border-[#FFB84D] pl-2.5'
              : 'text-[#d5c4b1] hover:text-[#e9e1db] hover:bg-[#2d2926]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">hub</span>
          <span>Map</span>
        </button>

        {/* Tags Tab - Primary Screen Highlighted */}
        <button
          id="nav-tags"
          onClick={() => setActiveView('tags')}
          className={`flex items-center gap-3 px-3.5 py-2.5 font-bold transition-all text-sm cursor-pointer ${
            activeView === 'tags'
              ? 'bg-[#FFB84D] text-[#0F0E0D] border-l-4 border-[#ffba56] shadow-[0_0_12px_rgba(255,184,77,0.3)]'
              : 'text-[#d5c4b1] hover:text-[#e9e1db] hover:bg-[#2d2926]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">sell</span>
          <span>Tags</span>
        </button>

        <button
          id="nav-settings"
          onClick={() => setActiveView('settings')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded transition-colors text-sm font-medium cursor-pointer ${
            activeView === 'settings'
              ? 'bg-[#221f1c] text-[#ffba56] border-l-4 border-[#FFB84D] pl-2.5'
              : 'text-[#d5c4b1] hover:text-[#e9e1db] hover:bg-[#2d2926]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">settings</span>
          <span>Settings</span>
        </button>
      </div>

      {/* Terminal Node Status */}
      <div className="mt-4 pt-3 border-t border-[#383430] flex items-center justify-between text-[10px] font-mono text-[#9e8e7d]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SECURE_NODE_09</span>
        </div>
        <span>ENCRYPT: AES-256</span>
      </div>
    </nav>
  );
};
