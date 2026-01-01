import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePagination } from '../usePagination';

describe('usePagination', () => {
    const mockData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

    it('should initializes with correct default values', () => {
        const { result } = renderHook(() => usePagination(mockData));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.pageSize).toBe(10);
        expect(result.current.totalPages).toBe(3);
        expect(result.current.totalItems).toBe(25);
        expect(result.current.paginatedData).toHaveLength(10);
        expect(result.current.paginatedData[0].id).toBe(1);
    });

    it('should initializes with custom page size', () => {
        const { result } = renderHook(() => usePagination(mockData, 5));

        expect(result.current.pageSize).toBe(5);
        expect(result.current.totalPages).toBe(5);
        expect(result.current.paginatedData).toHaveLength(5);
    });

    it('should navigate to next page correctly', () => {
        const { result } = renderHook(() => usePagination(mockData));

        act(() => {
            result.current.setCurrentPage(2);
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.paginatedData).toHaveLength(10);
        expect(result.current.paginatedData[0].id).toBe(11);
    });

    it('should handles last page data correctly', () => {
        const { result } = renderHook(() => usePagination(mockData));

        act(() => {
            result.current.setCurrentPage(3);
        });

        expect(result.current.currentPage).toBe(3);
        expect(result.current.paginatedData).toHaveLength(5);
        expect(result.current.paginatedData[0].id).toBe(21);
    });

    it('should prevents navigating to invalid pages', () => {
        const { result } = renderHook(() => usePagination(mockData));

        act(() => {
            result.current.setCurrentPage(0);
        });
        expect(result.current.currentPage).toBe(1);

        act(() => {
            result.current.setCurrentPage(4);
        });
        expect(result.current.currentPage).toBe(1);
    });

    it('should resets to page 1 if data changes results in fewer pages', () => {
        const { result, rerender } = renderHook(
            ({ data }) => usePagination(data),
            { initialProps: { data: mockData } }
        );

        act(() => {
            result.current.setCurrentPage(3);
        });
        expect(result.current.currentPage).toBe(3);

        const smallData = mockData.slice(0, 5);
        rerender({ data: smallData });

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(1);
    });

    it('should calculates slices correctly for empty data', () => {
        const { result } = renderHook(() => usePagination([]));

        expect(result.current.paginatedData).toEqual([]);
        expect(result.current.totalPages).toBe(0);
        expect(result.current.totalItems).toBe(0);
    });
});
