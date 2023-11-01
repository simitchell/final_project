import { useRef } from "react";
import { useRevalidator } from "react-router-dom";
import { useState } from "react";
import { Button } from "./StyleButtons";
import { Form } from "./StyleForm";

export default function ListingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const auth = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const revalidator = useRevalidator();
  const updateForm = useRef(null);
  console.log({ userId });
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listing = {
      title,
      description,
      price,
      user_id: userId,
    };
    console.log({ listing });

    const url = "http://127.0.0.1:8000/listing/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify(listing),
    });
    revalidator.revalidate();
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <label>Listing Title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChangeTitle}
      />
      <label>Description</label>
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChangeDescription}
      />
      <label>Price</label>
      <input
        type="number"
        name="price"
        value={price}
        onChange={handleChangePrice}
      />
      <Button type="submit">Post Listing</Button>
    </Form>
  );
}
