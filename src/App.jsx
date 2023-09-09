import { TableDemo } from "./components/ExampleSimpleTable";
import TaskPage from "./components/ExampleTable";
import { Separator } from "./components/ui/separator";

// import { siteConfig } from "@/config/site"
import { buttonVariants } from "./components/ui/button";
import { Summary } from "./components/summary";

import { DatedForecast } from "./components/dated-forecast";
import { Highlights } from "./components/highlights";
import { Input } from "./components/ui/input";
import { Icons } from "./components/icons";

import { Search } from "./components/search";
import { Button } from "./components/ui/button";
import example from "./assets/example.png";
import clouds from "./assets/Cloud-background.png";
import { useLocationContext } from "./context/LocationContext";
import { useState } from "react";
import { useEffect } from "react";
import { useWeatherContext } from "./context/WeatherContext";
import { WeatherContextProvider } from "./context/WeatherContext.tsx";

function App() {
  return (
    <section className="flex flex-col lg:flex-row font-raleway">
      <WeatherContextProvider>
        <div
          className={` flex flex-col h-screen gap-8 lg:space-around bg-inherit w-full lg:w-1/4 `}
        >
          <Summary />
        </div>

        <div className="flex flex-col items-center justify-center lg:w-4/5">
          {/* <div className="flex flex-col w-3/4 gap-8 lg:gap-2 xl:gap lg:justify-between xl:flex-row">
        <DatedForecast />
        <DatedForecast />
        <DatedForecast />
        <DatedForecast />
        <DatedForecast />
      </div> */}

          <div className="w-3/4">
            <Highlights />
          </div>
        </div>
      </WeatherContextProvider>
    </section>
  );
}

export default App;
