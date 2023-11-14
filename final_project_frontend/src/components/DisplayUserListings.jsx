import { CardContainer } from "./GlobalStyles/StyleCard";
import { useState, useEffect } from "react";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useLocation } from "react-router-dom";

export default function DisplayUserListings() {
  const [listingData, setListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getInfo = async () => {
    // console.log("here");
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
  }, [location.pathname, location.state]);

  // Filter listings created by user_id
  const filteredListings = listingData.filter(
    (listing) => listing.username === localStorage.getItem("username")
  );

  // console.log(filteredListings);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />      ) : (
        <CardContainer>
          {filteredListings.map((listing, index) => (
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
      )}
      {isLoading
        ? null
        : filteredListings.length === 0 && <div>No data found</div>}
    </div>
  );
}
