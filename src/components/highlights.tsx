import { AirPressure } from "./airPressure";
import { Humidity } from "./humidity";
import { Visibility } from "./visibility";
import { Wind } from "./wind";

export const Highlights = () => {
  return (
    <div className="grid my-10 justify-stretch">
      <h2 className="py-16 text-[3rem] lg:text-5xl font-medium text-center lg:py-5 lg:pb-28 lg:pt-0">
        Today's Highlights
      </h2>
      <div className="grid grid-rows-2 gap-16 pb-5 lg:gap-10 lg:grid-cols-2">
        <Wind />
        <Humidity />
        <Visibility />
        <AirPressure />
      </div>
    </div>
  );
};
