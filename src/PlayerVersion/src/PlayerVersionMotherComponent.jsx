import { NotificationAdd } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import logoImage from "./assets/images/AppLogoBlue.png";
import avatarImage from "./assets/images/avatar.jpg";
import LightAndDarkModeSwitch from "./components/Switch/LightAndDarkModeSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarButton from "./components/NavBarButtons/NavBarButton";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeProviderObject } from "./statemanager/slices/ThemeProviderSlice";
import {
  setLoginStatus,
  setUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import Marquee from "react-fast-marquee";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";
import { selectCurrentScreenSize } from "../../statemanager/slices/OtherComponentStatesSlice";
import SmallScreenPlayerMenuDrawer from "./components/Drawer/SmallScreenPlayerMenuDrawer";
import { setUserSavedProfiles } from "../../statemanager/slices/SavedProfileSlice";
import NotificationsMenu from "../../components/Menu/NotificationsMenu";
import ProfileMenu from "../../components/Menu/ProfileMenu";

const PlayerVersionMotherComponent = () => {
  const dispatch = useDispatch();

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

  const clubsInDatabase = useSelector(selectClubsInDatabase);

  const screenSize = useSelector(selectCurrentScreenSize);

  let screenWidth = parseInt(screenSize?.width, 10);

  // const navigate = useNavigate();

  // const [themePallette, setThemePallette] = useState({us});

  // const [isSwitched, setIsSwitched] = useState(false);

  const themeProviderObject = useSelector(selectThemeProviderObject);

  const {
    background,
    cardBackground,
    primaryTextColor,
    buttonColor,
    secondaryTextColor,
  } = themeProviderObject;

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

  .primaryTextColor{
    color: ${primaryTextColor}

  }
  .secondaryTextColor{
    color: ${secondaryTextColor}

  }
  .styleTextColor{
    color: ${buttonColor}

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
  
.css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root {

  color: ${primaryTextColor}
}

.nav-link.active {
  color: red;
  font-weight: bold; 
}


.NavBarBtns{
  color: ${buttonColor}
}

.go4027089540{
  background-color: ${cardBackground}
}

.active .NavBarBtns{
  color: white ;
  border-radius: .5vw ;
  background: #5585fe
}


.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root{
  color:${primaryTextColor};
  background: ${background}
}

.css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root{
  border: 1px solid ${primaryTextColor}
}

.css-i4bv87-MuiSvgIcon-root{
  color:${primaryTextColor}
}
.css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input{
  color:${primaryTextColor}
}

  `;
  //CLASS FOR TEXT FIELD BORDER .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root

  // FOR ICON ADORNMENT svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-i4bv87-MuiSvgIcon-root

  // FOR INPUT COLOR MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input

  // FOR TEXT FIELD LABEL COLOR MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeSmall MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeSmall MuiInputLabel-outlined css-1jy569b-MuiFormLabel-root-MuiInputLabel-root

  useEffect(() => {
    const { background } = themeProviderObject;

    const body = document.querySelector("body");

    if (body) {
      body.style.background = background;
    }
  }, [themeProviderObject]);

  return (
    <div
      className="md:flex md:flex-col md:h-[112vh] md:w-[100vw] md:pb-[0vh] sm:flex sm:flex-col sm:h-[107vh] sm:w-[100vw] md:pb-[10vh]"
      style={{
        // display: "flex",
        // flexDirection: "column",
        // height: "100vh",
        // width: "100vw",
        // background: background,
        color: primaryTextColor,
        // zIndex: "-3",
      }}
    >
      {/* //=====  NAVBAR ======= \\ */}
      <div className="md:flex md:basis-[11%]  sm:flex sm:basis-[8%]">
        {/* // Logo Area */}

        <div
          style={{
            flex: ".18",
            paddingTop: "1%",
            display: "grid",
            placeContent: "center",
          }}
        >
          <div className="sm:block md:hidden">
            <SmallScreenPlayerMenuDrawer />{" "}
          </div>
          <img
            className="sm:hidden md:block"
            style={{ width: "110px" }}
            src={logoImage}
          />
        </div>
        {/* // Search Area? */}
        <div
          style={{
            flex: ".635",
            paddingTop: "1%",

            position: "relative",
            // background: "red",
          }}
        >
          <Marquee
            speed={35}
            pauseOnClick={true}
            play
            loop={0}
            style={{
              width: "100%",
              position: "absolute",
              display: screenWidth < 1024 ? "none" : "flex",
            }}
          >
            {/* I can be a React component, multiple React components, or just some
            text. */}
            {clubsInDatabase.map((data, index) => {
              const { clubImage, clubName } = data;
              return (
                <Tooltip key={index} title={clubName}>
                  <Avatar
                    src={clubImage}
                    sx={{ width: 38, height: 38, marginRight: 1.6 }}
                  />
                </Tooltip>
              );
            })}
          </Marquee>
        </div>
        {/* // profile details Area */}

        <div
          style={{
            // Should be 37
            paddingLeft: "1.2vw",
            flex: ".135",
            paddingTop: "1%",
            display: "flex",
            // background: "red",
            // paddingLeft: "5vw",
          }}
        >
          <LightAndDarkModeSwitch />

          <div
            style={{
              marginTop: "1.5vh",
              marginLeft: "-1vw",
              marginRight: "1vw",
            }}
          >
            <NotificationsMenu />
          </div>
          <ProfileMenu
            style={{ borderBottom: "none" }}
            name="Active user name"
          />
        </div>
      </div>
      {/* // ======  PAGE CONTENT ===== \\ */}
      <div className="md:flex md:basis-[89%]  sm:flex sm:basis-[92%] sm:overflow-y-scroll sm:width-[100vw] sm:pb-[10vh] ">
        {/* // NAV ARAEA */}
        <div className="md:basis-[18%] md:flex-shrink-0  md:pt-[5vh] md:flex-col md:flex md:block sm:hidden">
          {/* // USE A MAP FOR THIS */}
          {/* // NavBAR FIRST HALF */}
          <div style={{ flex: ".65", overflowY: "scroll", maxHeight: "45vh" }}>
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
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
            </ul>
          </div>

          {/* // Navbar Second HALF */}

          <div style={{ flex: ".35" }}>
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
              {menuButtonsArrayTWO2 &&
                menuButtonsArrayTWO2.map((data, index) => {
                  const { name, icon, path } = data;

                  if (name === "Logout") {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          dispatch(setLoginStatus(false));
                          dispatch(setUserDetailsObject({}));
                          dispatch(setUserSavedProfiles([]));
                        }}
                      >
                        <NavBarButton
                          ButtonName={name}
                          ButtonImage={icon}
                          path={path}
                          // buttonStyle={{ color: "#E4E8F9" }}
                        />
                      </li>
                    );
                  }

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
            </ul>
          </div>
          {/* Create New Profile Modal */}
        </div>

        {/* // ROUTES SECTION */}
        <div
          className="md:basis-[82%] sm:basis-[100%]"
          style={{
            // flex: ".82",
            padding: "2vh 1.5vw",
          }}
        >
          <Outlet />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
};

export default PlayerVersionMotherComponent;
