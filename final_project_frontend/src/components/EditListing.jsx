import { useEffect, useRef, useState } from "react";
import { useRevalidator, useParams, useNavigate } from "react-router-dom";
// import { Button } from "../components/GlobalStyles/StyleUtility";
import Button from "@mui/material/Button";
import { Form } from "../components/GlobalStyles/StyleUtility";
import { CreateListingContainer } from "./GlobalStyles/StyleCreateListing";
import Alert from "@mui/material/Alert";
import {
  ButtonContainer,
  EditListingHeader,
} from "./GlobalStyles/StyleEditListing";

export default function EditListing() {
  const auth = localStorage.getItem("access_token");
  const [listingDetail, setListingDetail] = useState(null);
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const updateForm = useRef(null);
  const [alert, setAlert] = useState(false);

  const { id } = useParams();

  const getIndividualListing = async () => {
    try {
      const apiUrl = `https://fox-body-swap-meet-db.onrender.com/listing/${id}/`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setListingDetail(data);
      // console.log(data);
      // console.log(listingDetail);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getIndividualListing();
  }, [listingDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm.current);
    console.log(formData);
    const url = `https://fox-body-swap-meet-db.onrender.com/listing/${id}/`;
    const data = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });
    // console.log(formData);
    // console.log(data);
    updateForm.current.reset();
    revalidator.revalidate();
    setAlert(true);
    // alert("Listing updated successfully");
    // location.reload();
    return data;
  };

  const handleDelete = async () => {
    const apiUrl = `https://fox-body-swap-meet-db.onrender.com/listing/${id}/`;
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      if (response.ok) {
        setAlert(true);
        setListingDetail(null);
        useNavigate("/profile");
      } else {
        console.error("Failed to delete listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <>
      <div>
        {listingDetail?.username === localStorage.getItem("username") && (
          <div className="updateListingForm">
            <EditListingHeader>Update Your listing</EditListingHeader>
            <Form onSubmit={(e) => handleSubmit(e)} ref={updateForm}>
              <label>Listing Title</label>
              <input type="text" name="title" />
              <label>Price</label>
              <input type="number" name="price" />
              <label>Description</label>
              <textarea type="text" name="description" maxLength="250" />
              <label>Upload Image</label>
              <input
                type="file"
                name="image_url"
                accept="image/jpeg, image/png, image/gif"
              />
              <input
                type="hidden"
                name="user"
                value={localStorage.getItem("userId")}
              />
              <input
                type="hidden"
                name="username"
                value={localStorage.getItem("username")}
              />
              <ButtonContainer>
                <Button
                  variant="contained"
                  sx={{ width: 200, padding: 1, margin: 3 }}
                  type="submit"
                >
                  Update Listing
                </Button>

                {alert ? (
                  <Alert severity="success">
                    Listing updated successfully!
                  </Alert>
                ) : (
                  <></>
                )}
                {listingDetail ? (
                  listingDetail.username ===
                    localStorage.getItem("username") && (
                    <div className="listingOptions">
                      <Button
                        variant="contained"
                        sx={{ width: 200, padding: 1, margin: 3 }}
                        color="error"
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
                        Delete Listing
                      </Button>
                    </div>
                  )
                ) : (
                  <div>No detail found</div>
                )}
              </ButtonContainer>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}
