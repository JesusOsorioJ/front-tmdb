import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const goToPage = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pagesToShow = [];
  if (currentPage > 1) pagesToShow.push(currentPage - 1);
  pagesToShow.push(currentPage);
  if (currentPage < totalPages) pagesToShow.push(currentPage + 1);

  return (
    <nav aria-label="Pagination">
      <ul className="inline-flex items-center space-x-2 justify-center w-full ">
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="px-4 py-2 bg-[#262626] rounded hover:bg-[#0f0f0f] disabled:cursor-not-allowed"
          >
            Anterior
          </button>
        </li>

        {pagesToShow.map((page) => (
          <li key={page}>
            <button
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? 'bg-[#0f0f0f]'
                  : 'bg-[#262626] hover:bg-[#0f0f0f]'
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Botón "Siguiente" */}
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="px-4 py-2 bg-[#262626] rounded hover:bg-[#0f0f0f] disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
