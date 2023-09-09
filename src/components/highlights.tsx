import { AirPressure } from "./airPressure";
import { Humidity } from "./humidity";
import { Visibility } from "./visibility";
import { Wind } from "./wind";

export const Highlights = () => {
  return (
    <div className="grid justify-stretch">
      <h2 className="py-5 text-3xl font-medium text-center lg:text-5xl lg:pb-28 lg:pt-0">
        Today's Highlights
      </h2>
      <div className="grid grid-rows-2 gap-8 xl:gap-10 lg:grid-cols-2">
        <Wind />
        <Humidity />
        <Visibility />
        <AirPressure />
      </div>
    </div>
  );
};
