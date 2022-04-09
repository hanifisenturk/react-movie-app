import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import FavContext from "../store/fav-context";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import classes from "./MovieItem.module.css";

const MovieItem = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const favMoviesContext = useContext(FavContext);

  useEffect(() => {
    const favorited = favMoviesContext.movies.filter(
      (movie) => movie.id === props.id
    );

    if (favorited.length > 0) {
      if (favorited[0].id === props.id) {
        setIsFavorite(true);
      }
    }
  }, []);

  const addFavoriteHandler = () => {
    favMoviesContext.addFavorite(props.id, props.poster);
    setIsFavorite((state) => !state);
  };

  const removeFavoriteHandler = () => {
    favMoviesContext.removeFavorite(props.id);
    setIsFavorite((state) => !state);
  };

  return (
    <div className={classes.item}>
      {props.wantGradient && (
        <Link to={`/detail/${props.id}`} className={classes.gradient}></Link>
      )}
      <img
        src={`https://image.tmdb.org/t/p/w500${props.poster}`}
        alt={props.title}
      />
      {isFavorite ? (
        <AiFillHeart onClick={removeFavoriteHandler} className="favorite" />
      ) : (
        <AiOutlineHeart onClick={addFavoriteHandler} className="favorite" />
      )}
    </div>
  );
};

export default MovieItem;
