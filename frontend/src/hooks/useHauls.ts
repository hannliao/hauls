import { useState, useEffect } from 'react';
import { getHauls } from '../api/hauls';
import { Haul } from '../types/haul';

const useHauls = () => {
  const [hauls, setHauls] = useState<Haul[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchHauls = async () => {
      try {
        setLoading(true);
        const fetchedHauls = await getHauls();
        setHauls(fetchedHauls);
      } catch (err) {
        setError('Failed to fetch hauls');
      } finally {
        setLoading(false);
      }
    };
    fetchHauls();
  }, []);
  return { hauls, setHauls, loading, error };
};

export default useHauls;
