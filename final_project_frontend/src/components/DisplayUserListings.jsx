import { CardContainer } from "./GlobalStyles/CardStyle";
import { useState, useEffect } from "react";
import React from "react";

export default function DisplayUserListings() {
  const [listingData, setListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getInfo = async () => {
    try {
      const apiUrl = "http://127.0.0.1:8000/listing/";
      const response = await fetch(apiUrl);
      const data = await response.json();
      setListingData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  // Filter listings created by user_id
  const filteredListings = listingData.filter(
    (listing) => listing.username === localStorage.getItem("username")
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CardContainer>
          {filteredListings.map((listing, index) => (
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
                    <strong>Price: </strong>${listing.price}
                  </span>
                  <span>
                    <strong>Description: </strong>
                    {listing.description}
                  </span>
                  <span>
                    <strong>User: </strong>
                    {listing.username}
                    {/* This displays the username of user_id=1 */}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContainer>
      )}
      {isLoading ? null : filteredListings.length === 0 && <div>No data found</div>}
    </div>
  );
}
