
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChartTooltip } from '../ChartTooltip';
import { chartTheme } from '../../../constants/theme';

describe('ChartTooltip', () => {
    it('should return null when not active', () => {
        const { container } = render(<ChartTooltip active={false} payload={[{ value: 10 }]} label="Jan 1" />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should return null when payload is empty', () => {
        const { container } = render(<ChartTooltip active={true} payload={[]} label="Jan 1" />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render correct information when active and has payload', () => {
        const label = 'Jan 1, 2023';
        const value = 1234.5678;

        render(<ChartTooltip active={true} payload={[{ value }]} label={label} />);

        // Check date label
        expect(screen.getByText(`Date: ${label}`)).toBeInTheDocument();

        // Check formatted credits (assuming formatCredits does 2 decimal places based on utils tests)
        // 1234.5678 -> 1234.57
        expect(screen.getByText('Credits: 1.23K')).toBeInTheDocument();
    });

    it('should apply theme styles', () => {
        render(<ChartTooltip active={true} payload={[{ value: 10 }]} label="Date" />);

        const container = screen.getByText('Date: Date').closest('div');
        expect(container).toHaveStyle({
            backgroundColor: chartTheme.tooltip.background,
            borderColor: chartTheme.tooltip.border, // Note: border vs borderColor might depend on how jsdom handles shorthand
        });

        // Explicitly check the border style prop if computed style is tricky in jsdom without full CSS engine
        // The component uses inline styles, so checking style attribute logic or computed style should work.
    });
});
