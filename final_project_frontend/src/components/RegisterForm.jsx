import { API_BASE_URL } from "../config";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Form } from "./GlobalStyles/StyleUtility";
// import { Button } from "./GlobalStyles/StyleUtility";
import Button from "@mui/material/Button";
import { Link, useRevalidator, Navigate } from "react-router-dom";
import StateSelect from "./StateSelect";

export default function RegisterForm() {
  const auth = localStorage.getItem("access_token");
  const revalidator = useRevalidator();
  // const navigate = Navigate();
  const updateForm = useRef(null);
  const [errors, setErrors] = useState([]);
  // Turnstile's implicit-render widget inserts its own hidden
  // "cf-turnstile-response" input into the form once a human passes the
  // check, so handleSubmit doesn't need to read this directly — it's only
  // used to disable the submit button until that's happened.
  const [turnstileVerified, setTurnstileVerified] = useState(false);

  useEffect(() => {
    // The widget calls this by name (set via data-callback below), since
    // implicit rendering reads it as a string, not a React closure.
    window.onTurnstileVerified = () => setTurnstileVerified(true);
    return () => {
      delete window.onTurnstileVerified;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData(updateForm.current);

    const url = `${API_BASE_URL}/register/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });

    if (!response.ok) {
      // DRF returns field-keyed error arrays, e.g. {"password": ["too short"]}.
      let messages = ["Registration failed. Please try again."];
      try {
        const body = await response.json();
        const collected = Object.values(body).flat();
        if (collected.length) messages = collected.map(String);
      } catch {
        // non-JSON error response; keep the generic message
      }
      setErrors(messages);
      return;
    }

    updateForm.current.reset();
    revalidator.revalidate;
    alert("New user created successfully");
    window.location.href = "/";
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)} ref={updateForm}>
      <h2>Register a new user</h2>
      <h3>
        Once you're registered as a member of Fox Body Swap Meet, you'll be
        redirected to our login page where you make your first login and get
        started
      </h3>
        <label>Username</label>
        <input type="text" name="username" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>Password</label>
        <input type="password" name="password" />
        <label>State</label>
        <StateSelect />
        <small>
          Optional. Your state is shown on your listings so buyers know roughly
          where you are.
        </small>
        {/* Honeypot: hidden from sighted/keyboard users via CSS + tabIndex,
            not type="hidden", since bots specifically skip type="hidden"
            fields. Real users never see or fill this; bots that auto-fill
            every input on the page do. */}
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex="-1"
            autoComplete="off"
          />
        </div>
        <div
          className="cf-turnstile"
          data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
          data-callback="onTurnstileVerified"
        />
        {errors.length > 0 && (
          <ul style={{ color: "red", margin: "0.5rem 0", paddingLeft: "1.25rem" }}>
            {errors.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        )}
        <Button variant="contained" type="submit" disabled={!turnstileVerified}>
          Register User
        </Button>
        <p>
          <Link to="/Login">Login</Link> for existing users
        </p>
      </Form>
    </>
  );
}

//
