import Movies from "./Movies";
import Search from "./Search";

const Home = () => {
  return (
    <div className="container">
      <Search />
      <div className="main-content">
        <Movies />
      </div>
    </div>
  );
};
export default Home;
