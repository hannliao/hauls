import { Link } from 'react-router';
import HaulCard from './HaulCard';
import useHauls from '../hooks/useHauls';

const Home = () => {
  const { hauls, loading, error } = useHauls();

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
        <div className="flex flex-col">
          {hauls.map((haul, index) => (
            <HaulCard
              key={index}
              storeName={haul.storeName}
              dateOfPurchase={haul.dateOfPurchase}
              items={haul.items}
              username={haul.username}
              slug={haul.slug}
              notes={haul.notes}
            />
          ))}
        </div>
      ) : (
        <p>No hauls found.</p>
      )}
    </div>
  );
};

export default Home;
