
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UsageChart } from '../UsageChart';
import type { MessageUsage } from '../../types';

// Mock Recharts to avoid rendering actual SVG and complex heavy components
vi.mock('recharts', () => ({
    ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
    BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
    Bar: () => <div data-testid="bar" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
}));

// Mock child components
vi.mock('../charts', () => ({
    ChartGradient: () => <div data-testid="chart-gradient" />,
    ChartTooltip: () => <div data-testid="chart-tooltip" />,
    EmptyChart: () => <div data-testid="empty-chart">No Data Chart</div>,
}));

describe('UsageChart', () => {
    const mockData: MessageUsage[] = [
        { messageId: 1, timestamp: '2023-01-01T10:00:00Z', creditsUsed: 10 },
        { messageId: 2, timestamp: '2023-01-02T10:00:00Z', creditsUsed: 20 },
    ];

    it('should render chart when data is present', () => {
        render(<UsageChart data={mockData} />);

        expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
        expect(screen.getByTestId('bar')).toBeInTheDocument();
        expect(screen.getByTestId('x-axis')).toBeInTheDocument();
        expect(screen.getByTestId('y-axis')).toBeInTheDocument();
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });

    it('should render empty state when data is empty', () => {
        render(<UsageChart data={[]} />);

        expect(screen.getByTestId('empty-chart')).toBeInTheDocument();
        expect(screen.queryByTestId('bar-chart')).not.toBeInTheDocument();
    });
});
