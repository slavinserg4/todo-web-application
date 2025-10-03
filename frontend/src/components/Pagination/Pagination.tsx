'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import './styleForPagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

const PaginationContent = ({ currentPage, totalPages, hasNextPage, hasPrevPage }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="pagination">
            <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrevPage}
            >
                Previous
            </button>

            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>

            <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage}
            >
                Next
            </button>
        </div>
    );
};

export default function Pagination(props: PaginationProps) {
    return (
        <Suspense fallback={
            <div className="pagination">
                <button className="pagination-button" disabled>Previous</button>
                <span className="pagination-info">Loading...</span>
                <button className="pagination-button" disabled>Next</button>
            </div>
        }>
            <PaginationContent {...props} />
        </Suspense>
    );
}