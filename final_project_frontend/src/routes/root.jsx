import { useLoaderData, Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import MainNav from "../components/navbar";

export default function Root() {
  return (
    <>
      <MainNav />
      <h1>Fox Body Swap Meet</h1>
      <h2>For enthusiasts, by enthusiasts</h2>
      <Outlet />
    </>
  );
}
