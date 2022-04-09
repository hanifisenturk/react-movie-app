import { createContext } from "react";

const defaultValue = {
  movies: [],
  addFavorite(id) {},
  removeFavorite(id) {},
};

const FavContext = createContext(defaultValue);

export default FavContext;
