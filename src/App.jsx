import { Add, Menu, NotificationAdd } from "@mui/icons-material";
import { Button, Card, IconButton } from "@mui/material";
import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import SeachBarTextField from "./components/SeachBarTextField";
import Avatar from "@mui/material/Avatar";
import avatarImage from "./assets/images/avatar.jpg";
import ProfileMenu from "./components/Menu/ProfileMenu";
import SavedFilters from "./components/MenuButtons/SavedFilters";
import LightAndDarkModeSwitch from "./components/Switch/LightAndDarkModeSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./screens/HomePage";
import NavBarButton from "./components/NavBarButtons/NavBarButton";
import PlayerDetails from "./screens/PlayerDetails";

const App = () => {
  const menuButtonsArray = [
    { name: "Home", icon: "home" },
    // The none values are for the savedFilters which is an accordion and not a button.. skipped over it in the map
    { name: "none", icon: "none" },
    { name: "Favourite", icon: "favorite" },
    { name: "Community", icon: "people" },
    { name: "News", icon: "comment" },
  ];

  const menuButtonsArrayTWO2 = [
    { name: "Help", icon: "help" },
    { name: "Settings", icon: "settings" },
    { name: "Logout", icon: "door_back" },
  ];

  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* //=====  NAVBAR ======= \\ */}
      <div style={{ flex: ".11", display: "flex" }}>
        {/* // Logo Area */}

        <div
          style={{
            flex: ".18",
            paddingTop: "1%",
            display: "flex",
          }}
        >
          <Avatar
            sx={{
              // marginLeft: "2vw",
              width: 62,
              height: 62,
              border: "4px solid blue",
              marginLeft: ".4vw",
              marginRight: ".4vw",
            }}
            src={avatarImage}
          ></Avatar>
          <h4 style={{ marginTop: "2vh" }}>Talent Match</h4>
        </div>
        {/* // Search Area? */}
        <div style={{ flex: ".45", paddingTop: "1%", paddingLeft: "4vw" }}>
          {/* "#3D2A2F */}
          <SeachBarTextField label={"Search Player"} marginLeft="3vw" />{" "}
        </div>
        {/* // profile details Area */}
        <div
          style={{
            // Should be 37
            flex: ".34",
            // background: "yellow",
            paddingTop: "1%",
            paddingRight: "1.5%",
            // display: "flex",
          }}
        >
          {/* sx={{ float: "right", marginLeft: "1vw", borderBottom: "none" }} */}

          <ProfileMenu
            style={{ float: "right", marginLeft: "1vw", borderBottom: "none" }}
            name="Michael Solomon"
          />

          <IconButton sx={{ float: "right", marginLeft: ".5vw" }}>
            <NotificationAdd />
          </IconButton>
          <Avatar
            sx={{
              // marginLeft: "2vw",
              width: 55,
              height: 55,
              border: "4px solid blue",
              marginLeft: ".4vw",
              marginRight: ".4vw",
              float: "right",
            }}
            src={avatarImage}
          ></Avatar>

          <LightAndDarkModeSwitch style={{ float: "right" }} />
        </div>
      </div>
      {/* // ======  PAGE CONTENT ===== \\ */}
      <div style={{ flex: ".89", display: "flex" }}>
        {/* // NAV ARAEA */}
        <div
          style={{
            flex: ".18",
            display: "flex",
            flexDirection: "column",
            paddingTop: "5vh",
          }}
        >
          {/* // USE A MAP FOR THIS */}
          {/* // NavBAR FIRST HALF */}
          <div style={{ flex: ".65", overflowY: "scroll", maxHeight: "45vh" }}>
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
              {menuButtonsArray &&
                menuButtonsArray.map((data) => {
                  const { name, icon } = data;

                  if (name === "none") {
                    // this is to display the accordion list
                    return (
                      <li>
                        <SavedFilters />
                      </li>
                    );
                  } else if (name == "Home") {
                    // This is to add the button which collapses the navbar
                    return (
                      <li style={{ display: "flex" }}>
                        <NavBarButton ButtonName={name} ButtonImage={icon} />
                        <IconButton sx={{ marginLeft: "9vw" }}>
                          <Menu />
                        </IconButton>
                      </li>
                    );
                  } else {
                    return (
                      <li>
                        <NavBarButton ButtonName={name} ButtonImage={icon} />
                      </li>
                    );
                  }
                })}
            </ul>
          </div>

          {/* // Navbar Second HALF */}

          <div style={{ flex: ".35" }}>
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
              {menuButtonsArrayTWO2 &&
                menuButtonsArrayTWO2.map((data) => {
                  const { name, icon } = data;
                  return (
                    <li>
                      <NavBarButton ButtonName={name} ButtonImage={icon} />
                    </li>
                  );
                })}
            </ul>

            <Card
              sx={{
                width: 145,
                height: 90,
                marginLeft: "2vw",
                paddingTop: "1vh",
                paddingLeft: ".6vw",
                paddingRight: ".6vw",
                display: "flex",
                // background: "#1B1E2B",
              }}
            >
              <div
                style={{
                  flex: ".93",
                  fontSize: ".85em",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {" "}
                Friend Chat or Group Chat{" "}
              </div>
              <div
                style={{
                  flex: ".07",
                  display: "flex",
                }}
              >
                {" "}
                <Add sx={{ marginTop: "4.4vh", color: "gold" }} />{" "}
              </div>
            </Card>
          </div>
        </div>

        {/* // ROUTES SECTION */}
        <div
          style={{
            flex: ".82",
            padding: "2vh 1.5vw",
            // background: "blue",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/player-details" element={<PlayerDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
