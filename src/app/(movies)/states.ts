"use client";

import { useState, useEffect } from "react";
import { fetchMovies } from "./actions";

export const  States = async () => {
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchMovies();
      setMovies(movies);
      setLoader(false);
      console.log(movies);
    };
    fetchData();
  }, []);
  return movies;
};
