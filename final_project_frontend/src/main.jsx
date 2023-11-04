import React from "react";
import ReactDOM from "react-dom/client";
import AboutUs from "./routes/aboutus";
import Cart from "./routes/cart";
import Listing from "./routes/createlisting";
import Login from "./routes/login";
import HomePage from "./routes/home";
import HowItWorks from "./routes/howitworks";
import Profile from "./routes/profile";
import Register from "./routes/register";
import Root from "./routes/root";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/createlisting",
        element: <Listing />,
      },
      {
        path: "/howitworks",
        element: <HowItWorks />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        // element: <LogoutPage />,
        // loader: logoutLoader,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
