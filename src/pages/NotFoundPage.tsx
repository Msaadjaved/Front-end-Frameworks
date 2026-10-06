import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go back home</Link>
    </main>
  );
}

export default NotFoundPage;