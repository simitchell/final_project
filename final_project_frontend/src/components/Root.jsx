import { AuthProvider } from "../AuthContext";
import StyleRoot from "./GlobalStyles/StyleRoot";
import { Outlet } from "react-router-dom";

export default function RootComponent() {
  return (
    <div>
      <StyleRoot>
        <Outlet />
      </StyleRoot>
    </div>
  );
}
