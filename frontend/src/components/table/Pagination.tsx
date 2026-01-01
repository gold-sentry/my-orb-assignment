// src/components/table/Pagination.tsx
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
}: PaginationProps) => {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 pt-4 border-t border-slate-200 gap-4 md:gap-0">
            <p className="text-sm text-slate-500 order-2 md:order-1">
                Showing {startItem}-{endItem} of {totalItems}
            </p>
            <div className="flex items-center gap-2 order-1 md:order-2 w-full md:w-auto justify-center">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    Previous
                </button>
                <span className="text-sm text-slate-600 px-2">
                    {currentPage} / {totalPages}
                </span>
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
};