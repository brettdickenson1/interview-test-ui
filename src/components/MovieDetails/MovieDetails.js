import { useLocation } from "react-router-dom";
import { Container, Header, Segment } from "semantic-ui-react";
import "./MovieDetails.css";

function MovieDetails() {
  const location = useLocation();
  const movieData = location.state;

  if (!movieData) {
    return (
      <Container text className="movie-details-container">
        <Header as="h2" textAlign="center">
          No movie data available
        </Header>
      </Container>
    );
  }

  return (
    <Container className="movie-details-container">
      <Segment raised>
        <Header as="h2">{movieData.title}</Header>
        <Header as="h3">{movieData.tagline}</Header>
        <p className="movie-overview">{movieData.overview}</p>
        <p className="movie-release-date">
          Release date: {movieData.release_date}
        </p>
        <p className="movie-budget">Budget: ${movieData.budget}</p>
        <p className="movie-rating">Rating: {movieData.vote_average} / 10</p>
        <p className="movie-homepage">
          Homepage:
          <a
            href={movieData.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            {movieData.homepage ? (
              movieData.homepage
            ) : (
              <p>Sorry - No URL Provided</p>
            )}
          </a>
        </p>
      </Segment>
    </Container>
  );
}

export default MovieDetails;
