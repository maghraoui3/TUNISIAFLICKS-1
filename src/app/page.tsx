"use client"
import { Suspense, useEffect, useState } from "react"
import { fetchMovies } from "./(movies)/actions"
import type { MoviesState } from './(movies)/movieTypes'
import MoviesClient from "./(movies)/page"

// Create a loading component
function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="w-full h-[200px] bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

// Main page component
export default function MoviesPage() {
  const [movies, setMovies] = useState<MoviesState | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMovies()
        setMovies(data)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMovies()
  }, []) // Add empty dependency array to prevent infinite renders

  return (
      <Suspense fallback={<LoadingState />}>
        {isLoading ? (
          <LoadingState />
        ) : (
          <MoviesClient initialMovies={movies} loader={isLoading} />
        )}
      </Suspense>
  )
}