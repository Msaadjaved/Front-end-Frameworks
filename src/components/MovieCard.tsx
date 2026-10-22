import type { Movie } from "../types";
import { useAppContext } from "../context/AppContext";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE = "https://placehold.co/500x750?text=No+Image";

function MovieCard({ movie }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const favourite = isFavorite(movie.id);

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const posterSrc = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER_IMAGE;

  return (
    <article className="movie-card" tabIndex={0} aria-label={movie.title}>
      <div className="poster-wrapper">
        <img
          src={posterSrc}
          alt={movie.title}
          className="poster-img"
          loading="lazy"
        />
        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <svg viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {movie.vote_average.toFixed(1)}
            </span>
            <button
              className="favorite-btn"
              aria-label={
                favourite ? "Remove from favourites" : "Add to favourites"
              }
              title={favourite ? "Remove from Watchlist" : "Add to Watchlist"}
              onClick={() => toggleFavorite(movie)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={favourite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          <span className="quick-view-hint">View Details</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-meta">
          <span>{releaseYear}</span>
          <span>{movie.vote_count} votes</span>
        </div>
        <div className="movie-genres-tags">
          {movie.genre_ids.slice(0, 2).map((id) => (
            <span key={id} className="genre-tag">
              {id}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default MovieCard;