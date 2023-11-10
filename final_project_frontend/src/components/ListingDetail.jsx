import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/GlobalStyles/StyleUtility";
import { CardContainer } from "./GlobalStyles/StyleCard";
import { DetailCard } from "./GlobalStyles/StyleListingDetail";

export default function ListingDetail() {
  const auth = localStorage.getItem("access_token");
  const [listingDetail, setListingDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const getIndividualListing = async () => {
    try {
      const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setListingDetail(data);
      //   console.log(data);
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIndividualListing();
  }, []);

  useEffect(() => {
    if (edit === true) {
      handleEdit();
    }
  }, [edit]);

  const handleDelete = () => {
    const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
    const data = fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    setListingDetail(null);
    navigate("/profile", { listingDetail });
  };
  // console.log(edit);

  const handleEdit = () => {
    // console.log("inside");
    // const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
    // const data = fetch(apiUrl, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${auth}`,
    //   },
    // });
    navigate(`/editlisting/${id}`);
  };

  return (
    <DetailCard>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {listingDetail ? (
            <div>
              <div className="detailCard">
                <h2>{listingDetail.title}</h2>
                <div className="detailBody">
                  <div className="detailImage">
                    <img src={listingDetail.image_url} />
                  </div>
                  <div className="detailInfo">
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
            </div>
          ) : (
            <div>No detail found</div>
          )}
        </div>
      )}
      <div className="listingOptions">
        <Button type="button" id="editButton" onClick={() => setEdit(true)}>
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
    </DetailCard>
  );
}
