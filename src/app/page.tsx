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

// Create the movies display component
function MoviesDisplay({ movies }: { movies: MoviesState }) {
  if (!movies) return null
  
  return (
    <div className="space-y-8">
      {movies.TrendingMovies && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.TrendingMovies.results.map((movie) => (
              <div key={movie.id} className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-600">{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Add similar sections for other movie categories */}
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