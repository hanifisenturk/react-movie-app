import { useState, useEffect } from "react";
import { Puff } from "svg-loaders-react";
import MovieItem from "../components/MovieItem";
import Grid from "../Layout/Grid";
import classes from "./Movies.module.css";
import SearchBar from "../components/SearchBar";
import useHttp from "../hooks/use-http";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const transformData = (data) => {
    setMovies(data.results);
  };

  const { fetchData, isLoading } = useHttp(transformData);

  useEffect(() => {
    fetchData(`
https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`);
  }, []);

  let content;

  content = isLoading ? (
    <Puff className="centered" stroke="#000" />
  ) : (
    movies.map((movie) => {
      return (
        <MovieItem
          wantGradient={true}
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={movie.poster_path}
        />
      );
    })
  );

  return (
    <div className={classes["movies-container"]}>
      <SearchBar />
      <h3>Populars of This Week</h3>

      <Grid>{content}</Grid>
    </div>
  );
};

export default Movies;
