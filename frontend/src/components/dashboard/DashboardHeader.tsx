import { Calendar } from 'lucide-react';

interface DashboardHeaderProps {
    dateRange?: {
        start: string;
        end: string;
    };
}

export const DashboardHeader = ({ dateRange }: DashboardHeaderProps) => {
    return (
        <header className="mb-6 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                        Credit Usage Dashboard
                    </h1>
                    <p className="mt-2 text-slate-600 text-base md:text-lg">
                        Monitor your Orbital Copilot consumption
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-medium shadow-sm w-full md:w-auto text-center">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        {dateRange && `${dateRange?.start} — ${dateRange?.end}`}
                    </span>
                </div>
            </div>
        </header>
    );
};