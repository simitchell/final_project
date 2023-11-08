import { Button } from "./GlobalStyles/UtilityStyles";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { CardContainer } from "./GlobalStyles/CardStyle";

export default function ListingDetail() {
  const [listingDetail, setListingDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();
  //   console.log(id);

  const getIndividualListing = async () => {
    try {
      const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setListingDetail(data);
      //   console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIndividualListing();
  }, []);

  const handleDelete = () => {
    // confirm("Are you sure?  Deleting a listing is permanent.");
    const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
    const data = fetch(apiUrl, {
      method: "DELETE",
      headers: {
        // Authorization: `Bearer ${auth}`,
      },
    });
    setListingDetail(null);
    navigate("/profile", { listingDetail });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {listingDetail ? (
            <CardContainer>
              <div className="card">
                <h2>{listingDetail.title}</h2>
                <div className="cardInfo">
                  <div className="cardImage">
                    <img src={listingDetail.image_url} />
                  </div>
                  <div className="returnInfo">
                    {/* <span>
                      <strong>Title: </strong>
                      {listingDetail.title}
                    </span> */}
                    <span>
                      <strong>Price: </strong>${listingDetail.price}
                    </span>
                    <span>
                      <strong>Description: </strong>
                      {listingDetail.description}
                    </span>
                    <span>
                      <strong>Seller: </strong>
                      {listingDetail.username}
                    </span>
                  </div>
                </div>
              </div>
            </CardContainer>
          ) : (
            <div>No detail found</div>
          )}
        </div>
      )}
      <div className="listingOptions">
        <Button type="button" id="editButton">
          Edit
        </Button>
        <Button
          type="button"
          id="deleteButton"
          onClick={() => {
            if (confirm("Are you sure you wish to delete this item?")) {
              handleDelete();
            }
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
