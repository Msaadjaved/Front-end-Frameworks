import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { Movie } from "../types";

const FAVORITES_KEY = "cinegrid_favorites";
const THEME_KEY = "cinegrid_theme";

type Theme = "dark" | "light";

interface AppState {
  favorites: Movie[];
  theme: Theme;
}

type AppAction =
  | { type: "TOGGLE_FAVOURITE"; payload: Movie }
  | { type: "SET_THEME"; payload: Theme };

interface AppContextValue {
  favorites: Movie[];
  theme: Theme;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
  toggleTheme: () => void;
}

function loadFavorites(): Movie[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as Movie[]) : [];
  } catch {
    return [];
  }
}

function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" || saved === "dark" ? saved : "dark";
  } catch {
    return "dark";
  }
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const exists = state.favorites.some((m) => m.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((m) => m.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, () => ({
    favorites: loadFavorites(),
    theme: loadTheme(),
  }));

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    } catch {
      // storage unavailable: ignore
    }
  }, [state.favorites]);

  // Persist theme and apply it to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
    try {
      localStorage.setItem(THEME_KEY, state.theme);
    } catch {
      // storage unavailable: ignore
    }
  }, [state.theme]);

  const value: AppContextValue = {
    favorites: state.favorites,
    theme: state.theme,
    toggleFavorite: (movie) =>
      dispatch({ type: "TOGGLE_FAVOURITE", payload: movie }),
    isFavorite: (id) => state.favorites.some((m) => m.id === id),
    toggleTheme: () =>
      dispatch({
        type: "SET_THEME",
        payload: state.theme === "dark" ? "light" : "dark",
      }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside <AppProvider>");
  }
  return ctx;
}