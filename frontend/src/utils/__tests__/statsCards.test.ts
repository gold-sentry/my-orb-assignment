
import { describe, it, expect } from 'vitest';
import { buildStatsCards } from '../statsCard';
import type { UsageStats } from '../stats';

describe('buildStatsCards', () => {
    it('should format Total Messages using compact notation', () => {
        const stats: UsageStats = {
            totalMessages: 50000,
            totalCredits: 1000,
            totalReports: 10,
            avgCredits: 50,
        };

        const cards = buildStatsCards(stats);

        const totalMessagesCard = cards.find(card => card.title === 'Total Messages');
        expect(totalMessagesCard).toBeDefined();
        expect(totalMessagesCard?.value).toBe('50K');
    });

    it('should format other stats correctly', () => {
        const stats: UsageStats = {
            totalMessages: 1500,
            totalCredits: 2500,
            totalReports: 5,
            avgCredits: 10.5,
        };

        const cards = buildStatsCards(stats);

        expect(cards[0].value).toBe('1.5K');
        expect(cards[1].value).toBe('2.5K');
        expect(cards[2].value).toBe('5');
        expect(cards[3].value).toBe('10.50');
    });
});
