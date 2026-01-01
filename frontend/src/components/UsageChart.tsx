// src/components/UsageChart.tsx
import { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { MessageUsage } from '../types';
import { chartTheme } from '../constants/theme';
import { buildChartData } from '../utils/chartData';
import { formatCompact } from '../utils/formatters';
import { ChartGradient, ChartTooltip, EmptyChart } from './charts';
import { CHART_GRADIENT_ID, CHART_STYLES } from '../constants/chart';

interface UsageChartProps {
    data: MessageUsage[];
}

export const UsageChart = ({ data }: UsageChartProps) => {
    const chartData = useMemo(() => buildChartData(data), [data]);

    if (chartData.length === 0) {
        return <EmptyChart />;
    }

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <defs>
                        <ChartGradient id={CHART_GRADIENT_ID} />
                    </defs>
                    <CartesianGrid {...CHART_STYLES.grid} vertical={false} />
                    <XAxis dataKey="displayDate" {...CHART_STYLES.axis} />
                    <YAxis
                        {...CHART_STYLES.axis}
                        label={CHART_STYLES.yAxisLabel}
                        tickFormatter={(value) => formatCompact(value)}
                    />
                    <Tooltip
                        content={<ChartTooltip />}
                        cursor={{ fill: chartTheme.cursor.fill }}
                    />
                    <Bar
                        dataKey="credits"
                        fill={`url(#${CHART_GRADIENT_ID})`}
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                        cursor="pointer"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};