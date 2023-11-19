import { CardContainer } from "./GlobalStyles/StyleCard";
import { useState, useEffect } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DisplayListingsContainer } from "./GlobalStyles/StyleDisplayListing";
import CircularProgress from "@mui/material/CircularProgress";


export default function DisplayListings() {
  const [listingData, setListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getInfo = async () => {
    try {
      const apiUrl = "postgres://sammitchell:cQc7uacNpT5cV5k7J9YovTeUCBDxWaqB@dpg-ckvsjhj5a8kc73fst640-a.ohio-postgres.render.com/fox_body_swap_meet/listing/";
      const response = await fetch(apiUrl);
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
        <CircularProgress />
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
