import { useLoaderData, Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import MainNav from "../components/navbar";
import { StyleRoot } from "../components/StyleRoot";

export default function Root() {
  return (
    <>
      <MainNav />
      <StyleRoot>
        <h1>Fox Body Swap Meet</h1>
        <h2>For enthusiasts, by enthusiasts</h2>
      </StyleRoot>
      <div>
        <Outlet />
      </div>
    </>
  );
}
