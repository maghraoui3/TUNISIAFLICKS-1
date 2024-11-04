"use client";
import React, {useEffect, useState} from 'react'
import getMovieData from './actions'

function Page({params}: {params: {id: string}}) {
  const [data, setData] = useState(null)
  const [loader, setLoader] = useState(true)

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

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const moviesData = await getMovieData(params.id)
        setData(moviesData)
        setLoader(false)
        console.log(moviesData)
      } catch (error) {
        console.error("Error fetching movie:", error)
        setLoader(false)
      }
    }

    fetchMovieData()
  }, [params.id])
  return (
    <div className='w-full'>
      {/* <p>movie Page with id {params.id}</p> */}
      <iframe src={`https://multiembed.mov/?video_id=${params.id}&tmdb=1`} className='w-full h-full' allowFullScreen></iframe>
    </div>
  )
}

export default Page