import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ProfileDiv } from "./GlobalStyles/StyleProfile";

export default function ProfileComponent() {
  return (
    <>
      <ProfileDiv>
        <Link to="/cart">
          <Button variant="contained">Cart</Button>
        </Link>
        <Link to="/createlisting">
          <Button variant="contained">Create A Listing</Button>
        </Link>
        <Link to="/logout">
          <Button variant="contained" color="error">Logout</Button>
        </Link>
      </ProfileDiv>
    </>
  );
}
