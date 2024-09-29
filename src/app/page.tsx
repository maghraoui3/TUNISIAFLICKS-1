import Movies from "@/app/(movies)/page";
import { fetchMovies } from "./(movies)/actions";


export default async function Home() {
  const movies = await fetchMovies();
  return (
    <main className="flex-grow">
      <Movies initialMovies={movies} />
    </main>
  );
}
