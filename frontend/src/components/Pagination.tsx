interface PaginationProps {
  pagination: {
    page: number;
    pages: number;
  };
  changePage: (page: number) => void;
}

const Pagination:React.FC<PaginationProps> = ({ pagination, changePage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= pagination.pages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex justify-center my-10">
      <nav className="flex items-center">
        <button
          onClick={() => changePage(pagination.page - 1)}
          disabled={pagination.page === 1}
          className={`px-3 py-1 mx-2 rounded bg-stone-200 ${
            pagination.page === 1
              ? 'cursor-not-allowed'
              : 'hover:bg-stone-300'
          }`}
        >
          prev
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => changePage(number)}
            className={`px-3 py-1 mx-1 rounded ${
              pagination.page === number
                ? 'bg-stone-400 text-white'
                : 'bg-stone-100 hover:bg-stone-200'
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => changePage(pagination.page + 1)}
          disabled={pagination.page === pagination.pages}
          className={`px-3 py-1 mx-2 rounded bg-stone-200 ${
            pagination.page === pagination.pages
              ? 'cursor-not-allowed'
              : 'hover:bg-stone-300'
          }`}
        >
          next
        </button>
      </nav>
    </div>
  )
}

export default Pagination;