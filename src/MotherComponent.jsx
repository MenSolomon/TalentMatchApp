import { NotificationAdd } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import avatarImage from "./assets/images/avatar.jpg";

import logoImage from "./assets/images/AppLogoBlue.png";
import ProfileMenu from "./components/Menu/ProfileMenu";
import SavedFilters from "./components/MenuButtons/SavedFilters";
import LightAndDarkModeSwitch from "./components/Switch/LightAndDarkModeSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarButton from "./components/NavBarButtons/NavBarButton";
import { useSelector } from "react-redux";
import { selectThemeProviderObject } from "./statemanager/slices/ThemeProviderSlice";
import CreateProfileModal from "./components/Modals/CreateProfileModal";
import UploadPlayer from "./components/Tooltips/UploadPlayer";
import WelcomeMessageModal from "./components/Modals/WelcomeMessageModal";

const MotherComponent = () => {
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

.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root{
  color:${primaryTextColor};
  background: ${cardBackground}
}



.css-7cyndw-MuiFormControl-root-MuiTextField-root {
  border: 1px solid ${primaryTextColor} ;
  border-radius: .3vw
}


.css-i4bv87-MuiSvgIcon-root{
  color:${primaryTextColor}
}
.css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input{
  color:${primaryTextColor}
}


  `;

  useEffect(() => {
    const { background } = themeProviderObject;

    const body = document.querySelector("body");

    if (body) {
      body.style.background = background;
    }
  }, [themeProviderObject]);

  return (
    <div
      className="md:flex md:flex-col md:h-[100vh] md:w-[100vw] sm:flex sm:flex-col sm:h-[100vh] sm:w-[100vw]"
      style={{
        // display: "flex",
        // flexDirection: "column",
        // height: "100vh",
        // width: "100vw",
        // background: background,
        color: primaryTextColor,
        // zIndex: "-3",
        // background: "yellow",
      }}
    >
      {/* //=====  NAVBAR ======= \\ */}
      <div
        className="md:flex md:basis-[11%]  sm:flex sm:basis-[11%]"
        // style={{ background: "yellow" }}
      >
        {/* // Logo Area */}

        <div
          style={{
            flex: ".18",
            paddingTop: "1%",
            display: "grid",
            placeContent: "center",
          }}
        >
          <img
            style={{ width: "110px" }}
            src={logoImage}
            // className="sm:hidden md:block"
          />
          {/* <h4 style={{ marginTop: "2vh" }}>Talent Match</h4> */}
        </div>
        {/* // Search Area? */}
        <div style={{ flex: ".4", paddingTop: "1%", paddingLeft: "4vw" }}>
          {/* "#3D2A2F */}
          {/* <SeachBarTextField label={"Search Player"} marginLeft="3vw" />{" "} */}
        </div>
        {/* // profile details Area */}
        <div
          style={{
            // Should be 37
            flex: ".39",
            // background: "yellow",
            paddingTop: "1%",
            paddingRight: "1.5%",
            // display: "flex",
          }}
        >
          {/* sx={{ float: "right", marginLeft: "1vw", borderBottom: "none" }} */}

          <ProfileMenu
            style={{ float: "right", marginLeft: "1vw", borderBottom: "none" }}
            name="Active user name"
          />

          <IconButton sx={{ float: "right", marginLeft: ".5vw" }}>
            <NotificationAdd className="primaryColor" />
          </IconButton>

          <UploadPlayer
            image={"duo"}
            info="Upload profile"
            studioUrl="/studio/dashboard"
          />

          <LightAndDarkModeSwitch style={{ float: "right" }} />
          <WelcomeMessageModal />
        </div>
      </div>
      {/* // ======  PAGE CONTENT ===== \\ */}
      <div className="md:flex md:basis-[89%]  sm:flex sm:basis-[89%]">
        {/* // NAV ARAEA */}
        <div
          className="md:basis-[18%] md:flex-shrink-0  md:pt-[5vh] md:flex-col md:flex md:block sm:hidden"
          style={
            {
              // flex: ".18",
              // display: "flex",
              // flexDirection: "column",
              // paddingTop: "5vh",
              // background: "yellow",
            }
          }
        >
          {/* // USE A MAP FOR THIS */}
          {/* // NavBAR FIRST HALF */}
          <div
            style={{
              flex: ".65",
              overflowY: "scroll",
              maxHeight: "45vh",
            }}
          >
            <ul style={{ listStyleType: "none", marginLeft: "2vw" }}>
              {menuButtonsArray &&
                menuButtonsArray.map((data, index) => {
                  const { name, icon, path } = data;

                  if (name === "none") {
                    // this is to display the accordion list
                    return (
                      <li key={index}>
                        {" "}
                        <SavedFilters />
                      </li>
                    );
                  } else {
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
                        ButtonImage={icon}
                        path={path}
                        // buttonStyle={{ color: "#E4E8F9" }}
                      />
                    </li>
                  );
                })}
            </ul>
            <CreateProfileModal />
          </div>
          {/* Create New Profile Modal */}
        </div>

        {/* // ROUTES SECTION */}
        <div
          style={{
            flex: ".82",
            padding: "2vh 1.5vw",
            // background: "blue",
          }}
        >
          <Outlet />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />;
    </div>
  );
};

export default MotherComponent;
