import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationContext, useLocationContext } from './LocationContext';

 export const WeatherContext = createContext({
  cities: [],
});

export const WeatherContextProvider = ({ children}) => {
  const [weatherNow, setWeatherNow] = useState([]);

  const {cities} = useLocationContext();
  const apiKey = import.meta.env.VITE_API_KEY;
 

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cities.lat}&lon=${cities.lon}&appid=${apiKey}&units=metric`
      );
      const parsedResponse = await response.json();
      setWeatherNow(parsedResponse);
      console.log(parsedResponse);
      // console.log(weatherNow);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


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

// Api Call for 5 day forecast : api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
