import React, { useState } from 'react';
import { TagCategory, PatternDetect, TagEntity } from '../types';

interface NewEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTag: (newTag: TagEntity) => void;
}

export const NewEvidenceModal: React.FC<NewEvidenceModalProps> = ({
  isOpen,
  onClose,
  onAddTag,
}) => {
  if (!isOpen) return null;

  const [identifier, setIdentifier] = useState('');
  const [category, setCategory] = useState<TagCategory>('FINANCIAL');
  const [patternDetect, setPatternDetect] = useState<PatternDetect>('HIGH');
  const [occurrences, setOccurrences] = useState(1);
  const [weight, setWeight] = useState(70);
  const [description, setDescription] = useState('');
  const [linkedEntityInput, setLinkedEntityInput] = useState('');
  const [geoCoordinates, setGeoCoordinates] = useState('');
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceType, setEvidenceType] = useState<'DOCUMENT' | 'AUDIO' | 'TRANSACTION' | 'SURVEILLANCE' | 'LOG'>('DOCUMENT');

  // Intelligent tag extractor simulator
  const handleExtractFromText = (text: string) => {
    setDescription(text);
    const hashMatches = text.match(/#[A-Z0-9_]+/gi);
    if (hashMatches && hashMatches.length > 0) {
      setIdentifier(hashMatches[0].toUpperCase());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    const formattedId = identifier.startsWith('#')
      ? identifier.toUpperCase()
      : `#${identifier.toUpperCase().replace(/\s+/g, '_')}`;

    const newEntity: TagEntity = {
      id: `tag-${Date.now()}`,
      identifier: formattedId,
      category,
      occurrences: Number(occurrences) || 1,
      weight: Number(weight) || 50,
      patternDetect,
      status: patternDetect === 'CRITICAL' ? 'CRITICAL' : 'ACTIVE',
      lastDetected: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      firstDetected: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      description: description || 'Ingested forensic entity item.',
      sourceEvidence: [
        {
          id: `EV-${Date.now().toString().slice(-6)}`,
          title: evidenceTitle || 'Ingested Tactical Evidence Batch',
          type: evidenceType,
          timestamp: new Date().toISOString().substring(0, 10),
        },
      ],
      linkedEntities: linkedEntityInput
        ? linkedEntityInput.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean)
        : ['TARGET_UNKNOWN'],
      coOccurringTags: [],
      geoCoordinates: geoCoordinates || undefined,
      clearanceLevel: 4,
      investigatorNotes: 'New evidence record manually ingested via tactical console.',
    };

    onAddTag(newEntity);
    onClose();
  };

  return (
    <div
      id="new-evidence-modal"
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs font-mono"
    >
      <div className="bg-[#161310] border-2 border-[#FFB84D] w-full max-w-2xl rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 bg-[#1e1b18] border-b-2 border-[#514536] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FFB84D]">post_add</span>
            <span className="font-bold text-[#FFB84D] text-sm tracking-wider uppercase">
              INGEST EVIDENCE & REGISTER TAG ENTITY
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#9e8e7d] hover:text-[#e9e1db] p-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
          {/* Quick Presets for demonstration */}
          <div className="p-2.5 bg-[#100e0b] border border-[#383430] rounded">
            <div className="text-[10px] text-[#9e8e7d] uppercase font-bold mb-1.5">
              Quick Ingestion Presets:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setIdentifier('#CRYPTO_COLD_WALLET_88');
                  setCategory('FINANCIAL');
                  setPatternDetect('HIGH');
                  setOccurrences(520);
                  setWeight(85);
                  setDescription('Hardware Ledger recovery with high-volume outbound privacy hops.');
                  setEvidenceTitle('Seized Trezor Hardware Dump');
                  setEvidenceType('LOG');
                  setLinkedEntityInput('SUBJECT-OMEGA, COLD_VAULT_SWISS');
                }}
                className="px-2 py-1 bg-[#221f1c] hover:bg-[#2d2926] text-[#FFB84D] border border-[#514536] rounded text-[10px] cursor-pointer"
              >
                + Crypto Cold Wallet
              </button>
              <button
                type="button"
                onClick={() => {
                  setIdentifier('#UAV_DRONE_SURVEILLANCE');
                  setCategory('INCIDENT');
                  setPatternDetect('CRITICAL');
                  setOccurrences(142);
                  setWeight(94);
                  setDescription('Unidentified UAV loitering over critical port infrastructure.');
                  setEvidenceTitle('Port Radar Thermal Telemetry');
                  setEvidenceType('SURVEILLANCE');
                  setLinkedEntityInput('VESSEL_BLACK_SWAN, HARBOR_TERMINAL_2');
                  setGeoCoordinates('37.9429° N, 23.6469° E (Piraeus Port)');
                }}
                className="px-2 py-1 bg-[#221f1c] hover:bg-[#2d2926] text-[#e06868] border border-[#514536] rounded text-[10px] cursor-pointer"
              >
                + UAV Drone Incident
              </button>
              <button
                type="button"
                onClick={() => {
                  setIdentifier('#HF_RADIO_BURST_CW');
                  setCategory('COMMUNICATION');
                  setPatternDetect('ELEVATED');
                  setOccurrences(310);
                  setWeight(60);
                  setDescription('Numbered morse code broadcast synchronized on 8420 kHz.');
                  setEvidenceTitle('SIGINT SDR Spectrum Intercept');
                  setEvidenceType('AUDIO');
                  setLinkedEntityInput('CELL_LEADER_KESTREL');
                }}
                className="px-2 py-1 bg-[#221f1c] hover:bg-[#2d2926] text-[#9dcee1] border border-[#514536] rounded text-[10px] cursor-pointer"
              >
                + Shortwave Radio
              </button>
            </div>
          </div>

          {/* Row 1: Tag Identifier & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#d5c4b1] mb-1 font-bold">
                TAG IDENTIFIER <span className="text-[#FFB84D]">*</span>
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="#OFFSHORE_WIRE_44"
                className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] text-[#FFB84D] p-2 rounded focus:outline-none uppercase font-bold"
              />
            </div>
            <div>
              <label className="block text-[#d5c4b1] mb-1 font-bold">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TagCategory)}
                className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] text-[#D2C9B1] p-2 rounded focus:outline-none"
              >
                <option value="FINANCIAL">FINANCIAL</option>
                <option value="COMMUNICATION">COMMUNICATION</option>
                <option value="INCIDENT">INCIDENT</option>
                <option value="SURVEILLANCE">SURVEILLANCE</option>
                <option value="SIGNALS">SIGNALS</option>
                <option value="CYBER">CYBER</option>
              </select>
            </div>
          </div>

          {/* Row 2: Pattern Detect & Weight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#d5c4b1] mb-1 font-bold">PATTERN DETECT</label>
              <select
                value={patternDetect}
                onChange={(e) => setPatternDetect(e.target.value as PatternDetect)}
                className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] text-[#D2C9B1] p-2 rounded focus:outline-none"
              >
                <option value="NOMINAL">NOMINAL</option>
                <option value="ELEVATED">ELEVATED</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="ANOMALOUS">ANOMALOUS</option>
              </select>
            </div>
            <div>
              <label className="block text-[#d5c4b1] mb-1 font-bold">
                WEIGHT RATING ({weight}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#FFB84D] cursor-pointer mt-2"
              />
            </div>
            <div>
              <label className="block text-[#d5c4b1] mb-1 font-bold">INITIAL OCCURRENCES</label>
              <input
                type="number"
                min="1"
                value={occurrences}
                onChange={(e) => setOccurrences(Number(e.target.value))}
                className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] text-[#D2C9B1] p-2 rounded focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3: Description / Forensic Narrative */}
          <div>
            <label className="block text-[#d5c4b1] mb-1 font-bold">
              FORENSIC NARRATIVE & CONTEXT
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => handleExtractFromText(e.target.value)}
              placeholder="Detail the intelligence context, observed transactions, or radio intercept telemetry..."
              className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] text-[#D2C9B1] p-2 rounded focus:outline-none font-sans"
            />
          </div>

          {/* Row 4: Evidence Source & Linked Entities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#d5c4b1] mb-1 font-bold">SOURCE EVIDENCE TITLE</label>
              <input
                type="text"
                value={evidenceTitle}
                onChange={(e) => setEvidenceTitle(e.target.value)}
                placeholder="e.g. Wire Transfer Audit Report #441"
                className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] text-[#D2C9B1] p-2 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#d5c4b1] mb-1 font-bold">EVIDENCE TYPE</label>
              <select
                value={evidenceType}
                onChange={(e) => setEvidenceType(e.target.value as any)}
                className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] text-[#D2C9B1] p-2 rounded focus:outline-none"
              >
                <option value="DOCUMENT">DOCUMENT</option>
                <option value="TRANSACTION">TRANSACTION</option>
                <option value="AUDIO">AUDIO</option>
                <option value="SURVEILLANCE">SURVEILLANCE</option>
                <option value="LOG">LOG</option>
              </select>
            </div>
          </div>

          {/* Row 5: Linked Entities & Geo Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#d5c4b1] mb-1 font-bold">
                LINKED ENTITIES (comma separated)
              </label>
              <input
                type="text"
                value={linkedEntityInput}
                onChange={(e) => setLinkedEntityInput(e.target.value)}
                placeholder="SUBJECT-OMEGA, VALIANT_CORP"
                className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] text-[#D2C9B1] p-2 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#d5c4b1] mb-1 font-bold">
                TRIANGULATED GEO COORDINATES
              </label>
              <input
                type="text"
                value={geoCoordinates}
                onChange={(e) => setGeoCoordinates(e.target.value)}
                placeholder="e.g. 52.5200° N, 13.4050° E"
                className="w-full bg-[#0F0E0D] border border-[#514536] focus:border-[#FFB84D] text-[#D2C9B1] p-2 rounded focus:outline-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#514536] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#221f1c] hover:bg-[#2d2926] text-[#9e8e7d] border border-[#514536] rounded font-bold cursor-pointer transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#e09f3e] hover:bg-[#FFB84D] text-[#0F0E0D] font-bold border border-[#e09f3e] rounded cursor-pointer transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              COMMIT ENTITY TO ARCHIVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
