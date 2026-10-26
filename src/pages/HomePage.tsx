import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { useMovies } from "../hooks/useMovies";
import type { Movie } from "../types";

function HomePage() {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Movie | null>(null);
  const { movies, isLoading, error } = useMovies();

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  function handleSurprise() {
    if (filteredMovies.length === 0) return;
    const random =
      filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
    setPicked(random);
  }

  return (
    <main className="main-container">
      <div style={{ margin: "24px 0" }}>
        <SearchBar query={query} onChange={setQuery} />
      </div>

      {isLoading && (
        <div className="movies-grid" aria-busy="true">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="empty-state">
          <p className="empty-title">Something went wrong</p>
          <p className="empty-text">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="filter-bar">
            <span className="page-info">{filteredMovies.length} movies</span>
            <div className="filter-actions-right">
              <button
                className="btn-primary"
                onClick={handleSurprise}
                disabled={filteredMovies.length === 0}
              >
                🎲 Surprise me
              </button>
            </div>
          </div>
          <MovieList movies={filteredMovies} />
        </>
      )}

      {picked && <MovieModal movie={picked} onClose={() => setPicked(null)} />}
    </main>
  );
}

export default HomePage;