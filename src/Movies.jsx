import { NavLink } from "react-router-dom";
import { useApiContext } from "./context";

const Movies = () => {
  const { movie, isLoading, isError } = useApiContext();
  if (isLoading) {
    return (
      <div className="movie-section">
        <div className="loading"> Loading...</div>
      </div>
    );
  }

  if (isError.show) {
    return <div>Error: {isError.msg}</div>;
  }

  return (
    <section className="movie-page">
      <div className="container grid grid-4-col">
        {movie
          ? movie.map((item) => {
              const { imdbID, Title, Poster } = item;
              const mivoeTitle = Title.substring(0, 15);
              return (
                <NavLink key={imdbID} to={`movie/${imdbID}`}>
                  <div className="card">
                    <div className="card-info">
                      <h2>{mivoeTitle}</h2>
                      <img src={Poster} alt={imdbID} />
                    </div>
                  </div>
                </NavLink>
              );
            })
          : ""}
      </div>
    </section>
  );
};

export default Movies;
