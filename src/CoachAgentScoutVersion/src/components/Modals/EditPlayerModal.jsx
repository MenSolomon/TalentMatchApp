import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import playerShadowImage from "../../assets/images/playernowatermarks.png";
import youngerPlayerShadowImage from "../../assets/images/youngerplayer.png";
import {
  IconButton,
  Input,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { Card } from "react-bootstrap";
import CustomTextField from "../TextField/CustomTextField";
import {
  AddAPhoto,
  Close,
  Facebook,
  Instagram,
  Search,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../../statemanager/slices/PlayersInAgencySlice";
import PlayerViewCardFromPlayersScreen from "../Cards/PlayerViewCardFromPlayersScreen";
import GroupedRadio from "../../../../components/Radio/GroupedRadio";
import BasicAutoComplete from "../../../../components/Autocompletes/BasicAutoComplete";
import BasicSelect from "../../../../components/Selects/BasicSelect";
import ClubAutoComplete from "../../../../components/Autocompletes/ClubAutoComplete";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import { useForm } from "react-hook-form";
import CountrySelect from "../AutoComplete/CountrySelect";
import { useRef } from "react";
import {
  selectPlayerObjectSampleWithoutBasicInformation,
  selectPlayerSelectedByClubOrScoutInPlayerManagement,
  setPlayerSelectedByClubOrScoutInPlayerManagement,
} from "../../../../statemanager/slices/PlayersInAgencySlice";
import { v4 as uuidv4 } from "uuid";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../../../../Firebase/Firebase";
import BasicSlider from "../slider/BasicSlider";
import {
  setCloseCircularLoadBackdrop,
  setContactSupportModalCounter,
  setContactSupportModalMessage,
  setOpenCircularLoadBackdrop,
  setSnackbarMessage,
  setSnackbarTriggerCounter,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../../../statemanager/slices/OtherComponentStatesSlice";
import moment from "moment";
import { selectPlayersDatabase } from "../../../../statemanager/slices/DatabaseSlice";
import BasicButtonWithEndIcon from "../../../../components/Buttons/BasicButtonWithEndIcon";
import BasicAutoCompleteForEditPlayerModal from "../AutoComplete/BasicAutoCompleteForEditPlayerModal";
import DatePickerForEditPlayerModal from "../DatePicker/DatePickerForUploadPlayerModal";
import { selectClubsInDatabase } from "../../../../statemanager/slices/ClubsInDatabaseSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "94%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  padding: "0vw 1vw",
  display: "flex",
  flexDirection: "column",
  paddingTop: "3vh",
};

const inputStyles = {
  width: "85%",
};

// MODAL TO CREATE A new profile

const EditPlayerProfileModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fileInputRef = useRef(null);
  // const uuid = uuidv4();
  const [open, setOpen] = React.useState(false);

  const userLoginObject = useSelector(selectUserDetailsObject);
  const allPlayersInDatabase = useSelector(selectPlayersDatabase);
  const currentPlayerInfoObject = useSelector(
    selectPlayerSelectedByClubOrScoutInPlayerManagement
  );
  const playerCreatedAdditionalInfoObject = useSelector(
    selectPlayerObjectSampleWithoutBasicInformation
  );
  const dispatch = useDispatch();
  const [FirstName, setFirstName] = React.useState(
    currentPlayerInfoObject.firstName
  );
  const [SurName, setSurName] = React.useState(currentPlayerInfoObject.surName);
  const [InstagramHandle, setInstagramHandle] = React.useState(
    currentPlayerInfoObject?.Social_media[0]?.Instagram.substring(
      26,
      currentPlayerInfoObject.Social_media[0].Instagram.length - 1
    )
  );
  const [FacebookHandle, setFacebookHandle] = React.useState(
    currentPlayerInfoObject.Social_media[0].Facebook.substring(
      25,
      currentPlayerInfoObject.Social_media[0].Facebook.length
    )
  );

  const [DOB, setDOB] = React.useState(currentPlayerInfoObject.date_of_birth);
  const [CountryCode, setCountryCode] = React.useState(
    currentPlayerInfoObject.CountryCode
  );
  const [CountryName, setCountryName] = React.useState(
    currentPlayerInfoObject.Nationality
  );
  const [PreferredFoot, setPreferredFoot] = React.useState(
    currentPlayerInfoObject.preferredFoot
  );
  const [PlayerPosition, setPlayerPosition] = React.useState(
    currentPlayerInfoObject?.position
  );
  const [contractStatus, setContractStatus] = React.useState("");
  const [selectedClubs, setSelectedClubs] = React.useState("");
  const [contractStartDate, setContractStartDate] = React.useState(
    currentPlayerInfoObject.contractStartDate
  );
  const [contractEndDate, setContractEndDate] = React.useState(
    currentPlayerInfoObject.contractEndDate
  );
  const [tempUrl, setTempUrl] = React.useState("");
  const [height, setHeight] = React.useState(currentPlayerInfoObject.height);
  const [marketValue, setMarketValue] = React.useState(
    currentPlayerInfoObject.marketValue
  );
  const [submitBtnEnabler, setSubmitBtnEnabler] = React.useState(false);
  const [jerseyNumber, setJerseyNumber] = React.useState(
    currentPlayerInfoObject.jerseyNumber
  );
  const [openBackdropTrigger, setOpenBackdropTrigger] = React.useState(true);

  // Images States
  const [fileName, setFileName] = React.useState([
    { url: currentPlayerInfoObject.player_profile_image },
  ]);

  React.useEffect(() => {
    setFileName([{ url: currentPlayerInfoObject.player_profile_image }]);
  }, [currentPlayerInfoObject.player_profile_image]);

  const [file, setFile] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // reset all the default values to the players stored Values in the database on close.. else the unsaved data will appear again after closing it
    setFirstName(currentPlayerInfoObject.firstName);
    setSurName(currentPlayerInfoObject.surName);
    setInstagramHandle(
      currentPlayerInfoObject.Social_media[0].Instagram.substring(
        26,
        currentPlayerInfoObject.Social_media[0].Instagram.length - 1
      )
    );
    setFacebookHandle(
      currentPlayerInfoObject.Social_media[0].Facebook.substring(
        25,
        currentPlayerInfoObject.Social_media[0].Facebook.length
      )
    );
    setDOB(currentPlayerInfoObject.date_of_birth);
    setCountryCode(currentPlayerInfoObject.CountryCode);
    setCountryName(currentPlayerInfoObject.Nationality);
    setPreferredFoot(currentPlayerInfoObject.preferredFoot);
    setPlayerPosition(currentPlayerInfoObject?.position);

    setContractStartDate(currentPlayerInfoObject.contractStartDate);
    setContractEndDate(currentPlayerInfoObject.contractEndDate);

    setHeight(currentPlayerInfoObject.height);
    setMarketValue(currentPlayerInfoObject.marketValue);
    setJerseyNumber(currentPlayerInfoObject.jerseyNumber);
    setFileName([{ url: currentPlayerInfoObject.player_profile_image }]);

    setOpen(false);
  };

  const preferredFootArray = ["Left", "Right", "Both"];
  const soccerPositions = [
    "Any",
    "Goalkeeper (GK)",
    "Defender (D)",
    "Center Back (CB)",
    "Full-back (FB)",
    "Wing-back (WB)",
    "Midfielder (MF)",
    "Central Midfielder (CM)",
    "Defensive Midfielder (CDM)",
    "Attacking Midfielder (CAM)",
    "Wide Midfielder (WM)",
    "Forward (F)",
    "Striker (ST)",
    "Center Forward (CF)",
    "Winger (W)",
  ];
  const contractStatusArray = [
    "Transfer Listed",
    "Loan Listed",
    "Free Agent",
    "Youth Player",
    "Contract Expiring less than 6 months",
    "Currently renewed contract",
  ];

  const clubSelected = "";
  const [selectedClubName, setSelectedClubName] = React.useState("");
  const handleClubSelect = (selectedClubName) => {
    // Do something with the selected clubName
    // alert(selectedClubName);
    setSelectedClubName(selectedClubName);
    // console.log("Selected club:", selectedClubName);
  };

  const clubsInDatabase = useSelector(selectClubsInDatabase);

  // THis use effect is to fix the bug where form doesnt get updated on realtime
  React.useEffect(() => {
    setFirstName(currentPlayerInfoObject.firstName);
    setSurName(currentPlayerInfoObject.surName);
    setInstagramHandle(
      currentPlayerInfoObject.Social_media[0].Instagram.substring(
        26,
        currentPlayerInfoObject.Social_media[0].Instagram.length - 1
      )
    );
    setFacebookHandle(
      currentPlayerInfoObject.Social_media[0].Facebook.substring(
        25,
        currentPlayerInfoObject.Social_media[0].Facebook.length
      )
    );
    setDOB(currentPlayerInfoObject.date_of_birth);
    setCountryCode(currentPlayerInfoObject.CountryCode);
    setCountryName(currentPlayerInfoObject.Nationality);
    setPreferredFoot(currentPlayerInfoObject.preferredFoot);
    setPlayerPosition(currentPlayerInfoObject?.position);

    setContractStartDate(currentPlayerInfoObject.contractStartDate);
    setContractEndDate(currentPlayerInfoObject.contractEndDate);

    setHeight(currentPlayerInfoObject.height);
    setMarketValue(currentPlayerInfoObject.marketValue);
    setJerseyNumber(currentPlayerInfoObject.jerseyNumber);
    setFileName([{ url: currentPlayerInfoObject.player_profile_image }]);
  }, [allPlayersInDatabase, currentPlayerInfoObject]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    setFile([...file, ...files], "files");
    const fileNames = [];

    if (file.length > 10) {
      // setMaximumPicturesAlert(true);
    } else {
      for (let i = 0; i < files.length; i++) {
        // Getting a new id for each file
        // const fileId = v4();
        fileNames.push({
          name: files[i].name,
          size: files[i].size,
          // fileId: fileId,
          lastModified: files[i].lastModified,
          description: "",
          url: URL.createObjectURL(files[i]),
        });
      }

      // setFile([...file, ...files], "files");
      setFileName([...fileName, ...fileNames], "names");
      console.log(fileName, "Names", file);
    }
  };

  // DELETE Image selected
  const handleRemoveImageSelected = (index) => {
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1);
    setFile(updatedFiles);

    const updatedFileNames = [...fileName];
    updatedFileNames.splice(index, 1);
    setFileName(updatedFileNames);
    console.log(file, "left");
  };

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    const fileNames = [];
    console.log(files[0].name);
    await setFile([...file, ...files], "files");

    console.log(files, "SElECTEDF", file);

    if (file.length > 10 || files.length >= 9) {
      // setMaximumPicturesAlert(true);
      // if (file.length < 10) {
      //   ("Do nothing");
      // } else {
      //   setFile([]);
      // }
    } else {
      for (let i = 0; i < files.length; i++) {
        // const fileId = v4();
        fileNames.push({
          name: files[i].name,
          size: files[i].size,
          // fileId: fileId,
          lastModified: files[i]["lastModified"],
          description: "",
          url: URL.createObjectURL(files[i]),
        });
      }

      // setFile([...file, ...files], "files");
      setFileName([...fileName, ...fileNames], "names");
      console.log(fileName, "Names", file);
    }
  };

  const triggerContactSupportModal = (message) => {
    dispatch(setContactSupportModalMessage(message));
    dispatch(setContactSupportModalCounter());
  };

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const onSubmit = (formData, e) => {
    e.preventDefault();

    const uuid = uuidv4();

    // const { FirstName, Surname, InstagramHandle, FacebookHandle } = formData;

    async function updatePlayerData() {
      try {
        if (
          FirstName === "" ||
          SurName === "" ||
          CountryCode === "" ||
          CountryName === "" ||
          PlayerPosition === "" ||
          DOB === "" ||
          PreferredFoot === "" ||
          jerseyNumber === "" ||
          height === "" ||
          marketValue === "" ||
          contractStartDate === "" ||
          contractEndDate === "" ||
          fileName.length === 0
        ) {
          triggerWarningAlertModal("Please fill all required fields (*) ");
          console.log(
            "Why not",
            FirstName,
            SurName,
            CountryCode,
            CountryName,
            PlayerPosition,
            DOB,
            jerseyNumber,
            PreferredFoot,
            height,
            marketValue,
            contractStartDate,
            contractEndDate,
            // fileName[0].url,
            InstagramHandle,
            FacebookHandle
          );
        } else {
          /// If statement to prevent possible duplication of player

          const allPlayersInDatabaseExceptCurrentPlayer =
            allPlayersInDatabase.filter((data) => {
              return data.id !== currentPlayerInfoObject.id;
            });
          console.log(
            allPlayersInDatabaseExceptCurrentPlayer,
            allPlayersInDatabase
          );

          const ExistingPlayerProfile =
            allPlayersInDatabaseExceptCurrentPlayer.filter((data) => {
              const {
                firstName,
                surName,
                Nationality,
                position,
                date_of_birth,
                preferredFoot,
                // height,
                // Social_media,
              } = data;

              // Define the variables to compare
              const variablesToCompare = [
                firstName.toLowerCase() === FirstName.toLowerCase(),
                surName.toLowerCase() === SurName.toLowerCase(),
                Nationality.toLowerCase() === CountryName.toLowerCase(),
                position.toLowerCase() === PlayerPosition.toLowerCase(),
                date_of_birth === DOB, // Assuming DOB is a date object
                // data.height === height,
                preferredFoot === PreferredFoot,
                // Add more variables to compare as needed
              ];

              // Count the number of matches
              const numberOfMatches = variablesToCompare.filter(
                (match) => match
              ).length;

              // Check if at least 4 variables match
              return numberOfMatches >= 4;
            });

          console.log("MatchedAccounts", ExistingPlayerProfile);

          if (ExistingPlayerProfile.length > 0) {
            triggerContactSupportModal(
              "Oops our system detected a possible existing player in our database please recheck player details .. if it happens that he doesnt exist .. you can send an accunt verification request and our support team will verify and be with you shortly .. thank you  "
            );
          } else {
            // if statment to check if there is a player already created to prevent first player to be created bug

            // Retrieveing the details of players In possession
            console.log(userLoginObject?.playersInPossession, "DUMDUM");
            const playersInPossessionDetails =
              userLoginObject?.playersInPossession === undefined
                ? []
                : userLoginObject?.playersInPossession.map((player) => {
                    const playerIdToMatch = player.playerId;
                    // Find the player in allPlayersArray based on playerId
                    const matchedPlayer = allPlayersInDatabase.find(
                      (player) => player.id === playerIdToMatch
                    );

                    return matchedPlayer;
                  });

            // Check jersey number of all players except player we are updating
            const playersInPossessionDetailsExceptCurrentPlayerToEdit =
              playersInPossessionDetails.filter((data) => {
                return data.id !== currentPlayerInfoObject.id;
              });
            const jerseyMatch =
              playersInPossessionDetailsExceptCurrentPlayerToEdit.filter(
                (data) => {
                  // alert(`${jerseyNumber}=== ${data.jerseyNumber}`);
                  return jerseyNumber === data.jerseyNumber;
                }
              );
            // if statement to prevent duplication of jersey number
            console.log(
              playersInPossessionDetails,
              "Jersey Match",
              jerseyMatch
            );

            if (jerseyMatch.length > 0) {
              triggerWarningAlertModal(
                "Please change jersey number for player. It has already been selected "
              );
            } else {
              var givenDate = moment(DOB, "MMMM D, YYYY");
              var currentDate = moment();
              // Check if the birthday has occurred this year
              var hasBirthdayOccurred = currentDate.isSameOrAfter(
                moment(givenDate).year(currentDate.year())
              );
              // Calculate the positive difference
              var ageDifference =
                currentDate.year() -
                givenDate.year() -
                (hasBirthdayOccurred ? 0 : 1);

              // Calculate the guessed age
              var currentAge = Math.round(ageDifference);
              // alert(currentAge, "Age");

              const playerObjectInjectionRef = doc(
                db,
                `players_database`,
                currentPlayerInfoObject.id
              );

              // const selectedFile = file[0];

              // upload the image to google storage

              if (fileName[0]?.lastModified === undefined) {
                // alert("do not update the image");

                setSubmitBtnEnabler(true);
                dispatch(setOpenCircularLoadBackdrop());

                const newUpdateObject = {
                  firstName: FirstName,
                  surName: SurName,
                  height: height,
                  marketValue: marketValue,
                  jerseyNumber: jerseyNumber,
                  position: PlayerPosition,
                  preferredFoot: PreferredFoot,
                  date_of_birth: DOB,
                  contractStartDate: contractStartDate,
                  contractEndDate: contractEndDate,
                  CountryCode: CountryCode,
                  Nationality: CountryName,
                  Age: currentAge,
                  Social_media: [
                    {
                      Facebook: `https://web.facebook.com/${FacebookHandle}`,
                      Instagram: `https://www.instagram.com/${InstagramHandle}/`,
                    },
                  ],
                };

                await updateDoc(playerObjectInjectionRef, newUpdateObject);

                await dispatch(
                  setPlayerSelectedByClubOrScoutInPlayerManagement({
                    ...currentPlayerInfoObject,
                    ...newUpdateObject,
                  })
                );

                dispatch(setCloseCircularLoadBackdrop());

                // alert("Data invested");
                // setSubmitBtnEnabler()
                setSubmitBtnEnabler(false);

                handleClose();

                dispatch(
                  setSnackbarMessage(
                    `"Player updated in our database and your club successfully"`
                  )
                );
                dispatch(setSnackbarTriggerCounter());
              } else {
                // alert(
                //   "Wirte storage functions that delete the old image and update with new image"
                // );
                setSubmitBtnEnabler(true);
                dispatch(setOpenCircularLoadBackdrop());
                const pathStartIndex =
                  currentPlayerInfoObject.player_profile_image.indexOf("/o/") +
                  3;
                // Find the position after "/o/"
                const pathEndIndex =
                  currentPlayerInfoObject.player_profile_image.indexOf("?");
                // Find the position before "?alt=media"

                if (pathStartIndex !== -1 && pathEndIndex !== -1) {
                  const filePath =
                    currentPlayerInfoObject.player_profile_image.substring(
                      pathStartIndex,
                      pathEndIndex
                    );

                  const fileObj = filePath
                    .replace(/%2F/g, "")
                    .replace(/%20/g, " ");
                  const fileObjPath =
                    "playersProfileImages/" +
                    fileObj.substring("playersProfileImages".length);
                  alert(fileObjPath);
                  //Deleting file that was stored eariler
                  const existingFileRef = ref(storage, fileObjPath);
                  await deleteObject(existingFileRef);

                  const selectedFile = file[0];
                  // Create a reference to the file to delete
                  const profileImageRef = ref(
                    storage,
                    `playersProfileImages/${
                      selectedFile.name + "-" + currentPlayerInfoObject.id
                    }`
                  );

                  // Upload the image
                  await uploadBytes(profileImageRef, selectedFile);

                  // Get the download URL
                  const url = await getDownloadURL(profileImageRef);

                  const newUpdateObject = {
                    firstName: FirstName,
                    surName: SurName,
                    height: height,
                    marketValue: marketValue,
                    jerseyNumber: jerseyNumber,
                    position: PlayerPosition,
                    preferredFoot: PreferredFoot,
                    date_of_birth: DOB,
                    contractStartDate: contractStartDate,
                    contractEndDate: contractEndDate,
                    CountryCode: CountryCode,
                    Nationality: CountryName,
                    Age: currentAge,
                    player_profile_image: url,
                    Social_media: [
                      {
                        Facebook: `https://web.facebook.com/${FacebookHandle}`,
                        Instagram: `https://www.instagram.com/${InstagramHandle}/`,
                      },
                    ],
                  };

                  await updateDoc(playerObjectInjectionRef, newUpdateObject);

                  await dispatch(
                    setPlayerSelectedByClubOrScoutInPlayerManagement({
                      ...currentPlayerInfoObject,
                      ...newUpdateObject,
                    })
                  );

                  dispatch(setCloseCircularLoadBackdrop());

                  // alert("Data invested");
                  // setSubmitBtnEnabler()

                  setSubmitBtnEnabler(false);

                  handleClose();

                  dispatch(
                    setSnackbarMessage(
                      `"Player updated in our database and your club successfully"`
                    )
                  );
                  dispatch(setSnackbarTriggerCounter());
                } else {
                  alert("Invalid file URL");
                  dispatch(setCloseCircularLoadBackdrop());
                }
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
        alert(error);
        setSubmitBtnEnabler(false);
        dispatch(setCloseCircularLoadBackdrop());
        triggerWarningAlertModal(
          "Something went wrong ... please try again after a while"
        );
      }
    }

    updatePlayerData();
  };

  return (
    <React.Fragment>
      <div onClick={handleOpen}>
        <BasicButtonWithEndIcon
          innerText="Edit Profile"
          style={{ width: "9vw", height: "6vh", marginBottom: "1.5vh" }}
          endIcon={"edit"}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          className="cardBackground primaryTextColor"
          sx={{ ...style, width: 1000 }}
        >
          <h2 id="child-modal-title">Edit a player profile</h2>
          <Button
            sx={{ width: "10%", marginLeft: "80%", marginBottom: "1vh" }}
            onClick={handleClose}
          >
            Back
          </Button>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* {...register("firstName", { required: true })} */}
            <div
              style={{
                width: "100%",
                height: "80%",
                display: "flex",
                gap: "1vw",
              }}
            >
              {/* LEFT INPUT PLAYER DETAILS */}
              <div
                style={{
                  flex: ".35",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    flex: "0.9",
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* <CustomTextField placeholder={"First Name"} />
                <CustomTextField placeholder={"Surname"} /> */}

                  <TextField
                    required
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    fullWidth={true}
                    sx={{ width: "23vw" }}
                    value={FirstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    // {...register("FirstName", { required: true })}
                  />
                  <TextField
                    required
                    id="outlined-basic"
                    label="Surname"
                    variant="outlined"
                    fullWidth={true}
                    sx={{ width: "23vw" }}
                    value={SurName}
                    onChange={(e) => {
                      setSurName(e.target.value);
                    }}
                    // {...register("Surname", { required: true })}
                  />
                  <DatePickerForEditPlayerModal
                    style={{ width: "23vw" }}
                    containerStyle={{ marginTop: "-1vh" }}
                    label="Date of birth *"
                    defaultValue={DOB}
                    dateValue={(e) => {
                      setDOB(
                        e.$d.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      );
                      console.log(
                        e.$d.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      );
                    }}
                  />

                  <CountrySelect
                    defaultCountry={{
                      label: CountryName,
                      code: CountryCode,
                    }}
                    countryCode={(e) => {
                      setCountryCode(e);
                    }}
                    countryName={(e) => {
                      setCountryName(e);
                    }}
                    selectLabel="Nationality *"
                    styles={{
                      minWidth: "23vw",
                      marginLeft: "-0.5vw",
                      marginTop: "1vh",
                    }}
                  />

                  <BasicSlider
                    defaultValue={height}
                    rangeName="Height *"
                    max={2.5}
                    min={0.3}
                    steps={0.1}
                    sliderValue={(e) => {
                      setHeight(e);
                    }}
                  />
                  {/* <TextField
                    required
                    id="outlined-basic"
                    label="Height"
                    type="number"
                    variant="outlined"
                    fullWidth={true}
                    className="primaryTextColor"
                    sx={{ width: "23vw" }}
                    {...register("Height", { required: true })}
                  /> */}
                </div>
                <div style={{ flex: "0.1" }}>
                  {/* BTN */}
                  <Button
                    type="submit"
                    disabled={submitBtnEnabler}
                    sx={{
                      width: "23vw",
                      background: "blue",
                      color: "white",
                      border: ".5vw",
                      position: "absolute",
                      bottom: 50,
                    }}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </div>
              </div>
              {/* MIDDLE INPUT PLAYER DETAILS */}
              <div
                style={{
                  flex: ".35",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <BasicSlider
                  defaultValue={marketValue}
                  rangeName="Market value 000,000 (optional)"
                  max={50}
                  min={0}
                  steps={1}
                  sliderValue={(e) => {
                    setMarketValue(e);
                  }}
                />
                {/* <TextField
                  // required
                  id="outlined-basic"
                  label="Market value(optional)"
                  type="number"
                  variant="outlined"
                  fullWidth={true}
                  sx={{ width: "23vw" }}
                  {...register("MarketValue", { required: true })}
                /> */}
                {clubSelected !== "" ? (
                  <BasicSelect
                    label="Contract status"
                    itemsArray={contractStatusArray}
                    inputStyle={{ width: "23vw" }}
                  />
                ) : (
                  ""
                )}
                <BasicAutoCompleteForEditPlayerModal
                  defaultValue={PlayerPosition}
                  // defaultValue={PlayerPositionAutoCompleteValue}

                  AutoCompleteValue={(e) => {
                    setPlayerPosition(e);
                  }}
                  style={{ width: "23vw" }}
                  ListArray={soccerPositions}
                  label="Main Position *"
                />{" "}
                {/* <CustomTextField placeholder={"Market value(optional)"} /> */}
                <GroupedRadio
                  radioDefault={PreferredFoot}
                  radioArray={preferredFootArray}
                  labelName="Preferred foot *"
                  selectedValue={(e) => {
                    setPreferredFoot(e);
                  }}
                />
                {/* SOCIAL MEDIAL HANDLES*/}
                <TextField
                  id="outlined-basic"
                  label="Instagram Handle"
                  value={InstagramHandle}
                  onChange={(e) => {
                    setInstagramHandle(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Instagram />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{ width: "23vw" }}
                  // {...register("InstagramHandle")}
                />
                <TextField
                  id="outlined-basic"
                  label="Facebook Username"
                  value={FacebookHandle}
                  onChange={(e) => {
                    setFacebookHandle(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Facebook />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{ width: "23vw" }}
                  // {...register("FacebookHandle")}
                />
              </div>
              {/* RIGHT SELECT IMAGES FROM FILES */}
              <div style={{ flex: ".3" }}>
                {/* MARKET VALUE RANGE */}

                {userLoginObject.role == "Club" ? (
                  ""
                ) : userLoginObject.role == "Scout" ||
                  userLoginObject.role == "Coach" ? (
                  <ClubAutoComplete
                    ListArray={clubsInDatabase}
                    label="Select a club"
                    style={{ width: "23vw" }}
                    onClubSelect={handleClubSelect}
                  />
                ) : (
                  ""
                )}

                <BasicSlider
                  defaultValue={jerseyNumber}
                  rangeName="Jersey Number *"
                  max={99}
                  min={1}
                  steps={1}
                  sliderValue={(e) => {
                    // alert(e);
                    setJerseyNumber(e);
                  }}
                />

                {fileName.length === 0 ? (
                  <div
                    style={{
                      border: "2px dotted",
                      borderRadius: "1vw",
                      width: "23vw",
                      height: "15vh",
                      display: "flex",
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                      marginTop: "3vh",
                    }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyItems: "baseline",
                        gap: 10,
                      }}
                    >
                      <AddAPhoto />
                      <Typography sx={{ fontWeight: "600" }}>
                        Select or drag profile Image
                      </Typography>
                    </div>

                    {/* ref input */}
                    <div>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        // multiple
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                ) : (
                  fileName.map((data, i) => (
                    <div
                      key={i}
                      style={{
                        width: "9vw",
                        height: "15vh",
                        marginTop: "3vh",
                        backgroundImage: `url(${data.url})`,
                        backgroundSize: "cover",
                        borderRadius: "5%",
                        marginBottom: "1%",
                        marginRight: "1.65vw",
                      }}
                      // key={index}
                    >
                      <IconButton
                        onClick={() => {
                          handleRemoveImageSelected(i);
                          // alert(`clicked ${i}`);
                        }}
                        sx={{
                          postion: "absolute",
                          width: 20,
                          height: 20,
                          color: "red",
                          // backgroundColor: "white",
                          left: "10vw",
                        }}
                      >
                        <Close />
                      </IconButton>
                    </div>
                  ))
                )}

                {/* // Start Date`` */}
                <h6 style={{ marginTop: "5.5vh" }}>Contract period</h6>
                <DatePickerForEditPlayerModal
                  defaultValue={contractStartDate}
                  style={{ width: "23vw" }}
                  containerStyle={{ marginTop: "-1vh", marginBottom: "3vh" }}
                  label="Start date *"
                  dateValue={(e) => {
                    setContractStartDate(
                      e.$d.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    );
                  }}
                />
                {/* End Date */}
                <DatePickerForEditPlayerModal
                  defaultValue={contractEndDate}
                  style={{ width: "23vw" }}
                  containerStyle={{ marginTop: "-1vh" }}
                  label="End date *"
                  dateValue={(e) => {
                    setContractEndDate(
                      e.$d.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    );
                  }}
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default EditPlayerProfileModal;
// MODAL TO ADD EXISTING PLAYER TO AGENCY   , paddingLeft: "5%"
