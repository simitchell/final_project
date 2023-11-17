import React from "react";
import { Link } from "react-router-dom";
import { Text } from "./GlobalStyles/StyleText";

export default function SearchFailMessage() {
  return (
    <Text>
      <h2>Search Results</h2>
      <h3>Empty search parameters yielded no results</h3>
      <p>Try again, or click the logo to go back <Link to="/">home.</Link></p>
    </Text>
  );
}
