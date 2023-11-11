import StyleRoot from "./GlobalStyles/StyleRoot";
import { Outlet } from "react-router-dom";

const Root = ({ children }) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

// export default function RootComponent() {
//   return (
//     <div>
//       <StyleRoot>
//       <h1>Fox Body Swap Meet</h1>
//       <h2>For enthusiasts, by enthusiasts</h2>
//     </StyleRoot>
//     <Outlet />
//     </div>
//   );
// };
