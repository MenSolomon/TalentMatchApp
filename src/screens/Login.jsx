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
  Book,
  Facebook,
  Instagram,
  LibraryBooks,
  Mail,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import imageBackground from "../assets/images/FootballLogo.jpg";
import facebookLogo from "../assets/images/facebookImage.svg";
import GoogleLogo from "../assets/images/google.svg";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iconColor = { color: "white" };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        // backgroundImage: `linear-gradient(0deg, rgba(46,46,46,1) 0%, rgba(255,255,255,1) 100%),url("${imageBackground}")`,
        backgroundImage: ` linear-gradient(90deg, rgba(27,27,27,1) 0%, rgba(97,95,95,0.9780111873851103) 48%, rgba(142,142,142,0.3449579660965949) 74%, rgba(255,255,255,1) 100%),url("${imageBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // background: "blue",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        padding: "2vw",
        paddingLeft: "3vw",
        color: "white",
      }}
    >
      {/* NAVIGATION AREA */}
      <div style={{ flex: ".1", display: "flex" }}>
        {/* LOGO AREA */}
        <div style={{ flex: ".2", display: "flex" }}>
          {" "}
          <Avatar
            src="/static/images/avatar/1.jpg"
            style={{ background: "blue", color: "blue" }}
          >
            r
          </Avatar>{" "}
          <h4 style={{ marginLeft: ".7vw", marginTop: "1vh" }}>Talent Match</h4>
        </div>
        <div
          style={{
            flex: ".8",

            display: "flex",
            gap: "6vw",
            paddingTop: "1vh",
          }}
        >
          <h5>Home</h5>
          <h5>Join</h5>
        </div>
      </div>

      {/* BODY AREA */}
      <div style={{ flex: ".9", display: "flex" }}>
        {/* CREATE ACCOUNT SECTION */}
        <div style={{ flex: ".45", paddingTop: "0vh" }}>
          <h1 style={{ fontSize: "3.3em" }}>
            {" "}
            Welcome Back{" "}
            <span style={{ fontSize: "2em", color: "blue" }}>.</span>{" "}
          </h1>

          <h5>
            Dont have an account?{" "}
            <span style={{ color: "#5585FE", cursor: "pointer" }}>Signup</span>{" "}
          </h5>

          {/* //First Name And Surname */}
          <div
            style={{
              display: "flex",
              // background: "white",
              width: "80%",
              // height: "10vh",
              gap: "1vw",
              marginBottom: "3vh",
            }}
          >
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
              <img
                src={GoogleLogo}
                style={{ width: "30px", marginRight: "1vw" }}
              />{" "}
              Google
            </Button>
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
              <img
                src={facebookLogo}
                style={{ width: "30px", marginRight: "1vw" }}
              />{" "}
              Facebook
            </Button>
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

          {/* Login ACCOUNT */}

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
            Login
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
        </div>
      </div>
    </div>
  );
};

export default Login;
