import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";
import { useAppContext } from "../context/AppContext";

function FavoritesPage() {
  const { favorites } = useAppContext();

  return (
    <main className="main-container">
      <h1 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "28px 0 20px" }}>
        Your Favorites
      </h1>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No favorites yet</p>
          <p className="empty-text">Heart a movie to save it here.</p>
          <Link to="/" className="btn-primary">
            Browse movies
          </Link>
        </div>
      ) : (
        <MovieList movies={favorites} />
      )}
    </main>
  );
}

export default FavoritesPage;