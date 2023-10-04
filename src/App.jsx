import { Add, Menu, NotificationAdd } from "@mui/icons-material";
import { Button, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "./statemanager/slices/ThemeProviderSlice";

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

  // const navigate = useNavigate();

  // const [themePallette, setThemePallette] = useState({us});

  // const [isSwitched, setIsSwitched] = useState(false);

  const themeProviderObject = useSelector(selectThemeProviderObject);

  const { background, cardBackground, primaryTextColor } = themeProviderObject;

  const styles = `.playerCard , .field {

    border: 1px solid transparent;
  
    background: linear-gradient(${cardBackground}, ${cardBackground}) padding-box,
      linear-gradient(
          90deg,
          hsla(280, 81%, 58%, 1) 0%,
          hsla(279, 81%, 59%, 1) 3%,
          hsla(276, 79%, 60%, 1) 9%,
          hsla(274, 79%, 60%, 1) 15%,
          hsla(269, 76%, 61%, 1) 15%,
          hsla(271, 77%, 61%, 1) 23%,
          hsla(259, 72%, 62%, 1) 32%,
          hsla(246, 68%, 64%, 1) 49%,
          hsla(226, 67%, 60%, 1) 56%,
          hsla(194, 96%, 42%, 1) 74%,
          hsla(196, 80%, 79%, 1) 100%
        )
        border-box;
  }

  .playerCard{
    color: ${primaryTextColor}
  }
  
  .primaryColor{
    color: ${primaryTextColor}
  }

  .cardBackground{
    background-color: ${cardBackground}
  }

  .cardBorder{
    border-right:  .2px solid ${
      primaryTextColor !== "black"
        ? "rgba(19, 19, 19, 0.849)"
        : "rgba(54, 54, 54, 0.671)"
    }  ;
    border-bottom: .2px solid ${
      primaryTextColor !== "black"
        ? "rgba(19, 19, 19, 0.849)"
        : "rgba(54, 54, 54, 0.671)"
    }  ;
   
  }

.newsGradient{
  background: linear-gradient(
    270deg,
    hsla(280, 81%, 58%, 1) 0%,
    hsla(279, 81%, 59%, 1) 3%,
    hsla(276, 79%, 60%, 1) 9%,
    hsla(274, 79%, 60%, 1) 15%,
    hsla(269, 76%, 61%, 1) 15%,
    hsla(271, 77%, 61%, 1) 23%,
    hsla(259, 72%, 62%, 1) 32%,
    hsla(246, 68%, 64%, 1) 49%,
    hsla(226, 67%, 60%, 1) 56%,
    hsla(194, 96%, 42%, 1) 74%,
    hsla(196, 80%, 79%, 1) 100%
  );

  opacity:.5
}
  
  `;

  useEffect(() => {
    const { background, cardBackground } = themeProviderObject;

    const body = document.querySelector("body");

    if (body) {
      body.style.background = background;
    }
  }, [themeProviderObject]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        // background: background,
        color: primaryTextColor,
        // zIndex: "-3",
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
          {/* <SeachBarTextField label={"Search Player"} marginLeft="3vw" />{" "} */}
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
            <NotificationAdd className="primaryColor" />
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
                        <NavBarButton
                          ButtonName={name}
                          ButtonImage={icon}
                          buttonStyle={{
                            // background:
                            //   "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
                            background: "#5585fe",
                            // width: "14vw",
                            marginRight: "1vw",
                            borderRadius: ".5vw",
                            color: "white",
                          }}
                        />

                        {/* <IconButton sx={{ marginLeft: "9vw" }}>
                          <Menu />
                        </IconButton> */}
                      </li>
                    );
                  } else {
                    return (
                      <li>
                        <NavBarButton
                          ButtonName={name}
                          ButtonImage={icon}
                          // buttonStyle={{ color: "#E4E8F9" }}
                        />
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
                      <NavBarButton
                        ButtonName={name}
                        ButtonImage={icon}
                        // buttonStyle={{ color: "#E4E8F9" }}
                      />
                    </li>
                  );
                })}
            </ul>

            <Card
              sx={{
                width: 145,
                height: 80,
                marginLeft: "4.6vw",
                paddingTop: "1vh",
                paddingLeft: ".6vw",
                paddingRight: ".6vw",
                display: "flex",
                // background:
                //   "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
                background: "#5585fe",
                // background: "#1B1E2B",
                color: "white",
                cursor: "pointer",
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
      <style dangerouslySetInnerHTML={{ __html: styles }} />;
    </div>
  );
};

export default App;
