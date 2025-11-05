'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
      >
        Назад
      </button>

      {getPageNumbers()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            1
          </button>
          {getPageNumbers()[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
            currentPage === page
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          {page}
        </button>
      ))}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
      >
        Вперед
      </button>
    </div>
  );
}
