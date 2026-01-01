import { Files } from 'lucide-react';

interface EmptyTableStateProps {
    searchQuery: string;
}

export const EmptyTableState = ({ searchQuery }: EmptyTableStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
                <Files className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-lg font-medium text-slate-600">
                {searchQuery ? 'No results found' : 'No usage data available'}
            </p>
            {searchQuery && (
                <p className="text-sm text-slate-400 mt-1">
                    We couldn't find any messages matching "{searchQuery}"
                </p>
            )}
        </div>
    );
};
