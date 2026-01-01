
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
    const defaultProps = {
        currentPage: 1,
        totalPages: 10,
        totalItems: 100,
        pageSize: 10,
        onPageChange: vi.fn(),
    };

    it('should render correct stats and page info', () => {
        render(<Pagination {...defaultProps} />);

        // stats: Showing 1-10 of 100
        expect(screen.getByText(/Showing 1-10 of 100/i)).toBeInTheDocument();
        // page info: 1 / 10
        expect(screen.getByText('1 / 10')).toBeInTheDocument();
    });

    it('should disable Previous button on first page', () => {
        render(<Pagination {...defaultProps} currentPage={1} />);

        const prevButton = screen.getByRole('button', { name: /previous/i });
        expect(prevButton).toBeDisabled();
    });

    it('should enable Previous button on non-first page', () => {
        render(<Pagination {...defaultProps} currentPage={2} />);

        const prevButton = screen.getByRole('button', { name: /previous/i });
        expect(prevButton).not.toBeDisabled();
    });

    it('should disable Next button on last page', () => {
        render(<Pagination {...defaultProps} currentPage={10} totalPages={10} />);

        const nextButton = screen.getByRole('button', { name: /next/i });
        expect(nextButton).toBeDisabled();
    });

    it('should enable Next button on non-last page', () => {
        render(<Pagination {...defaultProps} currentPage={9} totalPages={10} />);

        const nextButton = screen.getByRole('button', { name: /next/i });
        expect(nextButton).not.toBeDisabled();
    });

    it('should call onPageChange when Previous is clicked', () => {
        const onPageChange = vi.fn();
        render(<Pagination {...defaultProps} currentPage={2} onPageChange={onPageChange} />);

        const prevButton = screen.getByRole('button', { name: /previous/i });
        fireEvent.click(prevButton);

        expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('should call onPageChange when Next is clicked', () => {
        const onPageChange = vi.fn();
        render(<Pagination {...defaultProps} currentPage={1} onPageChange={onPageChange} />);

        const nextButton = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextButton);

        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('should calculate item range correctly for last page partial content', () => {
        // Example: total 25 items, page size 10.
        // Page 1: 1-10
        // Page 2: 11-20
        // Page 3: 21-25
        render(
            <Pagination
                currentPage={3}
                totalPages={3}
                totalItems={25}
                pageSize={10}
                onPageChange={vi.fn()}
            />
        );

        expect(screen.getByText(/Showing 21-25 of 25/i)).toBeInTheDocument();
    });
});
