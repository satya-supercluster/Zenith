import React, { createContext, useContext, useState } from "react";
const DataContext = createContext();
export const useData = () => useContext(DataContext);
export const DataProvider = ({ children }) => {
    const isConstructed=false;
  return <DataContext.Provider value={{isConstructed}}>{children}</DataContext.Provider>;
};
