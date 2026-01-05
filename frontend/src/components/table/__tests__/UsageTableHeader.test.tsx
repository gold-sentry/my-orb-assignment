import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UsageTableHeader } from '../UsageTableHeader';
import { SORT_DIRECTIONS, SORT_COLUMNS } from '../../../constants/table';

describe('UsageTableHeader', () => {
    const mockOnSort = vi.fn();
    const mockSortConfig = {
        reportName: SORT_DIRECTIONS.ASC,
        creditsUsed: SORT_DIRECTIONS.DESC,
    };

    it('should render headers correctly', () => {
        render(
            <table>
                <UsageTableHeader sortConfig={mockSortConfig} onSort={mockOnSort} />
            </table>
        );

        expect(screen.getByText('Message ID')).toBeInTheDocument();
        expect(screen.getByText('Timestamp')).toBeInTheDocument();
        expect(screen.getByText('Report Name')).toBeInTheDocument();
        expect(screen.getByText('Credits Used')).toBeInTheDocument();
    });

    it('should call onSort when clicking sortable headers', () => {
        render(
            <table>
                <UsageTableHeader sortConfig={mockSortConfig} onSort={mockOnSort} />
            </table>
        );

        fireEvent.click(screen.getByText('Report Name'));
        expect(mockOnSort).toHaveBeenCalledWith(SORT_COLUMNS.REPORT_NAME);

        fireEvent.click(screen.getByText('Credits Used'));
        expect(mockOnSort).toHaveBeenCalledWith(SORT_COLUMNS.CREDITS_USED);
    });
});
