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

export function Summary() {
  const { width, height } = useWindowSize();
  const searchBtnSize = width >= 1024 ? `lg` : `xl`;
  const iconSize = width >= 1024 ? 24 : 48;

  const [isShown, setIsShown] = useState(false);
  const { cities } = useLocationContext();

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

  const [cityNameData, setCityNameData] = useState([]);
  const coords = weatherNow.coord;
  const lat = coords?.lat;
  const lon = coords?.lon;

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchLocationCity = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`
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
  }, [lat, lon]);

  console.log(lat, lon);
  console.log(cityNameData);
  return (
    <div className="relative h-full overflow-hidden bg-mediumBlue">
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
          <div className="flex items-center pt-16 pb-10 py-7 lg:pt-16 2xl:pt-24">
            <span className="text-9xl">
              {main ? Math.round(main.temp) : "--"}
            </span>
            <span className="text-5xl text-muted-foreground">&#176;C</span>
          </div>

          {/* Weather Condition */}
          <span className="py-5 text-5xl text-muted-foreground">
            {weatherConditions ? weatherConditions[0].main : "--"}
          </span>
        </div>

        <div className="flex justify-center gap-4 py-5 text-xl xl:pt-12">
          <span className="text-muted-foreground">Today</span>
          <span className="text-muted-foreground">&#x2022;</span>
          {/* Date */}
          <span className="text-muted-foreground">{date}</span>
        </div>

        <div className="flex justify-center gap-2 py-5 pb-16 text-lg lg:pb-16">
          <Icons.mapPin stroke="#a09fb1" strokeWidth={1} />
          {/* Location */}
          <span className="text-muted-foreground">
            {/* {cities && `${cities.name}, ${cities.country}`} */}
            {cityNameData &&
              `${cityNameData[0]?.name} , ${cityNameData[0]?.country}`}
          </span>
        </div>
        <div className="flex w-full px-5 pt-5 -translate-y-10 lg:-translate-y-14 2xl:-translate-y-10">
          <Search />
        </div>
      </div>
    </div>
  );
}
