import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "react-toastify/dist/ReactToastify.css";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import ContextProvider from "./store/ContextProvider";
import "./App.css";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Navigation />

        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:movieId" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
