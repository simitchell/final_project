import { API_BASE_URL } from "../config";
import {
  CardContainer,
  Card,
  PriceBadge,
  ConditionDot,
  NoDataDiv,
} from "./GlobalStyles/StyleCard";
import { useState, useEffect } from "react";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useLocation } from "react-router-dom";
import {
  DisplayListingsContainer,
  ProgressDiv,
} from "./GlobalStyles/StyleDisplayListing";
import conditionColor from "../utils/conditionColor";

export default function DisplayUserListings() {
  const [listingData, setListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getInfo = async () => {
    // console.log("here");
    try {
      const apiUrl = `${API_BASE_URL}/listing/`;
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
    (listing) => listing.username === localStorage.getItem("username"),
  );

  // console.log(filteredListings);

  return (
    <DisplayListingsContainer>
      <div className="listingHeader">
        <h2>Your Listings</h2>
      </div>
      {isLoading ? (
        <ProgressDiv>
          <CircularProgress />
        </ProgressDiv>
      ) : (
        <CardContainer>
          {filteredListings.map((listing) => (
            <Link to={`/listingdetail/${listing.id}`} key={listing.id}>
              <Card>
                <div className="cardImage">
                  <img src={listing.image_url} alt={listing.title} />
                </div>
                <div className="cardBody">
                  <h2>{listing.title}</h2>
                  <div className="cardMeta">
                    <PriceBadge>${listing.price}</PriceBadge>
                    <span className="conditionRow">
                      <ConditionDot color={conditionColor(listing.condition)} />
                      {listing.condition}
                    </span>
                  </div>
                  <p className="seller">{listing.username}</p>
                </div>
              </Card>
            </Link>
          ))}
        </CardContainer>
      )}
      {isLoading
        ? null
        : filteredListings.length === 0 && <NoDataDiv>No data found</NoDataDiv>}
    </DisplayListingsContainer>
  );
}
