// TODO
// Wind degree / Direction

import { useEffect } from "react";
import { Icons } from "./icons";
import { useWeatherContext } from "@/context/WeatherContext";

function degToCompass(num: number) {
  let val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

export const Wind = () => {
  const { weatherNow } = useWeatherContext();
  const wind = weatherNow.wind;
  // const { speed, deg, gust } = wind;
  // let degrees = wind.deg;
  // let direction;
  // if (wind.deg) {
  //   direction = degToCompass(degrees);
  // }
  return (
    <div className="grid place-items-center bg-mediumBlue">
      <h3 className="py-5 text-xl">Wind Status</h3>
      <div className="flex items-center py-3">
        {/* Wind Speed */}
        <span className="font-bold text-8xl">{wind ? wind.speed : "--"}</span>
        {/* Wind Unit */}
        <span className="text-2xl font-medium">meter/s</span>
      </div>

      <div className="flex items-center gap-2 py-3">
        {/* Wind Direction */}
        {/* <div>
          {/* Wind Icon
          <Icons.direction />
        </div> */}
        {/* Wind direction abbreviation */}
        <span className="text-xl">
          {/* {direction !== undefined ? direction : "--"} */}
        </span>
      </div>
    </div>
  );
};
