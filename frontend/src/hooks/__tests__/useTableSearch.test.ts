import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTableSearch } from '../useTableSearch';
import type { MessageUsage } from '../../types';

describe('useTableSearch', () => {
    const mockData: MessageUsage[] = [
        {
            messageId: 1001,
            timestamp: '2024-01-01T10:00:00Z',
            reportName: 'Tenant Report',
            creditsUsed: 10,
        },
        {
            messageId: 1002,
            timestamp: '2024-01-02T10:00:00Z',
            reportName: 'Beta Analysis',
            creditsUsed: 20,
        },
        {
            messageId: 1003,
            timestamp: '2024-01-03T10:00:00Z',
            creditsUsed: 5,
        },
    ];

    it('initializes with empty search and full data', () => {
        const { result } = renderHook(() => useTableSearch(mockData));

        expect(result.current.searchQuery).toBe('');
        expect(result.current.filteredData).toEqual(mockData);
        expect(result.current.filteredData).toHaveLength(3);
    });

    it('filters by report name (case insensitive)', () => {
        const { result } = renderHook(() => useTableSearch(mockData));

        act(() => {
            result.current.setSearchQuery('tenant');
        });

        expect(result.current.filteredData).toHaveLength(1);
        expect(result.current.filteredData[0].reportName).toBe('Tenant Report');
    });

    it('filters by message ID', () => {
        const { result } = renderHook(() => useTableSearch(mockData));

        act(() => {
            result.current.setSearchQuery('1002');
        });

        expect(result.current.filteredData).toHaveLength(1);
        expect(result.current.filteredData[0].messageId).toBe(1002);
    });

    it('handles partial matches', () => {
        const { result } = renderHook(() => useTableSearch(mockData));

        act(() => {
            result.current.setSearchQuery('Analysis');
        });

        expect(result.current.filteredData).toHaveLength(1);
        expect(result.current.filteredData[0].reportName).toBe('Beta Analysis');
    });

    it('returns empty array when no matches found', () => {
        const { result } = renderHook(() => useTableSearch(mockData));

        act(() => {
            result.current.setSearchQuery('Gamma');
        });

        expect(result.current.filteredData).toHaveLength(0);
    });

    it('handles null report names gracefully', () => {
        const { result } = renderHook(() => useTableSearch(mockData));

        act(() => {
            result.current.setSearchQuery('Report');
        });

        expect(result.current.filteredData).toHaveLength(1);
        expect(result.current.filteredData[0].reportName).toBe('Tenant Report');
    });

    it('updates filtered data when source data changes', () => {
        const { result, rerender } = renderHook(
            ({ data }) => useTableSearch(data),
            { initialProps: { data: mockData } }
        );

        act(() => {
            result.current.setSearchQuery('100');
        });
        expect(result.current.filteredData).toHaveLength(3);

        const newData: MessageUsage[] = [
            ...mockData,
            {
                messageId: 1004,
                timestamp: '2024-01-04T10:00:00Z',
                reportName: 'Delta',
                creditsUsed: 15,
            }
        ];

        rerender({ data: newData });

        expect(result.current.filteredData).toHaveLength(4);
    });
});
