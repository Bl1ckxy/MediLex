import type { ForumType } from '@/types/legal';

/** Consumer Protection Act 2019 pecuniary jurisdiction thresholds. */
export function getRecommendedForum(claimAmount: number): ForumType {
    if (claimAmount <= 5_000_000) return 'district_commission';
    if (claimAmount <= 20_000_000) return 'state_commission';
    return 'ncdrc';
}

export interface ForumResult {
    forum: ForumType;
    displayName: string;
    jurisdiction: string;
    filingFeeINR: number;
}

export function computeForum(claimAmountINR: number): ForumResult {
    if (claimAmountINR <= 5_000_000) {
        return { forum: 'district_commission', displayName: 'District Consumer Disputes Redressal Commission', jurisdiction: 'Up to ₹50,00,000', filingFeeINR: 2000 };
    }
    if (claimAmountINR <= 20_000_000) {
        return { forum: 'state_commission', displayName: 'State Consumer Disputes Redressal Commission', jurisdiction: '₹50,00,001 to ₹2,00,00,000', filingFeeINR: 4000 };
    }
    return { forum: 'ncdrc', displayName: 'National Consumer Disputes Redressal Commission', jurisdiction: 'Above ₹2,00,00,000', filingFeeINR: 5000 };
}
