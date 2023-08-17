import { Progress } from "./ui/progress"
import { useWeatherContext } from "@/context/WeatherContext";

export const Humidity = () => {
  const {weatherNow} = useWeatherContext();
  const main = weatherNow.main;
  const percentage = (main ? main.humidity : 0)


  return (
    <div className=" bg-mediumBlue">
        <div className="grid place-items-center">
      <h3 className="py-5 text-xl">Humidity</h3>

    {/* Humidity in % */}
      <div className="flex items-center py-3">
        <span className="font-bold text-8xl">{main ? main.humidity : "--"}</span>
        <span className="text-2xl font-medium">%</span>
      </div>
      </div>
    {/* Progress Bar */}
      <div className="py-3 mx-10">
        <Progress value={percentage} />
      </div>
    </div>
  )
}
