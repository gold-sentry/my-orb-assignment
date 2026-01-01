import type { MessageUsage } from '../types';
import { StatCard } from './StatCard';
import { calculateUsageStats } from '../utils/stats';
import { buildStatsCards } from '../utils/statsCard';

interface StatsCardsProps {
    data: MessageUsage[];
}

export function StatsCards({ data }: StatsCardsProps) {
    const stats = calculateUsageStats(data);
    const cards = buildStatsCards(stats);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card, index) => (
                <StatCard key={card.title} {...card} index={index} />
            ))}
        </div>
    );
}