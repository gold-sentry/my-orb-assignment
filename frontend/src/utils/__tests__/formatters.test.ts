
import { describe, it, expect } from 'vitest';
import { formatTimestamp, formatCompact, formatDecimal, formatDateRange } from '../formatters';

describe('formatTimestamp', () => {
    it('should format timestamp correctly', () => {
        const isoString = '2023-01-01T12:30:00Z';
        const result = formatTimestamp(isoString);
        expect(result).toMatch(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/);
    });

    it('should pad single digits with zero', () => {
        const date = new Date(2023, 0, 5, 9, 5);
        const result = formatTimestamp(date.toISOString());

        expect(result.split(' ')[0].split('-')[0].length).toBe(2); // Day
        expect(result.split(' ')[0].split('-')[1].length).toBe(2); // Month
        expect(result.split(' ')[1].split(':')[0].length).toBe(2); // Hours
        expect(result.split(' ')[1].split(':')[1].length).toBe(2); // Minutes
    });
});

describe('formatCompact', () => {
    it('should return fixed point for small numbers', () => {
        expect(formatCompact(10.123, 2)).toBe('10.12');
        expect(formatCompact(999.99, 2)).toBe('999.99');
        expect(formatCompact(10, 2)).toBe('10'); // Should not have trailing zeros
        expect(formatCompact(500, 2)).toBe('500'); // Should not have trailing zeros
    });

    it('should return compact notation for large numbers', () => {
        expect(formatCompact(1000)).toBe('1K');
        expect(formatCompact(1500)).toBe('1.5K');
        expect(formatCompact(1000000)).toBe('1M');
    });
});

describe('formatDecimal', () => {
    it('should format credits to 2 decimal places', () => {
        expect(formatDecimal(10)).toBe('10.00');
        expect(formatDecimal(10.1)).toBe('10.10');
        expect(formatDecimal(10.123)).toBe('10.12');
        expect(formatDecimal(0)).toBe('0.00');
    });
});

describe('formatDateRange', () => {
    it('should return empty string for missing input', () => {
        expect(formatDateRange(undefined)).toBe('');
    });

    it('should format date correctly', () => {
        const isoString = '2023-01-01T00:00:00Z';
        const result = formatDateRange(isoString);
        expect(result).toContain('2023');
        expect(result).toMatch(/[A-Z][a-z]{2} \d{1,2}, \d{4}/);
    });
});
