import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { SAMPLE_MOVIES } from "./data/sampleMovies";

function App() {
  const [query, setQuery] = useState("");

  const filteredMovies = SAMPLE_MOVIES.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie App</h1>
      </header>
      <SearchBar query={query} onChange={setQuery} />
      <main className="app-main">
        <MovieList movies={filteredMovies} />
      </main>
    </div>
  );
}

export default App;