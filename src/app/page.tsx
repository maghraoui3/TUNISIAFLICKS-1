import MoviesClient from "@/app/(movies)/page";
import { fetchMovies } from "./(movies)/actions";


export default async function Movies() {
  const movies = await fetchMovies();
  return <MoviesClient initialMovies={movies} />
}
