export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

const ERROR_MESSAGES: Record<number, string> = {
    404: 'Resource not found',
    500: 'Internal server error. Please try again later',
};

export const handleApiResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const message = ERROR_MESSAGES[response.status] || 'An error occurred while fetching data';
        throw new ApiError(message, response.status);
    }
    return response.json();
};

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
};