import { mockCases, mockDocuments, mockAnalysis, mockProfiles, mockFirm } from '@/mockData';
import type { Case, Document } from '@/types/database';

const isProduction = process.env.NODE_ENV === 'production';

export function getMockCases(): Case[] {
  if (!isProduction && (!globalThis as any).supabase) {
    return mockCases.map((c) => c as Case);
  }
  return [];
}

export function getMockDocuments(): Document[] {
  if (!isProduction && (!globalThis as any).supabase) {
    return mockDocuments.map((d) => d as Document);
  }
  return [];
}

export function getMockCase(caseId: string): Case | undefined {
  if (!isProduction && (!globalThis as any).supabase) {
    return mockCases.find((c) => c.id === caseId) as Case | undefined;
  }
  return undefined;
}

export function getMockDocumentsForCase(caseId: string): Document[] {
  if (!isProduction && (!globalThis as any).supabase) {
    return mockDocuments.filter((d) => d.case_id === caseId).map((d) => d as Document);
  }
  return [];
}

export const MOCK_DATA = {
  cases: mockCases,
  documents: mockDocuments,
  analysis: mockAnalysis,
  profiles: mockProfiles,
  firm: mockFirm,
};