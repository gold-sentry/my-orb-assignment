import type { MessageUsage } from '../../types';
import { formatTimestamp } from '../../utils/formatters';

interface UsageTableRowProps {
    item: MessageUsage;
}

export const UsageTableRow = ({ item }: UsageTableRowProps) => {
    return (
        <tr data-testid={`usage-row-${item.messageId}`} className="hover:bg-slate-50 transition-colors duration-150 h-14 cursor-pointer">
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-slate-700 font-mono text-sm">
                    {item.messageId}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-slate-500 text-sm">
                    {formatTimestamp(item.timestamp)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {item.reportName ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                        {item.reportName}
                    </span>
                ) : (
                    <span className="text-slate-400 text-sm">—</span>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className="text-slate-700 font-mono text-sm font-medium">
                    {item.creditsUsed.toFixed(2)}
                </span>
            </td>
        </tr>
    );
};
