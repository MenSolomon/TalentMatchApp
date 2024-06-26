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
// import DatePickerTool from "../DatePicker//DatePicker";
import GroupedRadio from "../../../../components/Radio/GroupedRadio";
import BasicAutoComplete from "../../../../components/Autocompletes/BasicAutoComplete";
import BasicSelect from "../../../../components/Selects/BasicSelect";
import ClubAutoComplete from "../../../../components/Autocompletes/ClubAutoComplete";
import {
  selectIsSubscriptionActive,
  selectSubscriptionFeatures,
  selectUserDetailsObject,
} from "../../../../statemanager/slices/LoginUserDataSlice";
import { useForm } from "react-hook-form";
import CountrySelect from "../AutoComplete/CountrySelect";
import { useRef } from "react";
import { selectPlayerObjectSampleWithoutBasicInformation } from "../../../../statemanager/slices/PlayersInAgencySlice";
import { v4 as uuidv4 } from "uuid";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../../Firebase/Firebase";
import BasicSlider from "../slider/BasicSlider";
import {
  selectSoccerPositionsFullObject,
  selectSoccerPostions,
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
import { selectClubsInDatabase } from "../../../../statemanager/slices/ClubsInDatabaseSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DatePickerForEditPlayerModal from "../DatePicker/DatePickerForEditPlayerModal";
import DatePickerToolCreateAccount from "../../../../components/DatePicker/DatePickerCreateAccout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "65%",
  // height: "94%",
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

function CreateAPlayerProfileModal({ turnMotherModalAfterSubmitted }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fileInputRef = useRef(null);
  // const uuid = uuidv4();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const userLoginObject = useSelector(selectUserDetailsObject);
  const allPlayersInDatabase = useSelector(selectPlayersDatabase);
  const playerCreatedAdditionalInfoObject = useSelector(
    selectPlayerObjectSampleWithoutBasicInformation
  );

  const dispatch = useDispatch();
  const [DOB, setDOB] = React.useState("");
  const [CountryCode, setCountryCode] = React.useState("");
  const [CountryName, setCountryName] = React.useState("");
  const [PreferredFoot, setPreferredFoot] = React.useState("");
  const [PlayerPosition, setPlayerPosition] = React.useState("");
  const [contractStatus, setContractStatus] = React.useState("");
  const [selectedClubs, setSelectedClubs] = React.useState("");
  const [contractStartDate, setContractStartDate] = React.useState("");
  const [contractEndDate, setContractEndDate] = React.useState("");
  const [tempUrl, setTempUrl] = React.useState("");
  const [height, setHeight] = React.useState("0.3");
  const [marketValue, setMarketValue] = React.useState("0");
  const [submitBtnEnabler, setSubmitBtnEnabler] = React.useState(false);
  const [jerseyNumber, setJerseyNumber] = React.useState("1");
  const [openBackdropTrigger, setOpenBackdropTrigger] = React.useState(true);
  // Images States
  const [fileName, setFileName] = React.useState([]);
  const [file, setFile] = React.useState([]);

  const positionsFullObject = useSelector(selectSoccerPositionsFullObject);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const preferredFootArray = ["Left", "Right", "Both"];
  const soccerPositions = useSelector(selectSoccerPostions);

  // const contractStatusArray = [
  //   "Transfer Listed",
  //   "Loan Listed",
  //   "Free Agent",
  //   "Youth Player",
  //   "Contract Expiring less than 6 months",
  //   "Currently renewed contract",
  // ];

  const contractStatusArray = [
    "Any",
    "Free agent",
    "Contract Expiring in less than 6 months",
    "Contract Expiring in more than 6 months",
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

    const { FirstName, Surname, InstagramHandle, FacebookHandle } = formData;

    async function uploadPlayerData() {
      try {
        if (
          FirstName === "" ||
          Surname === "" ||
          CountryCode === "" ||
          CountryName === "" ||
          PlayerPosition === "" ||
          PreferredFoot === "" ||
          // DOB === "" ||
          jerseyNumber === "" ||
          height === "" ||
          marketValue === "" ||
          contractStartDate === "" ||
          contractEndDate === "" ||
          file.length === 0
        ) {
          triggerWarningAlertModal("Please fill all required fields (*) ");
        } else {
          /// If statement to prevent possible duplication of player

          const ExistingPlayerProfile = allPlayersInDatabase.filter((data) => {
            const {
              firstName,
              surName,
              Nationality,
              position,
              date_of_birth,
              preferredFoot,
              // height,
              Social_media,
            } = data;

            // Define the variables to compare
            const variablesToCompare = [
              firstName.toLowerCase() === FirstName.toLowerCase(),
              surName.toLowerCase() === Surname.toLowerCase(),
              Nationality.toLowerCase() === CountryName.toLowerCase(),
              position.toLowerCase() === PlayerPosition.toLowerCase(),
              date_of_birth === DOB, // Assuming DOB is a date object
              data.height === height,
              preferredFoot === PreferredFoot,
              // Add more variables to compare as needed
            ];

            // Count the number of matches
            const numberOfMatches = variablesToCompare.filter(
              (match) => match
            ).length;

            // Check if at least 4 variables match
            return numberOfMatches >= 6;
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

            const jerseyMatch = playersInPossessionDetails.filter((data) => {
              // alert(`${jerseyNumber}=== ${data.jerseyNumber}`);
              return jerseyNumber === data.jerseyNumber;
            });
            // if statement to prevent duplication of jersey number
            console.log(
              playersInPossessionDetails,
              "Jersey Match",
              jerseyMatch
            );

            if (DOB === "") {
              triggerWarningAlertModal(
                "Please make sure you select a date 16 older or above from today"
              );
            } else if (jerseyMatch.length > 0) {
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

              setSubmitBtnEnabler(true);
              const playerObjectInjectionRef = doc(
                db,
                `players_database`,
                uuid
              );

              const selectedFile = file[0];

              // upload the image to google storage
              // POSSIBLE BUG FIX .. reject any image file name which has %2F or %20 in its name
              const profileImageRef = ref(
                storage,
                `playersProfileImages/${selectedFile.name + "-" + uuid}`
              );

              dispatch(setOpenCircularLoadBackdrop());
              // Upload the image
              await uploadBytes(profileImageRef, selectedFile);

              // Get the download URL
              const url = await getDownloadURL(profileImageRef);

              const playerPositionObject = positionsFullObject.find(
                (position) =>
                  position?.name?.trim().toLowerCase() ===
                  PlayerPosition.trim().toLowerCase()
              );

              // Update playerData with the download URL
              const playerData = {
                id: uuid,
                Account_creator_id: userLoginObject?.accountId,
                Current_Account_Owner: userLoginObject?.accountId,
                // ... (other fields)
                boostPoints: 0,
                // isBasic: true,
                // Write a code that checks if the creator is a club account then take the CLub Id of as current team ID
                currentTeamId: null,
                currentNationalTeamId: null,
                gender: "",
                isApiData: false,
                isVerified: false,
                shortName: FirstName?.slice(0, 1) + "." + Surname,
                role: playerPositionObject,
                player_profile_image: url,
                firstName: FirstName,
                surName: Surname,
                CountryCode: CountryCode,
                Nationality: CountryName,
                dateCreated: serverTimestamp(),
                // // Use moment js to get the age by subtracting current year from the the year gotten from the dob object
                // Age: currentAge,
                position: PlayerPosition,
                date_of_birth: DOB,
                // "alternate_Positions": ["CAM", "ST", "LW"],
                jerseyNumber,
                clubName:
                  userLoginObject?.role === "Club"
                    ? userLoginObject?.club
                    : selectedClubName,
                preferredFoot: PreferredFoot,
                height,
                marketValue,
                contractStartDate,
                contractEndDate,
                // "contract_status": contractStatus,
                Social_media: [
                  {
                    Facebook: `https://web.facebook.com/${FacebookHandle}`,
                    Instagram: `https://www.instagram.com/${InstagramHandle}/`,
                    // "Twitter": "Tweet X"
                  },
                ],

                current_health: "Match Fit",
                videos: [],
                Achievements: [],
                Market_Value_History: [],
                Club_History: [],
                Statistics: [
                  {
                    Season: "23/24",
                    General: {
                      Games_Played: 0,
                      Minutes_Played: 0,
                      Starts: 0,
                      Subbed_off: 0,
                    },
                    Defence: {
                      Clearance: 0,
                      Tackles: 0,
                      Duels: 0,
                      Aeriel_duels: 0,
                      Blocks: 0,
                      Interceptions: 0,
                    },
                    Attack: {
                      Total_shots: 0,
                      Shots_on_target: 0,
                      Goals_Scored: 0,
                      Goal_conversion_rate: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Received_passes: 0,
                      Succesful_cross_rate: 0,
                      Successful_key_passes: 0,
                      Successful_long_passes_rate: 0,
                      Successful_pass_rate: 0,
                      Successful_passes: 0,
                      Total_passes: 0,
                    },
                  },
                  {
                    Season: "22/23",
                    General: {
                      Games_Played: 0,
                      Minutes_Played: 0,
                      Starts: 0,
                      Subbed_off: 0,
                    },
                    Defence: {
                      Clearance: 0,
                      Tackles: 0,
                      Duels: 0,
                      Aeriel_duels: 0,
                      Blocks: 0,
                      Interceptions: 0,
                    },
                    Attack: {
                      Total_shots: 0,
                      Shots_on_target: 0,
                      Goals_Scored: 0,
                      Goal_conversion_rate: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Received_passes: 0,
                      Succesful_cross_rate: 0,
                      Successful_key_passes: 0,
                      Successful_long_passes_rate: 0,
                      Successful_pass_rate: 0,
                      Successful_passes: 0,
                      Total_passes: 0,
                    },
                  },
                  {
                    Season: "21/22",
                    General: {
                      Games_Played: 0,
                      Minutes_Played: 0,
                      Starts: 0,
                      Subbed_off: 0,
                    },
                    Defence: {
                      Clearance: 0,
                      Tackles: 0,
                      Duels: 0,
                      Aeriel_duels: 0,
                      Blocks: 0,
                      Interceptions: 0,
                    },
                    Attack: {
                      Total_shots: 0,
                      Shots_on_target: 0,
                      Goals_Scored: 0,
                      Goal_conversion_rate: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Received_passes: 0,
                      Succesful_cross_rate: 0,
                      Successful_key_passes: 0,
                      Successful_long_passes_rate: 0,
                      Successful_pass_rate: 0,
                      Successful_passes: 0,
                      Total_passes: 0,
                    },
                  },
                  {
                    Season: "20/21",
                    General: {
                      Games_Played: 0,
                      Minutes_Played: 0,
                      Starts: 0,
                      Subbed_off: 0,
                    },
                    Defence: {
                      Clearance: 0,
                      Tackles: 0,
                      Duels: 0,
                      Aeriel_duels: 0,
                      Blocks: 0,
                      Interceptions: 0,
                    },
                    Attack: {
                      Total_shots: 0,
                      Shots_on_target: 0,
                      Goals_Scored: 0,
                      Goal_conversion_rate: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Received_passes: 0,
                      Succesful_cross_rate: 0,
                      Successful_key_passes: 0,
                      Successful_long_passes_rate: 0,
                      Successful_pass_rate: 0,
                      Successful_passes: 0,
                      Total_passes: 0,
                    },
                  },
                  {
                    Season: "19/20",
                    General: {
                      Games_Played: 0,
                      Minutes_Played: 0,
                      Starts: 0,
                      Subbed_off: 0,
                    },
                    Defence: {
                      Clearance: 0,
                      Tackles: 0,
                      Duels: 0,
                      Aeriel_duels: 0,
                      Blocks: 0,
                      Interceptions: 0,
                    },
                    Attack: {
                      Total_shots: 0,
                      Shots_on_target: 0,
                      Goals_Scored: 0,
                      Goal_conversion_rate: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Received_passes: 0,
                      Succesful_cross_rate: 0,
                      Successful_key_passes: 0,
                      Successful_long_passes_rate: 0,
                      Successful_pass_rate: 0,
                      Successful_passes: 0,
                      Total_passes: 0,
                    },
                  },
                ],
              };

              // Set the document in the database
              await setDoc(playerObjectInjectionRef, playerData);

              const userObjectRef = doc(
                db,
                `users_db/${userLoginObject.accountId}`
              );
              await updateDoc(userObjectRef, {
                playersInPossession: arrayUnion({ playerId: uuid }),
              });

              // Alert and other actions after successful upload

              dispatch(setCloseCircularLoadBackdrop());

              // alert("Data invested");
              // setSubmitBtnEnabler()

              handleClose();
              turnMotherModalAfterSubmitted(false);

              dispatch(
                setSnackbarMessage(
                  `"Player added to our database and your club successfully"`
                )
              );
              dispatch(setSnackbarTriggerCounter());
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

    const SubscriptionValidationChecker = async () => {
      const currentUser = auth.currentUser;
      const accountId = currentUser.uid;
      try {
        const subscriptionsRef = collection(
          db,
          "users_db",
          accountId,
          "subscriptions"
        );

        const queryActiveOrTrialing = query(
          subscriptionsRef,
          where("status", "in", ["trialing", "active"])
        );

        onSnapshot(queryActiveOrTrialing, (snapshot) => {
          const doc = snapshot.docs[0];
          if (doc) {
            uploadPlayerData();
          } else {
            navigate("/changeSubscription");
            // Handle the case where no active/trialing subscription exists
            console.log("No active or trialing subscriptions found.");
            // set isLoading to true
            // setIsloading(true);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    SubscriptionValidationChecker();
  };

  return (
    <React.Fragment>
      <Card
        onClick={handleOpen}
        className="background primaryTextColor uploadPlayerModalCard md:w-[20vw] md:h-[100vh]
        md:flex md:flex-col md:p-[.4vw]        sm:p-[1vw] sm:w-[220%] sm:h-[50%]
        sm:flex sm:flex-col"
        style={{
          // background: "#E0FA55",
          height: "45vh",
          // width: "20vw",
          // display: "flex",
          // flexDirection: "column",
          // padding: ".4vw",
        }}
      >
        {/* CARD HEADER */}

        <div style={{ flex: ".2" }}>
          <h4>Create a player profile</h4>
        </div>

        {/* Card CONTENT */}
        <div style={{ flex: ".4" }}>
          Profile will include the following: <br />
          <ol>
            <li>Name</li>
            <li>Date of birth</li>
            <li>Nationality</li>
            <li>Profile image , etc</li>
          </ol>
        </div>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          className="cardBackground primaryTextColor md:overflow-y-hidden md:flex md:flex-col md:h-[94%] md:w-[80%] sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col sm:overflow-y-scroll"
          sx={{ ...style, paddingBottom: "2vh" }}
        >
          <div style={{ flex: ".2" }}>
            <h2 id="child-modal-title">
              Create a player profile{" "}
              <Button
                sx={{ width: "10%", float: "right" }}
                onClick={handleClose}
              >
                Back
              </Button>
            </h2>
          </div>
          {/*  <div style={{ flex: "0.1" }}>
              
                  <Button
                    className="md:w-[23vw] md:bottom-[5%]   sm:w-[43vw] sm:bottom-[-50vh]"
                    type="submit"
                    disabled={submitBtnEnabler}
                    sx={{
                   
                      background: "blue",
                      color: "white",
                      border: ".5vw",
                      position: "absolute",
                    
                    }}
                    variant="contained"
                  >
                    Create
                  </Button>
                </div> */}

          <div style={{ flex: ".8" }}>
            <form
              className="md:flex md:flex-col sm:flex sm:flex-col  "
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* {...register("firstName", { required: true })} */}
              <div
                // md:basis-[35%]
                className="md:w-[100%] md:h-[100%]  md:basis-[80%]   md:flex md:flex-row  sm:basis-[80%] sm:w-[100%] sm:h-[100vh]] sm:flex sm:flex-col"
                style={{
                  // width: "100%",
                  // height: "80%",
                  // display: "flex",
                  gap: "1vw",
                  // background: "red",
                }}
              >
                {/* LEFT INPUT PLAYER DETAILS */}
                <div
                  className="md:w-[100%]  md:flex md:flex-col md:basis-[35%]    sm:w-[100%]  sm:flex sm:flex-col sm:basis-[35%]"
                  style={
                    {
                      // flex: ".35", sm:h-[70vh] md:h-[70vh]
                      // display: "flex",
                      // flexDirection: "column",
                      // background: "red",
                    }
                  }
                >
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {/* <CustomTextField placeholder={"First Name"} />
                <CustomTextField placeholder={"Surname"} />     */}

                    <div className="md:w-[23vw] sm:w-[100%]">
                      <TextField
                        required
                        id="outlined-basic"
                        // className="md:w-[10vw] sm:w-[100%]"
                        label="First Name"
                        variant="outlined"
                        fullWidth={true}
                        // sx={{ width: "23vw" }}
                        {...register("FirstName", { required: true })}
                      />
                    </div>
                    <div className="md:w-[23vw] sm:w-[100%]">
                      <TextField
                        required
                        id="outlined-basic"
                        label="Surname"
                        // sx={{ width: "23vw" }}
                        variant="outlined"
                        fullWidth={true}
                        {...register("Surname", { required: true })}
                      />
                    </div>
                    <DatePickerToolCreateAccount
                      // style={{ width: "23vw" }}
                      containerStyle={{ marginTop: "-1vh" }}
                      label="Date of birth *"
                      // defaultValue={userData.DOB}
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
                        //  alert(
                        //     e.$d.toLocaleDateString("en-US", {
                        //       year: "numeric",
                        //       month: "long",
                        //       day: "numeric",
                        //     })
                        //   );
                      }}
                    />
                    <CountrySelect
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
                </div>
                {/* MIDDLE INPUT PLAYER DETAILS */}
                <div
                  className="md:items-center md:flex md:flex-col md:basis-[35%]     sm:items-center sm:flex sm:flex-col sm:basis-[35%]"
                  style={{
                    // flex: ".35",
                    // display: "flex",
                    gap: "20px",
                    // alignItems: "center",
                    // flexDirection: "column",
                    // background: "yellow",
                  }}
                >
                  <BasicSlider
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
                  <BasicAutoComplete
                    AutoCompleteValue={(e) => {
                      setPlayerPosition(e);
                    }}
                    // style={{ width: "23vw" }}
                    ListArray={soccerPositions}
                    label="Main Position *"
                  />{" "}
                  {/* <CustomTextField placeholder={"Market value(optional)"} /> */}
                  <GroupedRadio
                    radioArray={preferredFootArray}
                    labelName="Preferred foot *"
                    selectedValue={(e) => {
                      setPreferredFoot(e);
                    }}
                  />
                  {/* SOCIAL MEDIAL HANDLES*/}
                  <TextField
                    id="outlined-basic"
                    className="md:w-[23vw]  sm:w-[100%]"
                    label="Instagram Handle"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Instagram />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    // sx={{ width: "23vw" }}
                    {...register("InstagramHandle")}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Facebook Username"
                    className="md:w-[23vw]  sm:w-[100%]"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Facebook />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    // sx={{ width: "23vw" }}
                    {...register("FacebookHandle")}
                  />
                </div>
                {/* RIGHT SELECT IMAGES FROM FILES */}
                {/* style={{ flex: ".3" }}  */}
                <div
                  className="md:h-[70vh] md:flex md:flex-col md:basis-[30%]  sm:h-[60vh] sm:flex sm:flex-col sm:basis-[30%]"
                  // style={{ background: "green" }}
                >
                  {/* MARKET VALUE RANGE */}

                  {userLoginObject.role == "Club" ? (
                    ""
                  ) : userLoginObject.role == "Scout" ||
                    userLoginObject.role == "Coach" ? (
                    <ClubAutoComplete
                      ListArray={clubsInDatabase}
                      label="Select a club"
                      // style={{ width: "23vw" }}
                      onClubSelect={handleClubSelect}
                    />
                  ) : (
                    ""
                  )}

                  <BasicSlider
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
                      className="md:w-[23vw] md:flex md:justify-center md:items-center md:self-center md:h-[20vh]      sm:flex sm:justify-center sm:items-center sm:self-center  sm:h-[10vh] sm:w-[100%]"
                      style={{
                        border: "2px dotted",
                        borderRadius: "1vw",
                        // width: "23vw",
                        // height: "15vh",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignSelf: "center",
                        // alignItems: "center",
                        marginTop: "2.5vh",
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
                        className="sm:w-[35vw] md:w-[9vw] "
                        style={{
                          // width: "9vw",
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
                          className="sm:left-[30vw] md:left-[10vw] "
                          sx={{
                            postion: "absolute",
                            width: 20,
                            height: 20,
                            color: "red",
                            // backgroundColor: "white",
                            // left: "10vw",
                          }}
                        >
                          <Close />
                        </IconButton>
                      </div>
                    ))
                  )}

                  {/* // Start Date`` */}
                  <h6 style={{ marginTop: "1.5vh" }}>Contract period</h6>
                  <DatePickerForEditPlayerModal
                    // style={{ width: "23vw" }}
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
                    containerStyle={{ marginTop: "-1.2vh" }}
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

              <div className="md:flex md:justify-start md:basis-[20%]   sm:basis-[20%]  sm:flex sm:justify-center">
                <Button
                  className="md:w-[23vw]  md:mt-[2vh]  sm:w-[43vw] sm:mt-[2vh] "
                  type="submit"
                  disabled={submitBtnEnabler}
                  sx={{
                    background: "blue",
                    color: "white",
                    border: ".5vw",
                    marginBottom: "2vh",
                    // position: "absolute",
                  }}
                  variant="contained"
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function UploadPlayerToAgencyModal() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };
  // subscriptionfeatures object selector
  const userLoginObject = useSelector(selectUserDetailsObject);
  const subscriptionFeaturesObject = useSelector(selectSubscriptionFeatures);
  const subscriptionStatus = useSelector(selectIsSubscriptionActive);
  // state to hold maximum number of profiles
  const { maxPlayersInAgency } = subscriptionFeaturesObject;
  // state to hold subscription status

  const handleOpen = () => {
    if (subscriptionStatus === true) {
      if (userLoginObject?.playersInPossession.length < maxPlayersInAgency) {
        // console.log(userLoginObject?.playersInPossession.length);
        setOpen(true);
      } else {
        triggerWarningAlertModal(
          "Upgrade your subscription to add more profiles"
        );
      }
    } else if (subscriptionStatus === false) {
      triggerWarningAlertModal("You do not have an active subscription");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const retrieveDataFromMotherModal = (e) => {
    setOpen(e);
  };

  return (
    <div>
      {maxPlayersInAgency > 0 ? (
        <Button onClick={handleOpen}>Upload player</Button>
      ) : null}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            // width: 1000,
            // display: "flex",
            // flexDirection: "column",\
          }}
          className="cardBackground primaryTextColor md:h-[94%] md:w-[80%] sm:w-[100%] sm:h-[100%]"
        >
          {/* // UPLOAD A PLAYER HEADER */}

          <div style={{ flex: ".2", textAlign: "center" }}>
            <h2 style={{ margin: 0 }} id="parent-modal-title">
              Upload a player
              <IconButton sx={{ float: "right" }} onClick={handleClose}>
                {" "}
                <Close />{" "}
              </IconButton>
            </h2>
            <Typography>
              Create a new player's profile into our database
            </Typography>
          </div>

          {/* // Create a new player profile or upload a player from database */}
          <div style={{ flex: ".7", display: "flex" }}>
            {/* Create a new player profile Area */}
            <div style={{ flex: ".45", display: "flex" }}>
              {/* IMAGE AREA   */}
              <div style={{ flex: ".4" }}>
                {/* <img
                  style={{
                    width: "150px",
                    height: "300px",
                    marginTop: "30%",
                  }}
                  src={youngerPlayerShadowImage}
                /> */}
              </div>

              {/* Card AREA */}
              <div
                style={{
                  flex: ".6",
                  padding: "1vw",
                  display: "grid",
                  placeContent: "center",
                  paddingLeft: "3vw",
                }}
              >
                <img
                  className="md:w-[200px] md:h-[400px]  sm:w-[200px] sm:h-[400px]"
                  // style={{ width: "200px", height: "400px" }}
                  src={playerShadowImage}
                />
              </div>
            </div>

            {/* upload a player from database  */}

            <div style={{ flex: ".4", display: "flex" }}>
              <div
                style={{
                  flex: ".6",

                  padding: ".4vw",
                  display: "grid",
                  placeContent: "center",
                }}
              >
                <CreateAPlayerProfileModal
                  turnMotherModalAfterSubmitted={retrieveDataFromMotherModal}
                />

                {/* <AddPlayerFromDatabaseModal /> */}
              </div>

              <div style={{ flex: ".4" }}>
                {/* <img
                  style={{ width: "200px", height: "400px" }}
                  src={playerShadowImage}
                /> */}
              </div>
            </div>
          </div>

          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
}
