"use client"
import React, { useState, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from 'next/link';
import Genres from '@/components/Genres';
import MoviePosterCard, { SkeletonLoader as PosterSkeletonLoader } from '@/components/MoviePosterCard'
import MovieBackdropCard, { SkeletonLoader as BackdropSkeletonLoader } from '@/components/MovieBackdropCard';
import { fetchMovies } from './actions';


export default function Movies() {

  interface MoviesState {
    TrendingMovies?: { results: any[] };
    populatMovies?: { results: any[] };
    topRatedMovies?: { results: any[] };
    nowPlayingMovies?: { results: any[] };
    upcomingMovies?: { results: any[] };
  }

  const [movies, setMovies] = useState<MoviesState>({})
  const [loader, setLoader] = useState(true);
  console.log("API KEY:", process.env.NEXT_PUBLIC_TMDB_API_KEY);
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { TrendingMovies, populatMovies, topRatedMovies, nowPlayingMovies, upcomingMovies } = await fetchMovies()
        setMovies({ TrendingMovies, populatMovies, topRatedMovies, nowPlayingMovies, upcomingMovies })
        console.log(TrendingMovies);
      } catch (err) {
        setError('Failed to fetch data')
      } finally {
        setLoader(false)
      }
    }

    loadData()
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <div className='w-full'>

      <Genres />

      <br />

      <TrendingSlider sliderTitle={"Trending Movies"} movies={movies.TrendingMovies} loader={loader} />

      <br />

      <Slider sliderTitle={"Poular Movies"} movies={movies.populatMovies} loader={loader} />

      <br />

      <Slider sliderTitle={"Poular Movies"} movies={movies.topRatedMovies} loader={loader} />

      <br />

      <Slider sliderTitle={"Poular Movies"} movies={movies.nowPlayingMovies} loader={loader} />

      <br />

      <Slider sliderTitle={"Poular Movies"} movies={movies.upcomingMovies} loader={loader} />
    </div>
  )
}

const TrendingSlider = ({sliderTitle, movies, loader}) => {
  return (
    <div className='sm:ml-10'>
      <div className='flex justify-between w-full sm:w-[90%] lg:w-[96%] xl:w-[97%]'>
        <p className='text-2xl sm:text-3xl font-semibold mb-3' >{sliderTitle}</p>
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
            : movies && movies.results.map((movie) => {
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
  )
}

const Slider = ({sliderTitle, movies, loader}) => {
  return (
    <div className='sm:ml-10 mt-1'>
      <div className='flex justify-between w-full sm:w-[90%] lg:w-[96%] xl:w-[97%]'>
        <p className='text-2xl sm:text-3xl font-semibold mb-3'>{sliderTitle}</p>
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
          movies && movies.results.map((movie) => {
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
  )
}