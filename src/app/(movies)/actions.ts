'use server'

import { MoviesState } from './movieTypes'

export async function fetchMovies(): Promise<MoviesState> {
  const API_KEY = process.env.TMDB_API_KEY
  if (!API_KEY) {
    throw new Error("TMDB_API_KEY is not set")
  }

  const endpoints = [
    'trending/movie/day',
    'movie/popular',
    'movie/top_rated',
    'movie/now_playing',
    'movie/upcoming'
  ]

  try {
    const responses = await Promise.all(
      endpoints.map(endpoint =>
        fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`)
      )
    )

    const data = await Promise.all(responses.map(res => {
      if (!res.ok) throw new Error(`API request failed: ${res.statusText}`)
      return res.json()
    }))

    return {
      TrendingMovies: data[0],
      popularMovies: data[1],
      topRatedMovies: data[2],
      nowPlayingMovies: data[3],
      upcomingMovies: data[4]
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    throw new Error("Failed to fetch movie data")
  }
}