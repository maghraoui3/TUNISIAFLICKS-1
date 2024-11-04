// "use client"
// import { fetchMovies } from "./(movies)/actions"
// import type { MoviesState } from './(movies)/movieTypes'
import MoviesClient from "./(movies)/page"

export default async function MoviesPage() {

  return (
      <MoviesClient />
  )
}