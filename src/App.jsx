import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import RentPage from "./pages/RentPage";
import NotFound from "./pages/NotFound";
import Hero from "./components/Hero";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Hero />
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;