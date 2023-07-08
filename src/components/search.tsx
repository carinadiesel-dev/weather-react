import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// import { useLocation } from './hooks/useLocation'

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

// type OptionsList = {
//   cityName: string
//   countryCode: string
// }

// const Options : FunctionComponent<OptionsList> = ({
//   cityName,
//   countryCode
// }) => {
//   const viewOptions
// }

type SearchProps = {};

const apiKey = import.meta.env.VITE_API_KEY;

export function Search() {
  const apiKey = import.meta.env.VITE_API_KEY;
  
  const [options, setOptions] = useState()
  
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [cityName, setCityName] = useState("");

  const handleSubmit = (event) => {
    // console.log("handleSubmit ran");
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log(cityName);

    setCityName(cityName);
    fetchWeatherData()
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Search</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search for my City</DialogTitle>
          <DialogDescription>
            Type in the name of your city and click on the "Search City" button.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="relative grid items-center grid-cols-4 gap-4">
              <div className="absolute left-3">
                <Icons.search stroke="#a09fb1" />
              </div>
              <Input
                id="cityName"
                name="cityName"
                type="text"
                placeholder="ex. London"
                onChange={(event) => setCityName(event.target.value)}
                value={cityName}
                className="col-span-3"
              />
            </div>
          </div>
          <div>
            <Button type="submit">Search</Button>
          </div>
        </form>
        
        
      </DialogContent>
    </Dialog>
  );
}
