import { useState, useEffect } from 'react';
import { getHauls } from '../api/hauls';
import { Haul } from '../types/haul';

const useHauls = (initialPage = 1, initialLimit = 5) => {
  const [hauls, setHauls] = useState<Haul[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: initialPage,
    limit: initialLimit,
    pages: 0
  });

  const fetchHauls = async (page = pagination.page, limit = pagination.limit) => {
    try {
      setLoading(true);
      const response = await getHauls(page, limit);
      setHauls(response.hauls);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch hauls');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHauls(initialPage, initialLimit);
  }, [initialPage, initialLimit]);

  return {
    hauls,
    setHauls,
    loading,
    error,
    pagination,
    changePage: (newPage: number) => fetchHauls(newPage, pagination.limit),
    changeLimit: (newLimit: number) => fetchHauls(pagination.page, newLimit)
  };
};

export default useHauls;
