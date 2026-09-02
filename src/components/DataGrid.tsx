import React from 'react';
import { TagEntity } from '../types';

interface DataGridProps {
  tags: TagEntity[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onSelectTag: (tag: TagEntity) => void;
  selectedTagId?: string;
  sortBy: keyof TagEntity;
  sortOrder: 'asc' | 'desc';
  onSort: (field: keyof TagEntity) => void;
}

export const DataGrid: React.FC<DataGridProps> = ({
  tags,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onSelectTag,
  selectedTagId,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + tags.length, totalCount);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // Category badge formatting helper
  const renderCategoryBadge = (category: string) => {
    switch (category) {
      case 'FINANCIAL':
        return (
          <span className="bg-[#2d2926] text-[#FFB84D] px-2 py-0.5 text-[10px] font-mono font-bold border border-[#FFB84D]/40 uppercase tracking-wider rounded-xs">
            FINANCIAL
          </span>
        );
      case 'COMMUNICATION':
        return (
          <span className="bg-[#2d2926] text-[#9dcee1] px-2 py-0.5 text-[10px] font-mono font-bold border border-[#9dcee1]/40 uppercase tracking-wider rounded-xs">
            COMMUNICATION
          </span>
        );
      case 'INCIDENT':
        return (
          <span className="bg-[#2d2926] text-[#e06868] px-2 py-0.5 text-[10px] font-mono font-bold border border-[#e06868]/40 uppercase tracking-wider rounded-xs">
            INCIDENT
          </span>
        );
      case 'SURVEILLANCE':
        return (
          <span className="bg-[#2d2926] text-[#feb956] px-2 py-0.5 text-[10px] font-mono font-bold border border-[#feb956]/40 uppercase tracking-wider rounded-xs">
            SURVEILLANCE
          </span>
        );
      default:
        return (
          <span className="bg-[#2d2926] text-[#d5c4b1] px-2 py-0.5 text-[10px] font-mono font-bold border border-[#514536] uppercase tracking-wider rounded-xs">
            {category}
          </span>
        );
    }
  };

  // Pattern detect badge & icon
  const renderPatternDetect = (pattern: string) => {
    switch (pattern) {
      case 'CRITICAL':
        return (
          <div className="text-right text-[#e06868] flex items-center justify-end gap-1 font-mono font-bold text-xs">
            <span className="material-symbols-outlined text-[15px]">error</span>
            CRITICAL
          </div>
        );
      case 'HIGH':
        return (
          <div className="text-right text-[#FFB84D] flex items-center justify-end gap-1 font-mono font-bold text-xs">
            <span className="material-symbols-outlined text-[15px]">warning</span>
            HIGH
          </div>
        );
      case 'ELEVATED':
        return (
          <div className="text-right text-[#ffba56] flex items-center justify-end gap-1 font-mono font-bold text-xs">
            <span className="material-symbols-outlined text-[15px]">emergency</span>
            ELEVATED
          </div>
        );
      case 'NOMINAL':
      default:
        return (
          <div className="text-right text-[#9e8e7d] flex items-center justify-end gap-1 font-mono font-medium text-xs">
            <span className="material-symbols-outlined text-[15px]">remove</span>
            NOMINAL
          </div>
        );
    }
  };

  // Status LED
  const renderStatusDot = (status: string, pattern: string) => {
    if (pattern === 'CRITICAL' || status === 'CRITICAL') {
      return <span className="w-2.5 h-2.5 rounded-full bg-[#632424] border border-[#e06868] shadow-[0_0_6px_rgba(224,104,104,0.6)]"></span>;
    }
    if (pattern === 'HIGH' || status === 'ACTIVE') {
      return <span className="w-2.5 h-2.5 rounded-full bg-[#FFB84D] shadow-[0_0_6px_rgba(255,184,77,0.6)]"></span>;
    }
    return <span className="w-2.5 h-2.5 rounded-full bg-[#514536]"></span>;
  };

  // Weight Bar Color
  const getWeightBarColor = (weight: number, pattern: string) => {
    if (pattern === 'CRITICAL' || weight >= 85) return 'bg-[#632424] border-r-2 border-[#e06868]';
    if (pattern === 'HIGH' || weight >= 60) return 'bg-[#FFB84D]';
    return 'bg-[#514536]';
  };

  const getSortIcon = (field: keyof TagEntity) => {
    if (sortBy !== field) return 'unfold_more';
    return sortOrder === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down';
  };

  return (
    <div
      id="main-data-grid-container"
      className="col-span-12 md:col-span-9 bg-[#161310] border border-[#514536] flex flex-col h-[70vh] shadow-xl relative"
    >
      {/* Data Grid Table Header (Sortable) */}
      <div className="grid grid-cols-12 gap-3 p-3 border-b-2 border-[#514536] bg-[#2d2926] font-mono text-[11px] text-[#d5c4b1] uppercase tracking-wider font-bold select-none sticky top-0 z-10">
        <div
          onClick={() => onSort('status')}
          className="col-span-1 flex items-center justify-center cursor-pointer hover:text-[#FFB84D]"
          title="Sort by Status"
        >
          STATUS
        </div>
        <div
          onClick={() => onSort('identifier')}
          className="col-span-3 flex items-center gap-1 cursor-pointer hover:text-[#FFB84D]"
          title="Sort by Tag Identifier"
        >
          <span>TAG IDENTIFIER</span>
          <span className="material-symbols-outlined text-sm">{getSortIcon('identifier')}</span>
        </div>
        <div
          onClick={() => onSort('category')}
          className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-[#FFB84D]"
          title="Sort by Category"
        >
          <span>CATEGORY</span>
          <span className="material-symbols-outlined text-sm">{getSortIcon('category')}</span>
        </div>
        <div
          onClick={() => onSort('occurrences')}
          className="col-span-2 flex items-center justify-end gap-1 cursor-pointer hover:text-[#FFB84D] text-right"
          title="Sort by Occurrences"
        >
          <span>OCCURRENCES</span>
          <span className="material-symbols-outlined text-sm">{getSortIcon('occurrences')}</span>
        </div>
        <div
          onClick={() => onSort('weight')}
          className="col-span-2 flex items-center justify-center gap-1 cursor-pointer hover:text-[#FFB84D]"
          title="Sort by Weight"
        >
          <span>WEIGHT</span>
          <span className="material-symbols-outlined text-sm">{getSortIcon('weight')}</span>
        </div>
        <div
          onClick={() => onSort('patternDetect')}
          className="col-span-2 flex items-center justify-end gap-1 cursor-pointer hover:text-[#FFB84D] text-right"
          title="Sort by Pattern Severity"
        >
          <span>PATTERN DETECT</span>
          <span className="material-symbols-outlined text-sm">{getSortIcon('patternDetect')}</span>
        </div>
      </div>

      {/* Data Grid Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#514536]/40 font-mono text-xs">
        {tags.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-[#9e8e7d]">
            <span className="material-symbols-outlined text-4xl mb-2 text-[#514536]">database_off</span>
            <div className="text-sm font-bold text-[#d5c4b1]">NO MATCHING TAG ENTITIES</div>
            <p className="text-xs text-[#9e8e7d] mt-1 max-w-sm">
              Adjust your search query or reset category/pattern filters to expand results.
            </p>
          </div>
        ) : (
          tags.map((tag, idx) => {
            const isSelected = selectedTagId === tag.id;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={tag.id}
                id={`tag-row-${tag.id}`}
                onClick={() => onSelectTag(tag)}
                className={`grid grid-cols-12 gap-3 p-3 tag-row items-center cursor-pointer transition-all border-l-2 ${
                  isSelected
                    ? 'border-l-4 border-[#FFB84D] bg-[#221f1c]'
                    : isEven
                    ? 'bg-[#0F0E0D] border-l-transparent'
                    : 'bg-[#161310] border-l-transparent'
                }`}
              >
                {/* Status Dot */}
                <div className="col-span-1 flex justify-center">
                  {renderStatusDot(tag.status, tag.patternDetect)}
                </div>

                {/* Tag Identifier */}
                <div className="col-span-3 text-[#D2C9B1] font-bold truncate tracking-wide flex items-center gap-1.5">
                  <span className="hover:text-[#FFB84D] transition-colors">{tag.identifier}</span>
                </div>

                {/* Category Badge */}
                <div className="col-span-2">{renderCategoryBadge(tag.category)}</div>

                {/* Occurrences Count */}
                <div className="col-span-2 text-right font-mono text-[#D2C9B1] font-semibold">
                  {tag.occurrences.toLocaleString()}
                </div>

                {/* Weight Linear Gauge */}
                <div className="col-span-2 flex items-center justify-center px-2">
                  <div className="w-full h-1.5 bg-[#0F0E0D] border border-[#514536] overflow-hidden">
                    <div
                      className={`h-full ${getWeightBarColor(tag.weight, tag.patternDetect)}`}
                      style={{ width: `${tag.weight}%` }}
                    ></div>
                  </div>
                </div>

                {/* Pattern Detection Badge */}
                <div className="col-span-2">{renderPatternDetect(tag.patternDetect)}</div>
              </div>
            );
          })
        )}
      </div>

      {/* Grid Footer with Pagination */}
      <div className="p-2.5 border-t border-[#514536] bg-[#383430] flex justify-between items-center font-mono text-[11px] text-[#d5c4b1] select-none">
        <div className="flex items-center gap-2">
          <span>
            DISPLAYING {tags.length > 0 ? `${startIndex + 1}-${endIndex}` : '0-0'} OF{' '}
            {totalCount.toLocaleString()}
          </span>
          {tags.length > 0 && (
            <span className="text-[10px] text-[#9e8e7d]">
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-prev-page"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-2.5 py-1 border border-[#514536] bg-[#161310] hover:bg-[#221f1c] disabled:opacity-30 disabled:cursor-not-allowed text-[#D2C9B1] transition-colors font-bold cursor-pointer"
            title="Previous Page"
          >
            &lt;
          </button>
          <button
            id="btn-next-page"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-2.5 py-1 border border-[#514536] bg-[#161310] hover:bg-[#221f1c] disabled:opacity-30 disabled:cursor-not-allowed text-[#D2C9B1] transition-colors font-bold cursor-pointer"
            title="Next Page"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
