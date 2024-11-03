// "use client"
import { Suspense } from "react"
// import { fetchMovies } from "./(movies)/actions"
// import type { MoviesState } from './(movies)/movieTypes'
import MoviesClient from "./(movies)/page"
import { Skeleton } from "@/components/ui/skeleton"

export default async function MoviesPage() {
  // const movies = await fetchMovies()

  return (
    <Suspense fallback={<Skeleton className="w-72 h-72" />}>
      <MoviesClient />
    </Suspense>
  )
}