import { useState, useEffect } from 'react';
import { getUserHauls } from '../api/hauls'
import { Haul } from '../types/haul';

const useUserHauls = (username: string | undefined, initialPage = 1, initialLimit = 5) => {
  const [hauls, setHauls] = useState<Haul[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: initialPage,
    limit: initialLimit,
    pages: 0
  });

  const fetchUserHauls = async (page = pagination.page, limit = pagination.limit) => {
    if (!username) {
      setHauls([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getUserHauls(username, page, limit);
      setHauls(response.hauls);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to fetch hauls');
      setHauls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserHauls(initialPage, initialLimit);
  }, [username, initialPage, initialLimit]);

  return {
    hauls,
    setHauls,
    loading,
    error,
    pagination,
    changePage: (newPage: number) => fetchUserHauls(newPage, pagination.limit),
    changeLimit: (newLimit: number) => fetchUserHauls(pagination.page, newLimit)
  };
};

export default useUserHauls;
