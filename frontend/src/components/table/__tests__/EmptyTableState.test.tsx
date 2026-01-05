import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyTableState } from '../EmptyTableState';

describe('EmptyTableState', () => {
    it('should display "No usage data available" when no search query is provided', () => {
        render(<EmptyTableState searchQuery="" />);
        expect(screen.getByText('No usage data available')).toBeInTheDocument();
        expect(screen.queryByText("We couldn't find any messages matching")).not.toBeInTheDocument();
    });

    it('should display "No results found" and search query when provided', () => {
        const query = 'test-query';
        render(<EmptyTableState searchQuery={query} />);
        expect(screen.getByText('No results found')).toBeInTheDocument();
        expect(screen.getByText(`We couldn't find any messages matching "${query}"`)).toBeInTheDocument();
    });
});
