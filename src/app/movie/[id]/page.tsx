"use client";
import React, { useEffect, useState } from 'react'
import getMovieData from './actions'

import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import './carousel.style.css'

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
          <div className='absolute left-0 bottom-0 h-full w-2/6' style={{ background: 'linear-gradient(to left, transparent, #0d0c0f)' }}/>
          <div className='w-full h-full absolute left-0 bottom-0'></div>
        </div>

        <iframe src={`https://multiembed.mov/?video_id=${params.id}&tmdb=1`} className='w-full h-full' allowFullScreen></iframe>
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
  console.log(slides)
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