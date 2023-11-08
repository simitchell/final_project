import { CardContainer } from "./GlobalStyles/CardStyle";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { DisplayListingsContainer } from "./GlobalStyles/DisplayListingStyle";

export default function DisplayListings() {
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

  return (
    <DisplayListingsContainer>
      <div className="listingHeader">
        <h2>Current Listings</h2>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {listingData ? (
            <CardContainer>
              {listingData.map((listing, index) => (
                <Link to={`/listingdetail/${listing.id}`} key={listing.id}>
                  <div key={index} className="card">
                    <h2>{listing.title}</h2>
                    <div className="cardInfo">
                      <div className="cardImage">
                        <img src={listing.image_url} />
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
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContainer>
          ) : (
            <div>No data found</div>
          )}
        </div>
      )}
    </DisplayListingsContainer>
  );
}
