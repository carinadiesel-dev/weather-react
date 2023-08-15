import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationContext, useLocationContext } from './LocationContext';

 export const WeatherContext = createContext({
  weatherNow : []
});

export const WeatherContextProvider = ({ children}) => {
  const [weatherNow, setWeatherNow] = useState([]);
  const {cities} = useLocationContext();
  const apiKey = import.meta.env.VITE_API_KEY;
 

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cities.lat}&lon=${cities.lon}&appid=${apiKey}`
      );
      const parsedResponse = await response.json();
      setWeatherNow(parsedResponse);
      console.log(parsedResponse)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [cities.lat,cities.lon]);


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

