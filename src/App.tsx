/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TagEntity, ActiveView, TagFilterState } from './types';
import { INITIAL_TAGS } from './data/tagsData';
import { SideNavBar } from './components/SideNavBar';
import { TopAppBar } from './components/TopAppBar';
import { CategorySummary } from './components/CategorySummary';
import { DataGrid } from './components/DataGrid';
import { TagDetailDrawer } from './components/TagDetailDrawer';
import { NewEvidenceModal } from './components/NewEvidenceModal';
import { FilterModal } from './components/FilterModal';
import { OtherViews } from './components/OtherViews';

export default function App() {
  // Navigation View State
  const [activeView, setActiveView] = useState<ActiveView>('tags');

  // Tags Database State (loaded from forensic dataset + user created)
  const [tags, setTags] = useState<TagEntity[]>(INITIAL_TAGS);

  // Selected tag for deep forensic dossier inspection
  const [selectedTag, setSelectedTag] = useState<TagEntity | null>(null);

  // Modals
  const [isNewEvidenceOpen, setIsNewEvidenceOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filter & Search State
  const [filters, setFilters] = useState<TagFilterState>({
    searchQuery: '',
    category: 'ALL',
    pattern: 'ALL',
    minWeight: 0,
    minOccurrences: 0,
    sortBy: 'occurrences',
    sortOrder: 'desc',
    page: 1,
    pageSize: 8,
  });

  // Export to CSV function
  const handleExportCSV = () => {
    const headers = [
      'Tag Identifier',
      'Category',
      'Occurrences',
      'Weight (%)',
      'Pattern Detect',
      'Status',
      'Last Detected',
      'Linked Entities',
      'Description',
    ];

    const rows = filteredTags.map((tag) => [
      `"${tag.identifier}"`,
      `"${tag.category}"`,
      tag.occurrences,
      tag.weight,
      `"${tag.patternDetect}"`,
      `"${tag.status}"`,
      `"${tag.lastDetected}"`,
      `"${(tag.linkedEntities || []).join('; ')}"`,
      `"${(tag.description || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `nightbird_tag_database_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add new tag/evidence handler
  const handleAddTag = (newTag: TagEntity) => {
    setTags((prev) => [newTag, ...prev]);
    setSelectedTag(newTag);
  };

  // Update existing tag
  const handleUpdateTag = (updated: TagEntity) => {
    setTags((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setSelectedTag(updated);
  };

  // Sorting handler
  const handleSort = (field: keyof TagEntity) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'desc' ? 'asc' : 'desc',
    }));
  };

  // Quick Category filter toggle
  const handleSelectCategory = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      category: cat,
      page: 1,
    }));
  };

  // Quick Search Filter shortcut
  const handleQuickFilter = (term: string) => {
    if (['FINANCIAL', 'COMMUNICATION', 'INCIDENT', 'SURVEILLANCE', 'SIGNALS'].includes(term)) {
      setFilters((prev) => ({ ...prev, category: term, page: 1 }));
    } else if (['CRITICAL', 'HIGH', 'ELEVATED', 'NOMINAL'].includes(term)) {
      setFilters((prev) => ({ ...prev, pattern: term, page: 1 }));
    } else {
      setFilters((prev) => ({ ...prev, searchQuery: term, page: 1 }));
    }
  };

  // Filtered & Sorted tags computation
  const filteredTags = useMemo(() => {
    return tags
      .filter((tag) => {
        // Text Search (checks identifier, description, linked entities)
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchesId = tag.identifier.toLowerCase().includes(q);
          const matchesDesc = tag.description.toLowerCase().includes(q);
          const matchesEnt = tag.linkedEntities?.some((e) => e.toLowerCase().includes(q));
          const matchesCat = tag.category.toLowerCase().includes(q);
          const matchesPat = tag.patternDetect.toLowerCase().includes(q);
          if (!matchesId && !matchesDesc && !matchesEnt && !matchesCat && !matchesPat) {
            return false;
          }
        }

        // Category Filter
        if (filters.category !== 'ALL' && tag.category !== filters.category) {
          return false;
        }

        // Pattern Detect Filter
        if (filters.pattern !== 'ALL' && tag.patternDetect !== filters.pattern) {
          return false;
        }

        // Min Weight
        if (tag.weight < filters.minWeight) {
          return false;
        }

        // Min Occurrences
        if (tag.occurrences < filters.minOccurrences) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const field = filters.sortBy;
        const valA = a[field];
        const valB = b[field];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return filters.sortOrder === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA || '');
        const strB = String(valB || '');
        return filters.sortOrder === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
      });
  }, [tags, filters]);

  // Paginated tags
  const paginatedTags = useMemo(() => {
    const start = (filters.page - 1) * filters.pageSize;
    return filteredTags.slice(start, start + filters.pageSize);
  }, [filteredTags, filters.page, filters.pageSize]);

  // Dynamic counts for category summary
  const categoryCounts = useMemo(() => {
    return {
      FINANCIAL: tags.filter((t) => t.category === 'FINANCIAL').reduce((acc, t) => acc + t.occurrences, 0),
      COMMUNICATION: tags.filter((t) => t.category === 'COMMUNICATION').reduce((acc, t) => acc + t.occurrences, 0),
      INCIDENT: tags.filter((t) => t.category === 'INCIDENT').reduce((acc, t) => acc + t.occurrences, 0),
    };
  }, [tags]);

  const activeFilterCount =
    (filters.category !== 'ALL' ? 1 : 0) +
    (filters.pattern !== 'ALL' ? 1 : 0) +
    (filters.minWeight > 0 ? 1 : 0) +
    (filters.minOccurrences > 0 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  const resetAllFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'ALL',
      pattern: 'ALL',
      minWeight: 0,
      minOccurrences: 0,
      sortBy: 'occurrences',
      sortOrder: 'desc',
      page: 1,
      pageSize: 8,
    });
  };

  return (
    <div className="bg-[#0F0E0D] text-[#e9e1db] font-['Hanken_Grotesk'] h-screen overflow-hidden flex relative selection:bg-[#FFB84D] selection:text-[#0F0E0D]">
      {/* Texture grain overlay */}
      <div className="texture-overlay"></div>

      {/* Side Navigation Bar */}
      <SideNavBar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenNewEvidence={() => setIsNewEvidenceOpen(true)}
        activeEntityCount={1492}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col h-full bg-[#161310] relative z-10 data-stream-bg">
        {/* Top App Bar */}
        <TopAppBar
          searchQuery={filters.searchQuery}
          setSearchQuery={(q) => setFilters((prev) => ({ ...prev, searchQuery: q, page: 1 }))}
          onQuickFilter={handleQuickFilter}
          totalActiveCount={1492}
        />

        {/* Canvas Screen: Tag Database (or Auxiliary Screens) */}
        {activeView === 'tags' ? (
          <main className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-5">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-[#514536] pb-4 gap-4">
              <div>
                <h2 className="font-['Chivo'] text-2xl md:text-3xl font-bold text-[#ffba56] uppercase tracking-tight">
                  TAG DATABASE
                </h2>
                <p className="font-mono text-xs text-[#d5c4b1] mt-1.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[15px] text-[#FFB84D]">
                    database
                  </span>
                  <span>SYS.ARCHIVE // 1,492 ACTIVE ENTITIES</span>
                </p>
              </div>

              {/* Action Buttons: FILTER & EXPORT.CSV */}
              <div className="flex items-center gap-3">
                <button
                  id="btn-filter"
                  onClick={() => setIsFilterModalOpen(true)}
                  className={`border border-[#514536] px-4 py-2 font-mono text-xs hover:bg-[#2d2926] transition-colors flex items-center gap-2 cursor-pointer rounded-xs ${
                    activeFilterCount > 0
                      ? 'bg-[#221f1c] text-[#FFB84D] border-[#FFB84D]'
                      : 'bg-[#161310] text-[#D2C9B1]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">filter_list</span>
                  <span>FILTER</span>
                  {activeFilterCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-[#FFB84D] text-[#0F0E0D] text-[10px] font-bold rounded">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <button
                  id="btn-export-csv"
                  onClick={handleExportCSV}
                  className="border border-[#514536] bg-[#161310] text-[#D2C9B1] px-4 py-2 font-mono text-xs hover:bg-[#2d2926] hover:text-[#ffba56] transition-colors flex items-center gap-2 cursor-pointer rounded-xs"
                  title="Export filtered records as CSV file"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>EXPORT.CSV</span>
                </button>
              </div>
            </div>

            {/* Active Filter Chips Banner */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 p-2 bg-[#1e1b18] border border-[#514536] rounded font-mono text-[11px]">
                <span className="text-[#9e8e7d] uppercase font-bold">Active Filters:</span>
                {filters.category !== 'ALL' && (
                  <span className="px-2 py-0.5 bg-[#221f1c] text-[#FFB84D] border border-[#FFB84D]/40 rounded flex items-center gap-1">
                    Category: {filters.category}
                    <button
                      onClick={() => handleSelectCategory('ALL')}
                      className="hover:text-white cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.pattern !== 'ALL' && (
                  <span className="px-2 py-0.5 bg-[#221f1c] text-[#e06868] border border-[#e06868]/40 rounded flex items-center gap-1">
                    Pattern: {filters.pattern}
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, pattern: 'ALL' }))}
                      className="hover:text-white cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.minWeight > 0 && (
                  <span className="px-2 py-0.5 bg-[#221f1c] text-[#9dcee1] border border-[#9dcee1]/40 rounded flex items-center gap-1">
                    Weight &gt;= {filters.minWeight}%
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, minWeight: 0 }))}
                      className="hover:text-white cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.searchQuery && (
                  <span className="px-2 py-0.5 bg-[#221f1c] text-[#D2C9B1] border border-[#514536] rounded flex items-center gap-1">
                    Query: "{filters.searchQuery}"
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                      className="hover:text-white cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-[#e06868] hover:underline ml-auto font-bold cursor-pointer"
                >
                  CLEAR ALL
                </button>
              </div>
            )}

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-4 flex-1">
              {/* Category Summary Module (3 columns) */}
              <CategorySummary
                activeCategoryFilter={filters.category}
                onSelectCategory={handleSelectCategory}
                categoryCounts={categoryCounts}
              />

              {/* Main Data Grid Module (9 columns) */}
              <DataGrid
                tags={paginatedTags}
                totalCount={filteredTags.length}
                currentPage={filters.page}
                pageSize={filters.pageSize}
                onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
                onSelectTag={(tag) => setSelectedTag(tag)}
                selectedTagId={selectedTag?.id}
                sortBy={filters.sortBy}
                sortOrder={filters.sortOrder}
                onSort={handleSort}
              />
            </div>
          </main>
        ) : (
          /* Auxiliary Screens (Dashboard, Timeline, Documents, Binders, Pattern Analysis, Map, Settings) */
          <OtherViews
            activeView={activeView}
            setActiveView={setActiveView}
            tags={tags}
            onSelectTag={(tag) => {
              setSelectedTag(tag);
              setActiveView('tags');
            }}
          />
        )}
      </div>

      {/* Tag Detail Dossier Drawer */}
      {selectedTag && (
        <TagDetailDrawer
          tag={selectedTag}
          onClose={() => setSelectedTag(null)}
          onUpdateTag={handleUpdateTag}
        />
      )}

      {/* New Evidence Modal */}
      <NewEvidenceModal
        isOpen={isNewEvidenceOpen}
        onClose={() => setIsNewEvidenceOpen(false)}
        onAddTag={handleAddTag}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onUpdateFilters={setFilters}
        onResetFilters={resetAllFilters}
      />
    </div>
  );
}
