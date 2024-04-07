import { NotificationAdd } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import avatarImage from "./assets/images/avatar.jpg";
import logoImage from "./assets/images/AppLogoBlue.png";
import LightAndDarkModeSwitch from "./components/Switch/LightAndDarkModeSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarButton from "./components/NavBarButtons/NavBarButton";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeProviderObject } from "./statemanager/slices/ThemeProviderSlice";
import {
  selectSubscriptionFeatures,
  selectUserDetailsObject,
  setIsSubscriptionActive,
  setLoginStatus,
  setUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import BasicSnackBar from "../../components/Snackbars/BasicSnackbar";
import Marquee from "react-fast-marquee";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";
import SmallScreenCoachAgentClubMenuDrawer from "./components/Drawer/SmallScreenCoachAgentClubMenuDrawer";
import { selectCurrentScreenSize } from "../../statemanager/slices/OtherComponentStatesSlice";
import NotificationsMenu from "../../components/Menu/NotificationsMenu";
import { setUserSavedProfiles } from "../../statemanager/slices/SavedProfileSlice";
import ProfileMenu from "../../components/Menu/ProfileMenu";

const CoachAgentScoutVersionMotherComponent = () => {
  const dispatch = useDispatch();
  const LoginUserDetails = useSelector(selectUserDetailsObject);
  const subscriptionFeaturesObject = useSelector(selectSubscriptionFeatures);
  // state to hold maximum number of profiles
  const { maxPlayersInAgency } = subscriptionFeaturesObject;
  const [menuButtonsArray, setMenuButtonsArray] = useState();

  useEffect(() => {
    const renderTopHalfMenu = async () => {
      // Dynamically Render Menu Buttons Based on Features
      if (maxPlayersInAgency === 0) {
        setMenuButtonsArray([
          { name: "Home", icon: "home", path: "/" },

          {
            name: "Dashboard",
            icon: "dashboard",
            path: "/multiStudio/dashboard",
          },
          // The none values are for the savedFilters which is an accordion and not a button.. skipped over it in the map
          {
            name: "Connections",
            icon: "monitoring",
            path: "/multiStudio/connections",
          },
          {
            name: "Messages",
            icon: "move_to_inbox",
            path: "/multiStudio/messages",
          },
          {
            name: "Analytics",
            icon: "monitoring",
            path: "/multiStudio/analytics",
          },
        ]);
      } else {
        setMenuButtonsArray([
          { name: "Home", icon: "home", path: "/" },

          {
            name: "Dashboard",
            icon: "dashboard",
            path: "/multiStudio/dashboard",
          },
          // The none values are for the savedFilters which is an accordion and not a button.. skipped over it in the map

          {
            name: "Players",
            icon: "people-group",
            path: "/multiStudio/players",
          },
          // { name: "Statistics", icon: "bar_chart_4_bars", path: "/Statistics" },
          // { name: "Favourites", icon: "favorite", path: "/favorites" },
          {
            name: "Connections",
            icon: "monitoring",
            path: "/multiStudio/connections",
          },
          {
            name: "Messages",
            icon: "move_to_inbox",
            path: "/multiStudio/messages",
          },
          {
            name: "Analytics",
            icon: "monitoring",
            path: "/multiStudio/analytics",
          },
        ]);
      }
    };
    renderTopHalfMenu();
  }, [menuButtonsArray]);

  const menuButtonsArrayTWO2 = [
    // { name: "Add Agency", icon: "follow_the_signs", path: "none" },
    { name: "Help", icon: "help", path: "/multiStudio/help" },
    { name: "Settings", icon: "settings", path: "/multiStudio/settings" },
    { name: "Logout", icon: "door_back", path: "/login" },
  ];

  // const navigate = useNavigate();

  // const [themePallette, setThemePallette] = useState({us});

  // const [isSwitched, setIsSwitched] = useState(false);
  const clubsInDatabase = useSelector(selectClubsInDatabase);
  const screenSize = useSelector(selectCurrentScreenSize);

  let screenWidth = parseInt(screenSize?.width, 10);

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

  
  .background{
    background-color: ${background}
  
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

.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input,.css-17at8t4-MuiFormLabel-root-MuiInputLabel-root,.css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input{
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
      className="md:flex md:flex-col md:h-[100vh] md:w-[100vw] md:pb-[0vh] sm:flex sm:flex-col sm:h-[107vh] sm:w-[100vw] sm:pb-[10vh]"
      style={{
        // display: "flex",
        // flexDirection: "column",
        // height: "100vh",
        // width: "100vw",
        // background: background,
        // paddingBottom: "10vh",
        color: primaryTextColor,
        // zIndex: "-3",
      }}>
      {/* //=====  NAVBAR ======= \\ */}
      <div
        className="md:flex md:basis-[11%]  sm:flex sm:basis-[8%]"
        // style={{ flex: ".11", display: "flex" }}
      >
        {/* // Logo Area */}

        <div
          style={{
            flex: ".18",
            paddingTop: "1%",
            display: "grid",
            placeContent: "center",
          }}>
          <div className="sm:block md:hidden">
            <SmallScreenCoachAgentClubMenuDrawer />{" "}
          </div>
          <img
            className="sm:hidden md:block"
            style={{ width: "110px" }}
            src={logoImage}
          />
        </div>
        {/* // Search Area? */}
        <div style={{ flex: ".635", paddingTop: "1%", position: "relative" }}>
          <Marquee
            speed={35}
            pauseOnClick={true}
            play
            loop={0}
            style={{
              width: "100%",
              position: "absolute",
              display: screenWidth < 1024 ? "none" : "flex",
            }}>
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

          {/* {LoginUserDetails.accountId} */}
        </div>
        {/* // profile details Area */}
        <div
          style={{
            // Should be 37
            flex: ".155",
            paddingTop: "1%",
            paddingLeft: "1.2vw",
            display: "flex",
          }}>
          <LightAndDarkModeSwitch />
          <div
            style={{
              marginTop: "1.5vh",
              marginLeft: "-1vw",
              marginRight: "1vw",
            }}>
            <NotificationsMenu />
          </div>
          <ProfileMenu
            style={{ borderBottom: "none" }}
            name="Active user name"
          />
        </div>
      </div>
      {/* // ======  PAGE CONTENT ===== \\ */}
      <div
        className="md:flex md:basis-[89%]  sm:flex sm:basis-[92%] sm:overflow-y-scroll sm:width-[100vw] "
        // style={{ flex: ".89", display: "flex" }}
      >
        {/* // NAV ARAEA */}
        <div
          className="md:basis-[18%] md:flex-shrink-0  md:pt-[5vh] md:flex-col md:flex md:block sm:hidden"
          // style={{
          //   flex: ".18",
          //   display: "flex",
          //   flexDirection: "column",
          //   paddingTop: "5vh",
          // }}
        >
          {/* // USE A MAP FOR THIS */}
          {/* // NavBAR FIRST HALF */}
          <div style={{ flex: ".65", overflowY: "scroll", maxHeight: "45vh" }}>
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
              {menuButtonsArray &&
                menuButtonsArray?.map((data, index) => {
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
                          dispatch(setIsSubscriptionActive(true));
                        }}>
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
          }}>
          <Outlet />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <BasicSnackBar />
    </div>
  );
};

export default CoachAgentScoutVersionMotherComponent;
