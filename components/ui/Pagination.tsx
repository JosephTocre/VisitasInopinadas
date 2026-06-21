import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between mt-4 bg-white p-4 rounded-xl border border-gray-200">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>

      <span className="text-sm">
        Página {currentPage} de {totalPages || 1}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}
