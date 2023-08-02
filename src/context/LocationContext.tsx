import { createContext, useContext } from 'react';
import { useState } from 'react';

export const LocationContext = createContext({
        cities: [],
        addCity: (name, lat, lon) => { },
      });

      // Context
      // Context Provider
      // Hook

export const LocationContextProvider = ({children}) => {
      const [cities,setCities] = useState([]);

      return <LocationContext.Provider value={{cities,setCities}}> 
        {children}
      </LocationContext.Provider> 
}

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if(context === null){
    throw new Error("useLocationContext must be used within the useLocationContextProvider")
  }
  return context;
}