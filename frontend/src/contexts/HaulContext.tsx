import { createContext, ReactNode } from 'react';
import useHauls from '../hooks/useHauls';
import { Haul } from '../types/haul'

interface HaulContextType {
  hauls: Haul[];
  setHauls: React.Dispatch<React.SetStateAction<Haul[]>>;
  loading: boolean;
  error: any;
}

export const HaulContext = createContext<HaulContextType>({
  hauls: [],
  setHauls: () => {},
  loading: false,
  error: null
});

interface HaulProviderProps {
  children: ReactNode;
}

export const HaulProvider: React.FC<HaulProviderProps> = ({ children }) => {
  const { hauls, setHauls, loading, error } = useHauls();

  return (
    <HaulContext.Provider value={{ hauls, setHauls, loading, error }}>
      {children}
    </HaulContext.Provider>
  );
};
