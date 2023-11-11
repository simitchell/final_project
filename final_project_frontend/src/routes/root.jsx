import { useLoaderData, Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import MainNav from "../components/NavBar";
import { StyleRoot } from "../components/GlobalStyles/StyleRoot";
import { AuthProvider } from "../AuthContext";

export default function Root() {
  return (
    <>
      <MainNav />
      <StyleRoot>
        <h1>Fox Body Swap Meet</h1>
        <h2>For enthusiasts, by enthusiasts</h2>
      </StyleRoot>
<<<<<<< HEAD
      {/* <Outlet /> */}
=======
      <AuthProvider>
      <Outlet />
      </AuthProvider>
>>>>>>> b52b86d (fixed child route rendering problem, now need to keep working on LogOut)
      <Footer />
    </>
  );
}
