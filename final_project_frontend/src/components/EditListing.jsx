import { API_BASE_URL } from "../config";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "../components/GlobalStyles/StyleUtility";
import Alert from "@mui/material/Alert";
import {
  ButtonContainer,
  DeleteButton,
  EditListingCard,
  EditListingHeader,
  UpdateButton,
} from "./GlobalStyles/StyleEditListing";


export default function EditListing() {
  const auth = localStorage.getItem("access_token");
  const [listingDetail, setListingDetail] = useState(null);
  const navigate = useNavigate();
  const updateForm = useRef(null);
  const [alert, setAlert] = useState(false);

  const { id } = useParams();

  const getIndividualListing = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/listing/${id}/`;
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
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(updateForm.current);
  const url = `${API_BASE_URL}/listing/${id}/`;
  const data = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
    body: formData,
  });
  updateForm.current.reset();
  navigate(`/listingdetail/${id}`);
};

  const handleDelete = async () => {
    const apiUrl = `${API_BASE_URL}/listing/${id}/`;
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
        navigate("/profile");
      } else {
        console.error("Failed to delete listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

 return (
  <>
    {listingDetail?.username === localStorage.getItem("username") && (
      <EditListingCard>
        <EditListingHeader>Update Your Listing</EditListingHeader>
        <Form onSubmit={(e) => handleSubmit(e)} ref={updateForm}>
          <label>Listing Title</label>
          <input type="text" name="title" />
          <label>Price</label>
          <input type="number" name="price" />
          <label>Description</label>
          <textarea type="text" name="description" maxLength="250" />
          <label>Condition</label>
          <select name="condition" value={listingDetail?.condition} onChange={() => {}}>
            <option value="new">New</option>
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
          <label>Upload Image</label>
          <input
            type="file"
            name="image_url"
            accept="image/jpeg, image/png, image/gif"
          />
          <input type="hidden" name="user" value={localStorage.getItem("userId")} />
          <input type="hidden" name="username" value={localStorage.getItem("username")} />
          <ButtonContainer>
            <UpdateButton type="submit">Update Listing</UpdateButton>
            {listingDetail && (
              <DeleteButton
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you wish to delete this item?")) {
                    handleDelete();
                  }
                }}
              >
                Delete Listing
              </DeleteButton>
            )}
          </ButtonContainer>
          {alert && <Alert severity="success">Listing updated successfully!</Alert>}
        </Form>
      </EditListingCard>
    )}
  </>
);
}