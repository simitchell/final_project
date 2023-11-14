import { AuthProvider } from "../AuthContext";
import StyleRoot from "./GlobalStyles/StyleRoot";
import { Outlet } from "react-router-dom";



export default function RootComponent() {
  return (
    <div>
      <StyleRoot>
        {/* <h1>Fox Body Swap Meet</h1>
        <h2>For enthusiasts, by enthusiasts</h2> */}
      </StyleRoot>
      {/* <AuthProvider> */}
        <Outlet />
      {/* </AuthProvider> */}
    </div>
  );
}
