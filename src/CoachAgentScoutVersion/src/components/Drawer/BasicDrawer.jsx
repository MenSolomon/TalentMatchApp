import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Icon, IconButton } from "@mui/material";
import logoImage from "../../assets/images/AppLogoBlue.png";
import NavBarButton from "../NavBarButtons/NavBarButton";
// import SavedFilters from "../MenuButtons/SavedFilters";
import { NavLink } from "react-router-dom";
// import CreateProfileModal from "../Modals/CreateProfileModal";
import SavedFilters from "../../../../components/MenuButtons/SavedFilters";
import CreateProfileModal from "../../../../components/Modals/CreateProfileModal";

export default function BasicDrawer({ drawerIcon }) {
  const menuButtonsArray = [
    { name: "Home", icon: "home", path: "/" },
    // The none values are for the savedFilters which is an accordion and not a button.. skipped over it in the map
    { name: "none", icon: "none" },
    { name: "Favourite", icon: "favorite", path: "/none" },
    // { name: "Community", icon: "people", path: "/community" },
    { name: "News", icon: "comment", path: "/news" },
    {
      name: "Comparison",
      icon: "compare_arrows",
      path: "/player-conmpare",
    },
  ];

  const menuButtonsArrayTWO2 = [
    { name: "Help", icon: "help", path: "none" },
    { name: "Settings", icon: "settings", path: "none" },
    { name: "Logout", icon: "door_back", path: "none" },
  ];
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
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
    <div
      className="background "
      style={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : "50vw",
        height: "100%",
      }}
      // role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding style={{ padding: "0 40px" }}>
          <img className="md:w-[110px] sm:w-[80px]" src={logoImage} />
        </ListItem>
      </List>
      <Divider />
      <List
        sx={{
          height: "45vh",
          overflowY: "scroll",
          // background: "yellow",
          paddingLeft: "4vw",
        }}
      >
        {/* <ul style={{ listStyleType: "none", marginLeft: "2vw" }}> */}
        {menuButtonsArray &&
          menuButtonsArray.map((data, index) => {
            const { name, icon, path } = data;

            {
              return (
                <li key={index}>
                  <NavBarButton
                    ButtonName={name}
                    path={path}
                    ButtonImage={icon}
                  />
                </li>
              );
            }
          })}
        {/* </ul> */}
      </List>

      <List sx={{ paddingLeft: "4vw", height: "24vh" }}>
        {/* <ul
              style={{
                listStyleType: "none",
                marginLeft: "2vw",
              }}
            > */}
        {menuButtonsArrayTWO2 &&
          menuButtonsArrayTWO2.map((data, index) => {
            const { name, icon, path } = data;
            return (
              <li key={index}>
                <NavBarButton
                  ButtonName={name}
                  path={path}
                  ButtonImage={icon}
                  // buttonStyle={{ color: "#E4E8F9" }}
                />
              </li>
            );
          })}
        {/* </ul> */}
      </List>
      <List sx={{ width: "100%", height: "20vh" }}>
        <CreateProfileModal styles={{ width: "50%" }} />
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button>{anchor} sat </Button> */}

          {/* <PlayerProfileAdd clickFunction={toggleDrawer(anchor, true)} /> */}
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <Icon className="primaryTextColor">{drawerIcon}</Icon>
          </IconButton>
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
