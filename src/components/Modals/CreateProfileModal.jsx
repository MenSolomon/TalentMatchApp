import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Add, Close, Settings } from "@mui/icons-material";
import { Card, TextField, IconButton, Tooltip } from "@mui/material";
import CountrySelect from "../Autocompletes/CountrySelect";
import IconTooltip from "../Tooltips/IconToolTip";
import BasicAutoComplete from "../Autocompletes/BasicAutoComplete";
import GroupedRadio from "../Radio/GroupedRadio";
import RangeSlider from "../Slider/RangeSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSubscriptionActive,
  selectSubscriptionFeatures,
  selectUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import BasicButton from "../Buttons/BasicButton";
import { useNavigate } from "react-router-dom";
import { selectTempUsersDatabase } from "../../statemanager/slices/TempDatabaseSlice";
import {
  selectCurrentProfile,
  selectCurrentProfileFilterObject,
  selectPreviousProfile,
  selectUserSavedProfiles,
  setCurrentProfile,
  setCurrentProfileFilterObject,
  setPreviousProfile,
  setUserSavedProfiles,
} from "../../statemanager/slices/SavedProfileSlice";
import {
  selectAutoCompletePlayerPosition,
  selectEditFilterModalButtonClicked,
  selectFilterModalType,
  selectSoccerPostions,
  setAutoCompletePlayerPosition,
  setEditFilterModalButtonClicked,
  setFilterModalType,
  setSnackbarMessage,
  setSnackbarTriggerCounter,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import BasicSelect from "../Selects/BasicSelect";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "85%",
  // height: "94%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
};

