import React from "react";
import { Nav } from "./StyleNav";
import { Button } from "../GlobalStyles/StyleUtility";
import { Link } from "react-router-dom";
// import

export default function MainNav() {
  const isAuth = localStorage.getItem("access_token");

  return (
    <Nav>
      <div className="navCompanyName">
        <Link to="/">
          <p>Fox Body Swap Meet</p>
        </Link>
      </div>
      <div className="searchBar">
        <input type="search"></input>
        <Button type="submit">Search</Button>
      </div>
      <div className="navLink">
        <ul>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link to="howitworks">How It Works</Link>
          </li>
          <li>
            {isAuth ? <Link to="/createlisting">Create Listing</Link> : null}
          </li>
          <li>{isAuth ? <Link to="/cart">Cart</Link> : null}</li>
          <li>
            {isAuth ? (
              <Link to="/profile">{localStorage.getItem("username")}</Link>
            ) : (
              <Link to="/login">Log In or Register</Link>
            )}
          </li>
        </ul>
      </div>
    </Nav>
  );
}
