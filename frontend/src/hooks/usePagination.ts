import { useState } from 'react';

interface PaginationResult<T> {
    paginatedData: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    setCurrentPage: (page: number) => void;
}

export const usePagination = <T>(
    data: T[],
    pageSize: number = 10
): PaginationResult<T> => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const page = currentPage > totalPages ? 1 : currentPage;

    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        paginatedData,
        currentPage: page,
        totalPages,
        totalItems,
        pageSize,
        setCurrentPage: handlePageChange,
    };
}