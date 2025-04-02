import React, { createContext, useContext, useEffect, useState } from "react";
const DataContext = createContext();
export const useData = () => useContext(DataContext);
export const DataProvider = ({ children }) => {
    const isConstructed=false;
    const [auth,setAuth]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [passcode,setPasscode]=useState("");
    const [registrationData,setRegistrationData]=useState([]);
    useEffect(()=>{
      if(passcode=="satyam!2026"){
        setAuth(true);
      }
    },[passcode])
    useEffect(()=>{
      const fetchData = async () => {
        try {
          setIsLoading(true);
          // Replace with your actual endpoint
          const response = await fetch(
            // `https://zenith-club-manit.onrender.com/api/recruit/all`
            "http://localhost:3001/api/recruit/all"
          );

          if (!response.ok) {
            throw new Error("Failed to fetch registration data");
          }

          const result = await response.json();
          setRegistrationData(result.data || []);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message);
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
        passcode,
        setPasscode,
        registrationData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
