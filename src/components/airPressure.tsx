import { useWeatherContext } from "@/context/WeatherContext";

export const AirPressure = () => {
  const { weatherNow } = useWeatherContext();
  const main = weatherNow.main;
  return (
    <div className="grid py-5 bg-mediumBlue place-items-center">
      <h3 className="text-xl">Air Pressure</h3>
      <div className="flex items-center justify-center gap-4 py-5">
        <span className="font-bold text-8xl">
          {main ? main.pressure : "--"}
        </span>
        <span className="text-2xl font-medium">hPa</span>
      </div>
    </div>
  );
};
