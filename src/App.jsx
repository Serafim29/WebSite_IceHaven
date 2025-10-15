import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RentPage from "./pages/RentPage";
import NotFound from "./pages/NotFound";


function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <div className="container-custom mx-auto">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rent" element={<RentPage />} />
          </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;