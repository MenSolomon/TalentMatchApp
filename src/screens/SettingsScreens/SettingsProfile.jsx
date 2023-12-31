import { Circle } from "@mui/icons-material";
import { Avatar, Button, Divider, Select, TextField } from "@mui/material";
import BasicSelect from "../../components/Selects/BasicSelect";
import { useSelector } from "react-redux";
import { selectUserSavedProfiles } from "../../statemanager/slices/SavedProfileSlice";
import { useEffect, useState } from "react";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import { selectCurrentBrowserSize } from "../../statemanager/slices/OtherComponentStatesSlice";
// import React from "react";

function SettingsProfile() {
  const carouselFilter = ["Berekum Chelsea", "Kotoko", "AUE"];

  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const carouselProfileName =
    userLoginDetailsObject?.carouselProfileName === undefined
      ? "Default"
      : userLoginDetailsObject?.carouselProfileName;

  const savedProfiles = useSelector(selectUserSavedProfiles);

  const outputArray = savedProfiles.map((item) => item.label);
  const [selectArray, setSelectArray] = useState(outputArray);

  useEffect(() => {
    const outputArray = savedProfiles.map((item) => item.label);

    setSelectArray(outputArray);
  }, [savedProfiles]);

  ///

  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  //

  return (
    <div
      className="md:flex md:flex-col md:w-[100%] md:h-[80vh] sm:w-[100%] sm:h-[80vh] sm:flex sm:flex-col primaryTextColor"
      style={
        {
          // width: "100%",
          // height: "82vh",
          // display: "flex",
          // flexDirection: "column",
          // overflowY: "scroll",
        }
      }
    >
      {/* Header Column */}
      <div style={{ flex: "0.01" }}>
        <h5>My Profile Settings</h5>
      </div>

      {/* Divider */}
      <div style={{ flex: "0.01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>

      {/* Sub Header Column */}
      <div
        className="md:flex md:flex-row  sm:flex sm:flex-col"
        style={{ flex: "0.89", overflowY: "scroll" }}
      >
        <div
          className="md:flex md:flex-col  sm:flex sm:flex-col"
          style={{ flex: "0.44" }}
        >
          <div
            className="md:flex md:flex-col  sm:flex sm:flex-col"
            style={{
              flex: "0.8",
              // display: "flex",
              // flexDirection: "column",
              gap: "1em",
            }}
          >
            <div
              className="md:flex md:justify-center md:items-center md:P-[0px 20px]  sm:P-[0px 10px] sm:flex sm:justify-start sm:items-center"
              style={{
                // display: "flex",
                gap: "2em",
                // padding: "0px 20px",
                // alignItems: "center",
                flex: "0.6",
                // justifyContent: "center",
                // background: "Peru",
              }}
            >
              <Avatar
                style={{
                  width: browserWidth >= 1024 ? "4.5vw" : "18%",
                  height: "90%",
                }}

                // className="md:w-[20%] md:h-[80%] sm:w-[15%"
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <b>UserName</b> <br />{" "}
                  <Button style={{ fontWeight: "lighter" }}>
                    change profile photo
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="md:flex md:justify-center  md:P-[0px 20px]  sm:P-[0px 10px] sm:flex sm:justify-start"
              style={{
                // display: "flex",
                gap: "1em",
                // padding: "0px 20px",
                flex: "0.2",
                // background: "yellow",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <TextField size="small" value={" first name"} />
                <br style={{ fontWeight: "lighter" }} /> Change user first Name
                here* (optional)
              </div>
            </div>
            <div
              className="md:flex md:justify-center  md:P-[0px 20px]  sm:P-[0px 10px] sm:flex sm:justify-start"
              style={{
                // display: "flex",
                gap: "1em",
                // padding: "0px 20px",
                flex: "0.2",
                // background: "yellow",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <TextField size="small" value={" surname"} />
                <br style={{ fontWeight: "lighter" }} /> Change user surname
                here* (optional)
              </div>
            </div>
            <div style={{ flex: "0.1", marginLeft: "15%" }}>
              <Button>Submit</Button>
            </div>
          </div>
          {/* Divider */}
        </div>
        {/* divider */}
        <div
          className="md:flex md:flex-col   sm:flex sm:flex-col"
          style={{ flex: "0.05" }}
        >
          <Divider
            className="sm:hidden md:block"
            sx={{
              background: "wheat",
              width: "5%",
              // rotate: "1deg",
              height: "100%",
            }}
          />
        </div>
        {/* End of divider */}
        <div
          className="md:flex md:flex-col   sm:flex sm:flex-col"
          style={{ flex: "0.3" }}
        >
          {/* select saved profile with filter */}
          <div style={{ flex: "0.6" }}>
            <small> change home carousel filter here* (optional)</small>
            <div className="md:w-[100%]  sm:w-[60%]">
              <BasicSelect
                itemsArray={selectArray}
                label={"saved profiles"}
                defaultSelect={carouselProfileName}
              />
            </div>
          </div>

          <div style={{ flex: "0.4" }}>
            <div className="md:flex md:flex-col   sm:flex sm:flex-col">
              <small>
                Delete your account and all of your source data. <br /> This is
                irreversible.
              </small>
              <Button
                size="small"
                className="md:w-[20vw] sm:w-[70%]"
                style={{ float: "left" }}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsProfile;
