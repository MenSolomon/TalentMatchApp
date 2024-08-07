// import React from "react";
// import { Button, Icon } from "@mui/material";
// import "@fontsource/material-icons";
// import Loadable from "react-loadable";
// import CircularProgress from "@mui/material/CircularProgress";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
// import { HomeMax } from "@mui/icons-material";

// // Function to load the @fontsource/material-icons dynamically

// const NavBarButton = ({ ButtonName, ButtonImage, path, buttonStyle }) => {
//   const navigate = useNavigate();
//   const themeProviderObject = useSelector(selectThemeProviderObject);
//   const { buttonColor } = themeProviderObject;

//   // <CircularProgress sx={{ width: 5, height: 5 }} />
//   const LoadableIcon = Loadable({
//     loader: () => import("@mui/material/Icon").then((module) => module.default), // Dynamic import
//     loading: () => <HomeMax style={{ color: buttonColor }} />,
//   });

//   // For now, all the menu buttons navigate to the homepage
//   const handleNavigate = () => {
//     navigate(`/`);
//   };

//   // Use createTheme from api to create a theme for the page

//   return (
//     <NavLink to={path}>
//       <Button
//         className="NavBarBtns"
//         style={{
//           ...buttonStyle,
//           fontSize: ".9em",
//           fontWeight: "600",
//           textTransform: "none",
//           paddingRight: "5vw",
//           // color: buttonColor,
//         }}
//         startIcon={<LoadableIcon>{ButtonImage}</LoadableIcon>}
//         onClick={handleNavigate}
//       >
//         {ButtonName}
//       </Button>
//     </NavLink>
//   );
// };

// export default NavBarButton;

import { Button } from "@mui/material";
import "@fontsource/material-icons";
import Icon from "@mui/material/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import {
  CompareArrows,
  DoorBack,
  Favorite,
  Help,
  Home,
  MonitorOutlined,
  Newspaper,
  Settings,
  Star,
} from "@mui/icons-material";

const iconStyle = {
  color: "#5585FE",
};

const NavBarButton = ({ ButtonName, ButtonImage, path, buttonStyle }) => {
  const navigate = useNavigate();

  // For now all the menu buttons navigate to the homepage
  const handleNavigate = () => {
    navigate(`/`);
  };

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { buttonColor } = themeProviderObject;

  // Use createtheme from api to create theme for page

  return (
    <NavLink to={path}>
      <Button
        className="NavBarBtns"
        style={{
          ...buttonStyle,
          fontSize: ".9em",
          fontWeight: "600",
          textTransform: "none",
          paddingRight: "5vw",
          // color: buttonColor,
        }}
        startIcon={
          ButtonName === "Home" ? (
            <Home sx={{ color: buttonColor }} />
          ) : ButtonName === "Favourite" ? (
            <Favorite sx={{ color: buttonColor }} />
          ) : ButtonName === "News" ? (
            <Newspaper sx={{ color: buttonColor }} />
          ) : ButtonName === "Comparison" ? (
            <CompareArrows sx={{ color: buttonColor }} />
          ) : ButtonName === "Help" ? (
            <Help sx={{ color: buttonColor }} />
          ) : ButtonName === "Settings" ? (
            <Settings sx={{ color: buttonColor }} />
          ) : ButtonName === "View Stats" ? (
            <MonitorOutlined sx={{ color: buttonColor }} />
          ) : ButtonName === "Logout" ? (
            <DoorBack sx={{ color: buttonColor }} />
          ) : (
            <Star sx={{ color: buttonColor }} />
          )
        }
        onClick={handleNavigate}
      >
        {ButtonName}
      </Button>
    </NavLink>
  );
};

export default NavBarButton;

// {
//   path === "/" ?

// }
//   { name === "Home", icon: "home", path: "/" },
// // The none values are for the savedFilters which is an accordion and not a button.. skipped over it in the map
// { name === "none", icon: "none" },
// { name === "Favourite", icon: "favorite", path: "/favorite" },
// // { name === "Community", icon: "people", path: "/community" },
// { name === "News", icon: "comment", path: "/news" },
// {
// name === "Comparison",
// icon: "compare_arrows",
// path: "/player-compare",
// },
