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
import BasicDrawer from "./components/Drawer/BasicDrawer";

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
      className="md:w-[100vw] md:h-[100vh] md:flex md:flex-col  sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-col"
      style={{
        color: primaryTextColor,
      }}
    >
      {/* //=====  NAVBAR ======= \\ */}
      <div
        className="md:basis-[11%] md:flex md:flex-shrink-0  sm:basis-[11%] sm:flex sm:flex-shrink-0"
        // style={{ background: "red" }}
      >
        {/* // Logo Area */}

        <div
          className="md:w-[18%] md:flex-shrink-0 md:pt-[1%] md:grid md:place-content-center  sm:w-[18%] sm:flex-shrink-0 sm:pt-[1%] sm:grid sm:place-content-center"
          style={{ background: "red" }}
        >
          <img
            className="md:w-[110px] sm:w-[80px] md:block sm:hidden"
            src={logoImage}
          />
          <div className="md:hidden sm:flex">
            <BasicDrawer drawerIcon="menu" />
          </div>
        </div>
        {/* // Search Area? */}
        <div
          className="md:w-[43%] md:flex-shrink-0 md:pt-[1%] md:pl-[4vw]  sm:w-[32%] sm:flex-shrink-0 sm:pt-[1%] sm:pl-[4vw]"
          style={{ background: "yellow" }}
        ></div>
        {/* // profile details Area */}
        <div
          className="md:w-[39%] md:flex-shrink-0 md:pt-[1%] md:pr-[5%] md:flex-row-reverse md:flex md:items-center sm:w-[50%] sm:flex-shrink-0 sm:pt-[1%] sm:pr-[5%] sm:flex-row-reverse sm:flex sm:items-center "
          style={{
            background: "red",
          }}
        >
          <div className="md:flex sm:hidden">
            <ProfileMenu
              style={{
                float: "right",
                marginLeft: "2vw",
                borderBottom: "none",
              }}
              name="Active user name"
            />
          </div>

          <div className="md:ml-[0%] sm:mr-[10%] md:flex sm:flex ">
            <LightAndDarkModeSwitch style={{ float: "right" }} />

            <IconButton>
              <NotificationAdd className="primaryColor" />
            </IconButton>
          </div>
        </div>
      </div>
      {/* // ======  PAGE CONTENT ===== \\ */}
      <div
        className="md:basis-[89%] md:flex md:flex-shrink-0  sm:basis-[89%] sm:flex sm:flex-shrink-0"
        // style={{ background: "yellow" }}
      >
        {/* // NAV ARAEA */}
        <div
          // className="md:flex sm:hidden"
          className="md:basis-[18%] md:flex md:flex-col md:pt-[5vh]   sm:basis-[18%] sm:hidden sm:flex-col sm:pt-[5vh]"
          style={
            {
              // background: "yellow",
            }
          }
        >
          {/* // USE A MAP FOR THIS */}
          {/* // NavBAR FIRST HALF */}
          <div
            className="md:basis-[65%] sm:basis-[65%]"
            style={{ overflowY: "scroll", maxHeight: "45vh" }}
          >
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

          <div className="md:basis-[35%]  sm:basis-[35%]">
            <ul
              style={{
                listStyleType: "none",
                marginLeft: "2vw",
              }}
            >
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
          className="md:basis-[82%] sm:basis-[100%]"
          style={{
            padding: "2vh 1.5vw",
            // background: "yellow",
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
