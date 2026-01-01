// src/utils/statsCards.ts
import { MessageSquare, FileText, Zap, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { UsageStats } from './stats';
import { formatCompact, formatDecimal } from './formatters';

export type CardColor = 'blue' | 'emerald' | 'violet' | 'amber';

export interface CardConfig {
    title: string;
    value: string;
    icon: LucideIcon;
    color: CardColor;
}

export const buildStatsCards = (stats: UsageStats): CardConfig[] => {
    return [
        {
            title: 'Total Messages',
            value: formatCompact(stats.totalMessages),
            icon: MessageSquare,
            color: 'blue',
        },
        {
            title: 'Total Credits',
            value: formatCompact(stats.totalCredits),
            icon: Zap,
            color: 'emerald',
        },

        {
            title: 'Reports Generated',
            value: formatCompact(stats.totalReports),
            icon: FileText,
            color: 'violet',
        },
        {
            title: 'Avg Credits/Message',
            value: formatDecimal(stats.avgCredits),
            icon: TrendingUp,
            color: 'amber',
        },
    ];
}