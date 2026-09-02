import React from 'react';
import { TagCategory } from '../types';

interface CategorySummaryProps {
  activeCategoryFilter: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: {
    FINANCIAL: number;
    COMMUNICATION: number;
    INCIDENT: number;
  };
}

export const CategorySummary: React.FC<CategorySummaryProps> = ({
  activeCategoryFilter,
  onSelectCategory,
  categoryCounts,
}) => {
  const cards = [
    {
      id: 'CAT-FIN',
      name: 'FINANCIAL' as TagCategory,
      code: 'ID:CAT-FIN',
      count: categoryCounts.FINANCIAL || 428,
      percentage: 65,
      textColor: 'text-[#FFB84D]',
      accentBg: 'bg-[#FFB84D]',
      borderColor: 'border-[#514536]',
      activeBorder: 'border-[#FFB84D] shadow-[0_0_12px_rgba(255,184,77,0.2)]',
    },
    {
      id: 'CAT-COM',
      name: 'COMMUNICATION' as TagCategory,
      code: 'ID:CAT-COM',
      count: categoryCounts.COMMUNICATION || 315,
      percentage: 45,
      textColor: 'text-[#9dcee1]',
      accentBg: 'bg-[#9dcee1]',
      borderColor: 'border-[#514536]',
      activeBorder: 'border-[#9dcee1] shadow-[0_0_12px_rgba(157,206,225,0.2)]',
    },
    {
      id: 'CAT-INC',
      name: 'INCIDENT' as TagCategory,
      code: 'ID:CAT-INC',
      count: categoryCounts.INCIDENT || 189,
      percentage: 25,
      textColor: 'text-[#e06868]',
      accentBg: 'bg-[#632424]',
      borderColor: 'border-[#514536]',
      activeBorder: 'border-[#e06868] shadow-[0_0_12px_rgba(224,104,104,0.2)]',
    },
  ];

  return (
    <div className="col-span-12 md:col-span-3 flex flex-col gap-2.5 select-none">
      {cards.map((card) => {
        const isSelected = activeCategoryFilter === card.name;
        return (
          <div
            key={card.id}
            id={`card-${card.id}`}
            onClick={() => onSelectCategory(isSelected ? 'ALL' : card.name)}
            className={`bg-[#161310] border p-4 flex-1 relative overflow-hidden cursor-pointer transition-all duration-150 hover:bg-[#1e1b18] ${
              isSelected ? card.activeBorder : card.borderColor
            }`}
          >
            {/* Category Code Header */}
            <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-[#9e8e7d] tracking-widest font-bold">
              {card.code}
            </div>

            <div className="flex items-center gap-2 mb-3 border-b border-[#514536] pb-2">
              <h3 className="font-mono text-xs text-[#d5c4b1] uppercase tracking-wider font-bold">
                {card.name}
              </h3>
              {isSelected && (
                <span className="text-[9px] font-mono bg-[#383430] text-[#FFB84D] px-1.5 py-0.2 rounded border border-[#514536]">
                  FILTERED
                </span>
              )}
            </div>

            {/* Big Numeric Count */}
            <div className={`text-3xl md:text-4xl font-black font-['Chivo'] ${card.textColor}`}>
              {card.count.toLocaleString()}
            </div>
            <p className="font-mono text-[10px] text-[#D2C9B1] mt-1 tracking-widest uppercase font-semibold">
              TAGS ASSIGNED
            </p>

            {/* Gauge Progress Bar */}
            <div className="mt-4 h-1.5 w-full bg-[#0F0E0D] border border-[#383430] overflow-hidden flex">
              <div
                className={`h-full ${card.accentBg} transition-all duration-500`}
                style={{ width: `${card.percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
