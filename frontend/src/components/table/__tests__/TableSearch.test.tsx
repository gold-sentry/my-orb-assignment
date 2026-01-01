
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TableSearch } from '../TableSearch';

describe('TableSearch', () => {
    it('should render with default placeholder', () => {
        render(<TableSearch value="" onChange={() => { }} />);
        expect(screen.getByPlaceholderText('Search by Message ID...')).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
        render(<TableSearch value="" onChange={() => { }} placeholder="Custom Search" />);
        expect(screen.getByPlaceholderText('Custom Search')).toBeInTheDocument();
    });

    it('should display the current value', () => {
        render(<TableSearch value="test value" onChange={() => { }} />);
        expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    });

    it('should call onChange when input changes', () => {
        const onChange = vi.fn();
        render(<TableSearch value="" onChange={onChange} />);

        const input = screen.getByPlaceholderText('Search by Message ID...');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(onChange).toHaveBeenCalledWith('new value');
    });

    it('should show clear button when there is a value', () => {
        render(<TableSearch value="something" onChange={() => { }} />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('should NOT show clear button when value is empty', () => {
        render(<TableSearch value="" onChange={() => { }} />);
        const button = screen.queryByRole('button');
        expect(button).not.toBeInTheDocument();
    });

    it('should call onChange with empty string when clear button is clicked', () => {
        const onChange = vi.fn();
        render(<TableSearch value="test" onChange={onChange} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onChange).toHaveBeenCalledWith('');
    });
});
