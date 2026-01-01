import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
    it('renders the error message correctly', () => {
        const message = 'Something went wrong';
        render(<ErrorMessage message={message} />);

        expect(screen.getByText('Failed to load data')).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });

    it('renders retry button when onRetry is provided', () => {
        const onRetry = vi.fn();
        render(<ErrorMessage message="Error" onRetry={onRetry} />);

        const button = screen.getByRole('button', { name: /try again/i });
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('does not render retry button when onRetry is missing', () => {
        render(<ErrorMessage message="Error" />);

        const button = screen.queryByRole('button', { name: /try again/i });
        expect(button).not.toBeInTheDocument();
    });
});
