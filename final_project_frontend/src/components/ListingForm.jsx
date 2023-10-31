import { useState } from "react";
import { Button } from "./StyleButtons";
import { Form } from "./StyleForm";

export default function ListingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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
    console.log("here");
    e.preventDefault();
    const listing = {
      title,
      description,
      price,
    };

    const url = "http://127.0.0.1:8000/listing/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    }).then((response) => response.json());
    console.log("DATA IS: ", data);

    return data;
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
