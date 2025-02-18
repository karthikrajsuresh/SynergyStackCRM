import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    rowsPerPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalItems);

    return (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <div>
                Rows per page: <span className="font-semibold">{rowsPerPage}</span>
            </div>
            <div>
                {startIndex + 1} - {endIndex} of {totalItems}
            </div>
            <div className="space-x-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-2 py-1 border rounded ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-gray-200'
                        }`}
                >
                    Prev
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-1 border rounded ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-gray-200'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;