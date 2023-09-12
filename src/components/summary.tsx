import { Button } from "./ui/button";
import { Icons } from "./icons";
import useWindowSize from "../hooks/useWindowSize";
import example from "../assets/example.png";
import clouds from "../assets/Cloud-background.png";
import { useEffect, useState } from "react";
import { Search } from "./search";
import { useLocationContext } from "../context/LocationContext";
import { useWeatherContext } from "@/context/WeatherContext";

type SummaryProps = {
  temperature: number;
  condition: string;
  date: string;
  location: string;
};

// const [cityNameData, setCityNameData] = useState([]);

// const apiKey = import.meta.env.VITE_API_KEY;

// const fetchLocationCity = async (lat, lon) => {
//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&${lon}&appid=${apiKey}`
//     );
//     const parsedResponse = await response.json();
//     setCityNameData(parsedResponse);
//     console.log(parsedResponse);
//   } catch (error) {
//     console.error("Error fetching city data: ", error);
//   }
// };

// useEffect(() => {
//   fetchLocationCity(lat, lon);
// }, [lat, lon]);

export function Summary() {
  const { width, height } = useWindowSize();
  const searchBtnSize = width >= 1024 ? `lg` : `xl`;
  const iconSize = width >= 1024 ? 24 : 48;

  const [isShown, setIsShown] = useState(false);
  const { cities } = useLocationContext();
  const coords = cities.coords;

  const { weatherNow } = useWeatherContext();
  const main = weatherNow.main;
  const weatherConditions = weatherNow.weather;
  const weatherIcon = weatherConditions ? weatherConditions[0].icon : "";
  const weatherIconSource = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  let current = new Date();
  let month = current.toLocaleString("default", { month: "long" });
  let date = `${current.getDate()} ${month}`;

  const handleClick = () => {
    // toggle visibility
    setIsShown((current) => !current);
  };

  return (
    <div className="relative overflow-hidden lg:h-full bg-mediumBlue">
      <div className="grid">
        <div className="flex flex-col items-center w-screen pt-20 overflow-hidden lg:w-full">
          {/* Weather Icon */}
          <div className="relative py-20">
            <div className="absolute overflow-hidden w-[35rem] -left-64 -top-10 opacity-20">
              <img src={clouds} />
            </div>

            <img src={weatherIcon !== undefined ? weatherIconSource : ""} />
          </div>
          {/* Temperature in Celcius*/}
          <div className="flex items-center py-7 xl:pt-28 xl:pb-10">
            <span className="text-9xl">
              {main ? Math.round(main.temp) : "--"}
            </span>
            <span className="text-5xl text-muted-foreground">&#176;C</span>
          </div>

          {/* Weather Condition */}
          <span className="py-2 text-5xl text-muted-foreground">
            {weatherConditions ? weatherConditions[0].main : "--"}
          </span>
        </div>

        <div className="flex justify-center gap-4 py-5 text-xl xl:pt-12">
          <span className="text-muted-foreground">Today</span>
          <span className="text-muted-foreground">&#x2022;</span>
          {/* Date */}
          <span className="text-muted-foreground">{date}</span>
        </div>

        <div className="flex justify-center gap-2 py-5 pb-16 text-lg">
          <Icons.mapPin stroke="#a09fb1" strokeWidth={1} />
          {/* Location */}
          <span className="text-muted-foreground">
            {/* {cities && `${cities.name}, ${cities.country}`} */}
          </span>
        </div>
        <div className="flex w-full px-5 pt-5">
          <Search />
        </div>
      </div>
    </div>
  );
}
