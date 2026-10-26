import { useEffect } from "react";
import type { Movie } from "../types";
import { useAppContext } from "../context/AppContext";
import { genreName } from "../utils/genres";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const BACKDROP_URL = "https://image.tmdb.org/t/p/w780";
const POSTER_URL = "https://image.tmdb.org/t/p/w342";
const BACKDROP_PLACEHOLDER = "https://placehold.co/780x440?text=No+Image";
const POSTER_PLACEHOLDER = "https://placehold.co/342x513?text=No+Image";

function MovieModal({ movie, onClose }: MovieModalProps) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const favourite = isFavorite(movie.id);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const backdropSrc = movie.backdrop_path
    ? `${BACKDROP_URL}${movie.backdrop_path}`
    : BACKDROP_PLACEHOLDER;
  const posterSrc = movie.poster_path
    ? `${POSTER_URL}${movie.poster_path}`
    : POSTER_PLACEHOLDER;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={movie.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        <div
          className="modal-backdrop-hero"
          style={{ backgroundImage: `url(${backdropSrc})` }}
        />
        <div className="modal-body">
          <img className="modal-poster" src={posterSrc} alt={movie.title} />
          <div className="modal-content-details">
            <h3 className="modal-title">{movie.title}</h3>
            <div className="modal-meta-row">
              <span className="modal-meta-item">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="modal-meta-item">
                {movie.release_date?.slice(0, 4) || "N/A"}
              </span>
            </div>
            <div className="movie-genres-tags">
              {movie.genre_ids.map((id) => (
                <span key={id} className="genre-tag">
                  {genreName(id)}
                </span>
              ))}
            </div>
            <div>
              <p className="modal-overview-heading">Overview</p>
              <p className="modal-overview">
                {movie.overview || "No overview available."}
              </p>
            </div>
            <div className="modal-footer-actions">
              <button className="btn-primary" onClick={() => toggleFavorite(movie)}>
                {favourite ? "Remove from favorites" : "♥ Save to favorites"}
              </button>
              <button className="btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;