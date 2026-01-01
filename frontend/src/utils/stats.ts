import type { MessageUsage } from '../types';

export interface UsageStats {
    totalMessages: number;
    totalCredits: number;
    totalReports: number;
    avgCredits: number;
}

export function calculateUsageStats(data: MessageUsage[]): UsageStats {
    const totalMessages = data.length;
    const totalCredits = data.reduce((sum, item) => sum + item.creditsUsed, 0);
    const totalReports = data.filter((item) => item.reportName).length;
    const avgCredits = totalMessages > 0 ? totalCredits / totalMessages : 0;

    return { totalMessages, totalCredits, totalReports, avgCredits };
}