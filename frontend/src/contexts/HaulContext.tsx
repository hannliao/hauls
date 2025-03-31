import { createContext, ReactNode } from 'react';
import useHauls from '../hooks/useHauls';
import { Haul } from '../types/haul'

interface HaulContextType {
  hauls: Haul[];
  setHauls: React.Dispatch<React.SetStateAction<Haul[]>>;
  loading: boolean;
  error: any;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  changePage: (newPage: number) => void;
  changeLimit: (newLimit: number) => void;
}

export const HaulContext = createContext<HaulContextType>({
  hauls: [],
  setHauls: () => {},
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 5,
    pages: 0,
  },
  changePage: () => {},
  changeLimit: () => {},
});

interface HaulProviderProps {
  children: ReactNode;
}

export const HaulProvider: React.FC<HaulProviderProps> = ({ children }) => {
  const { hauls, setHauls, loading, error, pagination, changePage, changeLimit } = useHauls();

  return (
    <HaulContext.Provider value={{ hauls, setHauls, loading, error, pagination, changePage, changeLimit }}>
      {children}
    </HaulContext.Provider>
  );
};
