import React, { createContext, useContext, useState, useEffect } from "react";
import { LocationContext, useLocationContext } from "./LocationContext";
import useGeolocation from "../hooks/useGeoLocation";

type Forecast = {
  cities: any[];
  temperature: Number;
  condition: string;
  lat?: Number;
  lon?: Number;
  icon: string;
  today: string;
  date: string;
  country: string;
  cityName: string;
};

type ForecastContextType = {
  weatherNow: Forecast[];
  setWeatherNow: any;
  lat?: Number | null;
  lon?: Number | null;
  setLon: any;
  setLat: any;
};

type Props = {
  children?: React.ReactNode;
};

export const WeatherContext = createContext<ForecastContextType | null>(null);

export const WeatherContextProvider = ({ children }: Props) => {
  const [weatherNow, setWeatherNow] = useState([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  // const [forecast, setForecast] = useState([]);

  const { cities } = useLocationContext();
  const apiKey = import.meta.env.VITE_API_KEY;

  const {
    loading,
    error,
    // @ts-ignore
    data: { latitude, longitude },
  } = useGeolocation();

  const fetchWeatherData = async () => {
    try {
      let apiUrl;
      // @ts-ignore
      if (cities.lat && cities.lon) {
        // Use cities.lat and cities.lon if available
        // @ts-ignore
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cities.lat}&lon=${cities.lon}&appid=${apiKey}&units=metric`;
      } else if (latitude && longitude) {
        // Use latitude and longitude if cities.lat and cities.lon are not available
        // @ts-ignore
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        setLat(latitude);
        setLon(longitude);
      } else {
        console.error("No location data available");
        return;
      }

      const response = await fetch(apiUrl);
      const parsedResponse = await response.json();
      setWeatherNow(parsedResponse);
      console.log(parsedResponse);
      console.log(useGeolocation);
      // console.log(weatherNow);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // @ts-ignore
  }, [cities.lat, cities.lon, latitude, longitude]);

  return (
    <WeatherContext.Provider
      value={{ weatherNow, setWeatherNow, lat, setLat, lon, setLon }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (context === null) {
    throw new Error(
      "useWeatherContext must be used within the useWeatherContextProvider"
    );
  }
  return context;
};
