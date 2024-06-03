import React, { FC, useState } from 'react';
import { StoreContext } from '../hooks/useStore';

interface IStoreProvider {
  children: React.ReactNode;
}
export const StoreProvider: FC<IStoreProvider> = ({ children }) => {
  const [text, setText] = useState('');

  return (
    <StoreContext.Provider value={{ text, setText }}>
      {children}
    </StoreContext.Provider>
  );
};
