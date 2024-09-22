"use client"
import React, { useState, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from 'next/link';
import Genres from '@/components/Genres';
import MoviePosterCard, { SkeletonLoader as PosterSkeletonLoader } from '@/components/MoviePosterCard'
import MovieBackdropCard, { SkeletonLoader as BackdropSkeletonLoader } from '@/components/MovieBackdropCard';


export default function MainPage() {

  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoader(false);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className='w-full'>

      <Genres />

      <br />

      <div className='sm:ml-10'>
        <div className='flex justify-between w-full sm:w-[90%] lg:w-[96%] xl:w-[97%]'>
          <p className='text-2xl sm:text-3xl font-semibold mb-3' >Trending Movies</p>
          <Link href={'/'} className='text-gray-400 hover:text-white'>
            <p className='text-sm font-light inline-block mb-3 mr-2' >See More </p>
            <FaLongArrowAltRight className='inline-block' />
          </Link>
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className='w-full sm:w-[90%] lg:w-[96%] xl:w-[97%]'>
          <CarouselContent>
            {loader
              ? Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="transition-transform ease-in-out duration-400 select-none basis-[300px]
               sm:basis-[400px] my-4 lg:basis-[500px] hover:scale-110 hover:border-2 border-black hover:z-10 pl-0 ml-4 shadow-black shadow-2xl">
                  <BackdropSkeletonLoader />
                </CarouselItem>
              ))
              : data && data.results.map((movie) => {
                return (
                  <CarouselItem key={movie.id} className="transition-transform ease-in-out duration-400 select-none basis-[300px]
               sm:basis-[400px] my-4 lg:basis-[500px] hover:scale-110 hover:border-2 border-black hover:z-10 pl-0 ml-4 shadow-black shadow-2xl">
                    <MovieBackdropCard key={movie.id} backdropImg={movie.backdrop_path} voteAverage={movie.vote_average} title={movie.title} releaseDate={movie.release_date} adult={movie.adult} />
                  </CarouselItem>
                )
              })}
          </CarouselContent>
          <div className='hidden sm:block'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <br />

      <div className='sm:ml-10 mt-1'>
        <div className='flex justify-between w-full sm:w-[90%] lg:w-[96%] xl:w-[97%]'>
          <p className='text-2xl sm:text-3xl font-semibold mb-3'>Popular Movies</p>
          <Link href={'/'} className='text-gray-400 hover:text-white'>
            <p className='text-sm font-light inline-block mb-3 mr-2' >See More </p>
            <FaLongArrowAltRight className='inline-block' />
          </Link>
        </div>
        <Carousel className='w-full sm:w-[90%] lg:w-[96%] xl:w-[97%]'>
          <CarouselContent>
            {loader
              ? Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="transition-transform ease-in-out duration-400 select-none basis-[145px]
                md:basis-[167px] my-4 p-0 ml-4 hover:scale-110 hover:z-10">
                  <PosterSkeletonLoader />
                </CarouselItem>
              ))
              :
            data && data.results.map((movie) => {
              return (
                <CarouselItem key={movie.id} className="transition-transform ease-in-out duration-400 select-none basis-[145px]
                 md:basis-[167px] my-4 p-0 ml-4 hover:scale-110 hover:z-10">
                  <MoviePosterCard key={movie.id} posterImg={movie.poster_path} voteAverage={movie.vote_average} title={movie.title} releaseDate={movie.release_date} adult={movie.adult} />
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <div className='hidden sm:block'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

    </div>
  )
}
