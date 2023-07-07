import { Progress } from "./ui/progress"

export const Humidity = () => {
  return (
    <div className=" bg-mediumBlue">
        <div className="grid place-items-center">
      <h3 className="py-5 text-xl">Humidity</h3>

    {/* Humidity in % */}
      <div className="flex items-center py-3">
        <span className="font-bold text-8xl">84</span>
        <span className="text-2xl font-medium">%</span>
      </div>
      </div>
    {/* Progress Bar */}
      <div className="py-3 mx-10">
        <Progress value={84} />
      </div>
    </div>
  )
}
