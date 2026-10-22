import { useAppContext } from "../context/AppContext";

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

function SearchBar({ query, onChange }: SearchBarProps) {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="search-bar-actions">
        <button className="favorites-btn" title="Show Favorites">
          ♥
        </button>
        <button
          className="theme-toggle-btn"
          title="Toggle Theme"
          onClick={toggleTheme}
        >
          {theme === "dark" ? "☀" : "🌙"}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;