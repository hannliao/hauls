import { Link } from 'react-router';
import HaulCard from './HaulCard';
import useHauls from '../hooks/useHauls';
import Pagination from './Pagination';

const Home = () => {
  const { hauls, loading, error, pagination, changePage } = useHauls();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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

          <Pagination pagination={pagination} changePage={changePage} />
        </>
      ) : (
        <p>No hauls found.</p>
      )}
    </div>
  );
};

export default Home;
