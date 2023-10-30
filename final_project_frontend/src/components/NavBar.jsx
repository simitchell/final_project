import React from "react";
import { Nav } from './StyleNav';
import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <Nav>
      <ul>
        <li>Home</li>
        <li>Cart</li>
        <li>Log In</li>
      </ul>
    </Nav>
  );
}
