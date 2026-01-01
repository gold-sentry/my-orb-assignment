
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UsageTable } from '../UsageTable';
import type { MessageUsage } from '../../types';

// Mock child components to simplify testing the parent component
// and avoid testing implementation details of children
vi.mock('../table', () => ({
    UsageTableHeader: ({ onSort }: any) => (
        <thead data-testid="usage-table-header">
            <tr>
                <th onClick={() => onSort('reportName')}>Report Name Header</th>
            </tr>
        </thead>
    ),
    UsageTableRow: ({ item }: any) => (
        <tr data-testid="usage-table-row">
            <td>{item.reportName}</td>
        </tr>
    ),
    Pagination: ({ currentPage, onPageChange }: any) => (
        <div data-testid="pagination">
            Page {currentPage}
            <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </div>
    ),
    EmptyTableState: () => <div data-testid="empty-state">No Data</div>,
}));

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

        expect(screen.getByTestId('usage-table-header')).toBeInTheDocument();
        // Default page size is 10, so we expect 10 rows
        expect(screen.getAllByTestId('usage-table-row')).toHaveLength(10);
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('should show empty state when data is empty', () => {
        render(<UsageTable {...defaultProps} data={[]} />);

        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
        expect(screen.queryByTestId('usage-table-row')).not.toBeInTheDocument();
        expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('should pass onSort to header', () => {
        const onSort = vi.fn();
        render(<UsageTable {...defaultProps} onSort={onSort} />);

        const header = screen.getByText('Report Name Header');
        fireEvent.click(header);

        expect(onSort).toHaveBeenCalledWith('reportName');
    });

    it('should handle pagination interaction', () => {
        render(<UsageTable {...defaultProps} />);

        // Check initial page
        expect(screen.getByTestId('pagination')).toHaveTextContent('Page 1');

        // Click next
        fireEvent.click(screen.getByText('Next'));

        // Should update to page 2 (we are using real usePagination hook, so state updates)
        expect(screen.getByTestId('pagination')).toHaveTextContent('Page 2');

        // Should show remaining 5 items
        expect(screen.getAllByTestId('usage-table-row')).toHaveLength(5);
    });
});
