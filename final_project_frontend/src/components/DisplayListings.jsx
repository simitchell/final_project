import { CardContainer } from "./GlobalStyles/StyleCard";
import { useState, useEffect } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DisplayListingsContainer, ProgressDiv } from "./GlobalStyles/StyleDisplayListing";
import CircularProgress from "@mui/material/CircularProgress";

export default function DisplayListings() {
  const [listingData, setListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getInfo = async () => {
    try {
      const apiUrl = process.env.DB_HOST || "http://127.0.0.1:8000/listing/";      const response = await fetch(apiUrl);
      const data = await response.json();
      setListingData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, [location.state]);

  return (
    <DisplayListingsContainer>
      <div className="listingHeader">
        <h2>Current Listings</h2>
      </div>
      {isLoading ? (
        <ProgressDiv>
          <CircularProgress />
        </ProgressDiv>
      ) : (
        <div>
          {listingData ? (
            <CardContainer>
              {listingData.map((listing, index) => (
                <Link to={`/listingdetail/${listing.id}`} key={listing.id}>
                  <div key={index} className="card">
                    <h2>{listing.title}</h2>
                    <div className="cardInfo">
                      <div className="returnInfo">
                        <span>
                          <strong>Price: </strong>${listing.price}
                        </span>
                        <span>
                          <strong>Seller: </strong>
                          {listing.username}
                        </span>
                      </div>
                      <div className="cardImage">
                        <img src={listing.image_url} />
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
