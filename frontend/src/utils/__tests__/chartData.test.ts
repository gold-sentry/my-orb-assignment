
import { describe, it, expect } from 'vitest';
import { buildChartData } from '../chartData';
import type { MessageUsage } from '../../types';

describe('buildChartData', () => {
    it('should return empty array for empty data', () => {
        const data: MessageUsage[] = [];
        const chartData = buildChartData(data);
        expect(chartData).toEqual([]);
    });

    it('should build chart data correctly for single day', () => {
        const data: MessageUsage[] = [
            { messageId: 1, timestamp: '2023-01-01T10:00:00Z', creditsUsed: 10 },
            { messageId: 2, timestamp: '2023-01-01T15:00:00Z', creditsUsed: 20 },
        ];

        const chartData = buildChartData(data);

        expect(chartData).toHaveLength(1);
        expect(chartData[0]).toEqual({
            date: '2023-01-01',
            credits: 30, // 10 + 20
            displayDate: expect.any(String), // displayDate format depends on formatters, verified there
        });
    });

    it('should fill in missing dates with zero credits', () => {
        const data: MessageUsage[] = [
            { messageId: 1, timestamp: '2023-01-01T10:00:00Z', creditsUsed: 10 },
            // 2023-01-02 is missing
            { messageId: 2, timestamp: '2023-01-03T10:00:00Z', creditsUsed: 20 },
        ];

        const chartData = buildChartData(data);

        expect(chartData).toHaveLength(3);

        // Day 1
        expect(chartData[0].date).toBe('2023-01-01');
        expect(chartData[0].credits).toBe(10);

        // Day 2 (Missing)
        expect(chartData[1].date).toBe('2023-01-02');
        expect(chartData[1].credits).toBe(0);

        // Day 3
        expect(chartData[2].date).toBe('2023-01-03');
        expect(chartData[2].credits).toBe(20);
    });

    it('should handle spanning multiple days correctly', () => {
        const data: MessageUsage[] = [
            { messageId: 1, timestamp: '2023-01-01T10:00:00Z', creditsUsed: 10 },
            { messageId: 2, timestamp: '2023-01-04T10:00:00Z', creditsUsed: 10 },
        ];

        const chartData = buildChartData(data);
        // Should have 01, 02, 03, 04 = 4 days
        expect(chartData).toHaveLength(4);
        expect(chartData.map(d => d.credits)).toEqual([10, 0, 0, 10]);
    });
});
