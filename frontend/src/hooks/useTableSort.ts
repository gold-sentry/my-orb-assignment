import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { MessageUsage, SortDirection } from '../types';
import { getNextSortDirection, sortData, type SortConfig } from '../utils/table';
import { SORT_COLUMNS, SORT_DIRECTIONS, type SortColumn } from '../constants/table';

const VALID_COLUMNS = new Set<string>(Object.values(SORT_COLUMNS));

const parseSortParam = (value: string | null): SortDirection => {
    if (value === SORT_DIRECTIONS.ASC || value === SORT_DIRECTIONS.DESC) return value;
    return null;
};

export const useTableSort = (data: MessageUsage[]) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const sorts = useMemo((): SortConfig[] => {
        const activeSorts: SortConfig[] = [];

        for (const [key, value] of searchParams.entries()) {
            if (VALID_COLUMNS.has(key)) {
                const direction = parseSortParam(value);
                if (direction) {
                    activeSorts.push({ column: key as SortColumn, direction });
                }
            }
        }
        return activeSorts.reverse();
    }, [searchParams]);

    const sortedData = useMemo(() => sortData(data, sorts), [data, sorts]);

    const handleSort = (column: SortColumn) => {
        const currentDir = parseSortParam(searchParams.get(column));
        const nextDir = getNextSortDirection(currentDir);

        setSearchParams((params) => {
            params.delete(column);
            if (nextDir) {
                params.append(column, nextDir);
            }
            return params;
        }, { replace: true });
    };

    return {
        sortDirection: {
            reportName: parseSortParam(searchParams.get(SORT_COLUMNS.REPORT_NAME)),
            creditsUsed: parseSortParam(searchParams.get(SORT_COLUMNS.CREDITS_USED)),
        },
        sortedData,
        handleSort,
    };
};