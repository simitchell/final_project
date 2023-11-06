import { useRef } from "react";
import React from "react";
import { Form } from "./GlobalStyles/Styles";
import { Button } from "./GlobalStyles/Styles";
import { useRevalidator } from "react-router-dom";

export default function ProfileForm() {
  const auth = localStorage.getItem("access_token");
  const revalidator = useRevalidator();
  const updateForm = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm.current);
    console.log(formData);

    const url = "http://127.0.0.1:8000/profile/";
    const data = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });
    console.log(formData);
    console.log(data);
    updateForm.current.reset();
    revalidator.revalidate;
    // alert("Profile information updated successfully");
    // window.location.href = "/profile/";
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)} ref={updateForm}>
        <label>Email</label>
        <input type="email" name="email" />
        <label>Bio</label>
        <input type="text" name="bio" />
        <label>Address</label>
        <input type="text" name="address" />
        <label>Birthdate</label>
        <input type="date" name="birthdate" />
        <input
          type="hidden"
          name="user"
          value={localStorage.getItem("userId")}
        />
        <Button type="submit">Update Profile</Button>
      </Form>
    </>
  );
}
