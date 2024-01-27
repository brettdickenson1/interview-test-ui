import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Header, Icon, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Movies from "./components/Movies/Movies";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  return (
    <Router>
      <Segment style={{ background: "#EEEDEB" }} textAlign="center">
        <Header as="h2" icon textAlign="center">
          <Icon name="film" />
          <Header.Content>Several Films</Header.Content>
        </Header>
        <Routes>
          <Route path="/" element={<Movies />} />
        </Routes>
      </Segment>
      <Routes>
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
