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
      <div className="aboutUs">
        <Link to="/aboutus">
          <Button className="aboutus" type="button">
            About Us
          </Button>
        </Link>
        <Link to="howitworks">
          <Button className="howitworks" type="button">
            How It Works
          </Button>
        </Link>
      </div>
      <div className="navLink">
        <ul>
          <li>{isAuth ? null : <Link to="/">Home</Link>}</li>
          <li>
            <Link to="/createlisting">Create Listing</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
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
