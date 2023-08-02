import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandDialog,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

// type OptionsList = {
//   cityName: string
//   countryCode: string
// }

// const Options : FunctionComponent<OptionsList> = ({
//   cityName,
//   countryCode
// }) => {
//   return (
//     <div>
//             <Tabs defaultValue="account" className="w-[400px]">
//               <TabsList>
//                 <TabsTrigger value="account">Account</TabsTrigger>
//                 <TabsTrigger value="password">Password</TabsTrigger>
//               </TabsList>
//               <TabsContent value="account">
//                 Make changes to your account here.
//               </TabsContent>
//             </Tabs>
//           </div>
//   )
// }

type SearchProps = {};

const apiKey = import.meta.env.VITE_API_KEY;

export function Search() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [options, setOptions] = useState();

  const [query, setquery] = useState('')
     const handleChange = (e) => {
       setquery(e.target.value)
     }

    //  useEffect(() => {
    //   const down = (e: KeyboardEvent) => {
    //     if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
    //       e.preventDefault()
    //       setOpen((open) => !open)
    //     }
    //   }
    //   document.addEventListener("keydown", down)
    //   return () => document.removeEventListener("keydown", down)
    // }, [])

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

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
    fetchWeatherData();
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
      );
      
      setOptions(response.data);
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
            Type in the name of your city and click on the "Search City" button,then select the correct option.
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
{options && <div className="flex flex-col gap-4">
            {options.map((el) => {
              return <Button size={"lg"} variant={"outline"} onClick={()=> setCities(el)}>
                {el.name}, {el.country}
              </Button>
            })}
          </div>}
          
      </DialogContent>
    </Dialog>
  );
}
