import React, { createContext, useContext, useEffect, useState } from "react";
const DataContext = createContext();
export const useData = () => useContext(DataContext);
export const DataProvider = ({ children }) => {
    const isConstructed=false;
    const [auth,setAuth]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    const [registrationData,setRegistrationData]=useState([]);
    const [it,setIt]=useState(null);
    useEffect(()=>{
      const fetchData = async () => {
        try {
          setIsLoading(true);
          // Replace with your actual endpoint
          const response = await fetch(
            `https://zenith-club-manit.onrender.com/api/recruit/all?it=${it}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch registration data");
          }

          const result = await response.json();
          setRegistrationData(result.data || []);
        } catch (err) {
          console.error("Error fetching data:", err);
        } finally {
          setIsLoading(false);
        }
      };
      if (auth) fetchData();
    },[auth]);

  return (
    <DataContext.Provider
      value={{
        isConstructed,
        auth,
        setAuth,
        isLoading,
        setIsLoading,
        registrationData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
