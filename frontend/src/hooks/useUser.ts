import { useState, useEffect } from 'react';
import { getUser } from '../api/user';
import { User } from '../types/user'

interface UseUserResult {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  error: any;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const useUser = (): UseUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (token) {
        try {
          const data = await getUser();
          if (data && data.user) {
            setUser(data.user);
          }
        } catch (err: any) {
          console.error(err.message);
          setError(err);
          setUser(null);
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

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return { user, setUser, loading, error, token, setToken };
};

export default useUser;
