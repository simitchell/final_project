import React from "react";
import Button from "@mui/material/Button";
import { ProfileDiv } from "./GlobalStyles/StyleProfile";

export default function ProfileComponent() {
  return (
    <ProfileDiv>
      <Button variant="contained">Cart</Button>
      <Button variant="contained">Create A Listing</Button>
    </ProfileDiv>
  );
}
