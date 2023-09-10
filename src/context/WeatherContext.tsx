import React, { createContext, useContext, useState, useEffect } from "react";
import { LocationContext, useLocationContext } from "./LocationContext";
import useGeolocation from "../hooks/useGeoLocation";

export const WeatherContext = createContext({
  cities: [],
});

export const WeatherContextProvider = ({ children }) => {
  const [weatherNow, setWeatherNow] = useState([]);

  // const [forecast, setForecast] = useState([]);

  const { cities } = useLocationContext();
  const apiKey = import.meta.env.VITE_API_KEY;

  const {
    loading,
    error,
    data: { latitude, longitude },
  } = useGeolocation();

  // if (cities === undefined) {
  //   const fetchLocationWeatherData = () => {
  //
  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setWeatherNow(data);
  //         console.log(latitude);
  //       });
  //   };
  //   useEffect(() => {
  //     fetchLocationWeatherData();
  //   }, []);
  // } else {
  //   const fetchWeatherData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${cities.lat}&lon=${cities.lon}&appid=${apiKey}&units=metric`
  //       );
  //       const parsedResponse = await response.json();
  //       setWeatherNow(parsedResponse);
  //       console.log(parsedResponse);
  //       console.log(latitude);
  //       // console.log(weatherNow);
  //     } catch (error) {
  //       console.error("Error fetching weather data:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchWeatherData();
  //   }, [cities.lat, cities.lon]);
  // }

  const fetchWeatherData = async () => {
    try {
      let apiUrl;

      if (cities.lat && cities.lon) {
        // Use cities.lat and cities.lon if available
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cities.lat}&lon=${cities.lon}&appid=${apiKey}&units=metric`;
      } else if (latitude && longitude) {
        // Use latitude and longitude if cities.lat and cities.lon are not available
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
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
  }, [cities.lat, cities.lon, latitude, longitude]);

  return (
    <WeatherContext.Provider value={{ weatherNow, setWeatherNow }}>
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
