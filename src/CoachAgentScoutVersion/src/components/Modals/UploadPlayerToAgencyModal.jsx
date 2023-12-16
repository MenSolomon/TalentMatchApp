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
import DatePickerTool from "../../../../components/DatePicker/DatePicker";
import GroupedRadio from "../../../../components/Radio/GroupedRadio";
import BasicAutoComplete from "../../../../components/Autocompletes/BasicAutoComplete";
import BasicSelect from "../../../../components/Selects/BasicSelect";
import ClubAutoComplete from "../../../../components/Autocompletes/ClubAutoComplete";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import { useForm } from "react-hook-form";
import CountrySelect from "../AutoComplete/CountrySelect";
import { useRef } from "react";
import { selectPlayerObjectSampleWithoutBasicInformation } from "../../../../statemanager/slices/PlayersInAgencySlice";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

function CreateAPlayerProfileModal({ turnMotherModalAfterSubmitted }) {
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
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
          DOB === "" ||
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

              // Update playerData with the download URL
              const playerData = {
                id: uuid,
                Account_creator_id: userLoginObject?.accountId,
                // ... (other fields)
                player_profile_image: url,
                firstName: FirstName,
                surName: Surname,
                CountryCode: CountryCode,
                Nationality: CountryName,
                dateCreated: serverTimestamp(),
                // Use moment js to get the age by subtracting current year from the the year gotten from the dob object
                Age: currentAge,
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
                    Season: "Overall",
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
                      Conversion_rate: 0,
                      Minutes_per_goal: 0,
                      Header_goals: 0,
                      Left_goals: 0,
                      Right_goals: 0,
                      Other_goals: 0,
                      Goals_outside_the_box: 0,
                      Goals_inside_the_box: 0,
                      Goals_from_freekicks: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Fouls_won: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Pass_success_rate: 0,
                      Long_passes_rate: 0,
                      Opponent_half_pass_accuracy: 0,
                      Own_half_pass_accuracy: 0,
                      Pass_direction_forward_percent: 0,
                      Pass_direction_backward_percent: 0,
                      Pass_direction_left_percent: 0,
                      Pass_direction_right_percent: 0,
                      Total_passes: 0,
                      Successful_passes: 0,
                      Key_passes: 0,
                      Total_passes_per_90_mins: 0,
                    },
                  },
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
                      Conversion_rate: 0,
                      Minutes_per_goal: 0,
                      Header_goals: 0,
                      Left_goals: 0,
                      Right_goals: 0,
                      Other_goals: 0,
                      Goals_outside_the_box: 0,
                      Goals_inside_the_box: 0,
                      Goals_from_freekicks: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Fouls_won: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Pass_success_rate: 0,
                      Long_passes_rate: 0,
                      Opponent_half_pass_accuracy: 0,
                      Own_half_pass_accuracy: 0,
                      Pass_direction_forward_percent: 0,
                      Pass_direction_backward_percent: 0,
                      Pass_direction_left_percent: 0,
                      Pass_direction_right_percent: 0,
                      Total_passes: 0,
                      Successful_passes: 0,
                      Key_passes: 0,
                      Total_passes_per_90_mins: 0,
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
                      Conversion_rate: 0,
                      Minutes_per_goal: 0,
                      Header_goals: 0,
                      Left_goals: 0,
                      Right_goals: 0,
                      Other_goals: 0,
                      Goals_outside_the_box: 0,
                      Goals_inside_the_box: 0,
                      Goals_from_freekicks: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Fouls_won: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Pass_success_rate: 0,
                      Long_passes_rate: 0,
                      Opponent_half_pass_accuracy: 0,
                      Own_half_pass_accuracy: 0,
                      Pass_direction_forward_percent: 0,
                      Pass_direction_backward_percent: 0,
                      Pass_direction_left_percent: 0,
                      Pass_direction_right_percent: 0,
                      Total_passes: 0,
                      Successful_passes: 0,
                      Key_passes: 0,
                      Total_passes_per_90_mins: 0,
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
                      Conversion_rate: 0,
                      Minutes_per_goal: 0,
                      Header_goals: 0,
                      Left_goals: 0,
                      Right_goals: 0,
                      Other_goals: 0,
                      Goals_outside_the_box: 0,
                      Goals_inside_the_box: 0,
                      Goals_from_freekicks: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Fouls_won: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Pass_success_rate: 0,
                      Long_passes_rate: 0,
                      Opponent_half_pass_accuracy: 0,
                      Own_half_pass_accuracy: 0,
                      Pass_direction_forward_percent: 0,
                      Pass_direction_backward_percent: 0,
                      Pass_direction_left_percent: 0,
                      Pass_direction_right_percent: 0,
                      Total_passes: 0,
                      Successful_passes: 0,
                      Key_passes: 0,
                      Total_passes_per_90_mins: 0,
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
                      Conversion_rate: 0,
                      Minutes_per_goal: 0,
                      Header_goals: 0,
                      Left_goals: 0,
                      Right_goals: 0,
                      Other_goals: 0,
                      Goals_outside_the_box: 0,
                      Goals_inside_the_box: 0,
                      Goals_from_freekicks: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Fouls_won: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Pass_success_rate: 0,
                      Long_passes_rate: 0,
                      Opponent_half_pass_accuracy: 0,
                      Own_half_pass_accuracy: 0,
                      Pass_direction_forward_percent: 0,
                      Pass_direction_backward_percent: 0,
                      Pass_direction_left_percent: 0,
                      Pass_direction_right_percent: 0,
                      Total_passes: 0,
                      Successful_passes: 0,
                      Key_passes: 0,
                      Total_passes_per_90_mins: 0,
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
                      Conversion_rate: 0,
                      Minutes_per_goal: 0,
                      Header_goals: 0,
                      Left_goals: 0,
                      Right_goals: 0,
                      Other_goals: 0,
                      Goals_outside_the_box: 0,
                      Goals_inside_the_box: 0,
                      Goals_from_freekicks: 0,
                    },
                    Discipline: {
                      Fouls_conceeded: 0,
                      Fouls_won: 0,
                      Yellow_cards: 0,
                      Red_cards: 0,
                    },
                    Distribution: {
                      Assists: 0,
                      Pass_success_rate: 0,
                      Long_passes_rate: 0,
                      Opponent_half_pass_accuracy: 0,
                      Own_half_pass_accuracy: 0,
                      Pass_direction_forward_percent: 0,
                      Pass_direction_backward_percent: 0,
                      Pass_direction_left_percent: 0,
                      Pass_direction_right_percent: 0,
                      Total_passes: 0,
                      Successful_passes: 0,
                      Key_passes: 0,
                      Total_passes_per_90_mins: 0,
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

    uploadPlayerData();
  };

  return (
    <React.Fragment>
      <Card
        onClick={handleOpen}
        className="background primaryTextColor uploadPlayerModalCard"
        style={{
          // background: "#E0FA55",
          height: "45vh",
          width: "20vw",
          display: "flex",
          flexDirection: "column",
          padding: ".4vw",
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
          className="cardBackground primaryTextColor"
          sx={{ ...style, width: 1000 }}
        >
          <h2 id="child-modal-title">Create a player profile</h2>
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
                    {...register("FirstName", { required: true })}
                  />
                  <TextField
                    required
                    id="outlined-basic"
                    label="Surname"
                    variant="outlined"
                    fullWidth={true}
                    sx={{ width: "23vw" }}
                    {...register("Surname", { required: true })}
                  />
                  <DatePickerTool
                    style={{ width: "23vw" }}
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
                    Create
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
                  style={{ width: "23vw" }}
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
                  label="Instagram Handle"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Instagram />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{ width: "23vw" }}
                  {...register("InstagramHandle")}
                />
                <TextField
                  id="outlined-basic"
                  label="Facebook Username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Facebook />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{ width: "23vw" }}
                  {...register("FacebookHandle")}
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
                <DatePickerTool
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
                <DatePickerTool
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
}

// MODAL TO ADD EXISTING PLAYER TO AGENCY   , paddingLeft: "5%"

// function AddPlayerFromDatabaseModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const PlayerArray = useSelector(selectPlayersInAgencyArray);

//   return (
//     <React.Fragment>
//       <Card
//         className="background primaryTextColor uploadPlayerModalCard"
//         onClick={handleOpen}
//         style={{
//           // background: "#E0FA55",
//           height: "45vh",
//           width: "20vw",
//           display: "flex",
//           flexDirection: "column",
//           padding: ".4vw",
//         }}
//       >
//         {/* CARD HEADER */}

//         <div style={{ flex: ".2" }}>
//           <h4>Add existing player</h4>
//         </div>

//         {/* Card CONTENT */}
//         <div style={{ flex: ".4" }}>
//           Add any player(s) from our existing databases across our the world:{" "}
//           <br />
//         </div>
//       </Card>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box
//           className="cardBackground primaryTextColor"
//           sx={{ ...style, width: 1000 }}
//         >
//           <h2 id="child-modal-title">Add existing player</h2>
//           <Button
//             onClick={handleClose}
//             sx={{ width: "10%", marginLeft: "80%" }}
//           >
//             Back
//           </Button>
//           <div
//             style={{
//               // background: "red",
//               width: "100%",
//               height: "80%",
//               display: "flex",
//               // padding: "10px",
//               flexDirection: "column",
//             }}
//           >
//             {/* Search Bar */}
//             <div style={{ flex: "0.1" }}>
//               <TextField required
//                 id="input-with-icon-textfield"
//                 label="Search"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Search />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="outlined"
//                 size="small"
//               />
//             </div>
//             {/* Player View Cards */}
//             <div
//               style={{
//                 flex: "0.8",
//                 // background: "peru",
//                 display: "flex",
//                 flexWrap: "wrap",
//                 overflowY: "scroll",
//               }}
//             >
//               {PlayerArray.map((data, index) => {
//                 const {
//                   firstName,
//                   surName,
//                   Age,
//                   position,
//                   Nationality,
//                   jerseyNumber,
//                   image,
//                 } = data;

//                 return (
//                   <PlayerViewCardFromPlayersScreen
//                     key={index}
//                     image={image}
//                     surName={surName}
//                     age={Age}
//                     position={position}
//                     jerseyNumber={jerseyNumber}
//                     firstName={firstName}
//                     nationality={Nationality}
//                   />
//                 );
//               })}
//             </div>
//             <div
//               style={{
//                 flex: "0.1",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Pagination count={10} color="secondary" />
//             </div>
//           </div>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

export default function UploadPlayerToAgencyModal() {
  const [open, setOpen] = React.useState(false);
  // const [motherModalAfterFormSubmitted, setMotherModalAfterFormSubmitted] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const retrieveDataFromMotherModal = (e) => {
    setOpen(e);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Upload player</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 1000,
            display: "flex",
            flexDirection: "column",
          }}
          className="cardBackground primaryTextColor"
        >
          {/* // UPLOAD A PLAYER HEADER */}

          <div style={{ flex: ".2", textAlign: "center" }}>
            <h2 style={{ margin: 0 }} id="parent-modal-title">
              Upload a player
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
                  style={{ width: "200px", height: "400px" }}
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
