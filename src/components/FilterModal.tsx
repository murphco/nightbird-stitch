import React from 'react';
import { TagFilterState } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: TagFilterState;
  onUpdateFilters: (newFilters: TagFilterState) => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="filter-modal"
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs font-mono select-none"
    >
      <div className="bg-[#161310] border-2 border-[#514536] w-full max-w-lg rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 bg-[#1e1b18] border-b-2 border-[#514536] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FFB84D]">filter_alt</span>
            <span className="font-bold text-[#ffba56] text-sm tracking-wider uppercase">
              QUERY & ARCHIVE FILTERS
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#9e8e7d] hover:text-[#e9e1db] p-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-6 space-y-5 text-xs text-[#d5c4b1]">
          {/* Category Filter */}
          <div>
            <label className="block font-bold mb-2 uppercase text-[#9e8e7d]">
              Target Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['ALL', 'FINANCIAL', 'COMMUNICATION', 'INCIDENT', 'SURVEILLANCE', 'SIGNALS'].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onUpdateFilters({ ...filters, category: cat, page: 1 })}
                    className={`py-2 px-2 text-[11px] font-bold rounded border transition-all cursor-pointer ${
                      filters.category === cat
                        ? 'bg-[#FFB84D] text-[#0F0E0D] border-[#FFB84D]'
                        : 'bg-[#1e1b18] text-[#D2C9B1] border-[#514536] hover:bg-[#2d2926]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Pattern Severity Filter */}
          <div>
            <label className="block font-bold mb-2 uppercase text-[#9e8e7d]">
              Pattern Detection Threat Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['ALL', 'CRITICAL', 'HIGH', 'ELEVATED', 'NOMINAL'].map((pat) => (
                <button
                  key={pat}
                  type="button"
                  onClick={() => onUpdateFilters({ ...filters, pattern: pat, page: 1 })}
                  className={`py-2 px-2 text-[11px] font-bold rounded border transition-all cursor-pointer ${
                    filters.pattern === pat
                      ? 'bg-[#e06868] text-[#0F0E0D] border-[#e06868]'
                      : 'bg-[#1e1b18] text-[#D2C9B1] border-[#514536] hover:bg-[#2d2926]'
                  }`}
                >
                  {pat}
                </button>
              ))}
            </div>
          </div>

          {/* Min Weight Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold uppercase text-[#9e8e7d]">Minimum Weight Rating</label>
              <span className="text-[#FFB84D] font-bold">{filters.minWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="5"
              value={filters.minWeight}
              onChange={(e) =>
                onUpdateFilters({ ...filters, minWeight: Number(e.target.value), page: 1 })
              }
              className="w-full accent-[#FFB84D] cursor-pointer"
            />
          </div>

          {/* Min Occurrences Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold uppercase text-[#9e8e7d]">
                Minimum Occurrence Threshold
              </label>
              <span className="text-[#FFB84D] font-bold">{filters.minOccurrences}</span>
            </div>
            <input
              type="range"
              min="0"
              max="800"
              step="50"
              value={filters.minOccurrences}
              onChange={(e) =>
                onUpdateFilters({ ...filters, minOccurrences: Number(e.target.value), page: 1 })
              }
              className="w-full accent-[#FFB84D] cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#514536] flex justify-between items-center">
            <button
              type="button"
              onClick={onResetFilters}
              className="px-3 py-2 text-[#e06868] hover:text-[#ffb4ab] text-xs font-bold underline cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#221f1c] hover:bg-[#2d2926] text-[#D2C9B1] border border-[#514536] rounded font-bold cursor-pointer"
              >
                APPLY & CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
