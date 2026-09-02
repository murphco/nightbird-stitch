export type TagCategory = 'FINANCIAL' | 'COMMUNICATION' | 'INCIDENT' | 'SURVEILLANCE' | 'SIGNALS' | 'CYBER';

export type PatternDetect = 'NOMINAL' | 'ELEVATED' | 'HIGH' | 'CRITICAL' | 'ANOMALOUS';

export type TagStatus = 'ACTIVE' | 'CRITICAL' | 'NOMINAL' | 'ARCHIVED' | 'INVESTIGATING';

export interface TagEntity {
  id: string;
  identifier: string;
  category: TagCategory;
  occurrences: number;
  weight: number; // 0 to 100
  patternDetect: PatternDetect;
  status: TagStatus;
  lastDetected: string;
  firstDetected: string;
  description: string;
  sourceEvidence: {
    id: string;
    title: string;
    type: 'DOCUMENT' | 'AUDIO' | 'TRANSACTION' | 'SURVEILLANCE' | 'LOG';
    timestamp: string;
  }[];
  linkedEntities: string[];
  coOccurringTags: {
    tag: string;
    correlation: number; // 0 - 100
  }[];
  geoCoordinates?: string;
  clearanceLevel: 1 | 2 | 3 | 4 | 5;
  anomalyNotes?: string;
  investigatorNotes?: string;
}

export interface CategoryMetric {
  id: string;
  name: TagCategory;
  code: string;
  count: number;
  percentage: number;
  colorClass: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  barColor: string;
}

export type ActiveView = 'tags' | 'dashboard' | 'timeline' | 'documents' | 'binders' | 'pattern' | 'map' | 'settings';

export interface TagFilterState {
  searchQuery: string;
  category: string; // 'ALL' or TagCategory
  pattern: string; // 'ALL' or PatternDetect
  minWeight: number;
  minOccurrences: number;
  sortBy: keyof TagEntity;
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
}
