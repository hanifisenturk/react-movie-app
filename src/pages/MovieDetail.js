import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { Puff } from "svg-loaders-react";
import classes from "./MovieDetail.module.css";
import MovieItem from "../components/MovieItem";

const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const params = useParams();
  const transformData = (data) => {
    setMovieDetails(data);
  };

  const { fetchData, isLoading } = useHttp(transformData);

  useEffect(() => {
    fetchData(
      `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Puff className="centered" stroke="#203239" />
      ) : (
        <div className={classes["detail-container"]}>
          <div className={classes["movie-image--container"]}>
            <MovieItem
              id={movieDetails.id}
              wantGradient={false}
              poster={movieDetails.poster_path}
            />
          </div>
          <div className={classes.details}>
            <h3 className={classes.title}>{movieDetails.original_title}</h3>
            <p className={classes.overview}>{movieDetails.overview}</p>
            <div className={classes.subdetails}>
              <div className={classes["subdetails-flex"]}>
                <div>
                  <h4>Genres</h4>
                </div>
                <div className={classes["subdetails-items"]}>
                  {movieDetails.genres.map((genre) => {
                    return <p key={genre.id}>{genre.name}</p>;
                  })}
                </div>
              </div>
              <div className={classes["subdetails-flex"]}>
                <div>
                  <h4>Spoken Languages</h4>
                </div>
                <div className={classes["subdetails-items"]}>
                  {movieDetails.spoken_languages.map((lang) => {
                    return <p key={lang.iso_639_1}>{lang.english_name}</p>;
                  })}
                </div>
              </div>
              <div className={classes["subdetails-flex"]}>
                <div>
                  <h4>Release Date</h4>
                </div>
                <div className={classes["subdetails-items"]}>
                  <p>{movieDetails.release_date}</p>
                </div>
              </div>

              <div className={classes["subdetails-flex"]}>
                <div>
                  <h4>Original Language</h4>
                </div>
                <div className={classes["subdetails-items"]}>
                  <p>{movieDetails.original_language}</p>
                </div>
              </div>
              <div className={classes["subdetails-flex"]}>
                <div>
                  <h4>Production Companies</h4>
                </div>
                <div className={classes["subdetails-items"]}>
                  {movieDetails.production_companies.map((companie) => {
                    return <p key={companie.id}>{companie.name}</p>;
                  })}
                </div>
              </div>
              <div className={classes.websites}>
                <a
                  target="_blank"
                  href={`https://www.imdb.com/title/${movieDetails.imdb_id}/`}
                >
                  IMDB Page
                </a>
                {movieDetails.homepage ? (
                  <a target="_blank" href={movieDetails.homepage}>
                    Official Website
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MovieDetail;
