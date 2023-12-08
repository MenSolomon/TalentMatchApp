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
import { useDispatch, useSelector } from "react-redux";
import { selectTempUsersDatabase } from "../statemanager/slices/TempDatabaseSlice";
import { useForm } from "react-hook-form";
import {
  setLoginStatus,
  setUserDetailsObject,
} from "../statemanager/slices/LoginUserDataSlice";
import { selectUsersDatabase } from "../statemanager/slices/DatabaseSlice";
import WarningAlertModal from "../components/Modals/WarningAlertModal";

const Login = () => {
  const { register, handleSubmit } = useForm();
  // Settings for password input
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iconColor = { color: "white" };

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const AllUsersDatabase = useSelector(selectUsersDatabase);

  const resetErrorMessage = () => {
    setErrorMessage("");
  };

  const onSubmit = (formData) => {
    // alert(formData.email, formData.password);

    const matchUserAccount = AllUsersDatabase.filter((data) => {
      return data.email === formData.email;
    });

    // console.log("ax1x", matchUserAccount[0]);
    if (matchUserAccount.length > 0) {
      if (matchUserAccount[0].password === formData.password) {
        dispatch(setLoginStatus(true));
        dispatch(setUserDetailsObject(matchUserAccount[0]));
        setErrorMessage("");

        Navigate("/");
      } else {
        setErrorMessage("Password doesnt match account");
        // alert();
      }
    } else {
      setErrorMessage("Account doesn't exist");
    }
  };

  // const handleLogin()=>{

  // }

  return (
    <div
      className="md:w-[100%] md:h-[100vh] md:flex md:flex-col md:pl-[3vw] md:p-[3vw] md:pt-[1.5vh]  sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-col sm:pl-[3vw] sm:p-[3vw] sm:pt-[1.5vh]"
      style={{
        // width: "100%",
        // height: "100vh",
        // backgroundImage: `linear-gradient(0deg, rgba(46,46,46,1) 0%, rgba(255,255,255,1) 100%),url("${imageBackground}")`,
        backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // background: "blue",
        backgroundRepeat: "no-repeat",
        // display: "flex",
        // flexDirection: "column",
        // // padding: "2vw",
        // paddingLeft: "3vw",
        // padding: "3vw",
        // paddingTop: "1.5vh",

        color: "white",
      }}
    >
      {/* NAVIGATION AREA */}
      <div
        className="md:flex md:basis-[10%]  sm:flex sm:basis-[10%]"
        //  style={{ flex: ".1", display: "flex" }}
      >
        {/* LOGO AREA */}
        <div style={{ flex: ".2", display: "flex" }}>
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
      <div
        className="md:flex md:basis-[90%]   sm:flex sm:justify-center sm:basis-[100%]"
        // style={{ flex: ".9", display: "flex" }}
      >
        {/* CREATE ACCOUNT SECTION */}
        <div className="md:basis-[45%] md:w-[100%] md:flex-shrink-0   sm:basis-[100%] sm:w-[100%] sm:flex-shrink-0 ">
          <h1
            className="sm:block sm:text-[3em]  md:block md:text-[3.3em]"
            //  style={{ fontSize: "3.3em" }}
          >
            {" "}
            Welcome Back{" "}
            <span style={{ fontSize: "2em", color: "blue" }}>.</span>{" "}
          </h1>
          <div>
            <div className="sm:pt-[5%] md:pt-[0%]">
              <h5>
                Dont have an account?{" "}
                <span
                  style={{ color: "#5585FE", cursor: "pointer" }}
                  onClick={() => {
                    Navigate("/membership-plans");
                  }}
                >
                  Choose a plan
                </span>{" "}
              </h5>
            </div>

            {/* //First Name And Surname */}

            {/* Email */}
            <div className="sm:pt-[5%] md:pt-[0%]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  onClick={resetErrorMessage}
                  focused
                  color="info"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  sx={{ marginBottom: "4vh" }}
                  className="sm:w-[100%]  md:w-[80%]"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Mail style={iconColor} />
                      </InputAdornment>
                    ),
                  }}
                  {...register("email", { required: true })}
                />
                {/* Password */}

                <FormControl
                  className="sm:w-[100%] md:w-[80%]"
                  sx={{ marginBottom: "3vh" }}
                  variant="outlined"
                  focused
                  color="info"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    {...register("password", { required: true })}
                    required
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

                  <div style={{ color: "red" }}>{errorMessage}</div>
                </FormControl>

                {/* Login ACCOUNT */}

                <div> </div>

                <div>
                  <Button
                    type="submit"
                    className="md:w-[15vw] sm:w-[30vw]"
                    sx={{
                      // width: "15vw",
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
              </form>
            </div>
          </div>
        </div>
        {/* SOCIAL MEDIA SECTIONS / EMPTY SECTIOn */}
        <div
          className="md:basis-[55%] md:flex md:flex-col-reverse md:w-[100%] md:flex-shrink-0   sm:hidden"
          style={
            {
              // flex: ".55",
              // display: "flex",
              // flexDirection: "column-reverse",
            }
          }
        >
          {/* //ICON AREA */}
          <div style={{ flex: ".2" }}>
            {" "}
            <div style={{ float: "right" }}>
              <ul>
                <li>
                  <Instagram sx={{ color: "white" }} />
                </li>
                <li>
                  <Facebook sx={{ color: "white" }} />
                </li>
                <li>
                  <Twitter sx={{ color: "white" }} />
                </li>
              </ul>{" "}
            </div>{" "}
          </div>
          <div style={{ flex: ".8" }}>
            <h4 style={{ marginTop: "9vh", marginBottom: "5vh" }}>
              Get matched with player accros the globe
            </h4>
            <WorldMaps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
