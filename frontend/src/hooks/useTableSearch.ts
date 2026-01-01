import { useState, useMemo } from 'react';
import type { MessageUsage } from '../types';

export const useTableSearch = (data: MessageUsage[]) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        const query = searchQuery.toLowerCase();
        return data.filter((item) =>
            item.messageId.toString().includes(query) ||
            (item.reportName && item.reportName.toLowerCase().includes(query))
        );
    }, [data, searchQuery]);

    return { searchQuery, setSearchQuery, filteredData };
}