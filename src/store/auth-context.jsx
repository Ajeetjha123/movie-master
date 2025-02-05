import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
export const AuthContextProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
export const useAuth = () => {
  return useContext(AuthContext);
};
