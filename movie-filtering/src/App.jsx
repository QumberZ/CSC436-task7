import React, { useEffect } from "react";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Movies from "./components/Movies";
import "./App.css";
import movieData from "./utils/movies";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [maxLength, setMaxLength] = useState('');

  useEffect(() => {
    setMovies(
      movieData.filter(
        (movie) =>
          movie.title.toUpperCase().includes(search.toUpperCase()) &&
          ([NaN, 0].includes(parseInt(maxLength, 10)) ||
            parseInt(maxLength, 10) >= movie.length)
      )
    );
  }, [search, maxLength]);

  return (
    <React.Fragment>
      {/* Header Bar for Searching */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        maxLength={maxLength}
        setMaxLength={setMaxLength}
        movies={movies}
        setMovies={setMovies}
      />

      {/* Output the Movies */}
      <Movies movies={movies} />
    </React.Fragment>
  );
}

export default App;
