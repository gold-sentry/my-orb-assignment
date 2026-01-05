import { describe, it, expect } from 'vitest';
import { transformUsageResponse } from '../transformers';
import type { ApiUsageResponse } from '../../types';

describe('transformUsageResponse', () => {
    it('should correctly transform API response to usage response', () => {
        const apiData: ApiUsageResponse = {
            usage: [
                {
                    message_id: 1,
                    timestamp: '2024-01-01T00:00:00Z',
                    report_name: 'Test Report',
                    credits_used: 10,
                },
                {
                    message_id: 2,
                    timestamp: '2024-01-02T00:00:00Z',
                    report_name: 'Another Report',
                    credits_used: 5,
                }
            ]
        };

        const result = transformUsageResponse(apiData);

        expect(result).toEqual({
            usage: [
                {
                    messageId: 1,
                    timestamp: '2024-01-01T00:00:00Z',
                    reportName: 'Test Report',
                    creditsUsed: 10,
                },
                {
                    messageId: 2,
                    timestamp: '2024-01-02T00:00:00Z',
                    reportName: 'Another Report',
                    creditsUsed: 5,
                }
            ]
        });
    });

    it('should handle empty usage array', () => {
        const apiData: ApiUsageResponse = {
            usage: []
        };

        const result = transformUsageResponse(apiData);

        expect(result).toEqual({
            usage: []
        });
    });
});
