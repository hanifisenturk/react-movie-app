import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import classes from "./SearchBar.module.css";
const SearchBar = (props) => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const movieName = new URLSearchParams(location.search).get("movie");

  const searchMovieHandler = (e) => {
    e.preventDefault();

    navigate(`/search?movie=${searchRef.current.value}`, { replace: true });
    searchRef.current.focus();
  };
  return (
    <form onSubmit={searchMovieHandler} className={classes.form}>
      <input
        className={classes.search}
        type="text"
        defaultValue={movieName}
        placeholder="Search a movie"
        required
        ref={searchRef}
      />
      <button>{<BiSearchAlt className={classes.icon} />}</button>
    </form>
  );
};

export default SearchBar;
