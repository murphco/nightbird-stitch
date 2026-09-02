import React from 'react';
import { TagEntity, ActiveView } from '../types';

interface OtherViewsProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  tags: TagEntity[];
  onSelectTag: (tag: TagEntity) => void;
}

export const OtherViews: React.FC<OtherViewsProps> = ({
  activeView,
  setActiveView,
  tags,
  onSelectTag,
}) => {
  if (activeView === 'tags') return null;

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto font-mono text-xs">
      {/* Top Banner Navigation back to Tag Database */}
      <div className="flex items-center justify-between p-3 bg-[#1e1b18] border border-[#514536] rounded">
        <div className="flex items-center gap-2">
          <span className="text-[#9e8e7d]">ACTIVE CONSOLE //</span>
          <span className="text-[#FFB84D] font-bold uppercase">{activeView}</span>
        </div>
        <button
          onClick={() => setActiveView('tags')}
          className="px-3 py-1 bg-[#2d2926] hover:bg-[#383430] text-[#ffba56] border border-[#FFB84D]/40 rounded flex items-center gap-1.5 font-bold cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-sm">sell</span>
          RETURN TO TAG DATABASE
        </button>
      </div>

      {/* DASHBOARD VIEW */}
      {activeView === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#161310] border border-[#514536] rounded">
              <div className="text-[10px] text-[#9e8e7d] uppercase">ACTIVE ENTITIES</div>
              <div className="text-3xl font-black text-[#FFB84D] mt-1 font-['Chivo']">1,492</div>
              <div className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
                <span>▲ +14 ingested today</span>
              </div>
            </div>
            <div className="p-4 bg-[#161310] border border-[#514536] rounded">
              <div className="text-[10px] text-[#9e8e7d] uppercase">CRITICAL ANOMALIES</div>
              <div className="text-3xl font-black text-[#e06868] mt-1 font-['Chivo']">28</div>
              <div className="text-[10px] text-[#e06868] mt-2">Immediate tactical review</div>
            </div>
            <div className="p-4 bg-[#161310] border border-[#514536] rounded">
              <div className="text-[10px] text-[#9e8e7d] uppercase">LINKED CASES</div>
              <div className="text-3xl font-black text-[#9dcee1] mt-1 font-['Chivo']">12</div>
              <div className="text-[10px] text-[#9e8e7d] mt-2">Operation Blackbird active</div>
            </div>
            <div className="p-4 bg-[#161310] border border-[#514536] rounded">
              <div className="text-[10px] text-[#9e8e7d] uppercase">ENCRYPTION ENGINE</div>
              <div className="text-3xl font-black text-emerald-400 mt-1 font-['Chivo']">100%</div>
              <div className="text-[10px] text-[#9e8e7d] mt-2">Zero breach integrity</div>
            </div>
          </div>

          <div className="p-4 bg-[#161310] border border-[#514536] rounded space-y-3">
            <h3 className="font-bold text-[#ffba56] text-sm uppercase">
              HIGH PRIORITY CORRELATED ENTITIES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tags.slice(0, 3).map((tag) => (
                <div
                  key={tag.id}
                  onClick={() => {
                    setActiveView('tags');
                    onSelectTag(tag);
                  }}
                  className="p-3 bg-[#1e1b18] hover:bg-[#2d2926] border border-[#383430] hover:border-[#FFB84D] rounded cursor-pointer transition-all"
                >
                  <div className="text-[#FFB84D] font-bold text-xs">{tag.identifier}</div>
                  <div className="text-[#D2C9B1] text-[11px] mt-1 line-clamp-2">
                    {tag.description}
                  </div>
                  <div className="mt-2 text-[10px] text-[#9e8e7d] flex justify-between">
                    <span>{tag.category}</span>
                    <span className="text-[#e06868]">{tag.patternDetect}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TIMELINE VIEW */}
      {activeView === 'timeline' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h2 className="text-base font-bold text-[#ffba56] uppercase">
            CHRONOLOGICAL DETECTION TIMELINE
          </h2>
          <div className="border-l-2 border-[#514536] ml-4 pl-6 space-y-6">
            {tags.map((tag) => (
              <div key={tag.id} className="relative group">
                <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#FFB84D] border-2 border-[#0F0E0D]"></span>
                <div className="p-3 bg-[#161310] border border-[#514536] rounded hover:border-[#FFB84D] transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#FFB84D]">{tag.identifier}</span>
                    <span className="text-[#9e8e7d] text-[10px]">{tag.lastDetected}</span>
                  </div>
                  <p className="text-[#D2C9B1] text-xs font-sans mt-1">{tag.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DOCUMENTS VIEW */}
      {activeView === 'documents' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h2 className="text-base font-bold text-[#ffba56] uppercase">
            SEIZED EVIDENCE & FORENSIC DOCUMENTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'DOC-8821', title: 'SWIFT Wire Transfer Log batch #992', type: 'FINANCIAL', size: '2.4 MB' },
              { id: 'DOC-9011', title: 'Cyprus Bank Account Ledger Statement', type: 'FINANCIAL', size: '1.8 MB' },
              { id: 'DOC-404', title: 'Encrypted RF burst packet capture', type: 'SIGNALS', size: '14.2 MB' },
              { id: 'DOC-88', title: 'Cellular Tower Ping Triangulation matrix', type: 'GEO', size: '840 KB' },
              { id: 'DOC-512', title: 'Securities FIX Protocol Order Flow Capture', type: 'FINANCIAL', size: '4.1 MB' },
            ].map((doc) => (
              <div
                key={doc.id}
                className="p-3 bg-[#161310] border border-[#514536] rounded flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-[#e9e1db]">{doc.title}</div>
                  <div className="text-[10px] text-[#9e8e7d] mt-1">
                    {doc.id} • {doc.type} • {doc.size}
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloading verified forensic copy of ${doc.id}...`)}
                  className="px-3 py-1 bg-[#221f1c] hover:bg-[#2d2926] text-[#FFB84D] border border-[#514536] rounded cursor-pointer"
                >
                  DECRYPT & VIEW
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BINDERS VIEW */}
      {activeView === 'binders' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h2 className="text-base font-bold text-[#ffba56] uppercase">
            ACTIVE INVESTIGATION BINDERS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'OPERATION BLACKBIRD', status: 'ACTIVE', entities: 42, clearance: 'TS-ALPHA' },
              { name: 'PROJECT GHOSTNET', status: 'INVESTIGATING', entities: 18, clearance: 'SECRET' },
              { name: 'MEDITERRANEAN CARGO TRACE', status: 'MONITORING', entities: 29, clearance: 'CONFIDENTIAL' },
            ].map((binder, i) => (
              <div key={i} className="p-4 bg-[#161310] border border-[#514536] rounded space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-[#FFB84D] font-bold">{binder.status}</span>
                  <span className="text-[#9e8e7d]">{binder.clearance}</span>
                </div>
                <h3 className="font-bold text-sm text-[#e9e1db]">{binder.name}</h3>
                <div className="text-[10px] text-[#9e8e7d]">{binder.entities} Correlated Entity Tags</div>
                <button
                  onClick={() => setActiveView('tags')}
                  className="w-full mt-2 py-1.5 bg-[#221f1c] hover:bg-[#2d2926] text-[#D2C9B1] border border-[#514536] rounded font-bold cursor-pointer"
                >
                  OPEN DOSSIER FOLDER
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PATTERN ANALYSIS VIEW */}
      {activeView === 'pattern' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h2 className="text-base font-bold text-[#ffba56] uppercase">
            FORENSIC ANOMALY PATTERN DETECTOR
          </h2>
          <div className="p-4 bg-[#161310] border border-[#514536] rounded space-y-3">
            <div className="text-xs text-[#d5c4b1]">
              Automated pattern detection has identified clustered cross-border routing between offshore accounts and encrypted tactical radios:
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-[#632424]/30 border border-[#e06868]/40 rounded flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#ffb4ab]">CLUSTER #A-992: CAPITAL FLIGHT / SIGNAL SYNCHRONIZATION</div>
                  <div className="text-[11px] text-[#D2C9B1] mt-0.5">#OFFSHORE_ACCT_TRX ⟷ #ENCRYPTED_COMMS_V2 (92% Correlation)</div>
                </div>
                <button
                  onClick={() => setActiveView('tags')}
                  className="px-3 py-1 bg-[#632424] text-[#ffb4ab] border border-[#e06868] rounded font-bold cursor-pointer"
                >
                  ISOLATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAP VIEW */}
      {activeView === 'map' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h2 className="text-base font-bold text-[#ffba56] uppercase">
            GEOGRAPHIC ENTITY DISPERSION
          </h2>
          <div className="p-8 bg-[#100e0b] border border-[#514536] rounded flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[360px]">
            {/* Radar Sweep Effect */}
            <div className="w-64 h-64 rounded-full border border-[#FFB84D]/30 relative flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-[#FFB84D]/20"></div>
              <div className="w-32 h-32 rounded-full border border-[#FFB84D]/20"></div>
              {/* Radar beam */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFB84D]/15 via-transparent to-transparent animate-spin duration-3000"></div>
              {/* Blips */}
              <span className="w-2.5 h-2.5 rounded-full bg-[#e06868] absolute top-12 left-20 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-[#FFB84D] absolute bottom-16 right-14"></span>
              <span className="w-2 h-2 rounded-full bg-[#9dcee1] absolute top-24 right-20"></span>
            </div>
            <div className="mt-4 text-[#D2C9B1] font-bold">14 GEO-TAGGED NODES ACTIVE</div>
            <div className="text-[10px] text-[#9e8e7d] mt-1">Berlin • Cayman Islands • Panama City • Paris • Dubai • Brussels</div>
          </div>
        </div>
      )}

      {/* SETTINGS VIEW */}
      {activeView === 'settings' && (
        <div className="space-y-4 animate-in fade-in duration-150 max-w-xl">
          <h2 className="text-base font-bold text-[#ffba56] uppercase">
            ARCHIVE SYSTEM CONFIGURATION
          </h2>
          <div className="p-4 bg-[#161310] border border-[#514536] rounded space-y-4">
            <div>
              <label className="block text-[#9e8e7d] font-bold mb-1">STATION CLEARANCE TIER</label>
              <select className="w-full bg-[#0F0E0D] border border-[#514536] text-[#FFB84D] p-2 rounded">
                <option>LEVEL 4 (TOP SECRET / COMPARTMENTED)</option>
                <option>LEVEL 5 (DIRECTORATE OVERRIDE)</option>
              </select>
            </div>
            <div>
              <label className="block text-[#9e8e7d] font-bold mb-1">LOCAL STORE ENCRYPTION</label>
              <div className="text-emerald-400 font-bold">AES-256-GCM / HARDWARE KEYRING LINKED</div>
            </div>
            <div className="pt-2 border-t border-[#383430]">
              <button
                onClick={() => alert('Local cache purged & re-indexed.')}
                className="px-4 py-2 bg-[#2d2926] hover:bg-[#383430] text-[#D2C9B1] border border-[#514536] rounded font-bold cursor-pointer"
              >
                FLUSH LOCAL TELEMETRY CACHE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
