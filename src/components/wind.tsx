// TODO
// Wind degree / Direction

import { Icons } from "./icons"
import { useWeatherContext } from "@/context/WeatherContext";

export const Wind = () => {
  const {weatherNow} = useWeatherContext();
  const wind = weatherNow.wind;
  // const { speed, deg, gust } = wind;

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
        <div>
          {/* Wind Icon */}
          <Icons.direction />
        </div>
        {/* Wind direction abbreviation */}
        <span className="text-xl">NE</span>
      </div>
    </div>
  )
}
