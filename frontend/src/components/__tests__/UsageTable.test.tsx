import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UsageTable } from '../UsageTable';
import type { MessageUsage } from '../../types';

describe('UsageTable', () => {
    const mockData: MessageUsage[] = Array.from({ length: 15 }, (_, i) => ({
        messageId: i + 1,
        timestamp: '2023-01-01T00:00:00Z',
        reportName: `Report ${i + 1}`,
        creditsUsed: 10,
    }));

    const defaultProps = {
        data: mockData,
        sortConfig: { reportName: null, creditsUsed: null } as any,
        onSort: vi.fn(),
    };

    it('should render table with data', () => {
        render(<UsageTable {...defaultProps} />);

        expect(screen.getByText('Report Name')).toBeInTheDocument();
        expect(screen.getByText('Credits Used')).toBeInTheDocument();

        expect(screen.getByText('Report 1')).toBeInTheDocument();
        expect(screen.getByText('Report 10')).toBeInTheDocument();
        expect(screen.queryByText('Report 11')).not.toBeInTheDocument();

        expect(screen.getByText('1 / 2')).toBeInTheDocument();
    });

    it('should show empty state when data is empty', () => {
        render(<UsageTable {...defaultProps} data={[]} />);

        expect(screen.getByText('No usage data available')).toBeInTheDocument();
    });

    it('should pass onSort to header', () => {
        const onSort = vi.fn();
        render(<UsageTable {...defaultProps} onSort={onSort} />);

        const header = screen.getByText('Report Name');
        fireEvent.click(header);

        expect(onSort).toHaveBeenCalledWith('reportName');
    });

    it('should handle pagination interaction', () => {
        render(<UsageTable {...defaultProps} />);

        expect(screen.getByText('1 / 2')).toBeInTheDocument();

        const nextButton = screen.getByTestId('pagination-next');
        fireEvent.click(nextButton);

        expect(screen.getByText('Report 11')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-info')).toHaveTextContent('2 / 2');
    });
});
