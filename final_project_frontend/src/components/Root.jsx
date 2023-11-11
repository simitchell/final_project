import StyleRoot from "./GlobalStyles/StyleRoot";
import { Outlet } from "react-router-dom";
<<<<<<< HEAD
=======

// const Root = ({ children }) => {
//   return (
//     <div>
//       <Outlet />
//     </div>
//   );
// };
>>>>>>> b52b86d (fixed child route rendering problem, now need to keep working on LogOut)

const Root = ({ children }) => {
  return (
    <div>
<<<<<<< HEAD
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
=======
      <StyleRoot>
      <h1>Fox Body Swap Meet</h1>
      <h2>For enthusiasts, by enthusiasts</h2>
    </StyleRoot>
    {/* <Outlet /> */}
    </div>
  );
};
>>>>>>> b52b86d (fixed child route rendering problem, now need to keep working on LogOut)
