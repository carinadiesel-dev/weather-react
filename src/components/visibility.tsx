import { useWeatherContext } from "@/context/WeatherContext";

export const Visibility = () => {
  const { weatherNow } = useWeatherContext();
  const visibility = weatherNow.visibility / 1000;
  return (
    <div className="grid place-items-center bg-mediumBlue">
      <h3 className="pt-5 text-xl">Visibility</h3>

      <div className="flex items-center justify-center gap-4 py-5">
        <span className="font-bold text-8xl">
          {visibility ? visibility : "--"}
        </span>
        {/* Visibility unit */}
        <span className="text-2xl font-medium">km</span>
      </div>
    </div>
  );
};
