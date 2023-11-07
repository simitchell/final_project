import { CardContainer } from "./GlobalStyles/CardStyle";
import { useState, useEffect } from "react";
import React from "react";

export default function ListingDetail() {
  const [listingData, setListingData] = useState();

  const getInfo = async () => {
    const apiUrl = "http://127.0.0.1:8000/listing/";
    const response = await fetch(apiUrl);
    const data = await response.json();
    setListingData(data);
  };

  useEffect(() => {
    getInfo();
  });

  return (
    <>
      <p>henlo</p>
    </>
  );
}
