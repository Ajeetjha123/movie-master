import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();
const key = import.meta.env.VITE_API_KEY;
export const API_URL = `https://www.omdbapi.com/?apikey=${key}`;

const ContextProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("raja");

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setMovie(data.Search);
        setError({ show: false, msg: "" });
      } else {
        setError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
      setError({
        show: true,
        msg: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      getMovie(`${API_URL}&s=${query}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Context.Provider value={{ movie, isLoading, isError, query, setQuery }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
export const useApiContext = () => {
  return useContext(Context);
};
