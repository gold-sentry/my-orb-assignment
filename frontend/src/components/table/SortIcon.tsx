import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { SORT_DIRECTIONS } from '../../constants/table';
import type { SortDirection } from '../../types';

interface SortIconProps {
    direction: SortDirection;
}

export const SortIcon = ({ direction }: SortIconProps) => {
    if (direction === SORT_DIRECTIONS.ASC)
        return <ChevronUp className="w-4 h-4 text-emerald-600" />;
    if (direction === SORT_DIRECTIONS.DESC)
        return <ChevronDown className="w-4 h-4 text-emerald-600" />;
    return <ChevronsUpDown className="w-4 h-4 text-slate-400" />;
};
