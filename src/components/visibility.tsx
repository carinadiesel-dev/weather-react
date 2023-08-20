import { useWeatherContext } from "@/context/WeatherContext";



export const Visibility = () => {
    const {weatherNow} = useWeatherContext();
    const visibility = weatherNow.visibility / 1000
    return (
        <div className="grid place-items-center bg-mediumBlue">
            <h3 className="pt-5 pb-2 text-xl">Visibility</h3>

            <div className="flex items-center justify-center gap-4 py-3">
                <span className="font-bold text-8xl">{visibility ? visibility : "--"}</span>
                {/* Visibility unit */}
                <span className="text-2xl font-medium">km</span>
            </div>
        </div>
    )
}