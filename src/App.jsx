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
import Accommodation from "./pages/Accommodation";
import ApartmentDetails from "./pages/ApartmentDetails";
import ProductDetails from "./pages/ProducDetails";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer"

function Layout() {
  return (
    <div>
      <Navbar />
      <CartDrawer />
      <Outlet />
    </div>
  );
}

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="container-custom mx-auto">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/rent" element={<RentPage />} />
              <Route path="/rent/:id" element={<ProductDetails />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/accommodation/:id" element={<ApartmentDetails />} />
            </Route>
              <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;