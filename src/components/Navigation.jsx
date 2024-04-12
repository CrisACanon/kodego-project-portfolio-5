import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import Img1 from "../assets/mcc_logo.jpg";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav>
        <Link className="title" to="/">
          <img src={Img1} />
          MARBEL Computer Center
        </Link>
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>

          <li>
            <NavLink to="/brands">Brands</NavLink>
          </li>

          <li>
            <NavLink to="/producttype">Product Type</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/promo">Promo</NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              <i className="fas fa-cart-plus"></i>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
