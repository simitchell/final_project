import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Text } from "./GlobalStyles/StyleText";

export default function LogoutPage() {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  console.log(setIsAuth());

  const performLogout = async () => {
    const url = "http://localhost:8000/logout/";
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ refresh_token }),
      });

      localStorage.clear();
      setIsAuth(false);
    } catch (error) {
      console.error("ERROR", error);
    }
    navigate(`/`);
    location.reload();
  };

  useEffect(() => {
    performLogout();
  }, [navigate, setIsAuth]);

  return (
    <Text>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
      <Link to="/">Login</Link>
    </Text>
  );
}
