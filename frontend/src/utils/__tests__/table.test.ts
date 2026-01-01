import { describe, it, expect } from 'vitest';
import { getNextSortDirection, sortData } from '../table';
import { SORT_DIRECTIONS, SORT_COLUMNS } from '../../constants/table';
import type { MessageUsage } from '../../types';
import type { SortConfig } from '../table';

describe('getNextSortDirection', () => {
    it('should cycle from null -> asc -> desc -> null', () => {
        expect(getNextSortDirection(null)).toBe(SORT_DIRECTIONS.ASC);
        expect(getNextSortDirection(SORT_DIRECTIONS.ASC)).toBe(SORT_DIRECTIONS.DESC);
        expect(getNextSortDirection(SORT_DIRECTIONS.DESC)).toBeNull();
    });
});

describe('sortData', () => {
    const mockData: MessageUsage[] = [
        { messageId: 1, timestamp: '2024-01-01', reportName: 'B Report', creditsUsed: 10 },
        { messageId: 2, timestamp: '2024-01-02', reportName: 'A Report', creditsUsed: 20 },
        { messageId: 3, timestamp: '2024-01-03', reportName: 'C Report', creditsUsed: 5 },
    ];

    it('should return original data if no sorts provided', () => {
        const result = sortData(mockData, []);
        expect(result).toBe(mockData); // Same reference check
    });

    it('should sort by reportName ASC', () => {
        const sorts: SortConfig[] = [{ column: SORT_COLUMNS.REPORT_NAME, direction: SORT_DIRECTIONS.ASC }];
        const result = sortData(mockData, sorts);
        expect(result[0].reportName).toBe('A Report');
        expect(result[1].reportName).toBe('B Report');
        expect(result[2].reportName).toBe('C Report');
    });

    it('should sort by reportName DESC', () => {
        const sorts: SortConfig[] = [{ column: SORT_COLUMNS.REPORT_NAME, direction: SORT_DIRECTIONS.DESC }];
        const result = sortData(mockData, sorts);
        expect(result[0].reportName).toBe('C Report');
        expect(result[1].reportName).toBe('B Report');
        expect(result[2].reportName).toBe('A Report');
    });

    it('should sort by creditsUsed ASC', () => {
        const sorts: SortConfig[] = [{ column: SORT_COLUMNS.CREDITS_USED, direction: SORT_DIRECTIONS.ASC }];
        const result = sortData(mockData, sorts);
        expect(result[0].creditsUsed).toBe(5);
        expect(result[1].creditsUsed).toBe(10);
        expect(result[2].creditsUsed).toBe(20);
    });

    it('should handle multi-column sort', () => {
        const data: MessageUsage[] = [
            { messageId: 1, timestamp: '2024-01-01', reportName: 'A', creditsUsed: 10 },
            { messageId: 2, timestamp: '2024-01-02', reportName: 'A', creditsUsed: 5 },
            { messageId: 3, timestamp: '2024-01-03', reportName: 'B', creditsUsed: 20 },
        ];

        const sorts: SortConfig[] = [
            { column: SORT_COLUMNS.REPORT_NAME, direction: SORT_DIRECTIONS.ASC },
            { column: SORT_COLUMNS.CREDITS_USED, direction: SORT_DIRECTIONS.ASC },
        ];

        const result = sortData(data, sorts);

        expect(result[0].creditsUsed).toBe(5);
        expect(result[1].creditsUsed).toBe(10);
        expect(result[2].creditsUsed).toBe(20);
    });

    it('should handle empty data', () => {
        const result = sortData([], [{ column: SORT_COLUMNS.REPORT_NAME, direction: SORT_DIRECTIONS.ASC }]);
        expect(result).toEqual([]);
    });
});
