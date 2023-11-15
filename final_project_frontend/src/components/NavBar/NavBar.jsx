import React from "react";
import { Nav, NavLeft, NavRight } from "./StyleNav";
// import { Button } from "../GlobalStyles/StyleUtility";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// import TextField from '@mui/material/TextField';

// import

export default function MainNav() {
  const isAuth = localStorage.getItem("access_token");

  return (
    <Nav>
      <NavLeft>
        <div className="navCompanyName">
          <Link to="/">
            {/* <img src="mediafiles/images/logo.svg" /> */}
            <p>Fox Body Swap Meet</p>
          </Link>
        </div>
        <div className="searchBar">
          {/* <TextField type="search" id="filled-basic" label="Filled" variant="filled"/> */}
          <input type="search" />
          <Button variant="contained" size="small" type="submit">
            Search
          </Button>
        </div>
      </NavLeft>
      <NavRight>
        <ul>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link to="howitworks">How It Works</Link>
          </li>
          {isAuth ? (
            <li>
              <Link to="/profile">{localStorage.getItem("username")}</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Log In or Register</Link>
            </li>
          )}
          {isAuth ? (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          ) : null}
        </ul>
      </NavRight>
    </Nav>
  );
}
