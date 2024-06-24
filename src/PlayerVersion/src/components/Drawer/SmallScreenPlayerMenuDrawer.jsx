import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Close, Menu, PersonAddAlt1 } from "@mui/icons-material";
import NavBarButton from "../NavBarButtons/NavBarButton";
import logoImage from "../../assets/images/AppLogoBlue.png";

export default function SmallScreenPlayerMenuDrawer() {
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
    { name: "Dashboard", icon: "dashboard", path: "/studio/dashboard" },
    // The none values are for the savedFilters which is an accordion and not a button.. skipped over it in the map
    { name: "Videos", icon: "video_camera_front", path: "/studio/videos" },
    // {
    //   name: "Statistics",
    //   icon: "bar_chart_4_bars",
    //   path: "/studio/Statistics",
    // },
    // { name: "Favourites", icon: "favorite", path: "/studio/favorites" },
    { name: "Messages", icon: "move_to_inbox", path: "/studio/messages" },
    { name: "Analytics", icon: "monitoring", path: "/studio/analytics" },
  ];

  const menuButtonsArrayTWO2 = [
    // { name: "Add Agency", icon: "follow_the_signs", path: "none" },
    { name: "Help", icon: "help", path: "/studio/help" },
    { name: "Settings", icon: "settings", path: "/studio/settings" },
    { name: "Logout", icon: "door_back", path: "/login" },
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
        {/* // NavBAR FIRST HALF */}
        <div style={{ flex: ".45", overflowY: "scroll", maxHeight: "45vh" }}>
          <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
            {menuButtonsArray &&
              menuButtonsArray.map((data, index) => {
                const { name, icon, path } = data;

                {
                  return (
                    <li
                      key={index}
                      style={{ marginBottom: "2.5vh" }}
                      onClick={toggleDrawer(anchor, false)}
                    >
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

        <div style={{ flex: ".55" }}>
          <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
            {menuButtonsArrayTWO2 &&
              menuButtonsArrayTWO2.map((data, index) => {
                const { name, icon, path } = data;

                return (
                  <li
                    key={index}
                    style={{ marginBottom: "2.5vh" }}
                    onClick={toggleDrawer(anchor, false)}
                  >
                    <NavBarButton
                      ButtonName={name}
                      path={path}
                      ButtonImage={icon}
                      // buttonStyle={{ color: "#E4E8F9" }}
                    />
                  </li>
                );
              })}
          </ul>
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
