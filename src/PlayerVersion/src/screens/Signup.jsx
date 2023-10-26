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
  LibraryBooks,
  Mail,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import imageBackground from "../assets/images/soccer-tactics-black-chalkboard_687470-352.jpg";
import LoginLogo from "../assets/images/DisplayPlayer.png";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/images/AppLogoBlue.png";

// import CountrySelect from "../components/AutoComplete/CountrySelect";

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iconColor = { color: "white" };

  const Navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        // backgroundImage: `linear-gradient(0deg, rgba(46,46,46,1) 0%, rgba(255,255,255,1) 100%),url("${imageBackground}")`,
        // backgroundImage: ` linear-gradient(90deg, rgba(27,27,27,1) 0%, rgba(97,95,95,0.9780111873851103) 48%, rgba(142,142,142,0.3449579660965949) 74%, rgba(255,255,255,1) 100%),url("${imageBackground}")`,
        backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // background: "blue",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "3vw",
        padding: "3vw",
        paddingTop: "1.5vh",
        color: "white",
      }}
    >
      {/* NAVIGATION AREA */}
      <div style={{ flex: ".1", display: "flex" }}>
        {/* LOGO AREA */}
        <div style={{ flex: ".2", display: "flex" }}>
          {" "}
          <img style={{ width: "120px" }} src={logoImage} />
        </div>
        <div
          style={{
            flex: ".8",

            display: "flex",
            gap: "6vw",
            paddingTop: "1vh",
          }}
        >
          {/* <h5>Home</h5>
          <h5>Join</h5> */}
        </div>
      </div>

      {/* BODY AREA */}
      <div style={{ flex: ".9", display: "flex" }}>
        {/* CREATE ACCOUNT SECTION */}
        <div style={{ flex: ".45", paddingTop: "0vh" }}>
          <h1 style={{ fontSize: "3.3em" }}>
            {" "}
            Create new account{" "}
            <span style={{ fontSize: "2em", color: "blue" }}>.</span>{" "}
          </h1>

          <h5>
            Already a member?{" "}
            <span
              style={{ color: "#5585FE", cursor: "pointer" }}
              onClick={() => {
                Navigate("/login");
              }}
            >
              Login
            </span>{" "}
          </h5>

          {/* //First Name And Surname */}
          <div
            style={{
              display: "flex",
              // background: "white",
              width: "80%",
              // height: "10vh",
              gap: "1vw",
              marginBottom: "2vh",
            }}
          >
            <TextField
              id="outlined-basic"
              label="First name"
              variant="outlined"
              color="info"
              // style={{ background: "grey" }}
              focused
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LibraryBooks style={iconColor} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-basic"
              label="Surname"
              variant="outlined"
              color="info"
              // style={{ background: "grey" }}
              focused
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LibraryBooks style={iconColor} />
                  </InputAdornment>
                ),
              }}
            />

            {/* <CountrySelect selectLabel="Club Country" /> */}
          </div>

          {/* Email */}
          <TextField
            focused
            color="info"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            sx={{ width: "80%", marginBottom: "4vh" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Mail style={iconColor} />
                </InputAdornment>
              ),
            }}
          />
          {/* Password */}

          <FormControl
            sx={{ width: "80%", marginBottom: "3vh" }}
            variant="outlined"
            focused
            color="info"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              style={{}}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff style={iconColor} />
                    ) : (
                      <Visibility style={iconColor} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {/* CREATE ACCOUNT */}

          <Button
            sx={{
              width: "15vw",
              height: "7vh",
              background: "#5585FE",
              color: "white",
              borderRadius: "1vw",
              fontWeight: "bold",
            }}
          >
            Create account
          </Button>
        </div>
        {/* SOCIAL MEDIA SECTIONS / EMPTY SECTIOn */}
        <div
          style={{
            flex: ".55",

            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {/* //ICON AREA */}
          <div style={{ flex: ".2" }}>
            {" "}
            <div style={{ float: "right" }}>
              <ul>
                <li>
                  <Instagram />
                </li>
                <li>
                  <Facebook />
                </li>
                <li>
                  <Twitter />
                </li>
              </ul>{" "}
            </div>{" "}
          </div>
          <div style={{ flex: ".8" }}>
            <h4 style={{ marginTop: "9vh", marginBottom: "5vh" }}>
              Show case your talent and get a matched across the world
            </h4>
            <img src={LoginLogo} style={{ width: "70%" }} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
