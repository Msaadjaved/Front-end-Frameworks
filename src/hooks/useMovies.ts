import { useEffect, useState } from "react";
import type { Movie } from "../types";

const BASE_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface UseMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
}

export function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMovies() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(BASE_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch movies: ${res.status}`);
        }

        const data = await res.json();

        if (isMounted) {
          setMovies(data.results ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setMovies([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  return { movies, isLoading, error };
}