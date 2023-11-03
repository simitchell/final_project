import React from "react";
import ReactDOM from "react-dom/client";
import AboutUs from "./routes/aboutus";
import Cart from "./routes/cart";
import Listing from "./routes/createlisting";
import Login from "./routes/login";
import HomePage from "./routes/home";
import HowItWorks from "./routes/howitworks";
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/howitworks",
        element: <HowItWorks />,
      },
      {
        path: "/createlisting",
        element: <Listing />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "logout/",
        // element: <LogoutPage />,
        // loader: logoutLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
