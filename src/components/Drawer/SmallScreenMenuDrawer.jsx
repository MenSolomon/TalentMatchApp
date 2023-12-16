import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Close, Menu, PersonAddAlt1 } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import PlayerComparisonDrawerTab from "../Tabs/PlayerComparisonTab";
import NavBarButton from "../NavBarButtons/NavBarButton";
import CreateProfileModal from "../Modals/CreateProfileModal";
import {
  setLoginStatus,
  setUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import SavedFilters from "../MenuButtons/SavedFilters";
import logoImage from "../../assets/images/AppLogoBlue.png";

export default function SmallScreenMenuDrawer() {
  const [state, setState] = React.useState({
    right: false,
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuButtonsArray = [
    { name: "Home", icon: "home", path: "/" },
    // The none values are for the savedFilters which is an accordion and not a button.. skipped over it in the map
    { name: "none", icon: "none" },
    { name: "Favourite", icon: "favorite", path: "/favorite" },
    // { name: "Community", icon: "people", path: "/community" },
    { name: "News", icon: "comment", path: "/news" },
    {
      name: "Comparison",
      icon: "compare_arrows",
      path: "/player-compare",
    },
  ];

  const menuButtonsArrayTWO2 = [
    { name: "Help", icon: "help", path: "/help" },
    { name: "Settings", icon: "settings", path: "/settings" },
    // { name: "Logout", icon: "door_back", path: "/login" },
  ];

  const list = (anchor) => (
    <Box
      className="cardBackground primaryTextColor"
      sx={{
        width: 300,
        height: "100%",
        padding: "3vh 1vw",
        display: "flex",
        flexDirection: "column",
        zIndex: "10000",
      }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* // Header  */}

      <div
        style={{
          flex: ".07",
          display: "flex",
          paddingLeft: "2vw",
          alignItems: "center",
          paddingBottom: "4vh",
        }}
      >
        <Close
          style={{ marginRight: "2vw" }}
          onClick={toggleDrawer(anchor, false)}
        />
        <img
          // className="sm:hidden md:block"
          style={{ width: "110px", height: "60px" }}
          src={logoImage}
        />
      </div>

      {/* //Search and Filter Sections */}
      <div style={{ flex: ".93", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: ".35", overflowY: "scroll", maxHeight: "45vh" }}>
          <ul style={{ listStyleType: "none", marginLeft: "1vw" }}>
            {menuButtonsArray &&
              menuButtonsArray.map((data, index) => {
                const { name, icon, path } = data;

                if (name === "none") {
                  // this is to display the accordion list

                  // onClick={toggleDrawer(anchor, false)}
                  // write a destructuring function that will close the drawer on click oof the buttons in the accordion
                  return (
                    <li key={index}>
                      {" "}
                      <SavedFilters />
                    </li>
                  );
                } else {
                  return (
                    <li key={index} onClick={toggleDrawer(anchor, false)}>
                      <NavBarButton
                        ButtonName={name}
                        path={path}
                        ButtonImage={icon}
                      />
                    </li>
                  );
                }
              })}
          </ul>
        </div>

        {/* // Navbar Second HALF */}

        <div style={{ flex: ".65" }}>
          <ul style={{ listStyleType: "none", marginLeft: "1vw" }}>
            {menuButtonsArrayTWO2 &&
              menuButtonsArrayTWO2.map((data, index) => {
                const { name, icon, path } = data;

                // if (name === "Logout") {
                //   return (
                //     <li
                //       key={index}
                //       onClick={() => {
                //         dispatch(setLoginStatus(false));
                //         dispatch(setUserDetailsObject({}));
                //       }}
                //     >
                //       <NavBarButton
                //         ButtonName={name}
                //         ButtonImage={icon}
                //         path={path}
                //         // buttonStyle={{ color: "#E4E8F9" }}
                //       />
                //     </li>
                //   );
                // }

                return (
                  <li key={index} onClick={toggleDrawer(anchor, false)}>
                    <NavBarButton
                      ButtonName={name}
                      ButtonImage={icon}
                      path={path}
                      // buttonStyle={{ color: "#E4E8F9" }}
                    />
                  </li>
                );
              })}
          </ul>
          <div onClick={toggleDrawer(anchor, false)}>
            <CreateProfileModal />{" "}
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button>{anchor} sat </Button> */}

          {/* <PlayerProfileAdd clickFunction={toggleDrawer(anchor, true)} /> */}
          <Menu onClick={toggleDrawer(anchor, true)} />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
