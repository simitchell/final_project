import { AuthProvider } from "../AuthContext";
import StyleRoot from "./GlobalStyles/StyleRoot";
import { Outlet } from "react-router-dom";

export default function RootComponent() {
  return (
    <div>
      {/* <AuthProvider> */}
        <StyleRoot>
          {/* <h1>Fox Body Swap Meet</h1>
        <h2>For enthusiasts, by enthusiasts</h2> */}
          <Outlet />
        </StyleRoot>
      {/* </AuthProvider> */}
    </div>
  );
}
