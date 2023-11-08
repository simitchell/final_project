import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
import { Button } from "./GlobalStyles/UtilityStyles";
import { Form } from "./GlobalStyles/UtilityStyles";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    const url = "http://localhost:8000/token/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((response) => response.json());
    // console.log("DATA IS:", data);
    const { access, refresh, userId } = data;
    // console.log(data);
    if (access !== undefined) {
      localStorage.clear();
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      window.location.href = "/profile/";
      // console.log(userId);
    }
    if (access == undefined) {
      alert("You have entered an invalid username or password");
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <Form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChangeUsername}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChangePassword}
        />
        <Button type="submit">Login</Button>
      </Form>
      <p>
        <a href="./register">Register</a> as a new user
      </p>
    </div>
  );
}
