import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <p>hello</p>
      <p>... is it me you're looking for?</p>
    </>
  );
}
