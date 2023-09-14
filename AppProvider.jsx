// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [totalBalance, setTotalBalance] = useState(0);

  const updateTotalBalance = (newTotalBalance) => {
    setTotalBalance(newTotalBalance);
  };

  return (
    <AppContext.Provider value={{ totalBalance, updateTotalBalance }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
