import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Grid from "../Layout/Grid";
import { Puff } from "svg-loaders-react";
import SearchBar from "../components/SearchBar";
import MovieItem from "../components/MovieItem";
import useHttp from "../hooks/use-http";
import classes from "./Movies.module.css";
const Search = () => {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [searchedMovieName, setSearchedMovieName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get("movie");

  const transformData = (data) => {
    setSearchedMovie(data.results);
  };

  const { fetchData, isLoading } = useHttp(transformData);

  useEffect(() => {
    if (movieName !== null && movieName !== "") {
      setSearchedMovieName(movieName);
      fetchData(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
    } else if (movieName === "" || movieName === null) {
      navigate("/");
    }
  }, [movieName]);

  let content;

  content = isLoading ? (
    <Puff className="centered" stroke="#000" />
  ) : searchedMovie.length === 0 ? (
    <p className="centered" style={{ fontSize: "2.8rem" }}>
      There is no movie related to your search!
    </p>
  ) : (
    searchedMovie.map((movie) => {
      return (
        <MovieItem
          wantGradient={true}
          id={movie.id}
          key={movie.id}
          title={movie.title}
          poster={movie.poster_path}
        />
      );
    })
  );

  return (
    <div className={classes["movies-container"]}>
      <SearchBar />
      <h3>Results Related to Your Search "{searchedMovieName}"</h3>

      <Grid>{content}</Grid>
    </div>
  );
};

export default Search;
