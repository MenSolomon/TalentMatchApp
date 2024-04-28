import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Mail } from "@mui/icons-material";
import imageBackground from "../../assets/images/FootballLogo.jpg";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/AppLogoBlue.png";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const [emailMessage, setEmailMessage] = useState(false);
  const iconColor = { color: "white" };
  const navigate = useNavigate();
  // isLoading state
  const [isLoading, setIsLoading] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const resetErrorMessage = () => {
    setErrorMessage("");
  };

  const onSubmit = async (formdata) => {
    try {
      //   await sendPasswordResetEmail(auth, formdata.email);
      setEmailMessage(true);
      setIsLoading(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("User not found, try again!");
        setEmail("");
      }
    }
  };

  return (
    <>
      <div
        className="md:w-[100%] md:h-[100vh] md:flex md:flex-col md:pl-[3vw] md:p-[3vw] md:pt-[1.5vh]  sm:w-[100%] sm:h-[100vh] sm:flex sm:flex-col sm:pl-[3vw] sm:p-[3vw] sm:pt-[1.5vh]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          color: "white",
        }}>
        {/* NAVIGATION AREA */}
        <div className="md:flex md:basis-[10%]  sm:flex sm:basis-[10%]">
          {/* LOGO AREA */}
          <div
            style={{ flex: ".2", display: "flex" }}
            onClick={() => navigate("/login")}>
            {" "}
            <img style={{ width: "120px" }} src={logoImage} />
          </div>
          <div
            style={{
              flex: ".8",

              display: "flex",
              gap: "6vw",
              paddingTop: "1vh",
            }}></div>
        </div>

        {/* BODY AREA */}
        {emailMessage ? (
          <div className="text-center ">
            <Typography color={"white"} variant="h4">
              The Email has been sent
            </Typography>
            <Typography color={"white"} variant="h4">
              Check your Inbox!
            </Typography>
          </div>
        ) : (
          <div className="md:flex md:basis-[90%]   sm:flex sm:justify-center sm:basis-[100%]">
            {/* CREATE ACCOUNT SECTION */}
            <div className="md:basis-[45%] md:w-[100%] md:flex-shrink-0   sm:basis-[100%] sm:w-[100%] sm:flex-shrink-0 ">
              <h1 className="sm:block sm:text-[3em]  md:block md:text-[3.3em]">
                Enter Your Email
                <span style={{ fontSize: "2em", color: "blue" }}>.</span>{" "}
              </h1>
              <div>
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
                    <div style={{ color: "red" }}>{errorMessage}</div>
                    <div>
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
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
                          }}>
                          Submit
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
