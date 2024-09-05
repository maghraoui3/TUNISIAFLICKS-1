"use client"
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function MainPage() {
  return (
    <div className='w-full'>
      <Carousel>
        <CarouselContent className=''>
          <CarouselItem className="md:basis-1/2 bg-slate-600 h-[300px] rounded-2xl lg:basis-full">
            <div>Hello world</div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>


    </div>
  )
}
