"use client"
import React, { useState, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import Autoplay from "embla-carousel-autoplay"
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from 'next/link';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from 'next/image';
import Genres from '@/components/Genres';
import { IoMdStar } from "react-icons/io";
import { FaHeart, FaBookmark, FaShareAlt, FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";


export default function MainPage() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1')
      .then(response => response.json())
      .then(data => {
        setData(data);
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
            {data && data.results.map((movie) => {
              return (
                <CarouselItem key={movie.id} className="transition-transform ease-in-out duration-400 select-none basis-[300px] sm:basis-[400px] my-4 lg:basis-[500px] hover:scale-110 hover:z-10 pl-0 ml-4 shadow-black shadow-2xl">
                  <Link href={"/"}>
                    <div className='w-full h-[200px] sm:h-[272px] lg:h-[310px] rounded-xl z-0 relative'
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
                      }} >
                      <div className='absolute left-0 top-0 w-full h-[200px] sm:h-[272px] lg:h-[310px] z-10 bg-black opacity-10 transition-opacity ease-in-out duration-700 hover:opacity-0' />
                      <div className='absolute bottom-3 left-5 sm:left-3'>
                        <p className='text-white text-lg sm:text-2xl font-semibold bbc-text-shadow'>{movie.title}</p>
                        <p className='text-white text-sm sm:text-base font-semibold bbc-text-shadow'>{movie.release_date}</p>
                        <label>
                          <Image src={"/imdb-logo.png"} alt='IDMB' width={100} height={100} className="inline-block w-[30px] sm:w-[40px] mr-2" />
                          <p className="inline-block bbc-text-shadow text-xs sm:text-base">{movie.vote_average} Rating</p>
                        </label>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <div className='hidden sm:block'>
            <CarouselPrevious icon={<IoIosArrowBack className='h-4 w-4' />} />
            <CarouselNext icon={<IoIosArrowForward className="h-4 w-4" />} />
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
            {data && data.results.map((movie) => {
              return (
                <CarouselItem key={movie.id} className="transition-transform ease-in-out duration-400 select-none basis-[145px] md:basis-[167px] my-4 p-0 ml-4 hover:scale-110 hover:z-10">
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <Link href={"/"}>
                        <div className='w-full h-[216px] sm:h-[250px] rounded-xl p-0 z-0 relative'
                          style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                            backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
                          }} >
                          <div className='absolute left-0 top-0 w-full h-[216px] sm:h-[250px] z-10 bg-black opacity-10 transition-opacity ease-in-out duration-700 hover:opacity-0' />
                          <label className='absolute left-1 top-1 bg-gray-900 pb-1 px-2 rounded-xl scale-75 sm:scale-100'>
                            <IoMdStar className='inline-block mr-1 text-yellow-400' />
                            <p className="inline-block bbc-text-shadow p-0 text-xs">{movie.vote_average.toString().substring(0, 3)}</p>
                          </label>
                          <div className='absolute bottom-5 left-3'>
                            <p className='text-white text-sm sm:text-base font-semibold bbc-text-shadow'>{movie.title}</p>
                            <p className='text-white text-xs sm:text-xs font-semibold bbc-text-shadow'>{movie.release_date.substring(0, 4)}</p>
                          </div>
                        </div>
                      </Link>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuLabel className='font-bold text-base'>{movie.title}</ContextMenuLabel>
                      <ContextMenuSeparator />
                      <ContextMenuItem><FaHeart className='mr-2' />Add To Favorites</ContextMenuItem>
                      <ContextMenuItem><FaBookmark className='mr-2' />Add To BookMarks</ContextMenuItem>
                      <ContextMenuSub>
                        <ContextMenuSubTrigger><FaShareAlt className='mr-2' />Share</ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                          <ContextMenuItem><FaFacebook className='mr-2'/>Facebook</ContextMenuItem>
                          <ContextMenuItem><FaXTwitter className='mr-2'/>X</ContextMenuItem>
                          <ContextMenuItem><FaWhatsapp className='mr-2'/>Telegram</ContextMenuItem>
                          <ContextMenuItem><FaTelegram  className='mr-2'/>Telegram</ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem><LuCopy className='mr-2'/>Copy Link</ContextMenuItem>
                        </ContextMenuSubContent>
                      </ContextMenuSub>
                    </ContextMenuContent>
                  </ContextMenu>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <div className='hidden sm:block'>
            <CarouselPrevious icon={<IoIosArrowBack className='h-4 w-4' />} />
            <CarouselNext icon={<IoIosArrowForward className='h-4 w-4' />} />
          </div>
        </Carousel>
      </div>

    </div>
  )
}
