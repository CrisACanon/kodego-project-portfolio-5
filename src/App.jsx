import { Routes, Route } from "react-router-dom";
import React from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Brands from "./pages/Brands";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import UserType from "./pages/UserType";

import "mdb-react-ui-kit/dist/css/mdb.min.css";

function App() {
  return (
    <>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/shop" element={<Shop />} exact />
          <Route path="/brands" element={<Brands />} exact />
          <Route path="/services" element={<Services />} exact />
          <Route path="/contact" element={<Contact />} exact />
          <Route path="/users" element={<Users />} exact />
          <Route path="/products" element={<Products />} exact />
          <Route path="/orders" element={<Orders />} exact />
          <Route path="/category" element={<Category />} exact />
          <Route path="/usertype" element={<UserType />} exact />
        </Routes>
      </div>
    </>
  );
}

export default App;
