import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="inline-flex items-center m-auto mt-6">
      {/* Botón Anterior */}
      <li>
        <button
          type="button"
          className={`flex justify-center font-semibold ltr:rounded-l-full rtl:rounded-r-full px-3.5 py-2 transition ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          }`}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          ⬅️
        </button>
      </li>

      {/* Números de Página */}
      {pages.map((pageNumber) => (
        <li key={pageNumber}>
          <button
            type="button"
            className={`flex justify-center font-semibold px-3.5 py-2 transition ${
              page === pageNumber
                ? "bg-primary text-white dark:text-white-light dark:bg-primary"
                : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}

      {/* Botón Siguiente */}
      <li>
        <button
          type="button"
          className={`flex justify-center font-semibold ltr:rounded-r-full rtl:rounded-l-full px-3.5 py-2 transition ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          }`}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          ➡️
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
