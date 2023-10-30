import React from "react";
import { Nav } from './StyleNav';
import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <Nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/cart'>Cart</Link></li>
        <li><Link to='/login'>Log In</Link></li>
      </ul>
    </Nav>
  );
}
