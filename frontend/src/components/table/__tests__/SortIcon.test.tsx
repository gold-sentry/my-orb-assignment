import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SortIcon } from '../SortIcon';
import { SORT_DIRECTIONS } from '../../../constants/table';

describe('SortIcon', () => {
    it('should render ChevronUp for ASC direction', () => {
        const { container } = render(<SortIcon direction={SORT_DIRECTIONS.ASC} />);
        const icon = container.querySelector('.lucide-chevron-up');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('text-emerald-600');
    });

    it('should render ChevronDown for DESC direction', () => {
        const { container } = render(<SortIcon direction={SORT_DIRECTIONS.DESC} />);
        const icon = container.querySelector('.lucide-chevron-down');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('text-emerald-600');
    });

    it('should render ChevronsUpDown for null direction', () => {
        const { container } = render(<SortIcon direction={null} />);
        const icon = container.querySelector('.lucide-chevrons-up-down');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('text-slate-400');
    });
});
