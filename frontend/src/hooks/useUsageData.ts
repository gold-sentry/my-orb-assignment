import { useState, useEffect, useCallback } from 'react';
import type { UsageResponse, ApiUsageResponse, UseUsageDataResult } from '../types';
import { config } from '../config';
import { transformUsageResponse } from '../utils/transformers';
import { handleApiResponse, getErrorMessage } from '../utils/api';

export const useUsageData = (): UseUsageDataResult => {
    const [data, setData] = useState<UsageResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${config.apiUrl}/usage`);
            const result = await handleApiResponse<ApiUsageResponse>(response);
            setData(transformUsageResponse(result));
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};