export interface MessageUsage {
    messageId: number;
    timestamp: string;
    reportName?: string;
    creditsUsed: number;
}

export interface UsageResponse {
    usage: MessageUsage[];
}

export interface ApiMessageUsage {
    message_id: number;
    timestamp: string;
    report_name?: string;
    credits_used: number;
}

export interface ApiUsageResponse {
    usage: ApiMessageUsage[];
}

export interface UseUsageDataResult {
    data: UsageResponse | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export interface StatCard {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    bgColor: string;
    borderColor: string;
}

export type SortDirection = 'asc' | 'desc' | null;