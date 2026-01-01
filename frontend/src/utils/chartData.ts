import { formatDateRange } from './formatters';
import type { MessageUsage } from '../types';

export interface DailyData {
    date: string;
    credits: number;
    displayDate: string;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const getDateString = (date: Date): string => date.toISOString().split('T')[0];

const groupCreditsByDate = (data: MessageUsage[]): Map<string, number> => {
    return data.reduce((acc, item) => {
        const date = item.timestamp.split('T')[0];
        acc.set(date, (acc.get(date) || 0) + item.creditsUsed);
        return acc;
    }, new Map<string, number>());
};

const getDaysBetween = (start: Date, end: Date): number => {
    return Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY);
};

export const buildChartData = (data: MessageUsage[]): DailyData[] => {
    if (data.length === 0) return [];

    const creditsByDate = groupCreditsByDate(data);
    const dates = Array.from(creditsByDate.keys()).sort();

    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    const totalDays = getDaysBetween(startDate, endDate);

    return Array.from({ length: totalDays + 1 }, (_, i) => {
        const current = new Date(startDate);
        current.setDate(startDate.getDate() + i);
        const dateStr = getDateString(current);

        return {
            date: dateStr,
            credits: creditsByDate.get(dateStr) || 0,
            displayDate: formatDateRange(dateStr),
        };
    });
};