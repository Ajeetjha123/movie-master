import { Button } from "react-bootstrap";
import { useApiContext } from "./context";
import { useAuth } from "./store/auth-context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./feature/themeSlice";
import { useEffect } from "react";

const Search = () => {
  const { themeMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { query, setQuery, isError } = useApiContext();
  const authCtx = useAuth();
  const logout = authCtx.logout;
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    const body = document.body;
    if (themeMode) {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  }, [themeMode]);

  return (
    <section className="search-section">
      <div className="logout-button-wrapper">
        <Button onClick={toggleDarkModeHandler} variant="outline-dark">
          {themeMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <Button onClick={logoutHandler} variant="outline-danger">
          Logout
        </Button>
      </div>
      <h2>Search Your Favourite Movie</h2>
      <form action="#" onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="text"
            placeholder="search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>
      <div className="card-error">{isError.show && <h3>{isError.msg}</h3>}</div>
    </section>
  );
};

export default Search;
