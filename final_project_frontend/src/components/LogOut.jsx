import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { AuthProvider } from "../AuthContext";

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

      if (response.status === 205) {
        localStorage.clear(); // Clear user data and tokens
        setIsAuth(false); // Update the authentication state
        navigate(`/`); // Redirect to the login page
      } else {
        console.error("ERROR", response.status, response.statusText);
        navigate(`/`); // Redirect to the login page even if an error occurs
      }
    } catch (error) {
      console.error("ERROR", error);
      navigate(`/`); // Redirect to the login page in case of an error
    }
  };

  useEffect(() => {
    performLogout();
  }, [navigate, setIsAuth]);

  return (
    <div>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
      <a href="/">Login</a>
    </div>
  );
}
