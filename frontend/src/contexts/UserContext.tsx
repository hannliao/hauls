import { createContext, ReactNode } from 'react';
import useUser from '../hooks/useUser';

interface UserContextType {
  user: {id : string; username: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{id: string; username: string} | null>>;
  loading: boolean;
  error: any;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user, setUser, loading, error } = useUser();

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
