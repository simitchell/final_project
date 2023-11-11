import React from "react";
<<<<<<< HEAD
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======
import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> b52b86d (fixed child route rendering problem, now need to keep working on LogOut)
import { AuthProvider } from "./AuthContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import AboutUs from "./routes/aboutus";
import Cart from "./routes/cart";
import DisplayListingDetail from "./routes/listingdetail";
import EditListing from "./components/EditListing";
import HomePage from "./routes/home";
import HowItWorks from "./routes/howitworks";
import Listing from "./routes/createlisting";
import Login from "./routes/login";
import LogoutPage from "./components/LogOut";
import Profile from "./routes/profile";
import Register from "./routes/register";
import Root from "./routes/root"; // Adjust the path based on your project structure

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
<<<<<<< HEAD
        path: "", // Change this to a different path, e.g., "/home"
        element: <HomePage />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "createlisting",
        element: <Listing />,
      },
      {
        path: "editlisting/:id",
        element: <EditListing />,
      },
      {
        path: "howitworks",
        element: <HowItWorks />,
      },
      {
        path: "listingdetail/:id",
        element: <DisplayListingDetail />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <LogoutPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "register",
=======
        index: true, // Change this to a different path, e.g., "/home"
        element: <HomePage />,
      },
      {
        path: "aboutus/",
        element: <AboutUs />,
      },
      {
        path: "cart/",
        element: <Cart />,
      },
      {
        path: "createlisting/",
        element: <Listing />,
      },
      {
        path: "editlisting/:id/",
        element: <EditListing />,
      },
      {
        path: "howitworks/",
        element: <HowItWorks />,
      },
      {
        path: "listingdetail/:id/",
        element: <DisplayListingDetail />,
      },
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "logout/",
        element: <LogoutPage />,
      },
      {
        path: "profile/",
        element: <Profile />,
      },
      {
        path: "register/",
>>>>>>> b52b86d (fixed child route rendering problem, now need to keep working on LogOut)
        element: <Register />,
      },
    ],
  },
]);

<<<<<<< HEAD
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Root>
                <Route index element={<HomePage />} />
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="cart" element={<Cart />} />
                <Route path="createlisting" element={<Listing />} />
                <Route path="editlisting/:id" element={<EditListing />} />
                <Route path="howitworks" element={<HowItWorks />} />
                <Route
                  path="listingdetail/:id"
                  element={<DisplayListingDetail />}
                />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<LogoutPage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="register" element={<Register />} />
              </Root>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Use createRoot and render
createRoot(document.getElementById('root')).render(
=======
// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Root>
//                 <Route index element={<HomePage />} />
//                 <Route path="aboutus" element={<AboutUs />} />
//                 <Route path="cart" element={<Cart />} />
//                 <Route path="createlisting" element={<Listing />} />
//                 <Route path="editlisting/:id" element={<EditListing />} />
//                 <Route path="howitworks" element={<HowItWorks />} />
//                 <Route
//                   path="listingdetail/:id"
//                   element={<DisplayListingDetail />}
//                 />
//                 <Route path="login" element={<Login />} />
//                 <Route path="logout" element={<LogoutPage />} />
//                 <Route path="profile" element={<Profile />} />
//                 <Route path="register" element={<Register />} />
//               </Root>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

ReactDOM.createRoot(document.getElementById("root")).render(
>>>>>>> b52b86d (fixed child route rendering problem, now need to keep working on LogOut)
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
