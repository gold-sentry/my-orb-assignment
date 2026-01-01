import { Search, X } from 'lucide-react';

interface TableSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const TableSearch = ({
    value,
    onChange,
    placeholder = 'Search by Message ID...',
}: TableSearchProps) => {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full md:w-64 pl-10 pr-10 py-2 text-sm border border-slate-200 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          placeholder:text-slate-400"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-4 h-4 cursor-pointer" />
                </button>
            )}
        </div>
    );
};