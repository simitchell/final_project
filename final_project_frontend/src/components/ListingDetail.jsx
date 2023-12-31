import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { ProgressDiv } from "./GlobalStyles/StyleUtility";

// import DeleteIcon from '@mui/icons-material/Delete';
// import Stack from '@mui/material/Stack';

import {
  DetailDescription,
  DetailImage,
  DetailLeft,
  DetailPrice,
  DetailRight,
  DetailSeller,
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
      const apiUrl = `https://fox-body-swap-meet-db.onrender.com/listing/${id}/`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      // console.log(data);
      setListingDetail(data);
      // console.log(listingDetail);
    } catch (error) {
      console.error("Error fetching listing:", error);
    } finally {
      setIsLoading(false);
    }
    // console.log(listingDetail);
  };

  useEffect(() => {
    getIndividualListing();
  }, []);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setAlert(true);

    const url = `https://fox-body-swap-meet-db.onrender.com/cart/`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
          // "Accept": "application/json"
        },
        body: JSON.stringify({
          user_id: parseInt(localStorage.getItem("userId")),
          cart_item: listingDetail.title,
          image_url: listingDetail.image_url,
          price: listingDetail.price,
        }),
      });

      if (response.ok) {
        setListingDetail(listingDetail);
        updateForm.current.reset();
        useRevalidator.revalidate();
        // navigate("/cart");
      } else {
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
        <>
          <DetailWrapper>
            <DetailLeft>
              {listingDetail ? (
                <DetailImage>
                  <img
                    src={listingDetail.image_url}
                    alt={listingDetail.title}
                  />
                </DetailImage>
              ) : (
                <div>No detail found</div>
              )}
            </DetailLeft>
            <DetailRight>
              {listingDetail ? (
                <>
                  <h2>{listingDetail.title}</h2>
                  <DetailDescription>
                    <p>{listingDetail.description}</p>
                  </DetailDescription>
                  <DetailSeller>
                    <div>
                      <h3>Seller</h3>
                      <p>{listingDetail.username}</p>
                    </div>
                    <div>
                      <h3>Price</h3>
                      <p>${listingDetail.price}</p>
                    </div>
                  </DetailSeller>
                  {listingDetail.username !== localStorage.getItem("username") && (
                    <>
                      <Button
                        variant="contained"
                        type="button"
                        id="addToCartButton"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                      {alert ? (
                        <Alert severity="success">Added to your cart!</Alert>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div>No detail found</div>
              )}
            </DetailRight>
          </DetailWrapper>
        </>
      )}
    </>
  );
  
}
