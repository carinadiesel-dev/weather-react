import { TableDemo } from "./components/ExampleSimpleTable";
import TaskPage from "./components/ExampleTable";
import { Separator } from "./components/ui/separator";


// import { siteConfig } from "@/config/site"
import { buttonVariants } from "./components/ui/button"
import { Summary } from "./components/summary"

import { DatedForecast } from "./components/dated-forecast"
import { Highlights } from "./components/highlights"
import { Input } from "./components/ui/input"
import { Icons } from "./components/icons"

import { Search } from "./components/search"
import { Button } from "./components/ui/button"
import example from "./assets/example.png"
import clouds from "./assets/Cloud-background.png"
import { useLocationContext } from "./context/LocationContext";
import { useWeatherContext } from "./context/WeatherContext";
import { useState } from "react";


function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const {cities} = useLocationContext();
  const lat = cities.lat;
  const lon = cities.lon;

  const [weatherNow,setWeatherNow] = useState([]);
  
  const fetchWeatherNowData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={${apiKey}}`
      );
      
      // setWeatherNow(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className="flex flex-col lg:flex-row font-raleway">
      <div>{cities.name}</div>
      <div className={` flex flex-col h-screen gap-8 lg:space-around bg-inherit w-full lg:w-1/4 `}>
        <Summary />
        </div>
      

  <div className="flex flex-col items-center justify-around lg:w-4/5">
      <div className="flex flex-col w-3/4 gap-8 lg:gap-2 xl:gap lg:justify-between xl:flex-row">
        <DatedForecast />
        <DatedForecast />
        <DatedForecast />
        <DatedForecast />
        <DatedForecast />
      </div>

      <div className="w-3/4">
        <Highlights />
      </div>
    </div>   
    </section>
  );
}

export default App;
