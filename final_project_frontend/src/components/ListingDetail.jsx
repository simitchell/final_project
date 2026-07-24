import { API_BASE_URL } from "../config";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { ProgressDiv } from "./GlobalStyles/StyleUtility";
import conditionColor from "../utils/conditionColor";
import { ConditionDot } from "./GlobalStyles/StyleCard";

import {
  DetailDescription,
  DetailImage,
  DetailInfoCard,
  DetailLeft,
  DetailPrice,
  DetailRight,
  DetailSeller,
  DetailTitleBlock,
  DetailWrapper,
  ListingDetailHeader,
} from "./GlobalStyles/StyleListingDetail";

export default function ListingDetail() {
  const auth = localStorage.getItem("access_token");
  const [listingDetail, setListingDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const getIndividualListing = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/listing/${id}/`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setListingDetail(data);
    } catch (error) {
      console.error("Error fetching listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIndividualListing();
  }, []);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setAlert(true);

    const url = `${API_BASE_URL}/cart/`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(localStorage.getItem("userId")),
          cart_item: listingDetail.title,
          image_url: listingDetail.image_url,
          price: listingDetail.price,
          condition: listingDetail.condition,
        }),
      });

      if (!response.ok) {
        console.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ListingDetailHeader>Listing Detail</ListingDetailHeader>

      {isLoading ? (
        <ProgressDiv>
          <CircularProgress />
        </ProgressDiv>
      ) : (
        <DetailWrapper>
          <DetailLeft>
            {listingDetail ? (
              <DetailImage>
                <img src={listingDetail.image_url} alt={listingDetail.title} />
              </DetailImage>
            ) : (
              <div>No detail found</div>
            )}
          </DetailLeft>

          <DetailRight>
            {listingDetail ? (
              <>
                <DetailTitleBlock>
                  <h2>{listingDetail.title}</h2>
                </DetailTitleBlock>

                <DetailPrice>
                  <span>${listingDetail.price}</span>
                </DetailPrice>

                <DetailDescription>
                  <p className="label">Description</p>
                  <p className="body">{listingDetail.description}</p>
                </DetailDescription>

                <DetailInfoCard>
                  <div className="top-row">
                    <div className="cell">
                      <p className="label">Seller</p>
                      <p className="value">{listingDetail.username}</p>
                    </div>
                    <div className="cell condition">
                      <p className="label">Condition</p>
                      <div className="condition-row">
                        <ConditionDot color={conditionColor(listingDetail.condition)} />
                        <p className="value">{listingDetail.condition}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-row">
                    <p className="label">Listed by</p>
                    <div className="seller-row">
                      <div className="avatar">
                        {listingDetail.username?.slice(0, 2).toUpperCase()}
                      </div>
                      <p className="username">{listingDetail.username}</p>
                    </div>
                  </div>
                </DetailInfoCard>

                {listingDetail.username !==
                  localStorage.getItem("username") && (
                  <>
                    <Button
                      variant="contained"
                      fullWidth
                      type="button"
                      id="addToCartButton"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                    {alert && (
                      <Alert severity="success">Added to your cart!</Alert>
                    )}
                  </>
                )}
              </>
            ) : (
              <div>No detail found</div>
            )}
          </DetailRight>
        </DetailWrapper>
      )}
    </>
  );
}
