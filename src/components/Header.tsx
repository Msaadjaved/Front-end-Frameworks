import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Header() {
  const { favorites, theme, toggleTheme } = useAppContext();

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-logo">
          <span className="logo-dot" />
          <span className="logo-text">CineGrid</span>
        </div>

        <nav className="header-actions">
          <NavLink to="/" end className="btn-icon-label">
            <span>Home</span>
          </NavLink>
          <NavLink to="/favorites" className="btn-icon-label">
            <span>Favorites</span>
            <span className="count-badge">{favorites.length}</span>
          </NavLink>
          <NavLink to="/about" className="btn-icon-label">
            <span>About</span>
          </NavLink>
          <button
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;