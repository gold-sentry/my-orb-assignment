import { chartTheme } from '../../constants/theme';

interface ChartGradientProps {
    id: string;
    startColor?: string;
    endColor?: string;
}

export const ChartGradient = ({
    id,
    startColor = chartTheme.gradient.start,
    endColor = chartTheme.gradient.end,
}: ChartGradientProps) => {
    return (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={startColor} stopOpacity={1} />
            <stop offset="100%" stopColor={endColor} stopOpacity={0.8} />
        </linearGradient>
    );
};