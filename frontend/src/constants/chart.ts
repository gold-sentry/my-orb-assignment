import { chartTheme } from './theme';

export const CHART_GRADIENT_ID = 'barGradient';

export const CHART_STYLES = {
    axis: {
        stroke: chartTheme.axis.stroke,
        tick: { fill: chartTheme.axis.tickFill, fontSize: 12 },
        tickLine: { stroke: chartTheme.axis.lineStroke },
        axisLine: { stroke: chartTheme.axis.lineStroke },
    },
    grid: {
        strokeDasharray: '3 3',
        stroke: chartTheme.grid.stroke,
    },
    yAxisLabel: {
        value: 'Credits',
        angle: -90,
        position: 'insideLeft' as const,
        style: { fill: chartTheme.axis.tickFill, fontSize: 12 },
    },
} as const;