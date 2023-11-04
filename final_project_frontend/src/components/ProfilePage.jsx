import { CardContainer } from "./GlobalStyles/CardStyle";
import { useState, useEffect } from "react";
import React from "react";

export default function ProfilePage() {
  //   const [info, setInfo] = useState("");
  const [listingData, setListingData] = useState([]);

  const getInfo = async () => {
    const apiUrl = "http://127.0.0.1:8000/listing/";
    const response = await fetch(apiUrl);
    const data = await response.json();
    setListingData(data);
  };

  useEffect(() => {
    getInfo();
  }, []);

  //   Only log listingData when you need to
  //   console.log(listingData);

  return (
    <CardContainer>
      <p>Profile Page</p>
      {listingData.map((listing, index) => {
        console.log({ listing });
        return (
          <div key={index} className="card">
            <h2>{listing.title}</h2>
            <div className="cardInfo">
              <div>
                <p>this will be an image</p>
              </div>
              <div className="returnInfo">
                <span>
                  <strong>Title: </strong>
                  {listing.title}
                </span>
                <span>
                  <strong>Price: </strong>
                  {listing.price}
                </span>
                <span>
                  <strong>Description: </strong>
                  {listing.description}
                </span>
                <span>
                  <strong>User: </strong>
                  {listing.user}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </CardContainer>
  );
}
