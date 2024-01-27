import React, { useState, useEffect } from "react";
import movieData from "../../tmdb_5000_movies.json";
import {
  Button,
  Card,
  Dropdown,
  Header,
  DropdownProps,
} from "semantic-ui-react";
import MovieCard from "../MovieCard/MovieCard";
import { faker } from "@faker-js/faker";
import "./Movies.css";

// Define movie data types
interface Movie {
  id: number;
  title: string;
  tagline: string;
  release_date: string;
  vote_average: number;
  homepage: string;
  budget: number;
  overview: string;
  keywords: string;
}

// define budget and date dropdown menu types
interface DropdownOption {
  key: number;
  text: string;
  value: string;
}

export default function Movies() {
  // create inital state
  const [budgetValue, setBudgetValue] = useState<string>("");
  const [yearValue, setYearValue] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filteredOn, setFilteredOn] = useState<boolean>(true);

  // create type for movieData as array of data
  const data: Movie[] = (movieData as Movie[]).slice(0, 200);

  // Calculate the maximum budget, so dropdown budget only
  // goes to max budget from movieData
  const maxBudget = Math.max(...data.map((movie) => movie.budget));

  // now loop through budget from 100mil to max budget
  const budgetOptions: DropdownOption[] = [];
  for (let i = 100000000; i <= maxBudget; i += 100000000) {
    const min = i;
    const max = i + 100000000;
    // push budgets i.e 100mil>200mil to budgetOptions array
    // and round number to whole number
    budgetOptions.push({
      key: i,
      text: `$${(min / 1000000).toFixed(0)}mil - $${(max / 1000000).toFixed(
        0
      )}mil`,
      value: `${min}-${max}`,
    });
  }

  const yearOptions = Array(new Date().getFullYear() - 2000 + 1)
    .fill(null) // Fill the array with null (or any other value)
    .map((_, index) => {
      const year = 2000 + index;
      return { key: year, text: year.toString(), value: year.toString() };
    });

  const handleBudgetChange = (
    e: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    setFilteredOn(false);
    setBudgetValue(data.value as string);
  };

  const handleYearChange = (
    e: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    setFilteredOn(false);
    setYearValue(data.value as string);
  };

  useEffect(() => {
    const data: Movie[] = (movieData as Movie[]).slice(0, 200);
    let filtered = data;

    // Filter by budget if a budget value is selected
    if (budgetValue) {
      const [min, max] = budgetValue.split("-").map(Number);
      filtered = filtered.filter(
        (movie) => movie.budget >= min && movie.budget < max
      );
    }

    // Filter by year if a year value is selected
    if (yearValue) {
      filtered = filtered.filter(
        (movie) =>
          new Date(movie.release_date).getFullYear().toString() === yearValue
      );
    }

    setFilteredMovies(filtered);
  }, [budgetValue, yearValue]);

  // function for resetting users
  // dropdown menu search back to original data
  const resetFilters = () => {
    setBudgetValue("");
    setYearValue("");
    if (filteredMovies.length < 200) {
      setFilteredMovies([]);
    }
  };

  return (
    <div>
      <Header.Content className="movies-header">
        Number of films: {filteredMovies.length}
      </Header.Content>
      <div className="filter-container">
        <Dropdown
          style={{ borderRadius: 10 }}
          placeholder="Budget"
          fluid
          selection
          options={budgetOptions}
          value={budgetValue}
          onChange={handleBudgetChange}
        />
        <Button
          style={{
            height: 36,
            background: "black",
            color: "white",
            borderRadius: 10,
          }}
          disabled={filteredOn}
          onClick={resetFilters}
        >
          Reset
        </Button>
        <Dropdown
          style={{ borderRadius: 10 }}
          placeholder="Release Year"
          fluid
          selection
          options={yearOptions}
          value={yearValue}
          onChange={handleYearChange}
        />
      </div>
      <br />
      <Card.Group textAlign="center">
        {filteredMovies ? (
          filteredMovies.map((movie, index) => (
            <MovieCard
              key={index}
              id={movie.id}
              img={faker.image.cats(250, 250, true)}
              title={movie.title}
              tagline={movie.tagline}
              budget={movie.budget}
              overview={movie.overview}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
              homepage={movie.homepage}
              keywords={movie.keywords ? movie.keywords[0] : ""}
            />
          ))
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>Sorry, no results found.</h1>
          </div>
        )}
      </Card.Group>
    </div>
  );
}
