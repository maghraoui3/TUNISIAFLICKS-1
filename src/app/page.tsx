"use client"

import { Suspense, useEffect, useState } from "react";
import MoviesClient from "@/app/(movies)/page";
import { fetchMovies } from "./(movies)/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { MoviesState } from './(movies)/movieTypes'

export default function MoviesPage() {

  const [movies, setMovies] = useState<MoviesState>(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const movies = await fetchMovies();
      console.log("Hello", movies);
      setMovies(movies);
      setLoader(false);
    }
    fetchData();
  });

  return (
     <MoviesClient initialMovies={movies} loader={loader} />
  )
}
