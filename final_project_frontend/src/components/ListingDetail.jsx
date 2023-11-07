import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { CardContainer } from "./GlobalStyles/CardStyle";

// const INITIAL_DATA = {
//   description: string,
//   id: number,
//   price: number,
//   title: string,
//   user: number,
//   username: string,
// };

export default function ListingDetail() {
  const [listingDetail, setListingDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  console.log(id);

  const getIndividualListing = async () => {
    try {
      const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setListingDetail(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIndividualListing();
  }, []);

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
                  <div>
                    <p>this will be an image</p>
                  </div>
                  <div className="returnInfo">
                    <span>
                      <strong>Title: </strong>
                      {listingDetail.title}
                    </span>
                    <span>
                      <strong>Price: </strong>${listingDetail.price}
                    </span>
                    <span>
                      <strong>Description: </strong>
                      {listingDetail.description}
                    </span>
                    <span>
                      <strong>User: </strong>
                      {listingDetail.username}
                    </span>
                  </div>
                </div>
              </div>
            </CardContainer>
          ) : (
            <div>no detail found</div>
          )}
        </div>
      )}
    </>
  );
}
