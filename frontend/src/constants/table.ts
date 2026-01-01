import type { SortDirection } from '../types';

export const PAGE_SIZE = 10;

export const SORT_DIRECTIONS: Record<string, SortDirection> = {
    ASC: 'asc',
    DESC: 'desc',
    NONE: null,
};

export const SORT_COLUMNS = {
    REPORT_NAME: 'reportName',
    CREDITS_USED: 'creditsUsed',
} as const;

export type SortColumn = (typeof SORT_COLUMNS)[keyof typeof SORT_COLUMNS];
