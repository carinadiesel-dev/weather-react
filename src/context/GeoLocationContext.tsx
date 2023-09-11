import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useWeatherContext } from "./WeatherContext";
useWeatherContext;

type City = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export const GeoLocationContext = createContext({
  cities: [],
});

// Context
// Context Provider
// Hook

export const GeoLocationContextProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const { weatherNow } = useWeatherContext();

  const coords = weatherNow.coord;

  //   const lat = coords.lat;
  //   const lon = coords.lon;

  const [cityNameData, setCityNameData] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchLocationCity = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&${coords.lon}&appid=${apiKey}`
      );
      const parsedResponse = await response.json();
      setCityNameData(parsedResponse);
      console.log(parsedResponse);
    } catch (error) {
      console.error("Error fetching city data: ", error);
    }
  };

  useEffect(() => {
    fetchLocationCity();
  }, [coords.lat, coords.lon]);
  return (
    <GeoLocationContext.Provider value={{ cityNameData, setCityNameData }}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export const useGeoLocationContext = () => {
  const context = useContext(GeoLocationContext);
  if (context === null) {
    throw new Error(
      "useGeoLocationContext must be used within the useGeoLocationContextProvider"
    );
  }
  return context;
};
