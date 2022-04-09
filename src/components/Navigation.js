import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";
const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <h1>
        <Link className={classes.logo} to="/">
          MOVIETIFY
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Movies</Link>
        </li>
        <li>
          <Link to={"/favorites"}>Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
