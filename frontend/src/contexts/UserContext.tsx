import { createContext, ReactNode } from 'react';
import useUser from '../hooks/useUser';
import { User } from '../types/user'

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  error: any;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user, setUser, loading, error, token, setToken } = useUser();

  return (
    <UserContext.Provider value={{ user, setUser, loading, error, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
