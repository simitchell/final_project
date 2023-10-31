import React from "react";
import ReactDOM from "react-dom/client";
import AboutUs from "./routes/aboutus";
import Cart from "./routes/cart";
import Listing from "./routes/createlisting";
import Login from "./routes/login";
import Home from "./routes/home";
import HowItWorks from "./routes/howitworks";
import Root from "./routes/root";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateListing from "./routes/createlisting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
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
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
