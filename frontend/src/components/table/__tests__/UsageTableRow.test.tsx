import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UsageTableRow } from '../UsageTableRow';

describe('UsageTableRow', () => {
    const mockItem = {
        messageId: 123,
        timestamp: '2024-01-01T10:00:00Z',
        reportName: 'Test Report',
        creditsUsed: 10.5,
    };

    it('should render row data correctly', () => {
        render(
            <table>
                <tbody>
                    <UsageTableRow item={mockItem} />
                </tbody>
            </table>
        );

        expect(screen.getByText('123')).toBeInTheDocument();
        expect(screen.getByText('Test Report')).toBeInTheDocument();
        expect(screen.getByText('10.50')).toBeInTheDocument();
    });

    it('should render placeholder when reportName is missing', () => {
        const itemWithoutReport = { ...mockItem, reportName: '' };
        render(
            <table>
                <tbody>
                    <UsageTableRow item={itemWithoutReport} />
                </tbody>
            </table>
        );

        expect(screen.getByText('—')).toBeInTheDocument();
    });
});
