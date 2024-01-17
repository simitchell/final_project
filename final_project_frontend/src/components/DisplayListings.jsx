import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  DisplayListingsContainer,
  ProgressDiv,
} from "./GlobalStyles/StyleDisplayListing";
import { CardContainer } from "./GlobalStyles/StyleCard";

export default function DisplayListings() {
  const [listingData, setListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getInfo = async () => {
    try {
      const apiUrl = "http://127.0.0.1:8000/listing/";
      const response = await fetch(apiUrl);
      console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

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
          {listingData.length > 0 ? (
            <CardContainer>
              {listingData.map((listing) => (
                <Link to={`/listingdetail/${listing.id}`} key={listing.id}>
                  <div className="card">
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
                        <img
                          src={"src/images/B303_Cam_gCa59sV.jpg"}
                          alt={listing.title}
                        />
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
