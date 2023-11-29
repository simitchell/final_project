import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
// import { Button } from "../components/GlobalStyles/StyleUtility";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Form, ProgressDiv } from "../components/GlobalStyles/StyleUtility";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
    const url = "https://fox-body-swap-meet-db.onrender.com/token/";
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
      navigate("./profile");
      // console.log(userId);
    }
    if (access == undefined) {
      alert("You have entered an invalid username or password");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2>Log In</h2>
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
        <Button variant="contained" type="submit">
          Login
        </Button>
        <p>
          <Link to="./register">Register</Link> as a new user
        </p>
      </Form>
    </div>
  );
  
}
