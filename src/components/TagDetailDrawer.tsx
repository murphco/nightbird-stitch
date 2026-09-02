import React, { useState } from 'react';
import { TagEntity } from '../types';

interface TagDetailDrawerProps {
  tag: TagEntity | null;
  onClose: () => void;
  onUpdateTag: (updated: TagEntity) => void;
  onDeleteTag?: (tagId: string) => void;
}

export const TagDetailDrawer: React.FC<TagDetailDrawerProps> = ({
  tag,
  onClose,
  onUpdateTag,
}) => {
  if (!tag) return null;

  const [notes, setNotes] = useState(tag.investigatorNotes || '');
  const [copied, setCopied] = useState(false);
  const [isRedacted, setIsRedacted] = useState(tag.status === 'ARCHIVED');

  const handleCopyIdentifier = () => {
    navigator.clipboard.writeText(tag.identifier);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNotes = () => {
    onUpdateTag({
      ...tag,
      investigatorNotes: notes,
    });
  };

  const toggleThreatLevel = () => {
    const nextPattern =
      tag.patternDetect === 'NOMINAL'
        ? 'ELEVATED'
        : tag.patternDetect === 'ELEVATED'
        ? 'HIGH'
        : tag.patternDetect === 'HIGH'
        ? 'CRITICAL'
        : 'NOMINAL';

    onUpdateTag({
      ...tag,
      patternDetect: nextPattern,
      status: nextPattern === 'CRITICAL' ? 'CRITICAL' : 'ACTIVE',
    });
  };

  const toggleRedact = () => {
    const newStatus = isRedacted ? 'ACTIVE' : 'ARCHIVED';
    setIsRedacted(!isRedacted);
    onUpdateTag({
      ...tag,
      status: newStatus,
    });
  };

  return (
    <div
      id="tag-detail-drawer"
      className="fixed inset-y-0 right-0 w-full max-w-xl bg-[#100e0b] border-l-2 border-[#514536] shadow-2xl z-40 flex flex-col font-mono overflow-y-auto animate-in slide-in-from-right duration-200"
    >
      {/* Drawer Header */}
      <div className="p-4 border-b-2 border-[#514536] bg-[#1e1b18] flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFB84D] animate-pulse"></span>
          <span className="text-xs font-bold text-[#FFB84D] tracking-widest uppercase">
            ENTITY DOSSIER // {tag.id.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyIdentifier}
            className="px-2.5 py-1 bg-[#161310] border border-[#514536] hover:border-[#FFB84D] text-[11px] text-[#D2C9B1] rounded transition-colors flex items-center gap-1 cursor-pointer"
            title="Copy tag identifier"
          >
            <span className="material-symbols-outlined text-[14px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'COPIED' : 'COPY'}
          </button>
          <button
            onClick={onClose}
            className="p-1 text-[#9e8e7d] hover:text-[#e9e1db] hover:bg-[#2d2926] rounded transition-colors cursor-pointer"
            title="Close dossier"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 space-y-5 text-xs text-[#d5c4b1] flex-1">
        {/* Identifier & Category Banner */}
        <div className="p-4 bg-[#161310] border border-[#514536] rounded space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[#9e8e7d] tracking-widest uppercase">
              TAG IDENTIFIER
            </span>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-[#2d2926] text-[#FFB84D] border border-[#FFB84D]/40 text-[10px] font-bold rounded">
                {tag.category}
              </span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                  tag.patternDetect === 'CRITICAL'
                    ? 'bg-[#632424] text-[#ffb4ab] border-[#e06868]'
                    : tag.patternDetect === 'HIGH'
                    ? 'bg-[#2d2926] text-[#FFB84D] border-[#FFB84D]'
                    : 'bg-[#221f1c] text-[#9e8e7d] border-[#514536]'
                }`}
              >
                {tag.patternDetect}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-black text-[#ffba56] tracking-tight">{tag.identifier}</h2>
          <p className="text-[#D2C9B1] text-xs font-sans leading-relaxed">{tag.description}</p>
        </div>

        {/* Vital Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 bg-[#161310] border border-[#514536] rounded">
            <div className="text-[10px] text-[#9e8e7d] uppercase">OCCURRENCES</div>
            <div className="text-lg font-bold text-[#FFB84D] mt-0.5 font-['Chivo']">
              {tag.occurrences.toLocaleString()}
            </div>
          </div>
          <div className="p-3 bg-[#161310] border border-[#514536] rounded">
            <div className="text-[10px] text-[#9e8e7d] uppercase">WEIGHT RATING</div>
            <div className="text-lg font-bold text-[#9dcee1] mt-0.5 font-['Chivo']">
              {tag.weight}%
            </div>
          </div>
          <div className="p-3 bg-[#161310] border border-[#514536] rounded">
            <div className="text-[10px] text-[#9e8e7d] uppercase">CLEARANCE</div>
            <div className="text-lg font-bold text-[#e06868] mt-0.5 font-['Chivo']">
              LEVEL {tag.clearanceLevel}
            </div>
          </div>
        </div>

        {/* Telemetry & Detection Timestamps */}
        <div className="p-3 bg-[#161310] border border-[#514536] rounded space-y-1.5 text-[11px]">
          <div className="text-[10px] text-[#9e8e7d] font-bold uppercase tracking-wider mb-1 border-b border-[#383430] pb-1">
            DETECTION TELEMETRY
          </div>
          <div className="flex justify-between">
            <span className="text-[#9e8e7d]">Last Recorded Activity:</span>
            <span className="text-[#D2C9B1]">{tag.lastDetected}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9e8e7d]">Initial Archive Timestamp:</span>
            <span className="text-[#D2C9B1]">{tag.firstDetected}</span>
          </div>
          {tag.geoCoordinates && (
            <div className="flex justify-between">
              <span className="text-[#9e8e7d]">Triangulated Coordinates:</span>
              <span className="text-[#FFB84D]">{tag.geoCoordinates}</span>
            </div>
          )}
        </div>

        {/* Co-Occurring Tags Correlation */}
        {tag.coOccurringTags && tag.coOccurringTags.length > 0 && (
          <div className="p-3 bg-[#161310] border border-[#514536] rounded space-y-2">
            <div className="text-[10px] text-[#9e8e7d] font-bold uppercase tracking-wider mb-1">
              CO-OCCURRING CORRELATIONS
            </div>
            <div className="space-y-2">
              {tag.coOccurringTags.map((co, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <span className="text-[#D2C9B1] font-bold">{co.tag}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-[#0F0E0D] border border-[#383430] overflow-hidden">
                      <div
                        className="h-full bg-[#FFB84D]"
                        style={{ width: `${co.correlation}%` }}
                      ></div>
                    </div>
                    <span className="text-[#FFB84D] font-mono text-[10px] w-8 text-right">
                      {co.correlation}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Associated Linked Entities */}
        {tag.linkedEntities && tag.linkedEntities.length > 0 && (
          <div className="p-3 bg-[#161310] border border-[#514536] rounded space-y-2">
            <div className="text-[10px] text-[#9e8e7d] font-bold uppercase tracking-wider">
              LINKED PERSONS & TARGET ENTITIES
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tag.linkedEntities.map((ent, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-[#221f1c] border border-[#514536] text-[#D2C9B1] text-[11px] rounded"
                >
                  {ent}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Source Evidence Documents */}
        <div className="p-3 bg-[#161310] border border-[#514536] rounded space-y-2">
          <div className="text-[10px] text-[#9e8e7d] font-bold uppercase tracking-wider">
            PRIMARY SOURCE EVIDENCE ({tag.sourceEvidence.length})
          </div>
          <div className="space-y-1.5">
            {tag.sourceEvidence.map((doc) => (
              <div
                key={doc.id}
                className="p-2 bg-[#1e1b18] border border-[#383430] rounded flex items-center justify-between text-[11px] hover:border-[#514536] transition-colors"
              >
                <div>
                  <div className="font-bold text-[#e9e1db]">{doc.title}</div>
                  <div className="text-[10px] text-[#9e8e7d] flex items-center gap-2 mt-0.5">
                    <span className="text-[#FFB84D]">{doc.id}</span>
                    <span>•</span>
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.timestamp}</span>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Opening raw forensic artifact: ${doc.id}`)}
                  className="px-2 py-1 bg-[#2d2926] hover:bg-[#383430] text-[#D2C9B1] border border-[#514536] text-[10px] rounded cursor-pointer"
                >
                  VIEW
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Investigator Notes */}
        <div className="p-3 bg-[#161310] border border-[#514536] rounded space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-[#9e8e7d] font-bold uppercase tracking-wider">
              INVESTIGATOR WORKING NOTES
            </span>
            <span className="text-[9px] text-[#FFB84D]">ENCRYPTED LOCAL STORE</span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Log anomaly observations, suspect affiliations, or tactical directives..."
            className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] rounded p-2 text-xs text-[#e9e1db] font-sans focus:outline-none"
          />
          <button
            onClick={handleSaveNotes}
            className="w-full py-1.5 bg-[#2d2926] hover:bg-[#383430] text-[#FFB84D] border border-[#514536] hover:border-[#FFB84D] text-xs font-bold rounded cursor-pointer transition-colors"
          >
            COMMIT LOG ENTRY
          </button>
        </div>

        {/* Quick Actions Footer */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={toggleThreatLevel}
            className="py-2.5 px-3 bg-[#221f1c] hover:bg-[#2d2926] text-[#FFB84D] border border-[#514536] text-xs font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">security_update_warning</span>
            CYCLE THREAT
          </button>
          <button
            onClick={toggleRedact}
            className={`py-2.5 px-3 border text-xs font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer ${
              isRedacted
                ? 'bg-[#632424] text-[#ffb4ab] border-[#e06868]'
                : 'bg-[#221f1c] hover:bg-[#2d2926] text-[#9e8e7d] border-[#514536]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">visibility_off</span>
            {isRedacted ? 'ARCHIVED' : 'REDACT / ARCHIVE'}
          </button>
        </div>
      </div>
    </div>
  );
};
