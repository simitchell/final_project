import { CardContainer } from "./GlobalStyles/CardStyle";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";

export default function ListingDetail() {
  const [listingData, setListingData] = useState();

  const { id } = useParams();
  console.log(id);

  const getInfo = async () => {
    const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setListingData(data);
    console.log(data);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <p>helloooo</p>
    </>
  );
}
