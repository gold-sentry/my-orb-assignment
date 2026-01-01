import { SortIcon } from './SortIcon';
import { SORT_COLUMNS, type SortColumn } from '../../constants/table';
import type { SortDirection } from '../../types';

interface UsageTableHeaderProps {
    sortConfig: {
        reportName: SortDirection;
        creditsUsed: SortDirection;
    };
    onSort: (column: SortColumn) => void;
}

export const UsageTableHeader = ({ sortConfig, onSort }: UsageTableHeaderProps) => {
    return (
        <thead>
            <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                    Message ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                    Timestamp
                </th>
                <th
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-emerald-600 transition-colors"
                    onClick={() => onSort(SORT_COLUMNS.REPORT_NAME)}
                >
                    <div className="flex items-center gap-2">
                        Report Name
                        <SortIcon direction={sortConfig.reportName} />
                    </div>
                </th>
                <th
                    className="px-6 py-4 text-right text-sm font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-emerald-600 transition-colors"
                    onClick={() => onSort(SORT_COLUMNS.CREDITS_USED)}
                >
                    <div className="flex items-center justify-end gap-2">
                        Credits Used
                        <SortIcon direction={sortConfig.creditsUsed} />
                    </div>
                </th>
            </tr>
        </thead>
    );
};
