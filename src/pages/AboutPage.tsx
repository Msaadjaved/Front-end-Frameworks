import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <main className="main-container">
      <div className="empty-state" style={{ alignItems: "flex-start", textAlign: "left" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>About This App</h1>
        <p className="empty-text" style={{ maxWidth: 640 }}>
          This movie app was built as part of the EPITA Front-End Frameworks
          course. It fetches live data from The Movie Database (TMDB) API and
          lets you search popular movies, save favorites, and get a random
          pick with Surprise me.
        </p>
        <Link to="/" className="btn-secondary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default AboutPage;