import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import {
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

const MembershipPlanPage = () => {
  // Settings for password input
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iconColor = { color: "white" };

  const Navigate = useNavigate();

  const rolesMenu = ["Agent", "Player", "Coach", "Scout"];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        // backgroundImage: `linear-gradient(0deg, rgba(46,46,46,1) 0%, rgba(255,255,255,1) 100%),url("${imageBackground}")`,
        backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // background: "blue",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        // padding: "2vw",
        paddingLeft: "3vw",
        padding: "3vw",
        paddingTop: "1.5vh",

        color: "white",
      }}
    >
      {/* NAVIGATION AREA */}
      <div style={{ flex: ".1", display: "flex" }}>
        {/* LOGO AREA */}
        <div style={{ flex: ".15", display: "flex" }}>
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
        {/* MENU ITEMS */}
        <div style={{ flex: ".55", display: "flex" }}>
          {" "}
          <BasicMenu menuTitle={"Roles"} menuItemsArray={rolesMenu} />{" "}
          <BasicMenu menuTitle={"Support"} menuItemsArray={rolesMenu} />{" "}
          <BasicMenu menuTitle={"Resources"} menuItemsArray={rolesMenu} />{" "}
        </div>

        {/* FREE TRIAL BUTTON */}
        <div
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
      </div>

      {/* BODY AREA */}
      <div style={{ flex: ".9", display: "flex" }}>
        {/* CREATE ACCOUNT SECTION */}
        <div
          style={{
            flex: ".55",
            paddingTop: "0vh",
            // background: "blue",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
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

            <h1 style={{ fontSize: "3em" }}>
              Choose the plan that <br /> best suits your team.
            </h1>
            <h4 style={{ fontWeight: "lighter" }}>
              {" "}
              Our pricing is designed to help you get the most of your Wyscout
              experience.
            </h4>
          </div>
        </div>
        {/* SOCIAL MEDIA SECTIONS / EMPTY SECTIOn */}
        <div
          style={{
            flex: ".45",

            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {/* //ICON AREA */}
        </div>
      </div>
    </div>
  );
};

export default MembershipPlanPage;
