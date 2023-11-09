import { useEffect, useRef, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { Button } from "./GlobalStyles/UtilityStyles";
import { Form } from "./GlobalStyles/UtilityStyles";
import { CreateListingContainer } from "./GlobalStyles/CreateListingStyle";

export default function EditListing() {
  const auth = localStorage.getItem("access_token");
  const [listingDetail, setListingDetail] = useState(null);
  const revalidator = useRevalidator();
  const updateForm = useRef(null);

  const getIndividualListing = async () => {
    try {
      const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setListingDetail(data);
        console.log(data);
        console.log(listingDetail);
    } catch (error) {
      // console.log(error);
    } finally {
    //   setIsLoading(false);
    }
  };

  useEffect(() => {
    getIndividualListing();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm.current);
    // console.log(formData);

    const url = `http://127.0.0.1:8000/listing/${id}/`;
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
    alert("Listing updated successfully");
    // location.reload();
  };

  return (
    <>
      <div>
        <div className="updateListingForm">
          <h2>Update Your listing</h2>
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
            <Button type="submit">Post Listing</Button>
          </Form>
        </div>
      </div>
    </>
  );
}