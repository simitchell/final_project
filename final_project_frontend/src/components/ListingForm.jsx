import { useRef, useState } from "react";
import { useRevalidator, useNavigate } from "react-router-dom";
// import { Button } from "../components/GlobalStyles/StyleUtility";
import Button from "@mui/material/Button";
import { Form } from "../components/GlobalStyles/StyleUtility";
import { CreateListingContainer } from "./GlobalStyles/StyleCreateListing";
import Alert from "@mui/material/Alert";

export default function ListingForm() {
  const auth = localStorage.getItem("access_token");
  const revalidator = useRevalidator();
  const updateForm = useRef(null);
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm.current);
    // console.log(formData);

    const url = "http://127.0.0.1:8000/listing/";
    const data = await fetch(url, {
      method: "POST",
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
    // window.location.href = "/profile/";
  };

  return (
    <CreateListingContainer>
      <div className="createListingWrapper">
        <div className="createListingIntro">
          <h2>Got some fox body stuff for sale?</h2>
          <h3>Get started liquidating that stockpile today!</h3>
          <ul>
            <li>Fill out the form</li>
            <li>Put it up for sale</li>
            <li>Get paid!</li>
          </ul>
        </div>
        <div className="createListingForm">
          <h2>Create a listing</h2>
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
            <Button variant="contained" type="submit">
              Post Listing
            </Button>

            {alert ? (
              <Alert severity="success">
                Listing created successfully!
              </Alert>
            ) : (
              <></>
            )}
          </Form>
        </div>
      </div>
    </CreateListingContainer>
  );
}
