import HaulCard from './HaulCard';
import useHauls from '../hooks/useHauls';

const Home = () => {
  const { hauls, loading, error } = useHauls();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="flex-1">{error}</div>;
  }

  return (
    <div className="w-full flex-1 p-2">
      <button>+ New Haul</button>
      <h2 className="text-lg font-medium mb-5">Recent Hauls</h2>
      {hauls.length > 0 ? (
        <div className="flex flex-wrap justify-around">
          {hauls.map((haul, index) => (
            <HaulCard
              key={index}
              storeName={haul.storeName}
              dateOfPurchase={haul.dateOfPurchase}
              items={haul.items}
              userId={haul.userId}
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
