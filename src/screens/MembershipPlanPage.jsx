import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import {
  CheckCircle,
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import imageBackground from "../assets/images/FootballLogo.jpg";
import facebookLogo from "../assets/images/facebookImage.svg";
import GoogleLogo from "../assets/images/google.svg";
import { useNavigate } from "react-router-dom";
import WorldMaps from "../components/WorldMap";
import logoImage from "../assets/images/AppLogoBlue.png";
import BasicMenu from "../components/Menu/BasicMenu";
import BasicButton from "../components/Buttons/BasicButton";
import { useSelector } from "react-redux";
import { selectCurrentBrowserSize } from "../statemanager/slices/OtherComponentStatesSlice";
import ChoosePlanPageDrawer from "../components/Drawer/ChoosePlanPageDrawer";

const MembershipPlanPage = () => {
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  // Settings for password input
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iconColor = { color: "white" };

  const Navigate = useNavigate();

  const rolesMenu = ["Agent", "Player", "Coach", "Scout"];

  const BasicFeaturesArray = [
    "100 request per day",
    "100 request per day",
    "100 request per day",
  ];

  return (
    <div
      className="md:w-[100%] md:h-[100vh] md:flex md:flex-col  
      sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-col
      "
      style={{
        // width: "100%",
        // height: "100vh",
        // backgroundImage: linear-gradient(0deg, rgba(46,46,46,1) 0%, rgba(255,255,255,1) 100%),url("${imageBackground}"),
        backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // background: "blue",
        backgroundRepeat: "no-repeat",
        // display: "flex",
        // flexDirection: "column",
        // padding: "2vw",
        // paddingLeft: "3vw",
        // padding: "3vw",
        color: "white",
        overflow: "scroll",
      }}
    >
      {/* NAVIGATION AREA */}
      <div
        className="md:block md:w-[12.5vh] sm:hidden md:w-[5.5vh] md:basis-[10%] sm:basis-[10%]"
        style={{
          position: "fixed",
          paddingTop: "2.5vh",
          zIndex: "1000",
          width: "98%",

          display: "flex",
          // backgroundImage: linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}"),
          background:
            "linear-gradient(90deg, rgba(32,32,32,0.995210066936931) 0%, rgba(55,54,54,0.9980111873851103) 34%, rgba(23,21,21,1) 100%)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          paddingLeft: "3vw",
          paddingRight: "3vw",
          // background: "red",
        }}
      >
        {/* LOGO AREA */}

        {browserWidth >= 1024 ? (
          <div
            className="md:block sm:hidden"
            style={{ flex: ".15", display: "flex" }}
          >
            {" "}
            <img style={{ width: "120px" }} src={logoImage} />
            {/* <Avatar
    src="/static/images/avatar/1.jpg"
    style={{ background: "blue", color: "blue" }}
  >
    r
  </Avatar>{" "}
  <h4 style={{ marginLeft: ".7vw", marginTop: "1vh" }}>Talent Match</h4> */}
          </div>
        ) : (
          ""
        )}

        {/* MENU ITEMS */}

        {browserWidth >= 1024 ? (
          <div style={{ flex: ".55", display: "flex" }}>
            {" "}
            <BasicMenu menuTitle={"Roles"} menuItemsArray={rolesMenu} />{" "}
            <Button
              id="basic-button"
              sx={{
                color: "white",
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
            <Button
              id="basic-button"
              sx={{
                color: "white",
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
          </div>
        ) : (
          <div style={{ flex: ".55", display: "flex" }}>
            {" "}
            <ChoosePlanPageDrawer />{" "}
          </div>
        )}

        {/* FREE TRIAL BUTTON */}
        {browserWidth >= 1024 ? (
          <div
            className="md:block sm:hidden"
            style={{
              flex: ".3",

              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "1vh",
            }}
          >
            <div
              style={{
                width: "17vw",
                height: "8.4vh",
                background: "white",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                borderRadius: "1.5vw",
                padding: "0vh .6vw",
                gap: "2vw",
              }}
            >
              <h6
                style={{
                  marginTop: "1.5vh",
                  alignSelf: "center",
                  color: "#5585FE",
                  cursor: "pointer",
                }}
                onClick={() => {
                  Navigate("/login");
                }}
              >
                Login
              </h6>

              <Button
                onClick={() => {
                  Navigate("/create-account/freetrial");
                }}
                sx={{
                  background: "#5585FE",
                  width: "10vw",
                  height: "7vh",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "1.2vw",
                }}
              >
                Start free trial
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* BODY AREA */}
      <div className="sm:mt-[5vh] sm:basis-[90%] md:mt-[10vh] md:basis-[90%]">
        {/* CREATE ACCOUNT SECTION */}

        {/* // Container housiong the header information  */}
        <div
          className="md:h-[60vh] md:flex-row md:w-[100%] md:flex    
          sm:h-[50vh] sm:w-[100%] sm:flex sm:flex-col
          "
          style={
            {
              // height: "60vh",
              // width: "100%",
              // display: "flex",
              // background: "green",
            }
          }
        >
          <div
            style={{
              flex: ".55",
              paddingTop: "0vh",
              // background: "blue",
            }}
          >
            <div
              className="md:h-[100%] md:w-[100%]"
              style={{
                // width: "100%",
                // height: "100%",
                padding: "4vw",
                paddingLeft: "12vw",
                //   textAlign: "center",
              }}
            >
              <h1 style={{ display: "flex" }}>
                {" "}
                <img
                  src={logoImage}
                  style={{ width: "160px", marginRight: "2vw" }}
                />{" "}
                | Player{" "}
              </h1>

              <h1 className="sm:text-[2.2em]  md:text-[3em]">
                Choose the plan that <br /> best suits your team.
              </h1>
              <h4
                className="sm:font-lighter sm:text-[1em]  md:text-[1.2em] md:font-lighter"
                // style={{ fontWeight: "lighter" }}
              >
                {" "}
                Our pricing is designed to help you get the most of your talent
                meet experience.
              </h4>
            </div>
          </div>
          {/* SOCIAL MEDIA SECTIONS / EMPTY SECTIOn */}
          <div
            style={{
              flex: ".45",

              display: "flex",
              flexDirection: "column-reverse",
              // background: "pink",
            }}
          >
            {/* //ICON AREA */}
          </div>
        </div>

        {/* SUBSCRIPTION CARDS */}

        <div
          className="md:w-[100%] md:h-[120vh]    sm:w-[100%] sm:h-[120vh]"
          style={{
            // width: "100%",
            // height: "120vh",
            // background: "red",
            paddingTop: "20vh",
          }}
        >
          {/* CARD */}
          <h1 style={{ textAlign: "center" }}> Choose your Plan </h1>
          <h3 style={{ textAlign: "center" }}>
            {" "}
            Unlock powerful features as a player{" "}
          </h3>

          <div
            style={{
              // background: "blue",
              // height: "55vh",
              // width: "100%",
              display: "flex",
              justifyContent: "center",
              // gap: "4vw",
              marginTop: "5vh",
            }}
          >
            <div
              className="md:flex md:flex-row md:h-[150vh] md:gap-[30px]     
            sm:flex sm:flex-col sm:h-[130vh] sm:gap-[10px]
            "
            >
              <SubscriptionCard
                title="Free trial"
                description="For personal use and exploration of technology "
                price="0"
                featuresHighlightArray={BasicFeaturesArray}
              />
              <SubscriptionCard
                title="Starter"
                description={`For personal use and exploration of technology with variety of access `}
                price="40"
                featuresHighlightArray={BasicFeaturesArray}
              />
              <SubscriptionCard
                title="Premium"
                description="Perfect for professional players with a good variety of football videos and stats "
                price="100"
                featuresHighlightArray={BasicFeaturesArray}
              />
            </div>
          </div>
        </div>

        {/* // Footer  */}

        <div
          style={{
            width: "100%",
            height: "55vh",
            // background: "red",
            paddingTop: "30vh",
          }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
};

export default MembershipPlanPage;

const SubscriptionCard = ({
  title,
  description,
  price,
  featuresHighlightArray,
}) => {
  return (
    <Card
      className="uploadPlayerModalCard  md:w-[18vw] md:h-[55vh]   
      sm:w-[70vw] sm:h-[200vh]
      "
      style={{
        // width: "18vw",
        // background: "red",

        // height: "55vh",
        borderRadius: "1vw",
        color: "black",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: ".65vw",
          display: "flex",
          flexDirection: "column",
          gap: ".5vh",
        }}
      >
        {/* // NAME DESCRIPTION AND PRICE AREA */}

        <div
          style={{
            flex: ".4",
            // background: "green",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4>{title}</h4>
          <span style={{ lineHeight: "1em" }}>
            {/* For personal use and elaboration of the technology */}
            {description}
          </span>
          <h1 style={{ marginTop: "1vh" }}>
            {" "}
            <span style={{ fontSize: ".7em" }}>$</span>
            {price}
          </h1>
        </div>
        {/* // Get Started button and outlined features  */}

        <div style={{ flex: ".6" }}>
          <BasicButton
            style={{
              width: "100%",
              // marginTop: "2vh",
              marginBottom: "2vh",
            }}
            innerText="Get Started"
          />
          {/* ///features ROw */}

          {featuresHighlightArray &&
            featuresHighlightArray?.map((data, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    height: "20%",
                    // background: "blue",
                    marginBottom: ".8vh",
                    display: "flex",
                    borderBottom: "1px solid gray",
                  }}
                >
                  {/* CHECK CIRCLE AREA */}
                  <div style={{ flex: ".15" }}>
                    {" "}
                    <CheckCircle style={{ color: "#5585FE" }} />
                  </div>
                  {/* Message Area */}
                  <div style={{ flex: ".85" }}>{data}</div>
                </div>
              );
            })}
        </div>
      </div>
    </Card>
  );
};
