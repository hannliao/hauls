import { Link } from 'react-router';
import HaulCard from './HaulCard';
import useHauls from '../hooks/useHauls';

const Home = () => {
  const { hauls, loading, error, pagination, changePage } = useHauls();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const pageNumbers = [];
  for (let i = 1; i <= pagination.pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col w-xl">
      <Link to="/new" className="bg-amber-400 hover:bg-amber-300 border-4 border-white rounded-lg p-4 text-white text-center text-5xl font-semibold">+</Link>
      <h2 className="font-semibold text-xl my-8">Recent Hauls</h2>
      {hauls.length > 0 ? (
        <>
          <div className="flex flex-col">
            {hauls.map((haul, index) => (
              <HaulCard key={index} haul={haul} showActions={false} />
            ))}
          </div>

          {/* pagination controls */}
          <div className="flex justify-center my-10">
            <nav className="flex items-center">
              <button
                onClick={() => changePage(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`px-3 py-1 mx-2 rounded bg-stone-200 ${
                  pagination.page === 1
                    ? 'cursor-not-allowed'
                    : 'hover:bg-amber-400 hover:text-white'
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
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-100 hover:bg-amber-200'
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
                    : 'hover:bg-amber-400 hover:text-white'
                }`}
              >
                next
              </button>
            </nav>
          </div>
        </>
      ) : (
        <p>No hauls found.</p>
      )}
    </div>
  );
};

export default Home;
