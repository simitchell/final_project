import React from "react";
import { Nav } from "./StyleNav";
import { Button } from "./StyleButtons";
import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <Nav>
      <div className="navCompanyName">
        <p>Fox Body Swap Meet</p>
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
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </div>
    </Nav>
  );
}
