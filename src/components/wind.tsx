// TODO
// Wind degree / Direction

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
  let degrees = wind.deg;
  let direction = degToCompass(degrees);

  return (
    <div className="grid place-items-center bg-mediumBlue">
      <h3 className="py-5 text-xl">Wind Status</h3>
      <div></div>
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
        <span className="text-xl">{direction}</span>
      </div>
    </div>
  );
};

// Wind degree math
// // Insert the amount of degrees here
// degrees = 10;

// // Define array of directions
// directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];

// // Split into the 8 directions
// degrees = degrees * 8 / 360;

// // round to nearest integer.
// degrees = Math.round(degrees, 0);

// // Ensure it's within 0-7
// degrees = (degrees + 8) % 8

// console.log(directions[degrees])
