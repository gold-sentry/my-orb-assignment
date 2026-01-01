import type { ReactNode } from 'react';

interface DashboardSectionProps {
    title: string;
    indicator?: 'emerald' | 'cyan';
    action?: ReactNode;
    children: ReactNode;
}

export const DashboardSection = ({
    title,
    indicator = 'emerald',
    action,
    children,
}: DashboardSectionProps) => {
    const indicatorColor = indicator === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500';

    return (
        <section className="mb-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 md:gap-0">
                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${indicatorColor}`} />
                        {title}
                    </h2>
                    {action && <div className="w-full md:w-auto">{action}</div>}
                </div>
                {children}
            </div>
        </section>
    );
};