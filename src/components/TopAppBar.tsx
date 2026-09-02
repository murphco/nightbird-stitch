import React, { useState, useRef, useEffect } from 'react';

interface TopAppBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onQuickFilter: (query: string) => void;
  totalActiveCount: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  searchQuery,
  setSearchQuery,
  onQuickFilter,
  totalActiveCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape') {
        inputRef.current?.blur();
        setShowNotifications(false);
        setShowSecurityModal(false);
        setShowProfileModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notifications = [
    {
      id: 'notif-1',
      title: 'CRITICAL ANOMALY DETECTED',
      body: '#AIR_GAP_BREACH frequency burst logged at Facility Site B.',
      time: '14m ago',
      level: 'critical',
    },
    {
      id: 'notif-2',
      title: 'CROSS-BORDER WIRE TRACE',
      body: '#OFFSHORE_ACCT_TRX linked to new Cayman intermediary account.',
      time: '1h ago',
      level: 'warning',
    },
    {
      id: 'notif-3',
      title: 'SYSTEM INTEGRITY CHECK',
      body: 'Archive checksum verified against SHA-512 master node.',
      time: '3h ago',
      level: 'info',
    },
  ];

  return (
    <header
      id="top-app-bar"
      className="h-16 border-b-2 border-[#514536] bg-[#1e1b18] flex justify-between items-center px-6 w-full sticky top-0 z-30 select-none shadow-sm"
    >
      {/* Left: Project title & status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFB84D] animate-ping"></span>
          <span className="font-mono text-xs tracking-widest text-[#d5c4b1] font-bold">
            PROJECT NIGHTBIRD
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-2 py-0.5 bg-[#100e0b] border border-[#383430] rounded text-[10px] font-mono text-[#9e8e7d]">
          <span>SYSLOG: OK</span>
          <span>|</span>
          <span className="text-[#FFB84D]">{totalActiveCount.toLocaleString()} ENTITIES</span>
        </div>
      </div>

      {/* Middle: Terminal Search prompt */}
      <div className="flex flex-1 max-w-lg mx-6 relative">
        <div
          className={`w-full relative flex items-center bg-[#0F0E0D] border ${
            isFocused ? 'border-[#FFB84D] shadow-[0_0_8px_rgba(255,184,77,0.25)]' : 'border-[#514536]'
          } rounded transition-all`}
        >
          <span className="material-symbols-outlined absolute left-2.5 text-[#FFB84D] text-sm pointer-events-none">
            chevron_right
          </span>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="QUERY_TAG_DB... (press '/' to focus)"
            className="w-full bg-transparent text-[#FFB84D] font-mono text-xs pl-8 pr-10 py-2 focus:outline-none placeholder:text-[#9e8e7d]/60 tracking-wider"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-7 text-[#9e8e7d] hover:text-[#e9e1db] text-xs font-mono px-1 cursor-pointer"
              title="Clear search"
            >
              ×
            </button>
          )}
          <span className="w-1.5 h-3.5 bg-[#FFB84D] animate-pulse absolute right-3 pointer-events-none"></span>
        </div>

        {/* Autocomplete / Syntax Suggestions popup on focus */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#161310] border border-[#514536] rounded p-2 shadow-2xl z-50 text-[11px] font-mono">
            <div className="text-[#9e8e7d] text-[10px] uppercase font-bold tracking-wider mb-1.5 pb-1 border-b border-[#383430]">
              Fast Filter Syntax
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onMouseDown={() => onQuickFilter('FINANCIAL')}
                className="px-2 py-0.5 bg-[#221f1c] hover:bg-[#2d2926] text-[#FFB84D] border border-[#FFB84D]/30 rounded cursor-pointer"
              >
                cat:FINANCIAL
              </button>
              <button
                onMouseDown={() => onQuickFilter('COMMUNICATION')}
                className="px-2 py-0.5 bg-[#221f1c] hover:bg-[#2d2926] text-[#9dcee1] border border-[#9dcee1]/30 rounded cursor-pointer"
              >
                cat:COMMUNICATION
              </button>
              <button
                onMouseDown={() => onQuickFilter('INCIDENT')}
                className="px-2 py-0.5 bg-[#221f1c] hover:bg-[#2d2926] text-[#e06868] border border-[#e06868]/30 rounded cursor-pointer"
              >
                cat:INCIDENT
              </button>
              <button
                onMouseDown={() => onQuickFilter('CRITICAL')}
                className="px-2 py-0.5 bg-[#221f1c] hover:bg-[#2d2926] text-[#ffb4ab] border border-[#ffb4ab]/30 rounded cursor-pointer"
              >
                pattern:CRITICAL
              </button>
              <button
                onMouseDown={() => onQuickFilter('#OFFSHORE')}
                className="px-2 py-0.5 bg-[#221f1c] hover:bg-[#2d2926] text-[#D2C9B1] border border-[#514536] rounded cursor-pointer"
              >
                #OFFSHORE
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right: Actions and Profile */}
      <div className="flex items-center gap-3 relative">
        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            id="btn-notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSecurityModal(false);
              setShowProfileModal(false);
            }}
            className="relative p-1.5 text-[#d5c4b1] hover:text-[#ffba56] hover:bg-[#2d2926] rounded transition-colors cursor-pointer"
            title="Forensic Alert Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications_paused</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e06868] text-[#0F0E0D] text-[9px] font-mono font-bold rounded-full flex items-center justify-center border border-[#1e1b18]">
              2
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#161310] border-2 border-[#514536] rounded shadow-2xl z-50 p-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#383430] mb-2">
                <span className="font-bold text-[#ffba56] tracking-wider text-[11px] uppercase">
                  FORENSIC ALERTS (2 NEW)
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[#9e8e7d] hover:text-[#e9e1db]"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2 rounded border ${
                      n.level === 'critical'
                        ? 'bg-[#632424]/30 border-[#e06868]/40'
                        : n.level === 'warning'
                        ? 'bg-[#FFB84D]/10 border-[#FFB84D]/30'
                        : 'bg-[#221f1c] border-[#514536]'
                    }`}
                  >
                    <div className="flex justify-between text-[10px] font-bold">
                      <span
                        className={
                          n.level === 'critical'
                            ? 'text-[#e06868]'
                            : n.level === 'warning'
                            ? 'text-[#FFB84D]'
                            : 'text-[#9dcee1]'
                        }
                      >
                        {n.title}
                      </span>
                      <span className="text-[#9e8e7d]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#D2C9B1] mt-1 font-sans">{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security Shield */}
        <div className="relative">
          <button
            id="btn-security"
            onClick={() => {
              setShowSecurityModal(!showSecurityModal);
              setShowNotifications(false);
              setShowProfileModal(false);
            }}
            className="p-1.5 text-[#d5c4b1] hover:text-[#ffba56] hover:bg-[#2d2926] rounded transition-colors cursor-pointer"
            title="Cryptographic Integrity & Clearance"
          >
            <span className="material-symbols-outlined text-[20px]">security</span>
          </button>

          {showSecurityModal && (
            <div className="absolute right-0 mt-2 w-72 bg-[#161310] border-2 border-[#514536] rounded shadow-2xl z-50 p-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#383430] mb-2">
                <span className="font-bold text-[#ffba56] tracking-wider text-[11px] uppercase">
                  SECURITY CLEARANCE: TS/SCI
                </span>
                <button
                  onClick={() => setShowSecurityModal(false)}
                  className="text-[#9e8e7d] hover:text-[#e9e1db]"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between text-[#d5c4b1]">
                  <span>Clearance Level:</span>
                  <span className="text-[#FFB84D] font-bold">ALPHA-4</span>
                </div>
                <div className="flex justify-between text-[#d5c4b1]">
                  <span>Database Key:</span>
                  <span className="text-emerald-400">ECDSA-P384</span>
                </div>
                <div className="flex justify-between text-[#d5c4b1]">
                  <span>Audit Trail:</span>
                  <span className="text-emerald-400">IMMUTABLE LOG</span>
                </div>
                <div className="flex justify-between text-[#d5c4b1]">
                  <span>Air-Gap Status:</span>
                  <span className="text-[#e06868]">MONITORED PROXY</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-[#514536] mx-1"></div>

        {/* Analyst Avatar */}
        <div className="relative">
          <button
            id="btn-profile"
            onClick={() => {
              setShowProfileModal(!showProfileModal);
              setShowNotifications(false);
              setShowSecurityModal(false);
            }}
            className="w-8 h-8 rounded-sm border border-[#514536] bg-[#221f1c] flex items-center justify-center grayscale hover:grayscale-0 opacity-90 hover:opacity-100 transition-all cursor-pointer overflow-hidden group shadow-inner"
            title="Analyst Profile"
          >
            <svg viewBox="0 0 40 40" className="w-full h-full text-[#9e8e7d] group-hover:text-[#FFB84D]">
              <rect width="40" height="40" fill="#161310" />
              {/* Tactical goggles & balaclava silhouette */}
              <circle cx="20" cy="18" r="11" fill="#2d2926" />
              <rect x="11" y="14" width="18" height="6" rx="2" fill="#0F0E0D" stroke="#FFB84D" strokeWidth="1" />
              <circle cx="15.5" cy="17" r="2" fill="#FFB84D" />
              <circle cx="24.5" cy="17" r="2" fill="#FFB84D" />
              <path d="M 8 36 C 8 28, 32 28, 32 36 Z" fill="#221f1c" stroke="#514536" />
            </svg>
          </button>

          {showProfileModal && (
            <div className="absolute right-0 mt-2 w-64 bg-[#161310] border-2 border-[#514536] rounded shadow-2xl z-50 p-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#383430] mb-2">
                <span className="font-bold text-[#ffba56] tracking-wider text-[11px] uppercase">
                  OPERATOR PROFILE
                </span>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-[#9e8e7d] hover:text-[#e9e1db]"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#0F0E0D] border border-[#FFB84D] rounded flex items-center justify-center text-[#FFB84D] font-bold">
                  NB
                </div>
                <div>
                  <div className="font-bold text-[#e9e1db]">ANALYST_KESTREL</div>
                  <div className="text-[10px] text-[#9e8e7d]">SPECIAL INVESTIGATIONS</div>
                </div>
              </div>
              <div className="text-[10px] text-[#d5c4b1] space-y-1 bg-[#100e0b] p-2 rounded border border-[#383430]">
                <div>Station: Berlin Sector 9</div>
                <div>Session: #TRX-88219-ACTIVE</div>
                <div>Active Case: OPERATION BLACKBIRD</div>
              </div>
            </div>
          )}
        </div>

        {/* Power / Reset Action */}
        <button
          onClick={() => {
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="p-1.5 text-[#d5c4b1] hover:text-[#e06868] hover:bg-[#2d2926] rounded transition-colors cursor-pointer"
          title="Reset View & Clear Filters"
        >
          <span className="material-symbols-outlined text-[20px]">power_settings_new</span>
        </button>
      </div>
    </header>
  );
};
