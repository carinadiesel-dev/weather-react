import { createContext, useContext } from "react";
import { useState } from "react";

type City = {
  city: string;
  country: string;
  lat: number;
  lon: number;
};

export const LocationContext = createContext({
  cities: [],
});

// Context
// Context Provider
// Hook

export const LocationContextProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  return (
    <LocationContext.Provider value={{ cities, setCities }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === null) {
    throw new Error(
      "useLocationContext must be used within the useLocationContextProvider"
    );
  }
  return context;
};
