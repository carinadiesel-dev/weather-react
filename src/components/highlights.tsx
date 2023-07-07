import { AirPressure } from "./airPressure"
import { Humidity } from "./humidity"
import { Visibility } from "./visibility"
import { Wind } from "./wind"

export const Highlights = () => {
  return (
    <div className="">
      <h2 className="py-5 text-3xl font-medium lg:pb-8">Today's Highlights</h2>
      <div className="grid gap-4 xl:gap-10 lg:grid-cols-2 grid-rows-[30% 30% 15% 15%] xl:grid-rows-[60% 40%]">
        <Wind />
        <Humidity />
        <Visibility />
        <AirPressure />
      </div>
    </div>
  )
}
