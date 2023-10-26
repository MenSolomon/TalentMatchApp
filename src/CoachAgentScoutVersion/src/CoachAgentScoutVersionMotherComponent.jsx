import { NotificationAdd } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import avatarImage from "./assets/images/avatar.jpg";
import logoImage from "./assets/images/AppLogoBlue.png";
import ProfileMenu from "./components/Menu/ProfileMenu";
import LightAndDarkModeSwitch from "./components/Switch/LightAndDarkModeSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarButton from "./components/NavBarButtons/NavBarButton";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "./statemanager/slices/ThemeProviderSlice";

const CoachAgentScoutVersionMotherComponent = () => {
  const menuButtonsArray = [
    { name: "Home", icon: "home", path: "/" },

    { name: "Dashboard", icon: "dashboard", path: "/multiStudio/dashboard" },
    // The none values are for the savedFilters which is an accordion and not a button.. skipped over it in the map
    { name: "Players", icon: "people-group", path: "/multiStudio/players" },
    // { name: "Statistics", icon: "bar_chart_4_bars", path: "/Statistics" },
    // { name: "Favourites", icon: "favorite", path: "/favorites" },
    { name: "Inbox", icon: "move_to_inbox", path: "/multiStudio/inbox" },
    { name: "Analytics", icon: "monitoring", path: "/multiStudio/analytics" },
  ];

  const menuButtonsArrayTWO2 = [
    // { name: "Add Agency", icon: "follow_the_signs", path: "none" },
    { name: "Help", icon: "help", path: "none" },
    { name: "Settings", icon: "settings", path: "none" },
    { name: "Logout", icon: "door_back", path: "none" },
  ];

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
            display: "grid",
            placeContent: "center",
          }}
        >
          {/* <Avatar
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
          <h4 style={{ marginTop: "2vh" }}>Talent Match</h4> */}
          <img style={{ width: "110px" }} src={logoImage} />
        </div>
        {/* // Search Area? */}
        <div
          style={{ flex: ".45", paddingTop: "1%", paddingLeft: "4vw" }}
        ></div>
        {/* // profile details Area */}
        <div
          style={{
            // Should be 37
            flex: ".34",
            paddingTop: "1%",
            paddingRight: "1.5%",
          }}
        >
          <ProfileMenu
            style={{ float: "right", marginLeft: "1vw", borderBottom: "none" }}
            name="Active user name"
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
          style={{
            flex: ".82",
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

export default CoachAgentScoutVersionMotherComponent;
