import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import imageBackground from "../assets/images/FootballLogo.jpg";
import facebookLogo from "../assets/images/facebookImage.svg";
import GoogleLogo from "../assets/images/google.svg";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/AppLogoBlue.png";

const TermsAndConditionPage = () => {
  const [open, setOpen] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [DisableButton, setDisableButton] = React.useState(false);

  React.useEffect(() => {
    const embedScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://app.termly.io/embed-policy.min.js";
        script.async = true;
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject(new Error("Failed to load the script"));
        };
        document.body.appendChild(script);
      });
    };

    if (open) {
      embedScript()
        .then(() => {
          setLoader(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [open]);

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
        style={{ paddingBottom: "10vh" }}
      >
        {loader ? (
          <div
            style={{
              height: "90vh",
              overflowY: "scroll",
              width: "100%",
              background: "white",
              borderRadius: "1vw",
            }}
            name="termly-embed"
            data-id="f0d6e2b6-5b19-4947-9333-2190a5c7940c"
            data-type="iframe"
          ></div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {" "}
            <CircularProgress />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsAndConditionPage;
