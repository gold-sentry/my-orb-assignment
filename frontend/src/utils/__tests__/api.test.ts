import { describe, it, expect, vi } from 'vitest';
import { handleApiResponse, getErrorMessage, ApiError } from '../api';

describe('ApiError', () => {
    it('should store message and status', () => {
        const error = new ApiError('Test error', 404);
        expect(error.message).toBe('Test error');
        expect(error.status).toBe(404);
        expect(error.name).toBe('ApiError');
    });

    it('should work without status', () => {
        const error = new ApiError('Test error');
        expect(error.message).toBe('Test error');
        expect(error.status).toBeUndefined();
    });
});

describe('handleApiResponse', () => {
    it('should return JSON on success', async () => {
        const mockData = { id: 1, name: 'Test' };
        const response = {
            ok: true,
            json: async () => mockData,
        } as Response;

        const result = await handleApiResponse(response);
        expect(result).toEqual(mockData);
    });

    it('should throw ApiError on non-ok response', async () => {
        const response = {
            ok: false,
            status: 404,
        } as Response;

        await expect(handleApiResponse(response)).rejects.toThrow(ApiError);
        await expect(handleApiResponse(response)).rejects.toThrow('Resource not found');
    });

    it('should use default error message for unknown status', async () => {
        const response = {
            ok: false,
            status: 418,
        } as Response;

        await expect(handleApiResponse(response)).rejects.toThrow('An error occurred while fetching data');
    });
});

describe('getErrorMessage', () => {
    it('should return error message for Error objects', () => {
        const error = new Error('Something went wrong');
        expect(getErrorMessage(error)).toBe('Something went wrong');
    });

    it('should return fallback message for unknown errors', () => {
        expect(getErrorMessage('unknown error')).toBe('An unexpected error occurred');
        expect(getErrorMessage(null)).toBe('An unexpected error occurred');
        expect(getErrorMessage(undefined)).toBe('An unexpected error occurred');
    });
});
