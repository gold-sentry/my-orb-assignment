import type { ApiUsageResponse, UsageResponse } from "../types";

export const transformUsageResponse = (apiData: ApiUsageResponse): UsageResponse => ({
    usage: apiData.usage.map((item) => ({
        messageId: item.message_id,
        timestamp: item.timestamp,
        reportName: item.report_name,
        creditsUsed: item.credits_used,
    })),
});