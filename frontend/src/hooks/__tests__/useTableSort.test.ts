import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useTableSort } from '../useTableSort';
import type { MessageUsage } from '../../types';

const mockData: MessageUsage[] = [
    { messageId: 1, timestamp: '2024-01-01', reportName: 'B Report', creditsUsed: 10 },
    { messageId: 2, timestamp: '2024-01-02', reportName: 'A Report', creditsUsed: 5 },
    { messageId: 3, timestamp: '2024-01-03', reportName: 'C Report', creditsUsed: 15 },
];

describe('useTableSort', () => {
    it('should initializes with no active sort', () => {
        const { result } = renderHook(() => useTableSort(mockData), { wrapper: MemoryRouter });

        expect(result.current.sortDirection).toEqual({ reportName: null, creditsUsed: null });
        expect(result.current.sortedData).toEqual(mockData);
    });

    it('should sorts ascending on first click', () => {
        const { result } = renderHook(() => useTableSort(mockData), { wrapper: MemoryRouter });

        act(() => result.current.handleSort('reportName'));

        expect(result.current.sortDirection.reportName).toBe('asc');
        expect(result.current.sortedData.map(d => d.reportName)).toEqual([
            'A Report', 'B Report', 'C Report'
        ]);
    });

    it('should sorts descending on second click', () => {
        const { result } = renderHook(() => useTableSort(mockData), { wrapper: MemoryRouter });

        act(() => result.current.handleSort('creditsUsed'));
        act(() => result.current.handleSort('creditsUsed'));

        expect(result.current.sortDirection.creditsUsed).toBe('desc');
        expect(result.current.sortedData.map(d => d.creditsUsed)).toEqual([15, 10, 5]);
    });

    it('should clears sort on third click', () => {
        const { result } = renderHook(() => useTableSort(mockData), { wrapper: MemoryRouter });

        act(() => result.current.handleSort('reportName'));
        act(() => result.current.handleSort('reportName'));
        act(() => result.current.handleSort('reportName'));

        expect(result.current.sortDirection.reportName).toBeNull();
        expect(result.current.sortedData).toEqual(mockData);
    });

    it('should make the most recent click becomes primary sort', () => {
        const data: MessageUsage[] = [
            { messageId: 1, timestamp: '2024-01-01', reportName: 'A', creditsUsed: 10 },
            { messageId: 2, timestamp: '2024-01-02', reportName: 'A', creditsUsed: 5 },
            { messageId: 3, timestamp: '2024-01-03', reportName: 'B', creditsUsed: 3 },
        ];

        const { result } = renderHook(() => useTableSort(data), { wrapper: MemoryRouter });

        act(() => result.current.handleSort('creditsUsed'));
        act(() => result.current.handleSort('reportName'));

        expect(result.current.sortedData.map(d => d.creditsUsed)).toEqual([5, 10, 3]);
    });

    it('should maintain stable sort for equal values', () => {
        const equalData: MessageUsage[] = [
            { messageId: 1, timestamp: '2024-01-01', reportName: 'A', creditsUsed: 10 },
            { messageId: 2, timestamp: '2024-01-02', reportName: 'A', creditsUsed: 10 },
        ];

        const { result } = renderHook(() => useTableSort(equalData), { wrapper: MemoryRouter });

        act(() => result.current.handleSort('reportName'));

        expect(result.current.sortedData.map(d => d.messageId)).toEqual([1, 2]);
    });
});