// currentProfileClicked
export default function CreateProfileModal({ ProfileType }) {
  const dispatch = useDispatch();
  const currentProfileClicked = useSelector(selectCurrentProfile);
  const previousProfileClicked = useSelector(selectPreviousProfile);
  const isSubscriptionActive = useSelector(selectIsSubscriptionActive);

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const StripeCheckout = async (priceID) => {
    console.log(priceID);
    const currentUser = auth.currentUser;
    const usersDbRef = collection(db, "users_db");
    const currentUserDocRef = doc(usersDbRef, currentUser.uid);
    const checkoutSessionsCollectionRef = collection(
      currentUserDocRef,
      "checkout_sessions"
    );

    const newCheckoutSessionDocRef = await addDoc(
      checkoutSessionsCollectionRef,
      {
        price: priceID,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(newCheckoutSessionDocRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occurred: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    });
  };

  const handleOpen = async () => {
    setOpen(true);
    // const { accountId } = loginUserDetails;
    // const productIDRef = doc(db, `users_db/${accountId}`);
    // const productIdSnap = await getDoc(productIDRef);
    // const priceID = await productIdSnap.data()?.subscriptionPrice;
    // if (isSubscriptionActive == false) {
    //   StripeCheckout(priceID);
    // } else {
    //   setOpen(true);
    // }
  };
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
    "First tier (male)",
    "Second tier (male)",
    "Third tier (male)",
    "Below Third tier (male)",
    "First tier (female)",
    "Second tier (female)",
    "Second tier (female)",
    "Below Second tier (female)",
  ];

  const marketValue$ = [
    "Any",
    "0 - 99,999",
    "100,000 - 499,999",
    "500,000 - 999,999",
    "1,000,000 - 4,999,999",
    "5,000,000 - 9,999,999",
    "10,000,000 +",
  ];
  const salaryExpectation = [
    "Any",
    "0 - 4,999",
    "5,000 - 9,999",
    "10,000 - 19,999",
    "20,000 - 49,999",
    "50,000 - 99,999",
    "100,000 +",
  ];

  const soccerPositions = useSelector(selectSoccerPostions);

  const GKTextFieldArray = [
    "Clean sheet",
    "Saves",
    "Long pass accuracy ",
    // "Blocked shots ",
    // "Aerial duels",
    // "Penalty stop success",
    // "Sweeping success",
  ];

  const DefendersTextFieldArray = [
    // "Clearance",
    "Interception",
    "Blocks",
    // "Clean sheets per season",
    "Successful tackles rate %",
  ];
  const MidfieldersTextFieldArray = [
    "Pass success",
    "Total passes",
    "assists",
    // "Key passes per game",
    // "Interceptions",
    // "Successful tackles rate",
    // "Successful crosses",
  ];
  const AttackerTextFieldArray = [
    "Goals",
    "Goal/match played ratio",
    "Assists",
    // "Shots per game",
    // "Goal conversion rate",
    // "Offside range",
  ];

  const AnyTextFieldArray = [];

  const autocompletePositionSelected = useSelector(
    selectAutoCompletePlayerPosition
  );

  const preferredFootArray = ["Left", "Right", "Both", "Any"];
  const captainArray = ["Yes", "No", "Any"];

  const contractStatusArray = [
    "Any",
    "Free agent",
    "Contract Expiring in less than 6 months",
    "Contract Expiring in more than 6 months",
  ];
  const editFilterModalButtonClicked = useSelector(
    selectEditFilterModalButtonClicked
  );
  const loginUserDetails = useSelector(selectUserDetailsObject);
  const userSavedProfiles = useSelector(selectUserSavedProfiles);
  const subscriptionFeaturesObject = useSelector(selectSubscriptionFeatures);

  // state to hold maximum number of profiles
  const { maxPlayersInAgency, maxProfiles } = subscriptionFeaturesObject || {};
  const { email } = loginUserDetails || {};
  const allUsers = useSelector(selectTempUsersDatabase);

  const currentProfileFilterObject = useSelector(
    selectCurrentProfileFilterObject
  );
  selectAutoCompletePlayerPosition;
  const filterModalType = useSelector(selectFilterModalType);
  const {
    // PlaceOfBirth,
    NationalityValue,
    AgeRangeValue,
    HeightRangeValue,
    PlayerPositionAutoCompleteValue,
    PlayerAlternatePositionAutoCompleteValue,
    MarketValue,
    SalaryExpectationValue,
    ClubCountryValue,
    CaptainRadioValue,
    PrefferedFootRadioValue,
    PlayerDivisionValue,
    ContractStatusCheckBoxes,
    positionRangeSliderValues,
  } = currentProfileFilterObject;

  const [profileName, setProfileName] = useState("");
  const [editedProfileName, setEditedProfileName] = useState("");
  // state to manage loading circle

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
      ? // "Blocked shots ",
        // "Aerial duels",
        // "Penalty stop success",
        // "Sweeping success",
        // "Clearance",
        // "Clean sheets per season",
        // "Key passes per game",
        // "Interceptions",
        // "Successful tackles rate",
        // "Successful crosses",
        // "Shots per game",
        // "Goal conversion rate",
        // "Offside range",

        dispatch(
          setCurrentProfileFilterObject({
            ...currentProfileFilterObject,
            positionRangeSliderValues: {
              "Clean sheet": [0, 100],
              Saves: [0, 100],
              "Long pass accuracy": [0, 100],
              Interception: [0, 100],

              Blocks: [0, 100],
              "Successful tackles rate %": [0, 100],
              "pass success": [0, 100],
              "total passes": [0, 100],
              assists: [0, 100],

              Goals: [0, 100],
              "Goal/match played ratio": [0, 100],
              Assists: [0, 100],
              // "Shots per game": [0, 100],
            },
          })
        )
      : "";
  }, [PlayerPositionAutoCompleteValue, currentProfileClicked]);

  // FUNCTION FOR CREATING PROFILE

  // const { productID } = selectProductID;
  const handleCreateProfile = async () => {
    const { accountId } = loginUserDetails;

    const uuid = uuidv4();

    // first check if the user has exceeded the max allowed profiles
    if (
      userSavedProfiles.length === 0 ||
      userSavedProfiles.length < maxProfiles
    ) {
      if (userSavedProfiles.length < 1) {
        // alert("can add");
        // This is the rest of users in the database devoid of the current user logged in

        // doing this because its not an online database and not a snapshot or realtime update so i have to update the logged in user object and also same user object in the database

        // alert(accountId);
        ///. HAVE TO WRITE A TRY CATCH BLOCK TO DETECT ANY ERRORS
        const savedProfileSubCollectionRef = doc(
          db,
          `users_db/${accountId}/SavedProfiles`,
          "Default"
        );

        const defaultProfileDateCreated = moment().format(
          "YYYY-MM-DD HH:mm:ss"
        );

        setDoc(savedProfileSubCollectionRef, {
          label: "Default",
          dateCreated: defaultProfileDateCreated,
          filter: currentProfileFilterObject,
          labelId: "Default",
        });

        handleClose();

        dispatch(
          setUserSavedProfiles([
            {
              label: "Default",
              dateCreated: defaultProfileDateCreated,
              filter: currentProfileFilterObject,
              labelId: "Default",
            },
          ])
        );

        /// REset the filter object after createion
        dispatch(
          setCurrentProfileFilterObject({
            // PlaceOfBirth: "Any",
            NationalityValue: "Any",
            AgeRangeValue: [0, 40],
            HeightRangeValue: [0, 2.5],
            positionRangeSliderValues: {
              "Clean sheet": [0, 100],
              Saves: [0, 100],
              "Long pass accuracy": [0, 100],
              Interception: [0, 100],

              Blocks: [0, 100],
              "Successful tackles rate %": [0, 100],
              "pass success": [0, 100],
              "total passes": [0, 100],
              assists: [0, 100],

              Goals: [0, 100],
              "Goal/match played ratio": [0, 100],
              Assists: [0, 100],
              // "Shots per game": [0, 100],
            },
            MarketValue: "0 - 99,999",
            SalaryExpectationValue: "0 - 4,999",

            ClubCountryValue: "Any",
            // CaptainRadioValue: "Any",
            PrefferedFootRadioValue: "Any",
            PlayerDivisionValue: "Any",
            ContractStatusCheckBoxes: "Any",

            // REview below
            PlayerPositionAutoCompleteValue: "Any",
            PlayerAlternatePositionAutoCompleteValue: "None",

            previousProfile: "",
          })
        );
      } else {
        // alert("can add 2");

        const savedProfileSubCollectionRef = doc(
          db,
          `users_db/${accountId}/SavedProfiles`,
          uuid
        );
        if (profileName !== "" && profileName.toLowerCase() !== "") {
          ///. HAVE TO WRITE A TRY CATCH BLOCK TO DETECT ANY ERRORS

          const profileNameMatch = userSavedProfiles.filter((data) => {
            const { label } = data;
            return (
              label.replace(/\s/g, "").toLowerCase() ===
              profileName.replace(/\s/g, "").toLowerCase()
            );
          });

          console.log("ProfileLabelMatxh", profileNameMatch);
          // This it to make sure that we dont create a profile with the same name

          if (profileNameMatch.length <= 0) {
            setDoc(savedProfileSubCollectionRef, {
              label: profileName,
              dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
              filter: currentProfileFilterObject,
              labelId: uuid,
            });

            handleClose();
            dispatch(
              setCurrentProfileFilterObject({
                // PlaceOfBirth: "Any",
                NationalityValue: "Any",
                AgeRangeValue: [0, 40],
                HeightRangeValue: [0, 2.5],
                positionRangeSliderValues: {
                  "Clean sheet": [0, 100],
                  Saves: [0, 100],
                  "Long pass accuracy": [0, 100],
                  Interception: [0, 100],

                  Blocks: [0, 100],
                  "Successful tackles rate %": [0, 100],
                  "pass success": [0, 100],
                  "total passes": [0, 100],
                  assists: [0, 100],

                  Goals: [0, 100],
                  "Goal/match played ratio": [0, 100],
                  Assists: [0, 100],
                  // "Shots per game": [0, 100],
                },
                SalaryExpectationValue: "0 - 4,999",

                MarketValue: "0 - 99,999",

                ClubCountryValue: "Any",
                // CaptainRadioValue: "Any",
                PrefferedFootRadioValue: "Any",
                PlayerDivisionValue: "Any",
                ContractStatusCheckBoxes: "Any",
                // REview below
                PlayerPositionAutoCompleteValue: "Any",
                PlayerAlternatePositionAutoCompleteValue: "None",
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
    } else if (userSavedProfiles.length == maxProfiles) {
      triggerWarningAlertModal(
        "You have reached the maximum profiles allowed! Upgrade to add more"
      );
    }

    // changing the click current clicked value to the edited name

    // reset the textfields after save
  };

  // FUNCTION FOR CREATING PROFILE
  const handleSaveProfile = async () => {
    // get accountid and product id
    const currentUser = auth.currentUser;
    // const accountId = await currentUser.uid;
    const SubscriptionValidationChecker = async () => {
      try {
        const {
          // PlaceOfBirth,
          NationalityValue,
          AgeRangeValue,
          HeightRangeValue,
          PlayerPositionAutoCompleteValue,
          PlayerAlternatePositionAutoCompleteValue,
          ClubCountryValue,
          MarketValue,
          SalaryExpectationValue,

          // CaptainRadioValue,
          PrefferedFootRadioValue,
          PlayerDivisionValue,
          ContractStatusCheckBoxes,
          positionRangeSliderValues,
        } = currentProfileFilterObject;

        // get accountid and product id
        const accountId = await currentUser.uid;

        const MacthedProfile = userSavedProfiles.filter((data) => {
          return data.label === currentProfileClicked;
        });

        const nameExists = userSavedProfiles.filter(
          (data) => data.label.toLowerCase() === profileName.toLowerCase()
        );
        const { labelId } = MacthedProfile[0];

        if (profileName === "") {
          triggerWarningAlertModal("name cannot be empty ");
        } else {
          // This if statement makes prevents saved name from being the same as a existing profile name
          if (nameExists.length <= 0 || profileName === currentProfileClicked) {
            // Update the document in Firestore
            const selectedProfileRef = doc(
              db,
              `users_db/${accountId}/SavedProfiles`,
              labelId
            );
            updateDoc(selectedProfileRef, {
              label: profileName,
              filter: {
                // PlaceOfBirth,
                AgeRangeValue,
                NationalityValue,
                HeightRangeValue,
                PlayerPositionAutoCompleteValue:
                  PlayerPositionAutoCompleteValue,
                PlayerAlternatePositionAutoCompleteValue:
                  PlayerAlternatePositionAutoCompleteValue,
                ClubCountryValue,
                MarketValue,
                SalaryExpectationValue,

                // CaptainRadioValue,
                PrefferedFootRadioValue,
                PlayerDivisionValue,
                ContractStatusCheckBoxes,
                positionRangeSliderValues: positionRangeSliderValues,
              },
            });
            dispatch(setPreviousProfile(profileName));

            navigate(`/profile/${profileName}`);
            setOpen(false);
            dispatch(setSnackbarMessage(`"${profileName}" filter saved`));
            dispatch(setSnackbarTriggerCounter());
          } else {
            triggerWarningAlertModal("Profile Name already exists");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    SubscriptionValidationChecker();
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

  const handlePlayerAlternatePositionAutoCompleteValue = (value) => {
    // setPlayerPositionAutoCompleteValue(value);

    if (value === null) {
      dispatch(
        setCurrentProfileFilterObject({
          ...currentProfileFilterObject,
          PlayerAlternatePositionAutoCompleteValue: "None",
        })
      );
    }
    {
      dispatch(
        setCurrentProfileFilterObject({
          ...currentProfileFilterObject,
          PlayerAlternatePositionAutoCompleteValue: value,
        })
      );
    }

    // PlayerPositionAutoCompleteValue,

    console.log(value, "Player Alternate Position  auto complete value");
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

  const handleSalaryExpectation = (value) => {
    console.log(value, "Salary Expectation Values");
    // setMarketValue(value);
    dispatch(
      setCurrentProfileFilterObject({
        ...currentProfileFilterObject,
        SalaryExpectationValue: value,
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
        // CaptainRadioValue: value,
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

    const filteredObject = userSavedProfiles.filter((data) => {
      return data.label === previousProfileClicked;
    });

    console.log(filteredObject, "FILTERED ARRAY SAVED");

    if (filteredObject.length > 0 && filterModalType === "Edit") {
      const { filter } = filteredObject[0];

      dispatch(
        setCurrentProfileFilterObject({
          // PlaceOfBirth: filter.PlaceOfBirth,
          NationalityValue: filter.NationalityValue,
          AgeRangeValue: filter.AgeRangeValue,
          HeightRangeValue: filter.HeightRangeValue,
          PlayerPositionAutoCompleteValue:
            filter.PlayerPositionAutoCompleteValue,
          PlayerAlternatePositionAutoCompleteValue:
            filter.PlayerAlternatePositionAutoCompleteValue,

          MarketValue: filter.MarketValue,
          SalaryExpectationValue: filter?.SalaryExpectationValue,

          ClubCountryValue: filter.ClubCountryValue,
          // CaptainRadioValue: filter.CaptainRadioValue,
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
          // PlaceOfBirth: "Any",
          NationalityValue: "Any",
          AgeRangeValue: [0, 40],
          HeightRangeValue: [0, 2.5],
          PlayerPositionAutoCompleteValue: "Any",
          PlayerAlternatePositionAutoCompleteValue: "None",
          MarketValue: "0 - 99,999",

          SalaryExpectationValue: "0 - 4,999",

          ClubCountryValue: "Any",
          // CaptainRadioValue: "Any",
          PrefferedFootRadioValue: "Any",
          PlayerDivisionValue: "Any",
          ContractStatusCheckBoxes: "Any",

          // REview below
          positionRangeSliderValues: {
            "Clean sheet": [0, 100],
            Saves: [0, 100],
            "Long pass accuracy": [0, 100],
            Interception: [0, 100],

            Blocks: [0, 100],
            "Successful tackles rate %": [0, 100],
            "pass success": [0, 100],
            "total passes": [0, 100],
            assists: [0, 100],

            Goals: [0, 100],
            "Goal/match played ratio": [0, 100],
            Assists: [0, 100],
            // "Shots per game": [0, 100],
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
      ) : userSavedProfiles.length <= 0 ? (
        <div onClick={handleOpen}>
          {/* // CHANING THE MODAL ENTRY ICON / CARD */}
          <BasicButton
            innerText="Get started"
            style={{ width: "25vw", marginBottom: "3vh" }}
          />{" "}
        </div>
      ) : (
        <Card
          onClick={() => {
            handleOpen();
            dispatch(setFilterModalType("Create"));
            // reset the cureent profile to an empty string
            dispatch(setCurrentProfile(""));
            // if (maxPlayersInAgency == 0) {
            //   triggerWarningAlertModal(
            //     "Please Upgrade Your Subscription To Add More Profiles"
            //   );
            // } else if (maxPlayersInAgency > 0) {
            //   handleOpen();
            //   dispatch(setFilterModalType("Create"));
            //   // reset the cureent profile to an empty string
            //   dispatch(setCurrentProfile(""));
            // }
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
      >
        <Fade in={open}>
          <div
            className="cardBackground primaryTextColor lg:w-[85%] lgflex-col: md:flex md:flex-col md:pt-[3vh]
            md:w-[100%] md:h-[97%] md:p-[2vw] md:absolute     sm:flex sm:flex-col sm:pt-[3vh]
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
              }}
            >
              <h2 className="secondaryTextColor lg:text-[2em] md:text-[2.5em]">
                {" "}
                {ProfileType === "Edit"
                  ? "Edit Profile"
                  : userSavedProfiles.length <= 0
                  ? "Default Profile"
                  : "Search Profile"}{" "}
              </h2>{" "}
              <h6 className="lg:text-[1.8em] md:text-[1.5em]">
                {/* Who are you looking for? */}
                Profile name
              </h6>{" "}
              <div style={{ justifySelf: "flex-end" }}>
                {" "}
                {userSavedProfiles.length <= 0 ? (
                  ""
                ) : currentProfileClicked.toLowerCase() === "default" &&
                  ProfileType === "Edit" ? (
                  ""
                ) : (
                  <TextField
                    size="small"
                    className="sm:w-[95%] md:w-[100%]"
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
                className="md:hidden sm:block md:pl-[92%] sm:pl-[80%]"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  // alignItems: "end",
                  // paddingLeft: "92%",
                  fontSize: "2em",
                  position: "absolute",
                }}
              >
                {/* <IconButton size="small" sx={{ background: "#5585FE" }}> */}
                <Close onClick={handleClose} style={{ color: "white" }} />{" "}
                {/* </IconButton> */}
              </div>
            </div>

            {/*  */}
            <div
              className="lg:basis-[85%]  md:basis-[85%] md:flex md:flex-row md:overflow-y-hidden md:gap-[0%] sm:flex-col  sm:basis-[85%] sm:gap-[2vh] sm:flex sm:overflow-y-scroll"
              style={{ flex: ".85" }}
            >
              {/* // Personal information */}
              <div
                className="lg::basis-[33%]   md:basis-[35%] md:flex md:flex-col md:relative md:gap-[2vh] md:ml-[2%]  sm:ml-[0%] sm:flex sm:flex-col  sm:basis-[33%] sm:relative sm:gap-[2vh] "
                style={{
                  // flex: ".33",
                  // display: "flex",
                  // gap: "2vh",
                  // flexDirection: "column",
                  paddingRight: "1.5vw",
                  // position: "relative",
                }}
              >
                {" "}
                <h4 className="secondaryTextColor lg:text-[1.8em] md:text-[1.5em]">
                  Personal Information{" "}
                  <IconTooltip
                    info={
                      "Personal information includes essential details about an individual, such as their name, contact information, and other relevant identifiers necessary for identification and communication."
                    }
                    image="help"
                  />{" "}
                </h4>{" "}
                {/* Place of birth */}
                {/* <CountrySelect
                  selectValue={handelePlaceOfBirth}
                  selectLabel="Place of birth"
                  defaultValue={PlaceOfBirth}
                /> */}
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
                  min={0.3}
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
                {/* // Preffered foot */}
                <GroupedRadio
                  radioDefault={PrefferedFootRadioValue}
                  selectedValue={handlePrefferedFootRadioValue}
                  radioArray={preferredFootArray}
                  labelName="Preferred foot"
                />
              </div>
              {/* Player Data */}
              <div
                className="lg:basis-[34%]   md:basis-[32%] md:flex md:flex-col sm:flex sm:basis-[34%] sm:flex-col md:mr-[4%] sm:mr-[0%]"
                style={
                  {
                    // flex: ".34",
                    // display: "flex",
                    // flexDirection: "column",
                    // background: "yellow",
                  }
                }
              >
                <div
                  className="sm:ml-[2%]"
                  style={{
                    flex: ".1",
                  }}
                >
                  {" "}
                  <h4 className="secondaryTextColor lg:text-[1.8em] md:text-[1.5em]">
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
                    // flex: ".9",
                    height: "68vh",
                    // overflowY: "scroll",
                    paddingLeft: "1vw",
                    paddingTop: "3vh",
                    overflowY: "scroll",
                    // background: "red",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3vh",
                  }}
                >
                  <BasicAutoComplete
                    style={{
                      // ...inputStyles,
                      marginBottom: "2.5vh",
                      color: "black",
                      // background: "red",
                    }}
                    ListArray={["Any", ...soccerPositions]}
                    label="Main Position"
                    AutoCompleteValue={handlePlayerPositionAutoCompleteValue}
                    defaultValue={PlayerPositionAutoCompleteValue}
                  />
                  {/* <BasicAutoComplete
                    style={inputStyles}
                    ListArray={soccerPositions}
                    label="Other Positions"
                  /> */}
                  {PlayerPositionAutoCompleteValue === ""
                    ? ""
                    : //Goalkeeper
                    PlayerPositionAutoCompleteValue === "Goalkeeper"
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
                    PlayerPositionAutoCompleteValue === "Defender" ||
                      PlayerPositionAutoCompleteValue === "Center Back" ||
                      PlayerPositionAutoCompleteValue === "Right Back" ||
                      PlayerPositionAutoCompleteValue === "Left Back" ||
                      PlayerPositionAutoCompleteValue === "Wing back"
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
                    PlayerPositionAutoCompleteValue === "Midfielder" ||
                      PlayerPositionAutoCompleteValue ===
                        "Central Midfielder" ||
                      PlayerPositionAutoCompleteValue ===
                        "Defensive Midfielder" ||
                      PlayerPositionAutoCompleteValue === "Attacking Midfielder"
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
                    : PlayerPositionAutoCompleteValue === "Forward" ||
                      PlayerPositionAutoCompleteValue === "Striker" ||
                      //  ||
                      // PlayerPositionAutoCompleteValue ===
                      //   "Center Forward (CF)"
                      PlayerPositionAutoCompleteValue === "Winger"
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
                  <BasicAutoComplete
                    style={{
                      // ...inputStyles,
                      marginBottom: "2.5vh",
                      color: "black",
                    }}
                    ListArray={["None", ...soccerPositions]}
                    label="Alternate Position"
                    AutoCompleteValue={
                      handlePlayerAlternatePositionAutoCompleteValue
                    }
                    defaultValue={PlayerAlternatePositionAutoCompleteValue}
                  />{" "}
                  {/* MARKET VALUE RANGE */}
                  <BasicSelect
                    label="Market Value ($)"
                    inputStyle={{ width: 250 }}
                    itemsArray={marketValue$}
                    selectedValue={handleMarketValue}
                    defaultSelect={MarketValue}
                  />
                  {/* <RangeSlider
                    rangeName={"Market Value ($ 000,000)"}
                    max={50}
                    min={0}
                    rangeValue={handleMarketValue}
                    editDefaultValue={MarketValue}
                  /> */}
                  {/* SALARY EXPECTATION VALUE RANGE */}
                  <BasicSelect
                    label="Salary Expectation ($ 000) per month"
                    inputStyle={{ width: 250 }}
                    itemsArray={salaryExpectation}
                    selectedValue={handleSalaryExpectation}
                    defaultSelect={SalaryExpectationValue}
                  />
                  {/* <RangeSlider
                    rangeName={"Salary Expectation ($ 000) per month"}
                    max={50}
                    min={0}
                    rangeValue={handleSalaryExpectation}
                    editDefaultValue={SalaryExpectationValue}
                  /> */}
                  {/* Captiain Selection */}
                  {/* <GroupedRadio
                    radioDefault={CaptainRadioValue}
                    selectedValue={handleCaptainRadioValue}
                    radioArray={captainArray}
                    labelName="Captain"
                  /> */}
                </div>
              </div>
              {/* Extra Info Data */}
              <div
                className="lg:basis-[33%]  md:basis-[33%] md:flex md:flex-col  md:gap-[4.5vh]  sm:basis-[33%] sm:flex sm:flex-col sm:gap-[2vh]"
                style={
                  {
                    // flex: ".33",
                    // display: "flex",
                    // gap: "2vh",
                    // flexDirection: "column",
                    // background: "green",
                  }
                }
              >
                <h4 className="secondaryTextColor lg:text-[1.8em] md:text-[1.5em]">
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
                  inputStyle={{ width: 250 }}
                  itemsArray={leagueDivisions}
                  selectedValue={handlePlayerDivisionValue}
                  defaultSelect={PlayerDivisionValue}
                />

                {/* <CheckboxesGroup
                  checkBoxesSelected={handleContractStatusCheckBoxes}
                  CheckboxLabel="Contract Status"
                  checkboxArray={contractStatusArray}
                /> */}
                <BasicSelect
                  label={"Contract Status"}
                  inputStyle={{ width: 250 }}
                  itemsArray={contractStatusArray}
                  selectedValue={handleContractStatusCheckBoxes}
                  defaultSelect={ContractStatusCheckBoxes}
                />
              </div>
            </div>

            {/* // Button Area */}
            <div
              // className="md:flex md:flex-row md:overflow-y-hidden md:gap-[0%] sm:flex-col-reverse   sm:gap-[2vh] sm:flex sm:overflow-y-scroll"
              style={{ flex: ".05" }}
            >
              <Button
                className="md:absolute md:bottom-[-6%] md:w-[23vw] sm:w-[100%] sm:absolute sm:bottom-[2%]"
                sx={{
                  // width: "23vw",
                  background: "blue",
                  color: "white",
                  border: ".5vw",
                  // position: "absolute",
                  // bottom: 50,
                }}
                onClick={() => {
                  ProfileType === "Edit"
                    ? handleSaveProfile()
                    : handleCreateProfile();
                }}
              >
                {ProfileType === "Edit" ? "Save" : "Create"}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
