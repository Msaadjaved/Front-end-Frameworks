import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="app-header">
      <h1>Movie App</h1>
      <nav className="app-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;