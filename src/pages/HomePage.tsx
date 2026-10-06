import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { useMovies } from "../hooks/useMovies";

function HomePage() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies();

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <SearchBar query={query} onChange={setQuery} />
      <main className="app-main">
        {isLoading && <p className="loading-message">Loading movies...</p>}
        {!isLoading && error && (
          <p className="error-message">Something went wrong: {error}</p>
        )}
        {!isLoading && !error && <MovieList movies={filteredMovies} />}
      </main>
    </>
  );
}

export default HomePage;