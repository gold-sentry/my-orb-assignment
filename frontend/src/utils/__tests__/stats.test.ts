
import { describe, it, expect } from 'vitest';
import { calculateUsageStats } from '../stats';
import type { MessageUsage } from '../../types';

describe('calculateUsageStats', () => {
    it('should return zeros for empty data', () => {
        const data: MessageUsage[] = [];
        const stats = calculateUsageStats(data);

        expect(stats).toEqual({
            totalMessages: 0,
            totalCredits: 0,
            totalReports: 0,
            avgCredits: 0,
        });
    });

    it('should calculate stats correctly for a single item', () => {
        const data: MessageUsage[] = [
            {
                messageId: 1,
                timestamp: '2023-01-01T00:00:00Z',
                reportName: 'Report 1',
                creditsUsed: 10,
            },
        ];
        const stats = calculateUsageStats(data);

        expect(stats).toEqual({
            totalMessages: 1,
            totalCredits: 10,
            totalReports: 1,
            avgCredits: 10,
        });
    });

    it('should calculate stats correctly for multiple items', () => {
        const data: MessageUsage[] = [
            {
                messageId: 1,
                timestamp: '2023-01-01T00:00:00Z',
                reportName: 'Report 1',
                creditsUsed: 10,
            },
            {
                messageId: 2,
                timestamp: '2023-01-02T00:00:00Z',
                reportName: 'Report 2',
                creditsUsed: 20,
            },
        ];
        const stats = calculateUsageStats(data);

        expect(stats).toEqual({
            totalMessages: 2,
            totalCredits: 30,
            totalReports: 2,
            avgCredits: 15,
        });
    });

    it('should count reports correctly when reportName is missing', () => {
        const data: MessageUsage[] = [
            {
                messageId: 1,
                timestamp: '2023-01-01T00:00:00Z',
                reportName: 'Report 1',
                creditsUsed: 10,
            },
            {
                messageId: 2,
                timestamp: '2023-01-02T00:00:00Z',
                creditsUsed: 5,
            },
            {
                messageId: 3,
                timestamp: '2023-01-02T00:00:00Z',
                reportName: '',
                creditsUsed: 5,
            },
        ];
        const stats = calculateUsageStats(data);

        expect(stats).toEqual({
            totalMessages: 3,
            totalCredits: 20,
            totalReports: 1,
            avgCredits: 20 / 3,
        });
    });

    it('should handle zero credits used', () => {
        const data: MessageUsage[] = [
            {
                messageId: 1,
                timestamp: '2023-01-01T00:00:00Z',
                reportName: 'Report 1',
                creditsUsed: 0,
            },
        ];
        const stats = calculateUsageStats(data);

        expect(stats).toEqual({
            totalMessages: 1,
            totalCredits: 0,
            totalReports: 1,
            avgCredits: 0,
        });
    });
});
