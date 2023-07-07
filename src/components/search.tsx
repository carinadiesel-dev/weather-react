
import { useEffect, useState } from "react"
import axios from "axios";
import {useRef} from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// import { useLocation } from './hooks/useLocation'

import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { Icons } from "@/components/icons"
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from "./ui/dialog";  

type SearchProps = {

} 

const apiKey = import.meta.env.VITE_API_KEY

export function Search() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [cityName, setCityName] = useState('');

  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log(cityName);

    setCityName(cityName);
  };
  
  useEffect(() => {
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`).then((data) => {
      console.log(data);
      setCityName(data?.data);
    });
  }, []);

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            Search</Button>
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
                <Icons.search stroke="#a09fb1"/>
                </div>
              <Input id="cityName" name="cityName" type="text" placeholder="ex. London" onChange={event => setCityName(event.target.value)} value={cityName}
             className="col-span-3" />
            </div>
          </div> 
          <div>
          <Button type="submit">Search</Button>
        </div>
        </form>
        </DialogContent>
      </Dialog>
    )
    }

{/* React form hook instead of input and button

// 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your City</FormLabel>
              <FormControl>
                <Input placeholder="ex. London" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your city
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form> */}