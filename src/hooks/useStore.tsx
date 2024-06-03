import { createContext, useContext } from 'react';

interface IStore {
  text: string;
  setText: (value: string) => void;
}

export const StoreContext = createContext<IStore>({} as IStore);

export const useStore = () => useContext(StoreContext);
