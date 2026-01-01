interface EmptyChartProps {
    message?: string;
}

export const EmptyChart = ({ message = 'No data available' }: EmptyChartProps) => {
    return (
        <div className="h-80 w-full flex items-center justify-center text-slate-400">
            {message}
        </div>
    );
};