import { createContext, useContext } from "react";
import { useState } from "react";

type City = {
  setCities: any;
  lat?: Number | null;
  lon?: Number | null;
};

type CityContextType = {
  cities: City[];
  lat?: Number | null;
  lon?: Number | null;
  setCities: any;
};
type Props = {
  children?: React.ReactNode;
};

export const LocationContext = createContext<CityContextType | null>(null);

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
