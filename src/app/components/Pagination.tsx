import IconCaretDown from "./IconCaretDown";
import IconCaretsDown from "./IconCaretsDown";
import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mb-5">
      <div className="flex justify-center flex-col w-full">
        <ul className="inline-flex items-center m-auto mb-4">
          {/* Botón "Primera Página" */}
          <li>
            <button
              type="button"
              className={`flex justify-center font-semibold rounded-l-full px-3.5 py-2 transition ${
                page === 1 ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
              }`}
              onClick={() => onPageChange(1)}
              disabled={page === 1}
            >
              <IconCaretsDown className="rotate-90" />
            </button>
          </li>

          {/* Botón "Anterior" */}
          <li>
            <button
              type="button"
              className={`flex justify-center font-semibold px-3.5 py-2 transition ${
                page === 1 ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
              }`}
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              <IconCaretDown className="w-5 h-5 rotate-90" />
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

          {/* Botón "Siguiente" */}
          <li>
            <button
              type="button"
              className={`flex justify-center font-semibold px-3.5 py-2 transition ${
                page === totalPages ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
              }`}
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              <IconCaretDown className="w-5 h-5 -rotate-90" />
            </button>
          </li>

          {/* Botón "Última Página" */}
          <li>
            <button
              type="button"
              className={`flex justify-center font-semibold rounded-r-full px-3.5 py-2 transition ${
                page === totalPages ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
              }`}
              onClick={() => onPageChange(totalPages)}
              disabled={page === totalPages}
            >
              <IconCaretsDown className="-rotate-90" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
