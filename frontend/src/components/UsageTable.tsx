import type { MessageUsage, SortDirection } from '../types';
import { usePagination } from '../hooks/usePagination';
import {
    Pagination,
    EmptyTableState,
    UsageTableRow,
    UsageTableHeader,
} from './table';
import { PAGE_SIZE, type SortColumn } from '../constants/table';
import { useState } from 'react';

interface UsageTableProps {
    data: MessageUsage[];
    sortConfig: {
        reportName: SortDirection;
        creditsUsed: SortDirection;
    };
    onSort: (column: SortColumn) => void;
}

export const UsageTable = ({ data, sortConfig, onSort }: UsageTableProps) => {
    const [searchQuery, _] = useState('');

    const filteredData = data.filter((item) =>
        item.messageId.toString().includes(searchQuery)
    );

    const { paginatedData, currentPage, totalPages, totalItems, pageSize, setCurrentPage } =
        usePagination(filteredData, PAGE_SIZE);

    console.log("Total items", data.length)
    return (
        <div>
            <div className="overflow-x-auto overflow-y-hidden min-h-[560px]">
                <table className="w-full min-w-[800px] table-fixed">
                    <UsageTableHeader sortConfig={sortConfig} onSort={onSort} />
                    <tbody className="divide-y divide-slate-100">
                        {paginatedData.map((item) => (
                            <UsageTableRow key={item.messageId} item={item} />
                        ))}
                    </tbody>
                </table>

                {filteredData.length === 0 && (
                    <EmptyTableState searchQuery={searchQuery} />
                )}
            </div>

            {totalItems > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};