import { useRef } from "react";
import { useRevalidator } from "react-router-dom";
import { Button } from "../components/GlobalStyles/Styles";
import { Form } from "./GlobalStyles/Styles";

export default function ListingForm() {
  const auth = localStorage.getItem("access_token");
  const revalidator = useRevalidator();
  const updateForm = useRef(null);
  // console.log("hello, world");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm.current);
    console.log(formData);

    const url = "http://127.0.0.1:8000/listing/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });
    console.log(formData);
    console.log(data);
    updateForm.current.reset();
    revalidator.revalidate();
    alert("Listing created successfully");
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)} ref={updateForm}>
      <label>Listing Title</label>
      <input type="text" name="title" />
      <label>Description</label>
      <input type="text" name="description" />
      <label>Price</label>
      <input type="number" name="price" />
      <input type="hidden" name="user" value={localStorage.getItem("userId")} />
      <input
        type="hidden"
        name="username"
        value={localStorage.getItem("username")}
      />
      <Button type="submit">Post Listing</Button>
    </Form>
  );
}
