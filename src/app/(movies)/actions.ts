"use server";

import { revalidatePath } from "next/cache";

export async function fetchMovies(): Promise<{ TrendingMovies, populatMovies, topRatedMovies, nowPlayingMovies, upcomingMovies }> {
  try {
    const [trendingMoviesResponse, populatMoviesResponse, topRatedMoviesResponse, nowPlayingMoviesResponse, upcomingMoviesResponse] = await Promise.all([
      fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1"),
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1"),
      fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1"),
      fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1"),
      fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=b5d2609c326586f7f753f77b085a0b31&language=en-US&page=1"),
    ]);

    if (!trendingMoviesResponse.ok || !populatMoviesResponse.ok || !topRatedMoviesResponse.ok || !nowPlayingMoviesResponse.ok || !upcomingMoviesResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const TrendingMovies = await trendingMoviesResponse.json();
    const populatMovies = await populatMoviesResponse.json();
    const topRatedMovies = await topRatedMoviesResponse.json();
    const nowPlayingMovies = await nowPlayingMoviesResponse.json();
    const upcomingMovies = await upcomingMoviesResponse.json();

    revalidatePath("/");

    return { TrendingMovies, populatMovies, topRatedMovies, nowPlayingMovies, upcomingMovies };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}
