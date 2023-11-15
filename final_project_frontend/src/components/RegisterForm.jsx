import { useRef } from "react";
import React from "react";
import { Form } from "./GlobalStyles/StyleUtility";
// import { Button } from "./GlobalStyles/StyleUtility";
import Button from '@mui/material/Button';
import { useRevalidator, Navigate } from "react-router-dom";

export default function RegisterForm() {
  const auth = localStorage.getItem("access_token");
  const revalidator = useRevalidator();
  // const navigate = Navigate();
  const updateForm = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm.current);

    const url = "http://127.0.0.1:8000/register/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });
    updateForm.current.reset();
    revalidator.revalidate;
    alert("New user created successfully");
    window.location.href = "/";
  };

  return (
    <>
      <h2>Register a new user</h2>
      <h3>
        Once you're registered as a member of Fox Body Swap Meet, you'll be
        redirected to our login page where you make your first login and get
        started
      </h3>
      <Form onSubmit={(e) => handleSubmit(e)} ref={updateForm}>
        <label>Username</label>
        <input type="text" name="username" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>Password</label>
        <input type="password" name="password" />
        <Button type="submit">Register User</Button>
      </Form>
      <p>
        <a href="./Login">Login</a> for existing users
      </p>
    </>
  );
}

// 