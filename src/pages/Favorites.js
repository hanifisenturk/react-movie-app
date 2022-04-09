import { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Favorites.module.css";
import Grid from "../Layout/Grid";
import MovieItem from "../components/MovieItem";
import FavContext from "../store/fav-context";

const Favorites = () => {
  const favoritedMovies = useContext(FavContext);
  const movies = favoritedMovies.movies;

  return (
    <div className={classes["fav-movies--container"]}>
      <h3>Your favorite movies</h3>

      {favoritedMovies.movies.length > 0 ? (
        <Grid>
          {movies.map((movie) => {
            return (
              <MovieItem
                key={movie.id}
                wantGradient={true}
                id={movie.id}
                poster={movie.poster_path}
              />
            );
          })}
        </Grid>
      ) : (
        <div className="centered">
          <p>You have no favorite movie yet!</p>
          <Link className={classes["homepage-link"]} to="/">
            Homepage
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
