import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UsageChart } from '../UsageChart';
import type { MessageUsage } from '../../types';

class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
window.ResizeObserver = ResizeObserver;

describe('UsageChart', () => {
    const mockData: MessageUsage[] = [
        { messageId: 1, timestamp: '2023-01-01T10:00:00Z', creditsUsed: 10, reportName: 'Report A' },
        { messageId: 2, timestamp: '2023-01-02T10:00:00Z', creditsUsed: 20, reportName: 'Report B' },
    ];

    it('should render chart container when data is present', () => {
        const { container } = render(<UsageChart data={mockData} />);

        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });

    it('should render empty state when data is empty', () => {
        render(<UsageChart data={[]} />);

        expect(screen.getByText('No data available')).toBeInTheDocument();
        const chartContainer = document.querySelector('.recharts-responsive-container');
        expect(chartContainer).not.toBeInTheDocument();
    });
});
