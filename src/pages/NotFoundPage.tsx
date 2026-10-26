import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="main-container">
      <div className="empty-state">
        <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>404</h1>
        <p className="empty-text">Page not found.</p>
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;