import { useWeatherContext } from "@/context/WeatherContext";

export const AirPressure = () => {
  const { weatherNow } = useWeatherContext();
  const main = weatherNow.main;
  return (
    <div className="grid bg-mediumBlue place-items-center">
      <h3 className="text-xl">Air Pressure</h3>
      <div className="flex items-center justify-center gap-4">
        <span className="font-bold text-8xl">
          {main ? main.pressure : "--"}
        </span>
        <span className="text-2xl font-medium">hPa</span>
      </div>
    </div>
  );
};
