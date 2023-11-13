import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/GlobalStyles/StyleUtility";
import { DetailCard } from "./GlobalStyles/StyleListingDetail";

export default function ListingDetail() {
  const auth = localStorage.getItem("access_token");
  const [listingDetail, setListingDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  const getIndividualListing = async () => {
    try {
      const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      // console.log(data);
      setListingDetail(data);
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

    const url = `http://127.0.0.1:8000/cart/`;
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
        }),
      });

      if (response.ok) {
        console.log("Added to cart successfully!");
        setListingDetail(null);
      } else {
        console.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      if (response.ok) {
        setListingDetail(null);
        navigate("/profile");
      } else {
        console.error("Failed to delete listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <DetailCard>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {listingDetail ? (
            <div className="detailWrapper">
              <div className="detailCard">
                <div className="detailBody">
                  <div className="detailImage">
                    <img
                      src={listingDetail.image_url}
                      alt={listingDetail.title}
                    />
                  </div>
                  <div className="detailInfo">
                    <h2>{listingDetail.title}</h2>
                    <span>
                      <strong>Price: </strong>${listingDetail.price}
                    </span>
                    <span>
                      <strong>Seller: </strong>
                      {listingDetail.username}
                    </span>
                    <span>
                      <strong>Description: </strong>
                      {listingDetail.description}
                    </span>
                  </div>
                </div>
              </div>
              <div className="listingOptions">
                {listingDetail.username === localStorage.getItem("username") ? (
                  <div className="listingOptions">
                    <Button
                      type="button"
                      id="deleteButton"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this item?"
                          )
                        ) {
                          handleDelete();
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <div className="listingOptions">
                    <Button
                      type="button"
                      id="addToCartButton"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>No detail found</div>
          )}
        </div>
      )}
    </DetailCard>
  );
}
