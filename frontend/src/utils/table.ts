import { SORT_COLUMNS, SORT_DIRECTIONS } from '../constants/table';
import type { MessageUsage, SortDirection } from '../types';
import type { SortColumn } from '../constants/table';

export const getNextSortDirection = (current: SortDirection): SortDirection => {
    if (current === null) return SORT_DIRECTIONS.ASC;
    if (current === SORT_DIRECTIONS.ASC) return SORT_DIRECTIONS.DESC;
    return null;
};

export interface SortConfig {
    column: SortColumn;
    direction: SortDirection;
}

export const sortData = (
    data: MessageUsage[],
    sorts: SortConfig[]
): MessageUsage[] => {
    if (sorts.length === 0) return data;

    return [...data].sort((a, b) => {
        for (const { column, direction } of sorts) {
            if (!direction) continue;

            const [first, second] = direction === SORT_DIRECTIONS.ASC ? [a, b] : [b, a];

            const comparison = column === SORT_COLUMNS.REPORT_NAME
                ? (first.reportName || '').localeCompare(second.reportName || '')
                : first.creditsUsed - second.creditsUsed;

            if (comparison !== 0) return comparison;
        }
        return 0;
    });
};