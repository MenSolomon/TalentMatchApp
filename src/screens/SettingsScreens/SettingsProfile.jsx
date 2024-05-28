import { Circle } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Select,
  TextField,
} from "@mui/material";
import BasicSelect from "../../components/Selects/BasicSelect";
import { useDispatch, useSelector } from "react-redux";
import { selectUserSavedProfiles } from "../../statemanager/slices/SavedProfileSlice";
import { useEffect, useRef, useState } from "react";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import {
  selectCurrentBrowserSize,
  setCloseCircularLoadBackdrop,
  setImageBelow500kbSelected,
  setOpenCircularLoadBackdrop,
  setSnackbarMessage,
  setSnackbarTriggerCounter,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { v4 as uuidv4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { db, storage } from "../../Firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// import React from "react";

function SettingsProfile() {
  const carouselFilter = ["Berekum Chelsea", "Kotoko", "AUE"];

  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const [firstName, setFirstName] = useState(userLoginDetailsObject?.firstName);
  const [surName, setSurName] = useState(userLoginDetailsObject?.surname);

  const carouselProfileName =
    userLoginDetailsObject?.carouselProfileName === undefined
      ? "Default"
      : userLoginDetailsObject?.carouselProfileName;

  const savedProfiles = useSelector(selectUserSavedProfiles);
  const { email } = userLoginDetailsObject;
  const { role } = userLoginDetailsObject;
  const outputArray = savedProfiles.map((item) => item.label);
  const [selectArray, setSelectArray] = useState(outputArray);

  useEffect(() => {
    const outputArray = savedProfiles.map((item) => item.label);

    setSelectArray(outputArray);
  }, [savedProfiles]);

  ///

  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
  let browserWidthOnLargeScreens = parseInt(browserSize?.width, 10);
  //

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };
  const [imageObject, setImageObject] = useState({});
  const [imageUrl, setImageUrl] = useState(
    userLoginDetailsObject?.profileImage
  );

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles.length > 0) {
      // Assuming you want to handle each selected file
      const file = selectedFiles[0]; // Take the first file

      const imageBlob = URL.createObjectURL(file);

      if (file.type.startsWith("image/")) {
        const maxSizeInBytes = 0.5 * 1024 * 1024; // 15 MB

        if (file.size <= maxSizeInBytes) {
          console.log("File accepted:", file);
          setImageObject(file); // Store the file itself

          dispatch(setImageBelow500kbSelected(true));
          setImageUrl(imageBlob);
          // alert(imageBlob);
          // console.log(imageUrl);

          // Reset the value of the file input element
          event.target.value = [];
        } else {
          triggerWarningAlertModal("File size exceeds the limit (500 KB).");
        }
      } else {
        triggerWarningAlertModal("Please select an image file.");
      }
    }
  };

  const profileEditSubmit = async () => {
    const uuid = uuidv4();

    {
      try {
        if (imageObject?.name === undefined) {
          dispatch(setOpenCircularLoadBackdrop());

          const playerObjectRef = doc(
            db,
            `users_db`,
            userLoginDetailsObject?.accountId
          );
          await updateDoc(playerObjectRef, {
            firstName: firstName,
            surname: surName,
          });

          dispatch(setCloseCircularLoadBackdrop());
          dispatch(setSnackbarMessage("Proile settings saved"));
          dispatch(setSnackbarTriggerCounter());
        } else {
          const playerImageRef = ref(
            storage,
            `profileImages/${userLoginDetailsObject?.firstName}${
              userLoginDetailsObject?.surname
            }${userLoginDetailsObject?.accountId}/${
              imageObject?.name + "-" + uuid
            }`
          );

          dispatch(setOpenCircularLoadBackdrop());
          // Upload the image
          await uploadBytes(playerImageRef, imageObject);

          // Get the download URL
          const url = await getDownloadURL(playerImageRef);

          // const VideoUuid = uuidv4();

          const profileObjectRef = doc(
            db,
            `users_db`,
            userLoginDetailsObject?.accountId
          );
          await updateDoc(profileObjectRef, {
            profileImage: url,
            profileImageLastUpdated: moment().format("MMMM D, YYYY HH:mm:ss"),
            firstName: firstName,
            surname: surName,
          });

          if (role === "Player") {
            const playerObjectRef = doc(
              db,
              `players_database`,
              userLoginDetailsObject?.accountId
            );
            // POSSIBLE BUG FIX .. reject any image file name which has %2F or %20 in its name
            const playerImageRef = ref(
              storage,
              `playersProfileImages/${
                imageObject?.name + "-" + userLoginDetailsObject?.accountId
              }`
            );

            await uploadBytes(playerImageRef, imageObject);
            const PlayerImageUrl = await getDownloadURL(playerImageRef);

            await updateDoc(playerObjectRef, {
              player_profile_image: PlayerImageUrl,
            });
          }

          dispatch(setCloseCircularLoadBackdrop());

          dispatch(setSnackbarMessage("Proile settings saved"));

          dispatch(setSnackbarTriggerCounter());
        }
      } catch (error) {
        console.error("failu", error);
        // alert(error);
        dispatch(setCloseCircularLoadBackdrop());
        triggerWarningAlertModal(
          "Something went wrong ... please try again after a while"
        );
      }
    }
  };

  // <Button onClick={handleClick} variant="contained">
  //                     select Files
  //                   </Button>

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
        <h5 className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
          My Profile Settings
        </h5>
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
                src={imageUrl}
                style={{
                  width: browserWidth >= 1024 ? "5.5vw" : "17vw",
                  height: browserWidth >= 1024 ? "10.5vh" : "10vh",
                }}

                // className="md:w-[20%] md:h-[80%] sm:w-[15%"
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  {/* <b>UserName</b> <br />{" "} */}
                  <Button
                    onClick={handleClick}
                    style={{ fontWeight: "lighter" }}
                  >
                    Change profile photo
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                    accept="image/*" // Limit to video files
                    // multiple
                  />
                </div>
                <Card className="lg:w-[17vw] lg:h-[4vh] lg:flex lg:justify-center lg:items-center md:w-[26vw] md:h-[4vh] md:flex md:justify-center md:items-center  tb:w-[35vw] tb:h-[4vh] tb:flex tb:justify-center tb:items-center  sm:w-[50vw] sm:h-[4vh] sm:flex sm:justify-center sm:items-center    sm:text-[.8em] lg:text-[1em] md:text-[1em] tb:text-[1em]">
                  {" "}
                  {email}
                </Card>
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
              <div
                className="lg:text-[1em] md:text-[1em] tb:text-[1em]"
                style={{ display: "flex", flexDirection: "column-reverse" }}
              >
                <TextField
                  size="small"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
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
              <div
                className="lg:text-[1em] md:text-[1em] tb:text-[1em]"
                style={{ display: "flex", flexDirection: "column-reverse" }}
              >
                <TextField
                  size="small"
                  onChange={(e) => {
                    setSurName(e.target.value);
                  }}
                  value={surName}
                />
                <br style={{ fontWeight: "lighter" }} /> Change user surname
                here* (optional)
              </div>
            </div>
            <div style={{ flex: "0.1", marginLeft: "15%" }}>
              <Button onClick={profileEditSubmit}>Submit</Button>
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
            <small className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
              {" "}
              change home carousel filter here* (optional)
            </small>
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
              <small className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
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
