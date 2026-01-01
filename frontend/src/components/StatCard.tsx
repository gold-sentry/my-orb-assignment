import type { LucideIcon } from 'lucide-react';
import type { CardColor } from '../utils/statsCard';

const ANIMATION_DELAY_MS = 100;


interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    color: CardColor;
    index: number;
}

const colorStyles: Record<CardColor, { bg: string; border: string; gradient: string }> = {
    blue: {
        bg: 'bg-blue-100',
        border: 'border-blue-200',
        gradient: 'from-blue-500 to-cyan-500',
    },
    emerald: {
        bg: 'bg-emerald-100',
        border: 'border-emerald-200',
        gradient: 'from-emerald-500 to-teal-500',
    },
    violet: {
        bg: 'bg-violet-100',
        border: 'border-violet-200',
        gradient: 'from-violet-500 to-purple-500',
    },
    amber: {
        bg: 'bg-orange-100',
        border: 'border-orange-200',
        gradient: 'from-orange-500 to-amber-500',
    },
};

export const StatCard = ({ title, value, icon: Icon, color, index }: StatCardProps) => {
    const styles = colorStyles[color];
    const animationDelay = `${index * ANIMATION_DELAY_MS}ms`;

    return (
        <article
            className={`
        ${styles.bg} ${styles.border}
        border rounded-2xl p-6
        transition-all duration-200
        hover:shadow-lg hover:-translate-y-1
        cursor-pointer
      `}
            style={{ animationDelay }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${styles.gradient}`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
        </article>
    );
};