'use client'

import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { FaLongArrowAltRight } from "react-icons/fa"
import Link from 'next/link'
import Genres from '@/components/Genres'
import MoviePosterCard from '@/components/MoviePosterCard'
import MovieBackdropCard from '@/components/MovieBackdropCard'
import { Movie } from './movieTypes'

export default function MoviesClient() {

  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1');
      const movies = await data.json()
      setMovies(movies);
      setLoader(false);
      console.log("slm", movies.results);
    };
    fetchData();
  }, []);


  return (
    loader ? <p>loading..</p> :
    <div className='w-full'>
      <Genres />
      <br />
      <TrendingSlider sliderTitle="Trending Movies" movies={movies} />
      <br />
      <Slider sliderTitle="Popular Movies" movies={movies} />
      <br />
      <Slider sliderTitle="Top Rated Movies" movies={movies} />
      <br />
      <Slider sliderTitle="Now Playing Movies" movies={movies} />
      <br />
      <Slider sliderTitle="Upcoming Movies" movies={movies} />
    </div>
  )
}

interface SliderProps {
  sliderTitle: string;
  movies?: { results: Movie[] };
}

const TrendingSlider: React.FC<SliderProps> = ({sliderTitle, movies}) => {
  if (!movies?.results) return null
  return (
    <div className='sm:ml-10'>
      <div className='flex justify-between w-full sm:w-[90%] lg:w-[96%] xl:w-[97%]'>
        <p className='text-2xl sm:text-3xl font-semibold mb-3'>{sliderTitle}</p>
        <Link href={'/'} className='text-gray-400 hover:text-white'>
          <p className='text-sm font-light inline-block mb-3 mr-2'>See More </p>
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
          {movies?.results.map((movie) => (
            <CarouselItem key={movie.id} className="transition-transform ease-in-out duration-400 select-none basis-[300px] sm:basis-[400px] my-4 lg:basis-[500px] hover:scale-110 hover:border-2 border-black hover:z-10 pl-0 ml-4 shadow-black shadow-2xl">
              <MovieBackdropCard backdropImg={movie.backdrop_path} voteAverage={movie.vote_average} title={movie.title} releaseDate={movie.release_date} adult={movie.adult} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='hidden sm:block'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}

const Slider: React.FC<SliderProps> = ({sliderTitle, movies}) => {
  if (!movies?.results) return null
  return (
    <div className='sm:ml-10 mt-1'>
      <div className='flex justify-between w-full sm:w-[90%] lg:w-[96%] xl:w-[97%]'>
        <p className='text-2xl sm:text-3xl font-semibold mb-3'>{sliderTitle}</p>
        <Link href={'/'} className='text-gray-400 hover:text-white'>
          <p className='text-sm font-light inline-block mb-3 mr-2'>See More </p>
          <FaLongArrowAltRight className='inline-block' />
        </Link>
      </div>
      <Carousel className='w-full sm:w-[90%] lg:w-[96%] xl:w-[97%]'>
        <CarouselContent>
          {movies?.results.map((movie) => (
            <CarouselItem key={movie.id} className="transition-transform ease-in-out duration-400 select-none basis-[145px] md:basis-[167px] my-4 p-0 ml-4 hover:scale-110 hover:z-10">
              <MoviePosterCard posterImg={movie.poster_path} voteAverage={movie.vote_average} title={movie.title} releaseDate={movie.release_date} adult={movie.adult} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='hidden sm:block'>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}