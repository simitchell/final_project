import { useLoaderData, Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { LogoSVGTagline } from "../../public/FoxBodySwapMeetLogoTagline";
import Footer from "../components/Footer/Footer";
import MainNav from "../components/NavBar";
import { Logo, StyleRoot } from "../components/GlobalStyles/StyleRoot";
import { AuthProvider } from "../AuthContext";
import { Main } from "../components/GlobalStyles/StyleMain";

export default function Root() {
  return (
    <AuthProvider>
      <MainNav />
      <StyleRoot>
        <Link to="/">
          <Logo>{LogoSVGTagline}</Logo>
        </Link>
      </StyleRoot>
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </AuthProvider>
  );
}
