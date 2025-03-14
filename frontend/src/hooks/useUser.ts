import { useState, useEffect } from 'react';
import { getUser } from '../api/user';

interface User {
  id: string;
  username: string;
}

interface UseUserResult {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  error: any;
}

const useUser = (): UseUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const data = await getUser();
          setUser(data.user);
        } catch (err: any) {
          console.error(err.message);
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  return { user, setUser, loading, error };
};

export default useUser;
