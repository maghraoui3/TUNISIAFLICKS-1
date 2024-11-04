"use client";
import React, {useEffect, useState} from 'react'
import getMovieData from './actions'

function Page({params}: {params: {id: string}}) {
  const [data, setData] = useState(null)
  const [loader, setLoader] = useState(true)

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
  }, [])
  return (
    <div className='w-full'>
      {/* <p>movie Page with id {params.id}</p> */}
      <iframe src={`https://multiembed.mov/?video_id=${params.id}&tmdb=1`} className='w-full h-full' allowFullScreen></iframe>
    </div>
  )
}

export default Page