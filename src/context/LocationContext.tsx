import { createContext, useContext } from "react";
import { useState } from "react";

type City = { cities: any[]; setCities: any; lat?: Number; lon?: Number };
type Props = {
  children?: React.ReactNode;
};

export const LocationContext = createContext<City>({});

// Context
// Context Provider
// Hook

export const LocationContextProvider = ({ children }: Props) => {
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
