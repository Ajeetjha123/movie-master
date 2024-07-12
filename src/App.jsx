import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import AuthForm from "./auth/AuthForm";
import { useAuth } from "./store/auth-context";
import SingleMovie from "./SingleMovie.jsx";

const App = () => {
  const authCtx = useAuth();
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/home" element={<Home />} />
      ) : (
        <Route path="/" element={<AuthForm />} />
      )}
      <Route path="/home/movie/:id" element={<SingleMovie />} />
      <Route path="*" element={<AuthForm />} />
    </Routes>
  );
};

export default App;
