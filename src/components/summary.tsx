'use client'

import { Button } from "./ui/button"
import { Icons } from "./icons"
import useWindowSize from "../hooks/useWindowSize";
import example from '../assets/example.png'
import clouds from '../assets/Cloud-background.png'
import { useState } from "react";
import { Search } from "./search";
import { useLocationContext } from "../context/LocationContext";
import { useWeatherContext } from "@/context/WeatherContext";

type SummaryProps = {
    temperature: number,
    condition: string,
    date: string,
    location: string
}



export function Summary() {
    const {width,height} = useWindowSize();
    const searchBtnSize = width >= 1024 ? `lg` : `xl`; 
    const iconSize = width >= 1024 ? 24 : 48;

    const [isShown, setIsShown] = useState(false);
    const {cities} = useLocationContext();
    
    const {weatherNow} = useWeatherContext();
    
  const handleClick = () => {
    // toggle visibility
    setIsShown(current => !current);
  };
  
    return(
        
        <div className="relative overflow-hidden lg:h-screen bg-mediumBlue">
            {/* <div>{weatherNow.visibility}</div> */}
            <div className="flex flex-col">
                <div className="flex justify-between px-5 py-5">
                    <Search />
                    <div className="flex items-center justify-center p-2 rounded-full bg-secondary">
                        <button><Icons.detectLocation /></button>
                    
                    </div>
                    
                </div>

                <div className="flex flex-col items-center w-screen pt-10 overflow-hidden lg:w-full">

                    {/* Weather Icon */}
                    <div className="relative pt-16">
                        <div className="absolute w-[300%] overflow-hidden -left-52 -top-6 opacity-20">
                            <img src={clouds} />
                        </div>
                        
                        <img src={example}/>
                    </div>
                    {/* Temperature in Celcius and Farenheit */}
                    <div className="flex items-center py-7 xl:pt-28">
                    <span className="text-9xl">5</span>
                    <span className="text-5xl text-muted-foreground">&#176;C</span>
                    </div>

                    {/* Weather Condition */}
                    <span className="py-5 text-5xl xl:py-10 text-muted-foreground">Shower</span>
                </div>

                <div className="flex justify-center gap-4 py-5 text-xl xl:pt-12">
                    <span className="text-muted-foreground">Today</span>
                    <span className="text-muted-foreground">&#x2022;</span>
                    {/* Date */}
                    <span className="text-muted-foreground">Date</span>
                </div>

                <div className="flex justify-center gap-2 py-5 pb-16 text-lg">
                    <Icons.mapPin stroke="#a09fb1" strokeWidth={1}/>
                    {/* Location */}
                    <span className="text-muted-foreground">{cities && `${cities.name}, ${cities.country}`}</span>
                </div>
            </div>
            
        </div>
        
    )
}
