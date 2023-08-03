import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";

// import { useLocation } from './hooks/useLocation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

import { useLocationContext } from "@/context/LocationContext";

type SearchProps = {};

const apiKey = import.meta.env.VITE_API_KEY;

export function Search() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [options, setOptions] = useState();

  const [query, setquery] = useState('')
     const handleChange = (e) => {
       setquery(e.target.value)
     }

  const [cityName, setCityName] = useState("");

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const {cities,setCities} = useLocationContext();

  const handleSubmit = (event) => {
    // console.log("handleSubmit ran");
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log(cityName);

    setCityName(cityName);
    fetchCityData();
  };

  const [data, setData] = useState();

  // const fetchCityData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
  //     );
      
  //     setOptions(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

    const fetchCityData = async () => {
      const response =
        await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
        )

      // set state when the data received

      // if (!response.ok){
      //       alert("This wasn't ok")
      //     }
        
      const parsedResponse = await response.json();
      setOptions(parsedResponse);
      console.log(parsedResponse);
      
    };

    const closeSearchWindow = () => {
      setOpen(false);
    }

 


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Search</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl">Search for my City</DialogTitle>
          <DialogDescription className="text-lg">
            Type in the name of your city and click on the "Search City" button,then select the correct option.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="relative flex gap-4">
              <div className="absolute left-3 top-2">
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
              <div>
            <Button type="submit">Search</Button>
          </div>
            </div>
            
          </div>
           
          
        </form>
{options && <div className="flex flex-col gap-4">
            {options.map((el) => {
              return <Button size={"lg"} variant={"outline"} onClick={()=> {setCities(el);
              setOpen(false)}}>
                {el.name}, {el.country}
              </Button>
            })}
          </div>}
          
      </DialogContent>
    </Dialog>
  );
}
