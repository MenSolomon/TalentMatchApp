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
import { Button } from "@mui/material";
import BasicMenu from "../Menu/BasicMenu";
import { useNavigate } from "react-router-dom";
import ChoosePlanDrawerMenu from "../Menu/ChoosePlanDrawerMenu";

export default function ChoosePlanPageDrawer() {
  const Navigate = useNavigate();
  const rolesMenu = ["Agent", "Player", "Coach", "Scout"];

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

  const list = (anchor) => (
    <Box
      // className="cardBackground primaryTextColor"
      sx={{
        width: 300,
        height: "100%",
        padding: "3vh 1vw",
        display: "flex",
        flexDirection: "column",
        zIndex: "1300",
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
        <div style={{ flex: "1", overflowY: "scroll", maxHeight: "45vh" }}>
          <ul style={{ listStyleType: "none", marginLeft: "1vw" }}>
            <li
              style={{ marginBottom: "2.5vh" }}
              onClick={toggleDrawer(anchor, false)}
            >
              <Button
                id="basic-button"
                sx={{
                  color: "#5585FE",
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontSize: "1.1em",
                  marginRight: 3,
                  height: "7vh",
                }}
                onClick={() => {
                  Navigate("/create-account/freetrial");
                }}
              >
                Start free trial
              </Button>
            </li>

            <li
              style={{ marginBottom: "2.5vh" }}
              onClick={toggleDrawer(anchor, true)}
            >
              <ChoosePlanDrawerMenu
                menuTitle={"Roles"}
                menuItemsArray={rolesMenu}
              />{" "}
            </li>

            <li
              style={{ marginBottom: "2.5vh" }}
              onClick={toggleDrawer(anchor, false)}
            >
              <Button
                id="basic-button"
                sx={{
                  color: "#5585FE",
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontSize: "1.1em",
                  marginRight: 3,
                  height: "7vh",
                }}
                onClick={() => {
                  Navigate("/support");
                }}
              >
                Support
              </Button>
            </li>

            <li
              style={{ marginBottom: "2.5vh" }}
              onClick={toggleDrawer(anchor, false)}
            >
              <Button
                id="basic-button"
                sx={{
                  color: "#5585FE",
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontSize: "1.1em",
                  marginRight: 3,
                  height: "7vh",
                }}
                onClick={() => {
                  Navigate("/resources");
                }}
              >
                Resources
              </Button>
            </li>
          </ul>
          {/* <Button
            onClick={() => {
              Navigate(-1);
            }}
            sx={{
              background: "#5585FE",
              width: "100%",
              height: "7vh",
              color: "white",
              textTransform: "none",
              borderRadius: "1.2vw",
            }}
          >
            Go Back
          </Button> */}
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
