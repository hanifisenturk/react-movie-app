import { useReducer, useEffect } from "react";
import FavContext from "./fav-context";

const initialState = [];

const favReducer = (state, action) => {
  if (action.type === "FAV") {
    let updatedFavMovies = [];
    updatedFavMovies.push(...state, {
      id: action.id,
      poster_path: action.poster_path,
    });

    return updatedFavMovies;
  }

  if (action.type === "UNFAV") {
    let updatedFavMovies = [];
    updatedFavMovies.push(...state.filter((movie) => movie.id !== action.id));

    return updatedFavMovies;
  }

  return initialState;
};

const ContextProvider = (props) => {
  const [favState, favDispatch] = useReducer(favReducer, initialState, () => {
    if (localStorage.getItem("TMDB_ID")) {
      return JSON.parse(localStorage.getItem("TMDB_ID"));
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem("TMDB_ID", JSON.stringify(favState));
  }, [favState]);

  const addFavorite = (id, poster_path) => {
    favDispatch({ type: "FAV", id: id, poster_path });
  };

  const removeFavorite = (id) => {
    favDispatch({ type: "UNFAV", id: id });
  };

  const favMovieContext = {
    movies: favState,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavContext.Provider value={favMovieContext}>
      {props.children}
    </FavContext.Provider>
  );
};

export default ContextProvider;
