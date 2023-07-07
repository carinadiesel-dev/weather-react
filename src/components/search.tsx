'use client'

import { useState } from 'react'


import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

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

    const formSchema = z.object({
      city: z.string().min(2, {
        message: "City Name must at least be two letters",
      }),
    })    

type SearchProps = {

} 

export function Search() {
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            Search</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search for my City</DialogTitle>
            <DialogDescription>
              Type in your location and click on the "Search City" button
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative grid items-center grid-cols-4 gap-4">
                <div className="absolute left-3">
                <Icons.search stroke="#a09fb1"/>
                </div>
              <Input id="name" value="London" placeholder="Search location..." className="col-span-3" />
            </div>
          </div> 
          <DialogFooter>
            <Button type="submit">Search City</Button>
          </DialogFooter>
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