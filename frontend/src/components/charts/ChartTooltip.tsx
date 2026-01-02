import { formatCompact } from '../../utils/formatters';
import { chartTheme } from '../../constants/theme';

interface ChartTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
}

export const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div
            className="rounded-lg shadow-md p-3"
            style={{
                backgroundColor: chartTheme.tooltip.background,
                border: `1px solid ${chartTheme.tooltip.border}`,
            }}
        >
            <p
                className="font-semibold text-sm"
                style={{ color: chartTheme.tooltip.text }}
            >
                Date: {label}
            </p>
            <p className="text-sm" style={{ color: chartTheme.tooltip.highlight }}>
                Credits: {formatCompact(payload[0].value, 2)}
            </p>
        </div>
    );
};