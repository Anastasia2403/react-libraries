/* eslint-disable jsx-a11y/anchor-is-valid */

interface Props {
  currentPage: number;
  handlePagination: (currentPage: number) => void;
  allLength: number;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  handlePagination,
  allLength,
}) => {
  const pageNumber = Math.ceil(allLength / 10);

  return (
    <div className="pagination-container">
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        {currentPage >= 1 && (
          <a
            className="pagination-previous"
              onClick={() => handlePagination(currentPage - 1)}
          >
            Previous
          </a>
        )}
        {currentPage < pageNumber - 1 && (
        <a
          className="pagination-next"
          onClick={() => handlePagination(currentPage + 1)}
        >
          Next page
        </a>
        )}
        <ul className="pagination-list">
          {Array.from({ length: pageNumber }, (_, i) => (
            <li key={i}>
              <a
                className={`pagination-link${currentPage === i ? " is-current" : ""}`}
                aria-label={`Goto page ${i + 1}`}
                onClick={() => handlePagination(i)}
              >
                {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}