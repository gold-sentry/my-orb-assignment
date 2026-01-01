import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUsageData } from '../useUsageData';

const mockFetch = vi.fn();

describe('useUsageData', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', mockFetch);
        mockFetch.mockClear();
    });

    const mockApiData = {
        usage: [
            {
                message_id: 1,
                timestamp: '2023-01-01T00:00:00Z',
                report_name: 'Test Report',
                credits_used: 10,
            },
        ],
    };

    const mockTransformedData = {
        usage: [
            {
                messageId: 1,
                timestamp: '2023-01-01T00:00:00Z',
                reportName: 'Test Report',
                creditsUsed: 10,
            },
        ],
    };

    it('should fetch and transform data successfully', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockApiData,
        });

        const { result } = renderHook(() => useUsageData());

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toEqual(mockTransformedData);
        expect(result.current.error).toBeNull();
    });

    it('should handle API errors', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Internal Server Error',
        });

        const { result } = renderHook(() => useUsageData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeTruthy();
        expect(result.current.data).toBeNull();
    });

    it('should handle network errors', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network Error'));

        const { result } = renderHook(() => useUsageData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe('Network Error');
        expect(result.current.data).toBeNull();
    });

    it('should refetch data', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockApiData,
        });

        const { result } = renderHook(() => useUsageData());
        await waitFor(() => expect(result.current.loading).toBe(false));

        const newData = {
            usage: [{ message_id: 2, timestamp: '2023-01-02T00:00:00Z', report_name: 'Report 2', credits_used: 5 }]
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => newData,
        });

        result.current.refetch();

        await waitFor(() => expect(result.current.data?.usage[0].messageId).toBe(2));
    });
});