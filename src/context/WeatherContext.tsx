import { createContext, useContext } from 'react';
import { useState } from 'react';

export const WeatherContext = createContext({
        weatherNow: [],
        // addCity: (name, lat, lon) => { },
      });

      // Context
      // Context Provider
      // Hook

export const WeatherContextProvider = ({children}) => {
      const [weatherNow,setWeatherNow] = useState([]);

      return <WeatherContext.Provider value={{weatherNow,setWeatherNow}}> 
        {children}
      </WeatherContext.Provider> 
}

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if(context === null){
    throw new Error("useWeatherContext must be used within the useWeatherContextProvider")
  }
  return context;
}