import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function Search() {
  const params = useParams();
  const [listingSearch, setListingSearch] = useState();
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const navigate = useNavigate();

  async function getSearch() {
    const url = `http://127.0.0.1:8000/listing/?search=${params.search}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setListingSearch(result);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getSearch();
  }, [params.search]);





  return (
    <>
      <p>hello</p>
      <p>... is it me you're looking for?</p>
    </>
  );
}
