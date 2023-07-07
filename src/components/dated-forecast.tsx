'use client'

import { Button } from "./ui/button"
import { Icons } from "./icons"
import useWindowSize from "../hooks/useWindowSize";
import example from "../assets/example.png"


export function DatedForecast() {
    const {width,height} = useWindowSize();
    const searchBtnSize = width >= 1024 ? `lg` : `xl`; 
    const iconSize = width >= 1024 ? 24 : 48
    return(
        <div className="">

        <div className="grid px-5 py-5 place-items-center lg:px-1 bg-mediumBlue">
            {/* Tomorrow or date */}
           <h3 className="text-2xl font-bold">Tomorrow</h3> 
           <img src={example} />
           <div className="flex gap-4 text-2xl font-medium lg:gap-2">
            {/* Minimum temperature */}
            <span>10 &#176;C</span>
            {/* Maximum temperature */}
            <span className="text-muted-foreground">10 &#176;C</span>
           </div>

           </div>
        </div>
        
    )
}