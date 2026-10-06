import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <main className="about-page">
      <h1>About This App</h1>
      <p>
        This movie app was built as part of the EPITA Front-End Frameworks
        course. It fetches live data from The Movie Database (TMDB) API and
        lets you search through currently popular movies.
      </p>
      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default AboutPage;