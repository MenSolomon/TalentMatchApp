import { useLocation, useNavigate } from "react-router-dom";
import {
  selectRoleSelected,
  setCompletedSteps,
  setRoleSelected,
} from "../statemanager/slices/SignupStepperSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Checkbox, FormControlLabel } from "@mui/material";
import PaymentModeSelect from "../components/Selects/PaymentModeSelect";
import BasicButton from "../components/Buttons/BasicButton";
import moment from "moment/moment";
import {
  selectUserSignUpData,
  setUserSignUpData,
} from "../statemanager/slices/UserDataSlice";
import { useEffect, useState } from "react";
import {
  selectTempUsersDatabase,
  setTempUsersDatabase,
} from "../statemanager/slices/TempDatabaseSlice";
import {
  serverTimestamp,
  collection,
  doc,
  setDoc,
  onSnapshot,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../Firebase/Firebase";
import {
  selectPlayersDatabase,
  selectUsersDatabase,
} from "../statemanager/slices/DatabaseSlice";
import {
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../statemanager/slices/OtherComponentStatesSlice";
import { setThemeProviderToLightMode } from "../statemanager/slices/ThemeProviderSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  setCredentials,
  setLoginStatus,
} from "../statemanager/slices/LoginUserDataSlice";

const ConfirmDetails = () => {
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleSelected = useSelector(selectRoleSelected);
  const userData = useSelector(selectUserSignUpData);
  const allUsers = useSelector(selectUsersDatabase);
  const allPlayersInDatabase = useSelector(selectPlayersDatabase);
  const today = moment();

  //state to manage user id
  const [agreement, setAgreement] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const {
    firstName,
    surname,
    DateOfBirth,
    phoneNumber,
    email,
    Nationality,
    password,
  } = userData;

  // Add one month to the current date
  const oneMonthLater = today.add(1, "months");

  // Now, 'oneMonthLater' contains the date one month from today
  console.log(oneMonthLater.format("MMMM Do YYYY, h:mm a"));

  // const [pa, setPa] = useState("");

  const extractPaymentTypeSelected = (e) => {
    // setPa(e);

    dispatch(setUserSignUpData({ ...userData, paymentType: e }));
  };

  useEffect(() => {
    if (userData.paymentType === "Cards") {
      dispatch(setUserSignUpData({ ...userData, paymentDetails: {} }));
    }
  }, [userData.paymentType]);

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  // ... (existing code above)
  const handleGoogleLogin = async (auth, email, password) => {
    alert("triggered");
    // invoke google createUserWithEmailAndPassword method
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // save credentials
        dispatch(setCredentials(user.uid));

        // set login status to true
        dispatch(setLoginStatus(true));
        console.log(email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode, "errorMessage", errorMessage);

        // consitions
        if (errorCode == "auth/email-already-in-use") {
          triggerWarningAlertModal("G-Account Exists");
        }
      });
    await navigate("/login");
  };
  const handleStartFreeTrial = async () => {
    // const email = location.state.email;
    // const password = location.state.password;
    try {
      const uuid = uuidv4();
      if (roleSelected === "") {
        triggerWarningAlertModal(
          "Please complete step 1 (Select your role before starting trial)"
        );
      } else if (userData.subscriptionPackage === "") {
        triggerWarningAlertModal(
          "Please complete step 2 (Choose a package before starting trial)"
        );
      } else if (userData.firstname === "") {
        triggerWarningAlertModal(
          "Please complete step 3 (Create an account before starting trial)"
        );
      } else if (userData.paymentType === "" || !userData.paymentType) {
        triggerWarningAlertModal("Please select a payment type");
      } else if (agreement === false || privacy === false) {
        triggerWarningAlertModal(
          "Please read terms and conditions as well as our privacy policy and tick the boxes to agree"
        );
      } else {
        const userRef = collection(db, `users_db`);
        const q = query(userRef, where("email", "==", email));
        const docSnap = await getDocs(q);

        // Have to write a code to inject data ointo database when users_db is empty however db wont be empty ever
        // if (docSnap.size > 0) {
        const items = [];
        docSnap.forEach((doc) => {
          items.push(doc.data());
        });

        items.forEach((item) => {
          if (item.dateCreated !== "" && item.dateCreated !== null) {
            const firestoreTimestamp = item.dateCreated;
            const date = firestoreTimestamp.toDate();
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            };
            const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
            const dateString = dateTimeFormat.format(date);
            item.dateCreated = dateString;
          }
        });

        if (items.length > 0) {
          triggerWarningAlertModal("Account Exists");
        } else {
          if (roleSelected === "Player") {
            // Existing player code

            const ExistingPlayerProfile = allPlayersInDatabase.filter(
              (data) => {
                const {
                  firstName,
                  surName,
                  Nationality,
                  position,
                  date_of_birth,
                  preferredFoot,
                } = data;

                // Define the variables to compare
                const variablesToCompare = [
                  firstName.toLowerCase() === userData?.firstName.toLowerCase(),
                  surName.toLowerCase() === userData?.surname.toLowerCase(),
                  Nationality.toLowerCase() ===
                    userData?.Nationality.toLowerCase(),
                  position.toLowerCase() ===
                    userData?.PlayerPosition.toLowerCase(),
                  date_of_birth === userData?.DateOfBirth,
                  data.height === userData?.height,
                  preferredFoot === userData?.preferredFoot,
                  // Add more variables to compare as needed
                ];

                // Count the number of matches
                const numberOfMatches = variablesToCompare.filter(
                  (match) => match
                ).length;

                // Check if at least 4 variables match
                return numberOfMatches >= 4;
              }
            );

            if (ExistingPlayerProfile.length > 0) {
              triggerWarningAlertModal(
                "Oops, our system detected a possible existing player in our database. Please recheck player details. If it happens that he doesn't exist, you can send an account verification request, and our support team will verify and be with you shortly. Thank you."
              );
            } else {
              var givenDate = moment(userData?.DateOfBirth, "MMMM D, YYYY");
              var currentDate = moment();
              var hasBirthdayOccurred = currentDate.isSameOrAfter(
                moment(givenDate).year(currentDate.year())
              );
              var ageDifference =
                currentDate.year() -
                givenDate.year() -
                (hasBirthdayOccurred ? 0 : 1);
              var currentAge = Math.round(ageDifference);
              // trigger handleGoogleLogin
              // await handleGoogleLogin(auth, email, password);
              // // Set the document in the database
              alert("triggered");
              // invoke google createUserWithEmailAndPassword method
              await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                  const user = userCredential.user;
                  // save credentials
                  dispatch(setCredentials(user.uid));
                  // set login status to true
                  dispatch(setLoginStatus(true));

                  await setDoc(doc(db, `players_database`, user.uid), {
                    id: user.uid,
                    Account_creator_id: user.uid,
                    player_profile_image: "",
                    firstName: userData?.firstName,
                    surName: userData?.surname,
                    CountryCode: userData?.CountryCode,
                    Nationality: userData?.Nationality,
                    dateCreated: serverTimestamp(),
                    Age: currentAge,
                    position: userData?.PlayerPosition,
                    date_of_birth: userData?.DateOfBirth,
                    jerseyNumber: "",
                    clubName: "Free agent",
                    preferredFoot: userData?.preferredFoot,
                    height: userData?.height,
                    marketValue: "",
                    contractStartDate: "",
                    contractEndDate: "",
                    Social_media: [
                      {
                        Facebook: `https://web.facebook.com/`,
                        Instagram: `https://www.instagram.com//`,
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
                  });
                  // alert("pdb");
                  await setDoc(doc(db, `users_db`, user.uid), {
                    ...userData,
                    role: roleSelected,
                    dateCreated: serverTimestamp(),
                    accountId: user.uid,
                    isVisible: true,
                  });

                  dispatch(setCompletedSteps({}));
                  dispatch(setRoleSelected(""));
                  dispatch(
                    setUserSignUpData({
                      firstname: "",
                      surname: "",
                      DateOfBirth: "",
                      organization: "",
                      phoneNumber: "",
                      email: "",
                      Nationality: "",
                      DOB: "",
                      password: "",
                      subscriptionPackage: "",
                      paymentType: "",
                      paymentDetails: {},
                    })
                  );

                  await navigate("/login");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(
                    "errorCode",
                    errorCode,
                    "errorMessage",
                    errorMessage
                  );

                  // consitions
                  if (errorCode == "auth/email-already-in-use") {
                    triggerWarningAlertModal("G-Account Exists");
                  }
                });
            }
          } else {
            // invoke google createUserWithEmailAndPassword method
            await createUserWithEmailAndPassword(auth, email, password)
              .then(async (userCredential) => {
                const user = userCredential.user;
                // save credentials
                dispatch(setCredentials(user.uid));
                // alert(user.uid);
                // set login status to true
                dispatch(setLoginStatus(true));

                await setDoc(doc(db, `users_db`, user.uid), {
                  ...userData,
                  role: roleSelected,
                  dateCreated: serverTimestamp(),
                  accountId: user.uid,
                  isVisible: true,
                  playersInPossession: [],
                });
                // alert("Other Accs");

                dispatch(setCompletedSteps({}));
                dispatch(setRoleSelected(""));
                dispatch(
                  setUserSignUpData({
                    firstname: "",
                    surname: "",
                    DateOfBirth: "",
                    organization: "",
                    phoneNumber: "",
                    email: "",
                    Nationality: "",
                    DOB: "",
                    password: "",
                    subscriptionPackage: "",
                    paymentType: "",
                    paymentDetails: {},
                  })
                );
                await navigate("/login");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(
                  "errorCode",
                  errorCode,
                  "errorMessage",
                  errorMessage
                );

                // consitions
                if (errorCode == "auth/email-already-in-use") {
                  triggerWarningAlertModal("G-Account Exists");
                }
              });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      alert("Error in createing player database");
      // Handle the error as needed
    }
  };

  /// RESETTING THE THEME WHEN YOU  Navigate to this  page -- this is a temporal solution to the text field label color chnage
  useEffect(() => {
    dispatch(setThemeProviderToLightMode());
  }, []);

  return (
    <div
      className="md:w-[100%] md:h-[100%] md:flex md:flex-row     sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col"
      style={{
        // width: "100%",
        // height: "100%",
        // display: "flex",
        padding: "0px 6vw",
        overflowY: "scroll",
      }}>
      {/*MEMEBERSHIP PLAN HEADER and USER DETAILS SUMMARY */}

      <div
        className="md:flex md:flex-col      sm:flex sm:flex-col"
        style={{
          flex: ".7",
          // background: "yellow",
          display: "flex",
          flexDirection: "column",
        }}>
        {/* MEMBERSHIP PLAN HEADER CARD */}
        <div
          style={{
            flex: "0.3",
            display: "flex",
            paddingLeft: "0%",
          }}>
          {/* IMAGE AREA */}
          <div
            style={{
              flex: "0.3",

              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}>
            {/* 

 */}

            {roleSelected === "Player" ? (
              <img src="/PlayerBlue.png" width="70px" height="80px" />
            ) : roleSelected === "Agent" ? (
              <img src="/AgentBlue.png" width="100px" />
            ) : roleSelected === "Coach" ? (
              <img src="/CoachBlue.png" width="100px" />
            ) : roleSelected === "Scout" ? (
              <img src="/ScoutBlue.png" width="100px" />
            ) : roleSelected === "Club" ? (
              <img src="/ClubIconBlue.png" width="100px" />
            ) : (
              <img alt="No Role selected" width="100px" />
            )}
          </div>
          {/* FREE TRIAL HEADER AND CHANGE MEMBERSHIP OPTION AREA */}
          <div
            className="md:flex md:flex-row    sm:flex sm:flex-col"
            style={{
              flex: "0.7",
              display: "flex",
              // justifyContent: "flex-start",
              alignItems: "center",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}>
              <div>
                <h5 style={{ fontWeight: "bold" }}>
                  Start your free trial for 30 <br /> days
                </h5>
                <h5 style={{ fontWeight: "bold" }}>{roleSelected}</h5>
                <small>
                  Doesn't suit you ?{" "}
                  <span
                    style={{ color: "#5585FE", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/create-account/freetrial");
                    }}>
                    change your membership
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* USER DETAILS SUMMARY  */}
        <div
          className="md:flex md:flex-row      sm:flex sm:flex-col"
          style={{
            flex: "0.7",
            padding: "1vh 3vw",
            // background: "green",
            // display: "flex",
          }}>
          {/* // PADDING CONTAINER */}
          <div style={{ flex: ".6", paddingLeft: "8vw" }}>
            <h5 style={{ marginTop: "1vh" }}>
              User details{" "}
              <span
                style={{
                  color: "#5585FE",
                  fontSize: ".7em",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/create-account/user-form");
                }}>
                &nbsp; edit
              </span>{" "}
            </h5>

            {/* User FORM */}
            <div>
              {roleSelected === "Player" ? (
                <ul
                  style={{
                    fontSize: ".9em",
                    listStyleType: "disc",
                    color: "#9FA4B1",
                    fontWeight: "bolder",
                  }}>
                  <li>
                    First name:{" "}
                    <span style={{ color: "black" }}> {firstName} </span>{" "}
                  </li>
                  <li>
                    Surname: <span style={{ color: "black" }}> {surname} </span>{" "}
                  </li>
                  <li>
                    Date of birth:{" "}
                    <span style={{ color: "black" }}> {DateOfBirth} </span>{" "}
                  </li>
                  <li>
                    Email: <span style={{ color: "black" }}> {email} </span>{" "}
                  </li>
                  <li>
                    Phone number:
                    <span style={{ color: "black" }}> {phoneNumber}</span>{" "}
                  </li>
                  <li>
                    Nationality:{" "}
                    <span style={{ color: "black" }}>
                      {" "}
                      {Nationality} {userData?.CountryCode}{" "}
                    </span>{" "}
                  </li>

                  <li>
                    Position:
                    <span style={{ color: "black" }}>
                      {userData?.PlayerPosition}
                    </span>{" "}
                  </li>
                  <li>
                    Preferred foot:{" "}
                    <span style={{ color: "black" }}>
                      {" "}
                      {userData?.preferredFoot}{" "}
                    </span>{" "}
                  </li>
                  <li>
                    Height:{" "}
                    <span style={{ color: "black" }}>
                      {" "}
                      {userData?.height}m{" "}
                    </span>{" "}
                  </li>
                </ul>
              ) : (
                <ul
                  style={{
                    fontSize: ".9em",
                    listStyleType: "disc",
                    color: "#9FA4B1",
                    fontWeight: "bolder",
                  }}>
                  <li>
                    First name:{" "}
                    <span style={{ color: "black" }}> {firstName} </span>{" "}
                  </li>
                  <li>
                    Surname: <span style={{ color: "black" }}> {surname} </span>{" "}
                  </li>
                  <li>
                    Date of birth:{" "}
                    <span style={{ color: "black" }}> {DateOfBirth} </span>{" "}
                  </li>
                  <li>
                    Email: <span style={{ color: "black" }}> {email} </span>{" "}
                  </li>
                  <li>
                    Phone number:
                    <span style={{ color: "black" }}> {phoneNumber}</span>{" "}
                  </li>
                  <li>
                    Nationality:{" "}
                    <span style={{ color: "black" }}> {Nationality} </span>{" "}
                  </li>
                  <li>
                    {roleSelected === "Player" || roleSelected === "Club"
                      ? "Club Name"
                      : "Organisation"}
                    <span style={{ color: "black" }}>
                      {" "}
                      {roleSelected === "Player" || roleSelected === "Club"
                        ? userData?.club
                        : userData?.organization}{" "}
                    </span>{" "}
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div style={{ flex: ".4" }}>
            <h5 style={{ marginTop: "1vh" }}>Add payment</h5>

            <PaymentModeSelect paymentType={extractPaymentTypeSelected} />
          </div>
        </div>
      </div>
      {/* // INVOICE SUMMARY , PAYMENT MODE , TERMS AND CONDITION */}

      <div style={{ flex: ".3" }}>
        {/* ORDER CONFIRMATION CARD */}

        <h5>Terms and conditions</h5>

        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={(e) => {
                setAgreement(e.target.checked);
              }}
            />
          }
          label={
            <div style={{ fontSize: ".8em" }}>
              {" "}
              I agree with the{" "}
              <span style={{ color: "#5585FE" }}>
                terms and conditions
              </span>{" "}
            </div>
          }
        />
        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={(e) => {
                setPrivacy(e.target.checked);
              }}
            />
          }
          label={
            <div style={{ fontSize: ".8em" }}>
              {" "}
              I accept Talent Match's
              <span style={{ color: "#5585FE" }}> privacy policy</span>{" "}
            </div>
          }
        />
        <Card
          className="md:w-[84%] md:h-[70%]   sm:w-[100%] sm:h-[100%]"
          sx={{
            // width: "84%",
            // height: "68%",
            padding: ".5vw",
            marginTop: "3vh",
          }}>
          <h6 style={{ fontWeight: "bolder" }}>Package Summary</h6>

          <ul style={{ width: "90%", fontSize: ".8em" }}>
            {" "}
            <li>
              {roleSelected} membership{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>$0</span>{" "}
            </li>
            <li>
              {userData.subscriptionPackage}{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>
                {userData.subscriptionPackage === "Starter Pack"
                  ? "$40"
                  : userData.subscriptionPackage === "Premium Pack"
                  ? "$100"
                  : ""}
              </span>{" "}
            </li>
            <li>
              Subscription total{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>
                {userData.subscriptionPackage === "Starter Pack"
                  ? "$40"
                  : userData.subscriptionPackage === "Premium Pack"
                  ? "$100"
                  : ""}
              </span>{" "}
            </li>
            <li>
              Tax{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>$0</span>{" "}
            </li>
            <li>
              Discount{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>$0</span>{" "}
            </li>
            <li style={{ fontSize: "1.4em" }}>
              Total{" "}
              <span style={{ float: "right", fontWeight: "bolder" }}>
                {" "}
                {userData.subscriptionPackage === "Starter Pack"
                  ? "$40"
                  : userData.subscriptionPackage === "Premium Pack"
                  ? "$100"
                  : ""}
              </span>{" "}
            </li>{" "}
          </ul>

          {/* div to handle Click of start free trial */}
          <div onClick={handleStartFreeTrial}>
            <BasicButton
              style={{ width: "90%", marginLeft: "5%" }}
              innerText="Start Trial"></BasicButton>
          </div>
          <span
            style={{
              fontSize: ".7em",
              fontStyle: "italic",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}>
            {" "}
            You will be automatically charged or prompted to pay on{" "}
            {oneMonthLater.format("MMMM Do YYYY, h:mm a")} after trial end{" "}
          </span>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmDetails;
