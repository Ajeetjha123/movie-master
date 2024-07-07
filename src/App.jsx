import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import SingleMoive from "./SingleMoive";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<SingleMoive />} />
    </Routes>
  );
};
export default App;
