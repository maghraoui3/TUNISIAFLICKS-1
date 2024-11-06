"use client";
import React, { useEffect, useState } from 'react'
import getMovieData from './actions'

import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import './carousel.style.css'
import { FaHeart } from "react-icons/fa6";


function Page({ params }: { params: { id: string } }) {

  const streamServices = [
    {
      // https://www.superembed.stream/#install
      name: 'MultiEmbed',
      url: `https://multiembed.mov/?video_id=${params.id}&tmdb=1`
    },
    {
      // https://www.2embed.cc/
      // https://www.2embed.skin/
      name: '2embed.cc',
      url: `https://www.2embed.cc/embed/${params.id}`
    },
    {
      // https://2embed.pro
      name: '2embed.pro',
      url: `https://2embed.pro/embed/movie/${params.id}`
    },
  ]

  const [data, setData] = useState(null)
  const [backdrops, setBackdrops] = useState([])
  const [logos, setLogos] = useState([])
  const [loader, setLoader] = useState(true)

  const OPTIONS: EmblaOptionsType = { loop: true }

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const moviesData = await getMovieData(params.id)
        setData(moviesData)
        setLoader(false)
        console.log(moviesData)
        setBackdrops(moviesData.images.backdrops)
        setLogos(moviesData.images.logos)
      } catch (error) {
        console.error("Error fetching movie:", error)
        setLoader(false)
      }
    }

    fetchMovieData()
  }, [params.id])
  return (
    loader ? <div className='w-full h-96 bg-gray-800 animate-pulse' /> :
      <div className='w-full h-full -mt-6' >
        {/* <div className='w-full h-[calc(100%-30vh)]'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrops[0].file_path})`, backgroundPosition: 'top',
            backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
          }} /> */}
        <div className='h-[calc(100%-30vh)] w-full relative'>
          <EmblaCarousel slides={backdrops} options={OPTIONS} />
          <div className='absolute bottom-0 h-2/6 w-full' style={{ background: 'linear-gradient(transparent, #0d0c0f)' }}/>
          <div className='absolute left-0 bottom-0 h-full w-1/2' style={{ background: 'linear-gradient(to left, transparent, #0d0c0f)' }}/>
          <div className='w-full h-full absolute left-0 bottom-0'/>
          <div className='absolute pl-10 top-1/4 w-2/5 h-full'>
            {/* <Image src={`https://image.tmdb.org/t/p/original${logos[1].file_path}`} className='w-80' width={500} height={100} alt="Movie LOGO" /> */}
            {logos.length == 0 ? null :
              <Image src={`https://image.tmdb.org/t/p/original${logos.filter((item) => item.iso_639_1 == 'en' )[0].file_path || logos[0].file_path }`} className='w-80' width={500} height={100} alt="Movie LOGO" />}
            <p className='flex items-center gap-3 mt-5'>
              <p><Image src={`https://flagsapi.com/${data.origin_country}/flat/32.png`} width={32} height={32} alt='slm'/></p>
              <p className='flex gap-1 items-center'><FaHeart className='text-red-500'/><p className='text-red-500 font-bold'>{Math.round(data.vote_average*10)}%</p> Likes</p>
              <p>•</p>
              <p>{data.release_date.substring(0, 4)}</p>
              {
                data.adult &&
                <div className='flex gap-3'>
                  <p>•</p>
                  <p className='bg-red-500 px-3 rounded-xl'>+18</p>
                </div>
              }
              <p>•</p>
              <p>{data.genres.map((item, index) => data.genres.length-1 !== index ? item.name + ", " : item.name )}</p>
            </p>
            <p className='mt-3 text-gray-200'>{data.overview}</p>
            <div className='mt-3'>
              <p>CASTS:</p>
              <div></div>
            </div>
          </div>
        </div>

        {/* <iframe src={`https://multiembed.mov/?video_id=${params.id}&tmdb=1`} className='w-full h-full' allowFullScreen></iframe> */}
      </div>
  )
}



type PropType = {
  slides: any[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 3000 })])
  // console.log(slides)
  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide h-full" key={index}>
              <div className='w-full h-full embla__slide__element'
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${item.file_path})`, backgroundPosition: 'top',
                  backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page