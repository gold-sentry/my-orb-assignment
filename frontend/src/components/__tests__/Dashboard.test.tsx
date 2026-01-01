import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Dashboard } from '../Dashboard';
import { useUsageData } from '../../hooks/useUsageData';
import type { MessageUsage } from '../../types';

vi.mock('../../hooks/useUsageData');
vi.mock('../../hooks/useTableSort', () => ({
    useTableSort: (data: MessageUsage[]) => ({
        sortDirection: {},
        sortedData: data || [],
        handleSort: vi.fn()
    })
}));
vi.mock('../../hooks/useTableSearch', () => ({
    useTableSearch: (data: MessageUsage[]) => ({
        searchQuery: '',
        setSearchQuery: vi.fn(),
        filteredData: data || []
    })
}));

vi.mock('../UsageChart', () => ({
    UsageChart: () => <div data-testid="usage-chart">Chart Placeholder</div>
}));

describe('Dashboard Integration', () => {
    afterEach(cleanup);

    const renderDashboard = (hookOverrides = {}) => {
        const mockRefetch = vi.fn();

        vi.mocked(useUsageData).mockReturnValue({
            data: {
                usage: [{
                    messageId: 1,
                    timestamp: '2023-01-01T10:00:00Z',
                    creditsUsed: 10,
                    reportName: 'Test Report',
                }]
            },
            loading: false,
            error: null,
            refetch: mockRefetch,
            ...hookOverrides
        });

        return { ...render(<Dashboard />), mockRefetch };
    };



    it('should renders error state', () => {
        renderDashboard({ error: 'Server did not respond', data: null });
        expect(screen.getByText('Server did not respond')).toBeInTheDocument();
    });

    it('should renders the full dashboard with data', () => {
        renderDashboard();

        expect(screen.getByText('Test Report')).toBeInTheDocument();
        expect(screen.getByTestId('usage-chart')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    });
});