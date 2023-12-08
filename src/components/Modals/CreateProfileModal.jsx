import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Add, Settings } from "@mui/icons-material";
import { Card, Divider, TextField, IconButton, Tooltip } from "@mui/material";
import CountrySelect from "../Autocompletes/CountrySelect";
import IconTooltip from "../Tooltips/IconToolTip";
import DatePickerTool from "../DatePicker/DatePicker";
import BasicAutoComplete from "../Autocompletes/BasicAutoComplete";
import GroupedRadio from "../Radio/GroupedRadio";
import CheckboxesGroup from "../CheckBoxes/GroupedCheckBox";
import RangeSlider from "../Slider/RangeSlider";
import { useDispatch, useSelector } from "react-redux";
import { AddOutlined, Close } from "@mui/icons-material";
import {
  selectUserDetailsObject,
  setUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import BasicButton from "../Buttons/BasicButton";
import { useNavigate } from "react-router-dom";
import {
  selectTempUsersDatabase,
  setTempUsersDatabase,
} from "../../statemanager/slices/TempDatabaseSlice";
import {
  selectCurrentProfile,
  selectCurrentProfileFilterObject,
  selectPreviousProfile,
  setCurrentProfile,
  setCurrentProfileFilterObject,
  setPreviousProfile,
} from "../../statemanager/slices/SavedProfileSlice";
import {
  selectAutoCompletePlayerPosition,
  selectEditFilterModalButtonClicked,
  selectFilterModalType,
  selectSnackbarMessage,
  setAutoCompletePlayerPosition,
  setEditFilterModalButtonClicked,
  setFilterModalType,
  setSnackbarMessage,
  setSnackbarTriggerCounter,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import BasicSelect from "../Selects/BasicSelect";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import moment from "moment";

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
};

// const inputStyles = {
//   width: "85%",
// };

// const selectFieldStyle ={
//   width:130
// } ;
// currentProfileClicked
export default function CreateProfileModal({ ProfileType }) {
  const dispatch = useDispatch();
  const currentProfileClicked = useSelector(selectCurrentProfile);
  const previousProfileClicked = useSelector(selectPreviousProfile);

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setAutoCompletePlayerPosition(""));

    // This is set to empty "" to make sure textfield displays if profile is not default and dispappears when default
    // if not in an instance where  user is on the default profile and decides to click on the create new profile card the textfield will not show
    dispatch(setCurrentProfile(""));
    // This stores the profile clicked in order to store the current profile in case the user doesnt navigate to another profile and decides to edit again

    ////////
    // Previos should only be set if the string is not empty .. to ensure the prvios profile clicked doesnt to empty string after closing the modal for createing a filter

    if (currentProfileClicked.length > 0) {
      dispatch(setPreviousProfile(currentProfileClicked));
    }
    // THis is to fix the bug of clicking the textfield not displaying after editing in the default profile
    // if (currentProfileClicked.toLowerCase() === "default")
    //   dispatch(setCurrentProfile(""));
  };

  const leagueDivisions = [
    "Any",
    "Top-Flight Division",
    "Women's league",
    "Second Division",
    "Third Division",
    "Regional Leagues",
    "Semi-Professional Leagues",
    "University and College Leagues",
    "Recreational and Social Leagues",
    "Youth Leagues",
    "Grassroots and Mini Leagues",
    "Juvenile league",
  ];

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

  const GKTextFieldArray = [
    "Clean sheet",
    "Saves",
    "Long pass accuracy ",
    "Blocked shots ",
    "Aerial duels",
    "Penalty stop success",
    "Sweeping success",
  ];

  const DefendersTextFieldArray = [
    "Clearance",
    "Interception",
    "Blocks",
    "Clean sheets per season",
    "Successful tackles rate %",
  ];
  const MidfieldersTextFieldArray = [
    "Pass success",
    "Total passes",
    "assists",
    "Key passes per game",
    "Interceptions",
    "Successful tackles rate",
    "Successful crosses",
  ];
  const AttackerTextFieldArray = [
    "Goals",
    "Goal/match played ratio",
    "Assists",
    "Shots per game",
    "Goal conversion rate",
    "Offside range",
  ];

  const AnyTextFieldArray = [];

  const autocompletePositionSelected = useSelector(
    selectAutoCompletePlayerPosition
  );

  const preferredFootArray = ["Left", "Right", "Both", "Any"];
  const captainArray = ["Yes", "No", "Any"];

  const contractStatusArray = [
    "Transfer Listed",
    "Loan Listed",
    "Free Agent",
    "Youth Player",
    "Contract Expiring less than 6 months",
    "Currently renewed contract",
  ];
  const editFilterModalButtonClicked = useSelector(
    selectEditFilterModalButtonClicked
  );
  const loginUserDetails = useSelector(selectUserDetailsObject);
  const { savedProfile, email } = loginUserDetails;
  const allUsers = useSelector(selectTempUsersDatabase);
  const currentProfileFilterObject = useSelector(
    selectCurrentProfileFilterObject
  );
  selectAutoCompletePlayerPosition;
  const filterModalType = useSelector(selectFilterModalType);
  const {
    PlaceOfBirth,
    NationalityValue,
    AgeRangeValue,
    HeightRangeValue,
    PlayerPositionAutoCompleteValue,
    MarketValue,
    ClubCountryValue,
    CaptainRadioValue,
    PrefferedFootRadioValue,
    PlayerDivisionValue,
    ContractStatusCheckBoxes,
    positionRangeSliderValues,
  } = currentProfileFilterObject;

  const [profileName, setProfileName] = useState("");
  const [editedProfileName, setEditedProfileName] = useState("");

  /// RETREIVING VALUES FOR RANGE SLIDERs  \\\\\\\\\\

  // retriving a default object value each bosition which takes a range of 0 to 100% of all stats if the user doesnt select any range
  const anyOrNullObject = {};
  AnyTextFieldArray.forEach((value) => {
    anyOrNullObject[value] = [0, 100];
  });

  const defaultGkObject = {};
  GKTextFieldArray.forEach((value) => {
    defaultGkObject[value] = [0, 100];
  });

  const defaultDefendersObject = {};
  DefendersTextFieldArray.forEach((value) => {
    defaultDefendersObject[value] = [0, 100];
  });

  const defaultMidfieldersObject = {};
  MidfieldersTextFieldArray.forEach((value) => {
    defaultMidfieldersObject[value] = [0, 100];
  });
  const defaultAttackersObject = {};
  AttackerTextFieldArray.forEach((value) => {
    defaultAttackersObject[value] = [0, 100];
  });

  const [posRngVals, setPosRngVals] = useState(positionRangeSliderValues);
  // This is responsible for setting the object  ith current values of the range Sliders
  const handleRangeChange = (rangeName, newValue) => {
    // Update the positionRangeSliderValues object with the new value
    setPosRngVals((prevValues) => ({
      ...prevValues,
      [rangeName]: newValue,
    }));
  };

  // Useeffect to dispatch the positionalRangeValues in RealTIme (prevent lag of data on slide change)
  useEffect(() => {
    console.log(posRngVals, "posRngVals");

    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        positionRangeSliderValues: posRngVals,
      })
    );
  }, [posRngVals]);

  // use effect for setting stats range values to defalut based on position selected
  // this sets the positionRangeSliderValues object in the redux slice to a default  object based on positionSelected and also sets the useState responsible for handing the stats change of the varios statistics in each object created based on the player selection
  useEffect(() => {
    // const { positionRangeSliderValues } = currentProfileFilterObject;

    PlayerPositionAutoCompleteValue === "Goalkeeper (GK)"
      ? (dispatch(
          setCurrentProfileFilterObject({
            ...currentProfileFilterObject,
            positionRangeSliderValues: defaultGkObject,
          })
        ),
        setPosRngVals(defaultGkObject))
      : PlayerPositionAutoCompleteValue === "Defender (D)" ||
        PlayerPositionAutoCompleteValue === "Center Back (CB)" ||
        PlayerPositionAutoCompleteValue === "Full-back (FB)" ||
        PlayerPositionAutoCompleteValue === "Wing-back (WB)"
      ? (dispatch(
          setCurrentProfileFilterObject({
            ...currentProfileFilterObject,
            positionRangeSliderValues: defaultDefendersObject,
          })
        ),
        setPosRngVals(defaultDefendersObject))
      : PlayerPositionAutoCompleteValue === "Midfielder (MF)" ||
        PlayerPositionAutoCompleteValue === "Central Midfielder (CM)" ||
        PlayerPositionAutoCompleteValue === "Defensive Midfielder (CDM)" ||
        PlayerPositionAutoCompleteValue === "Attacking Midfielder (CAM)" ||
        PlayerPositionAutoCompleteValue === "Wide Midfielder (WM)"
      ? (dispatch(
          setCurrentProfileFilterObject({
            ...currentProfileFilterObject,
            positionRangeSliderValues: defaultMidfieldersObject,
          })
        ),
        setPosRngVals(defaultMidfieldersObject))
      : PlayerPositionAutoCompleteValue === "Forward (F)" ||
        PlayerPositionAutoCompleteValue === "Striker (ST)" ||
        PlayerPositionAutoCompleteValue === "Center Forward (CF)" ||
        PlayerPositionAutoCompleteValue === "Winger (W)"
      ? (dispatch(
          setCurrentProfileFilterObject({
            ...currentProfileFilterObject,
            positionRangeSliderValues: defaultAttackersObject,
          })
        ),
        setPosRngVals(defaultAttackersObject))
      : PlayerPositionAutoCompleteValue === "" ||
        PlayerPositionAutoCompleteValue === null ||
        PlayerPositionAutoCompleteValue === "Any"
      ? dispatch(
          setCurrentProfileFilterObject({
            ...currentProfileFilterObject,
            positionRangeSliderValues: {
              "Clean sheet": [0, 100],
              Saves: [0, 100],
              "Long pass accuracy": [0, 100],
              "Blocked shots": [0, 100],
              "Aerial duels": [0, 100],
              "Penalty stop success": [0, 100],
              "Sweeping success": [0, 100],
              Clearance: [0, 100],

              Interception: [0, 100],
              Blocks: [0, 100],
              "Clean sheets per season": [0, 100],
              "Successful tackles rate %": [0, 100],
              "pass success": [0, 100],
              "total passes": [0, 100],
              assists: [0, 100],
              "key passes per game": [0, 100],
              interceptions: [0, 100],
              "successful tackles rate": [0, 100],
              "successful crosses": [0, 100],
              Goals: [0, 100],
              "Goal/match played ratio": [0, 100],
              Assists: [0, 100],
              "Shots per game": [0, 100],
              "Goal conversion rate %": [0, 100],
              "Offside range": [0, 100],
            },
          })
        )
      : "";
  }, [PlayerPositionAutoCompleteValue, currentProfileClicked]);

  // FUNCTION FOR CREATING PROFILE
  const handleCreateProfile = () => {
    const unMacthedPlayerDatabase = allUsers.filter((data) => {
      return data.email !== email;
    });

    const { savedProfile, accountId } = loginUserDetails;

    if (savedProfile.length <= 0) {
      // cont newProfile == log
      // alert("less");

      // This is the rest of users in the database devoid of the current user logged in

      console.log(unMacthedPlayerDatabase, "unmatched players");

      dispatch(
        setUserDetailsObject({
          ...loginUserDetails,
          savedProfile: [
            {
              label: "Default",
              dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
              filter: currentProfileFilterObject,
            },
          ],
        })
      );
      // doing this because its not an online database and not a snapshot or realtime update so i have to update the logged in user object and also same user object in the database

      // alert(accountId);
      ///. HAVE TO WRITE A TRY CATCH BLOCK TO DETECT ANY ERRORS

      const collectionRef = doc(db, `users_db`, accountId);
      updateDoc(collectionRef, {
        savedProfile: arrayUnion({
          label: "Default",
          dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
          filter: currentProfileFilterObject,
        }),
      });

      dispatch(
        setTempUsersDatabase([
          ...unMacthedPlayerDatabase,
          {
            ...loginUserDetails,
            savedProfile: [
              {
                label: "Default",
                dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
                filter: currentProfileFilterObject,
              },
            ],
          },
        ])
      );

      handleClose();

      /// REset the filter object after createion
      dispatch(
        setCurrentProfileFilterObject({
          PlaceOfBirth: "Any",
          NationalityValue: "Any",
          AgeRangeValue: [0, 40],
          HeightRangeValue: [0, 2.5],
          positionRangeSliderValues: {
            "Clean sheet": [0, 100],
            Saves: [0, 100],
            "Long pass accuracy": [0, 100],
            "Blocked shots": [0, 100],
            "Aerial duels": [0, 100],
            "Penalty stop success": [0, 100],
            "Sweeping success": [0, 100],
            Clearance: [0, 100],
            Interception: [0, 100],
            Blocks: [0, 100],
            "Clean sheets per season": [0, 100],
            "Successful tackles rate %": [0, 100],
            "Pass success": [0, 100],
            "Total passes": [0, 100],
            Assists: [0, 100],
            "Key passes per game": [0, 100],
            Interceptions: [0, 100],
            "Successful tackles rate": [0, 100],
            "Successful crosses": [0, 100],
            Goals: [0, 100],
            "Goal/match played ratio": [0, 100],
            assists: [0, 100],
            "Shots per game": [0, 100],
            "Goal conversion rate %": [0, 100],
            "Offside range": [0, 100],
          },
          MarketValue: [0, 40],
          ClubCountryValue: "Any",
          CaptainRadioValue: "Any",
          PrefferedFootRadioValue: "Any",
          PlayerDivisionValue: "Any",
          ContractStatusCheckBoxes: [
            "Free Agent",
            "Loan Listed",
            "Youth Player",
            "Transfer Listed",
            "Contract Expiring less than 6 months",
            "Currently renewed contract",
          ],
          // REview below
          PlayerPositionAutoCompleteValue: "Any",

          previousProfile: "",
        })
      );
    } else {
      if (profileName !== "" && profileName.toLowerCase() !== "") {
        ///. HAVE TO WRITE A TRY CATCH BLOCK TO DETECT ANY ERRORS

        const profileNameMatch = savedProfile.filter((data) => {
          const { label } = data;
          return (
            label.replace(/\s/g, "").toLowerCase() ===
            profileName.replace(/\s/g, "").toLowerCase()
          );
        });

        console.log("ProfileLabelMatxh", profileNameMatch);
        // This it to make sure that we dont create a profile with the same name

        if (profileNameMatch.length <= 0) {
          const collectionRef = doc(db, `users_db`, accountId);
          updateDoc(collectionRef, {
            savedProfile: arrayUnion({
              label: profileName,
              dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
              filter: currentProfileFilterObject,
            }),
          });

          dispatch(
            setTempUsersDatabase([
              ...unMacthedPlayerDatabase,
              {
                ...loginUserDetails,
                savedProfile: [
                  ...savedProfile,
                  {
                    label: profileName,
                    dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
                    filter: currentProfileFilterObject,
                  },
                ],
              },
            ])
          );

          handleClose();
          dispatch(
            setCurrentProfileFilterObject({
              PlaceOfBirth: "Any",
              NationalityValue: "Any",
              AgeRangeValue: [0, 40],
              HeightRangeValue: [0, 2.5],
              positionRangeSliderValues: {
                "Clean sheet": [0, 100],
                Saves: [0, 100],
                "Long pass accuracy": [0, 100],
                "Blocked shots": [0, 100],
                "Aerial duels": [0, 100],
                "Penalty stop success": [0, 100],
                "Sweeping success": [0, 100],
                Clearance: [0, 100],
                Interception: [0, 100],
                Blocks: [0, 100],
                "Clean sheets per season": [0, 100],
                "Successful tackles rate %": [0, 100],
                "Pass success": [0, 100],
                "Total passes": [0, 100],
                Assists: [0, 100],
                "Key passes per game": [0, 100],
                Interceptions: [0, 100],
                "Successful tackles rate": [0, 100],
                "Successful crosses": [0, 100],
                Goals: [0, 100],
                "Goal/match played ratio": [0, 100],
                assists: [0, 100],
                "Shots per game": [0, 100],
                "Goal conversion rate %": [0, 100],
                "Offside range": [0, 100],
              },
              MarketValue: [0, 40],
              ClubCountryValue: "Any",
              CaptainRadioValue: "Any",
              PrefferedFootRadioValue: "Any",
              PlayerDivisionValue: "Any",
              ContractStatusCheckBoxes: [
                "Free Agent",
                "Loan Listed",
                "Youth Player",
                "Transfer Listed",
                "Contract Expiring less than 6 months",
                "Currently renewed contract",
              ],
              // REview below
              PlayerPositionAutoCompleteValue: "Any",

              previousProfile: "",
            })
          );
          /// Snackbar show
          dispatch(setSnackbarMessage(`"${profileName}" filter created`));
          dispatch(setSnackbarTriggerCounter());

          setProfileName("");
        } else {
          triggerWarningAlertModal(
            "Please change your profile name a similar name already exists"
          );
        }
      } else {
        triggerWarningAlertModal(
          "Please enter a profile name (cannot be name default)"
        );
      }
    }
    // changing the click current clicked value to the edited name

    // reset the textfields after save
  };

  // FUNCTION FOR CREATING PROFILE
  const handleSaveProfile = () => {
    const {
      PlaceOfBirth,
      NationalityValue,
      AgeRangeValue,
      HeightRangeValue,
      PlayerPositionAutoCompleteValue,
      ClubCountryValue,
      MarketValue,
      CaptainRadioValue,
      PrefferedFootRadioValue,
      PlayerDivisionValue,
      ContractStatusCheckBoxes,
      positionRangeSliderValues,
    } = currentProfileFilterObject;

    const { savedProfile, accountId } = loginUserDetails;

    const unMacthedProflie = savedProfile.filter((data) => {
      return data.label !== currentProfileClicked;
    });

    const MacthedProfile = savedProfile.filter((data) => {
      return data.label === currentProfileClicked;
    });

    const nameExists = savedProfile.filter(
      (data) => data.label.toLowerCase() === profileName.toLowerCase()
    );
    const { dateCreated } = MacthedProfile[0];
    const collectionRef = doc(db, `users_db`, accountId);

    console.log(dateCreated, " Date Created");
    console.log("Unmatched Profile", unMacthedProflie);
    console.log(profileName, currentProfileFilterObject, "TO BE EDITED");
    if (profileName === "") {
      triggerWarningAlertModal("name cannot be empty ");
    } else {
      // This if statement makes prevents saved name from being the same as a existing profile name
      if (nameExists.length <= 0 || profileName === currentProfileClicked) {
        const sortedProfile = [
          ...unMacthedProflie,
          {
            label: profileName,
            dateCreated,
            filter: {
              PlaceOfBirth,
              NationalityValue,
              AgeRangeValue,
              HeightRangeValue,
              PlayerPositionAutoCompleteValue: PlayerPositionAutoCompleteValue,
              ClubCountryValue,
              MarketValue,
              CaptainRadioValue,
              PrefferedFootRadioValue,
              PlayerDivisionValue,
              ContractStatusCheckBoxes,
              positionRangeSliderValues: positionRangeSliderValues,
            },
          },
        ]
          .slice()
          .sort((a, b) => {
            // Convert date strings to Moment.js objects
            const dateA = moment(a.dateCreated, "YYYY-MM-DD HH:mm:ss");
            const dateB = moment(b.dateCreated, "YYYY-MM-DD HH:mm:ss");

            // Compare the Moment.js objects in descending order
            // return dateB.diff(dateA);
            return dateA.diff(dateB);
          });

        // Update the document in Firestore
        updateDoc(collectionRef, { savedProfile: sortedProfile });
        dispatch(setPreviousProfile(profileName));

        navigate(`/profile/${profileName}`);
        setOpen(false);
        dispatch(setSnackbarMessage(`"${profileName}" filter saved`));
        dispatch(setSnackbarTriggerCounter());
      } else {
        triggerWarningAlertModal("Profile Name already exists");
      }
    }
  };

  // REview this
  useEffect(() => {
    setEditedProfileName(currentProfileClicked);
    setProfileName(currentProfileClicked);
  }, [currentProfileClicked]);

  const handelePlaceOfBirth = (value) => {
    console.log(value, "place of birth select");
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        PlaceOfBirth: value,
      })
    );
    // setPlaceOfBirth(value);
  };

  const handelNationalityValue = (value) => {
    console.log(value, "Nationality");
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        NationalityValue: value,
      })
    );
    // setNationalityValue(value);
  };

  const handleAgeRangeValue = (value) => {
    console.log(value, "Age Range values");
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        AgeRangeValue: value,
      })
    );

    // setAgeRangeValue(value);
  };

  const handleHeightRangeValue = (value) => {
    // setHeightRangeValue(value);
    console.log(value, "Height Range values");
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        HeightRangeValue: value,
      })
    );
  };
  const handlePlayerPositionAutoCompleteValue = (value) => {
    // setPlayerPositionAutoCompleteValue(value);

    if (value === null) {
      dispatch(
        setCurrentProfileFilterObject({
          ...currentProfileFilterObject,
          PlayerPositionAutoCompleteValue: "Any",
        })
      );
    }
    {
      dispatch(
        setCurrentProfileFilterObject({
          ...currentProfileFilterObject,
          PlayerPositionAutoCompleteValue: value,
        })
      );
    }

    // PlayerPositionAutoCompleteValue,

    console.log(value, "Player Position auto complete value");
  };

  // useEffect(() => {
  //   if (positionRangeSliderValues === null) {
  //     dispatch(
  //       setCurrentProfileFilterObject({
  //         ...currentProfileFilterObject,
  //         PlayerPositionAutoCompleteValue: "Any",
  //       })
  //     );
  //   }
  // }, [positionRangeSliderValues]);

  const handleMarketValue = (value) => {
    console.log(value, "Market price values");
    // setMarketValue(value);
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        MarketValue: value,
      })
    );
  };

  const handelClubCountryValue = (value) => {
    console.log(value, "Club COuntryb");
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        ClubCountryValue: value,
      })
    );

    // setClubCountryValue(value);
  };

  const handleCaptainRadioValue = (value) => {
    // setCaptainRadioValue(value);
    console.log(value, "Captain Radio Value");
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        CaptainRadioValue: value,
      })
    );
  };

  const handlePrefferedFootRadioValue = (value) => {
    // setPrefferedFootRadioValue(value);
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        PrefferedFootRadioValue: value,
      })
    );

    console.log(value, "Preffered Foot Value");
  };

  const handlePlayerDivisionValue = (value) => {
    // setPlayerDivisionValue(value);
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        PlayerDivisionValue: value,
      })
    );
    console.log(value, "Player Division value");
  };

  const handleContractStatusCheckBoxes = (value) => {
    // setContractStatusCheckBoxes(value);
    console.log("CONTRRACT", value);
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        ContractStatusCheckBoxes: value,
      })
    );
    // console.log(value, "Contract Check boxes array");
  };

  // Useeffect to handle setting all the fields to the values that were stored in the particular profile clidcked to be edited

  useEffect(() => {
    // currentProfileClicked
    const { savedProfile } = loginUserDetails;

    const filteredObject = savedProfile.filter((data) => {
      return data.label === previousProfileClicked;
    });

    console.log(filteredObject, "FILTERED ARRAY SAVED");

    if (filteredObject.length > 0 && filterModalType === "Edit") {
      const { filter } = filteredObject[0];

      dispatch(
        setCurrentProfileFilterObject({
          PlaceOfBirth: filter.PlaceOfBirth,
          NationalityValue: filter.NationalityValue,
          AgeRangeValue: filter.AgeRangeValue,
          HeightRangeValue: filter.HeightRangeValue,
          PlayerPositionAutoCompleteValue:
            filter.PlayerPositionAutoCompleteValue,
          MarketValue: filter.MarketValue,
          ClubCountryValue: filter.ClubCountryValue,
          CaptainRadioValue: filter.CaptainRadioValue,
          PrefferedFootRadioValue: filter.PrefferedFootRadioValue,
          PlayerDivisionValue: filter.PlayerDivisionValue,
          ContractStatusCheckBoxes: filter.ContractStatusCheckBoxes,
          positionRangeSliderValues: filter.positionRangeSliderValues,
        })
      );

      console.log(currentProfileFilterObject, "DONT YOU WORRY FILTER");
    } else if (filterModalType === "Create") {
      dispatch(
        setCurrentProfileFilterObject({
          PlaceOfBirth: "Any",
          NationalityValue: "Any",
          AgeRangeValue: [0, 40],
          HeightRangeValue: [0, 2.5],
          PlayerPositionAutoCompleteValue: "Any",
          MarketValue: [0, 40],
          ClubCountryValue: "Any",
          CaptainRadioValue: "Any",
          PrefferedFootRadioValue: "Any",
          PlayerDivisionValue: "Any",
          ContractStatusCheckBoxes: [
            "Free Agent",
            "Loan Listed",
            "Youth Player",
            "Transfer Listed",
            "Contract Expiring less than 6 months",
            "Currently renewed contract",
          ],
          // REview below
          positionRangeSliderValues: {
            "Clean sheet": [0, 100],
            Saves: [0, 100],
            "Long pass accuracy": [0, 100],
            "Blocked shots": [0, 100],
            "Aerial duels": [0, 100],
            "Penalty stop success": [0, 100],
            "Sweeping success": [0, 100],
            Clearance: [0, 100],
            Interception: [0, 100],
            Blocks: [0, 100],
            "Clean sheets per season": [0, 100],
            "Successful tackles rate %": [0, 100],
            "pass success": [0, 100],
            "total passes": [0, 100],
            assists: [0, 100],
            "key passes per game": [0, 100],
            interceptions: [0, 100],
            "successful tackles rate": [0, 100],
            "successful crosses": [0, 100],
            Goals: [0, 100],
            "Goal/match played ratio": [0, 100],
            Assists: [0, 100],
            "Shots per game": [0, 100],
            "Goal conversion rate %": [0, 100],
            "Offside range": [0, 100],
          },
        })
      );
    }

    console.log(positionRangeSliderValues?.Goals, "GALS");
  }, [
    currentProfileClicked,
    filterModalType,
    previousProfileClicked,
    editFilterModalButtonClicked,
  ]);

  return (
    <div>
      {ProfileType === "Edit" ? (
        <Tooltip title={"Edit Profile"}>
          <IconButton
            onClick={() => {
              handleOpen();
              dispatch(setFilterModalType("Edit"));
              // if (previousProfileClicked !== "") {
              dispatch(setCurrentProfile(previousProfileClicked));
              dispatch(setEditFilterModalButtonClicked());
              // }
            }}
          >
            <Settings />
          </IconButton>
        </Tooltip>
      ) : savedProfile.length <= 0 ? (
        <div onClick={handleOpen}>
          {/* // CHANING THE MODAL ENTRY ICON / CARD */}
          <BasicButton
            innerText="Get started"
            style={{ width: "15vw", marginBottom: "3vh" }}
          />{" "}
        </div>
      ) : (
        <Card
          onClick={() => {
            handleOpen();
            dispatch(setFilterModalType("Create"));
            // reset the cureent profile to an empty string
            dispatch(setCurrentProfile(""));
          }}
          sx={{
            width: 145,
            height: 80,
            marginLeft: "4.6vw",
            paddingTop: "1vh",
            paddingLeft: ".6vw",
            paddingRight: ".6vw",
            display: "flex",
            // background:
            //   "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
            background: "#5585fe",
            // background: "#1B1E2B",
            color: "white",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              flex: ".93",
              fontSize: "1em",
              display: "grid",
              placeItems: "center",
            }}
          >
            {" "}
            Create new profile{" "}
          </div>
          <div
            style={{
              flex: ".07",
              display: "flex",
            }}
          >
            {" "}
            <Add sx={{ marginTop: "4.4vh", color: "gold" }} />{" "}
          </div>
        </Card>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        // style={{ width: "100vw", height: "100vh" }}
        // className="md:w-[100vw] md:h-[100vh]    sm:w-[100vw] sm:h-[102vh]"
      >
        <Fade in={open}>
          <div
            className="cardBackground primaryTextColor md:flex md:flex-col md:pt-[3vh]
            md:w-[85%] md:h-[94%] md:p-[2vw] md:absolute     sm:flex sm:flex-col sm:pt-[3vh]
            sm:w-[100%] sm:h-[100%] sm:p-[2vw] sm:absolute md:top-[50%] md:left-[50%]    sm:top-[50%] sm:left-[50%]"
            style={style}
          >
            {/* HEader MEssage */}
            <div
              className="md:flex md:flex-row md:gap-[4vw]  sm:flex sm:flex-col sm:gap-[4vw]"
              style={{
                flex: ".1",
                // background: "green",
                // display: "flex",
                // gap: "4vw",
                // flexDirection: "column",
              }}
            >
              <div className="md:flex sm:flex">
                <h2 className="secondaryTextColor">
                  {" "}
                  {ProfileType === "Edit"
                    ? "Edit Profile"
                    : savedProfile.length <= 0
                    ? "Default Profile"
                    : "Search Profile"}{" "}
                </h2>{" "}
                <h6>Who are you looking for? </h6>{" "}
              </div>

              <div className="sm:self-center md:self-end">
                {" "}
                {savedProfile.length <= 0 ? (
                  ""
                ) : currentProfileClicked.toLowerCase() === "default" &&
                  ProfileType === "Edit" ? (
                  ""
                ) : (
                  <TextField
                    size="small"
                    id="outlined-basic"
                    label="Profile Name"
                    variant="outlined"
                    defaultValue={
                      ProfileType === "Edit" ? currentProfileClicked : ""
                    }
                    onChange={(e) => {
                      setProfileName(e.target.value);
                      setEditedProfileName(e.target.value);
                    }}
                  />
                )}
              </div>
              <div
                className="md:hidden sm:block"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  // alignItems: "end",
                  paddingLeft: "30%",
                  fontSize: "2em",
                }}
              >
                {/* <IconButton size="small" sx={{ background: "#5585FE" }}> */}
                <Close onClick={handleClose} style={{ color: "white" }} />{" "}
                {/* </IconButton> */}
              </div>
            </div>

            {/* ================================= */}
            <div
              className="md:flex md:flex-row md:overflow-y-hidden md:gap-[0%] sm:flex-col-reverse   sm:gap-[2vh] sm:flex sm:overflow-y-scroll "
              style={{ flex: ".9" }}
            >
              {/* // Personal information */}
              <div
                className="md:flex md:flex-col md:relative md:gap-[2vh] md:ml-[2%]  sm:ml-[0%] sm:flex sm:flex-col  sm:relative sm:gap-[2vh]"
                style={{
                  flex: ".33",
                  // display: "flex",
                  // gap: "2vh",
                  // flexDirection: "column",
                  paddingRight: "1.5vw",
                  // position: "relative",
                  // background: "yellow",
                }}
              >
                {" "}
                <h4 className="secondaryTextColor">
                  Personal Information{" "}
                  <IconTooltip
                    info={
                      "Personal information includes essential details about an individual, such as their name, contact information, and other relevant identifiers necessary for identification and communication."
                    }
                    image="help"
                  />{" "}
                </h4>{" "}
                {/* Place of birth */}
                <CountrySelect
                  selectValue={handelePlaceOfBirth}
                  selectLabel="Place of birth"
                  defaultValue={PlaceOfBirth}
                />
                {/* Nationality  */}
                <CountrySelect
                  selectValue={handelNationalityValue}
                  selectLabel="Nationality"
                  defaultValue={NationalityValue}
                />
                {/* Height rANGE */}
                <RangeSlider
                  rangeName={"Height range (m)"}
                  max={2.5}
                  min={0.5}
                  editDefaultValue={HeightRangeValue}
                  rangeValue={handleHeightRangeValue}
                />
                {/* <DatePickerTool style={inputStyles} label="Date of birth" /> */}
                {/* Age */}
                <RangeSlider
                  rangeValue={handleAgeRangeValue}
                  rangeName={"Age range"}
                  max={40}
                  min={0}
                  editDefaultValue={AgeRangeValue}
                />
                <Button
                  className="md:absolute md:bottom-[-24%] md:w-[23vw] sm:w-[100%] sm:absolute sm:bottom-[0%]"
                  sx={{
                    // width: "23vw",
                    background: "blue",
                    color: "white",
                    border: ".5vw",
                    // position: "absolute",
                    // bottom: 50,
                  }}
                  onClick={
                    ProfileType === "Edit"
                      ? handleSaveProfile
                      : handleCreateProfile
                  }
                >
                  {ProfileType === "Edit" ? "Save" : "Create"}
                </Button>{" "}
              </div>
              {/* Player Data */}
              <div
                className="md:flex md:flex-col sm:flex sm:flex-col  "
                style={{
                  flex: ".34",
                  // display: "flex",
                  // flexDirection: "column",
                  // background: "pink",
                }}
              >
                <div
                  className="sm:ml-[2%]"
                  style={{
                    flex: ".1",
                  }}
                >
                  {" "}
                  <h4 className="secondaryTextColor">
                    Player Information{" "}
                    <IconTooltip
                      info={
                        "Player information includes statistical parameters and player technical arrtibutes such as position, preferred foot and other relevant identifiers necessary for identification and communication."
                      }
                      image="help"
                    />{" "}
                  </h4>
                </div>

                {/* // Player stats information area */}
                <div
                  style={{
                    flex: ".9",
                    height: "68vh",
                    // overflowY: "scroll",
                    paddingLeft: "1vw",
                    paddingTop: "3vh",
                    // overflowY: "scroll",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <BasicAutoComplete
                    style={{
                      // ...inputStyles,
                      marginBottom: "2.5vh",
                      color: "black",
                    }}
                    ListArray={soccerPositions}
                    label="Main Position"
                    AutoCompleteValue={handlePlayerPositionAutoCompleteValue}
                    defaultValue={PlayerPositionAutoCompleteValue}
                  />{" "}
                  {/* <BasicAutoComplete
                    style={inputStyles}
                    ListArray={soccerPositions}
                    label="Other Positions"
                  /> */}
                  {PlayerPositionAutoCompleteValue === ""
                    ? ""
                    : //Goalkeeper
                    PlayerPositionAutoCompleteValue === "Goalkeeper (GK)"
                    ? GKTextFieldArray.map((data, index) => {
                        return (
                          <RangeSlider
                            key={index}
                            rangeName={`${data}`}
                            max={100}
                            min={0}
                            rangeValue={(newValue) =>
                              handleRangeChange(data, newValue)
                            }
                            editDefaultValue={positionRangeSliderValues[data]}
                          />
                        );
                      })
                    : // DEFEMDERS
                    PlayerPositionAutoCompleteValue === "Defender (D)" ||
                      PlayerPositionAutoCompleteValue === "Center Back (CB)" ||
                      PlayerPositionAutoCompleteValue === "Full-back (FB)" ||
                      PlayerPositionAutoCompleteValue === "Wing-back (WB)"
                    ? DefendersTextFieldArray.map((data, index) => {
                        return (
                          <RangeSlider
                            key={index}
                            rangeName={data}
                            max={100}
                            min={0}
                            rangeValue={(newValue) =>
                              handleRangeChange(data, newValue)
                            }
                            editDefaultValue={positionRangeSliderValues[data]}
                          />
                        );
                      })
                    : // MIDFIELDERS
                    PlayerPositionAutoCompleteValue === "Midfielder (MF)" ||
                      PlayerPositionAutoCompleteValue ===
                        "Central Midfielder (CM)" ||
                      PlayerPositionAutoCompleteValue ===
                        "Defensive Midfielder (CDM)" ||
                      PlayerPositionAutoCompleteValue ===
                        "Attacking Midfielder (CAM)" ||
                      PlayerPositionAutoCompleteValue === "Wide Midfielder (WM)"
                    ? MidfieldersTextFieldArray.map((data, index) => {
                        return (
                          <RangeSlider
                            key={index}
                            rangeName={data}
                            max={100}
                            min={0}
                            rangeValue={(newValue) =>
                              handleRangeChange(data, newValue)
                            }
                            editDefaultValue={[0, 100]}
                          />
                        );
                      }) // Attackers
                    : PlayerPositionAutoCompleteValue === "Forward (F)" ||
                      PlayerPositionAutoCompleteValue === "Striker (ST)" ||
                      PlayerPositionAutoCompleteValue ===
                        "Center Forward (CF)" ||
                      PlayerPositionAutoCompleteValue === "Winger (W)"
                    ? AttackerTextFieldArray.map((data, index) => {
                        return (
                          <RangeSlider
                            key={index}
                            rangeName={data}
                            max={100}
                            min={0}
                            rangeValue={(newValue) =>
                              handleRangeChange(data, newValue)
                            }
                            editDefaultValue={positionRangeSliderValues[data]}
                          />
                        );
                      })
                    : // : PlayerPositionAutoCompleteValue === "Any" ||
                      //   PlayerPositionAutoCompleteValue === null
                      // ? AnyTextFieldArray.map((data, index) => {
                      //     return (
                      //       <RangeSlider
                      //         key={index}
                      //         rangeName={data}
                      //         max={100}
                      //         min={0}
                      //         // rangeValue={(newValue) =>
                      //         //   handleRangeChange(data, newValue)
                      //         // }
                      //         // editDefaultValue={positionRangeSliderValues[data]}
                      //       />
                      //     );
                      //   })
                      ""}
                  {/* MARKET VALUE RANGE */}
                  <RangeSlider
                    rangeName={"Market Value ($ 000,000)"}
                    max={50}
                    min={0}
                    rangeValue={handleMarketValue}
                    editDefaultValue={MarketValue}
                  />
                  {/* Captiain Selection */}
                  <GroupedRadio
                    radioDefault={CaptainRadioValue}
                    selectedValue={handleCaptainRadioValue}
                    radioArray={captainArray}
                    labelName="Captain"
                  />
                  {/* // Preffered foot */}
                  <GroupedRadio
                    radioDefault={PrefferedFootRadioValue}
                    selectedValue={handlePrefferedFootRadioValue}
                    radioArray={preferredFootArray}
                    labelName="Preferred foot"
                  />
                </div>
              </div>
              {/* Extra Info Data */}
              <div
                className="md:flex md:flex-col  md:gap-[2vh]  sm:flex sm:flex-col  sm:gap-[2vh]"
                style={{
                  flex: ".33",
                  // display: "flex",
                  // gap: "2vh",
                  // flexDirection: "column",
                }}
              >
                <h4 className="secondaryTextColor">
                  Other Information{" "}
                  <IconTooltip
                    info={
                      "Other information includes non-technical details such as club country, club division and other relevant identifiers necessary for identification and communication."
                    }
                    image="help"
                  />{" "}
                </h4>

                <CountrySelect
                  selectValue={handelClubCountryValue}
                  selectLabel="Club Country"
                  defaultValue={ClubCountryValue}
                />

                <BasicSelect
                  label={"Division"}
                  inputStyle={{ width: 300 }}
                  itemsArray={leagueDivisions}
                  selectedValue={handlePlayerDivisionValue}
                  defaultSelect={PlayerDivisionValue}
                />

                <CheckboxesGroup
                  checkBoxesSelected={handleContractStatusCheckBoxes}
                  CheckboxLabel="Contract Status"
                  checkboxArray={contractStatusArray}
                />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
