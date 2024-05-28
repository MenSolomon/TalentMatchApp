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
import FormControl from "@mui/material/FormControl";
import {
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import imageBackground from "../assets/images/FootballLogo.jpg";
import facebookLogo from "../assets/images/facebookImage.svg";
import GoogleLogo from "../assets/images/google.svg";
import { Link, useNavigate } from "react-router-dom";
import WorldMaps from "../components/WorldMap";
import logoImage from "../assets/images/AppLogoBlue.png";
import { useDispatch, useSelector } from "react-redux";
import { selectTempUsersDatabase } from "../statemanager/slices/TempDatabaseSlice";
import { useForm } from "react-hook-form";
import {
  setLoginStatus,
  setUserDetailsObject,
} from "../statemanager/slices/LoginUserDataSlice";
import { selectUsersDatabase } from "../statemanager/slices/DatabaseSlice";
import WarningAlertModal from "../components/Modals/WarningAlertModal";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { setUserSavedProfiles } from "../statemanager/slices/SavedProfileSlice";
import { setUserNotifications } from "../statemanager/slices/NofiticationsSlice";
import { setPlayerSelectedByClubOrScoutInPlayerManagement } from "../statemanager/slices/PlayersInAgencySlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../statemanager/slices/OtherComponentStatesSlice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  // Settings for password input
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  // forgot password hover state
  const [fpHover, setFpHover] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iconColor = { color: "white" };

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const AllUsersDatabase = useSelector(selectUsersDatabase);
  // isLoading state
  const [isLoading, setIsLoading] = useState("");
  const resetErrorMessage = () => {
    setErrorMessage("");
  };

  const [submitClicked, setSubmitClicked] = useState(false);

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  // const onSubmit = async (formData) => {
  //   // use google signinwithemailandpassword to get the current userid
  //   signInWithEmailAndPassword(auth, formData.email, formData.password)
  //     .then(async (userCredential) => {
  //       setIsLoading(true);
  //       // Signed in
  //       const user = userCredential.user;
  //       const accountId = user.uid;
  //       // get userDetails
  //       const userInfoRef = doc(db, `users_db/${accountId}`);
  //       // alert(accountId);

  //       const userInfoSnap = await getDoc(userInfoRef);
  //       // alert(userInfoSnap?.data()?.Nationality);
  //       // Navigate("/");
  //       if (user) {
  //         dispatch(setLoginStatus(true));
  //         dispatch(
  //           setUserDetailsObject({
  //             Nationality: userInfoSnap.data().Nationality,
  //             email: userInfoSnap.data().email,
  //             CountryCode: userInfoSnap.data().CountryCode,
  //             stripeLink:
  //               userInfoSnap?.data()?.stripeLink === undefined
  //                 ? ""
  //                 : userInfoSnap?.data()?.stripeLink,
  //             DateOfBirth: userInfoSnap.data().DateOfBirth,
  //             organization: userInfoSnap.data().organization,
  //             phoneNumber: userInfoSnap.data().phoneNumber,
  //             subscriptionPackage: userInfoSnap.data().subscriptionPackage,
  //             surname: userInfoSnap.data().surname,
  //             profileImage:
  //               userInfoSnap.data().profileImage === undefined
  //                 ? ""
  //                 : userInfoSnap.data().profileImage,
  //             // paymentDetails: {
  //             //   phoneNumber: userInfoSnap.data().paymentDetails.phoneNumber,
  //             // },
  //             accountId: userInfoSnap.data().accountId,
  //             firstName: userInfoSnap.data().firstName,
  //             role: userInfoSnap.data().role,
  //             dateCreated: {
  //               seconds: userInfoSnap.data().dateCreated.seconds,
  //               nanoseconds: userInfoSnap.data().dateCreated.nanoseconds,
  //             },
  //             stripeId: userInfoSnap.data().stripeId,
  //             subscriptionPrice: userInfoSnap.data().subscriptionPrice,
  //             playersInPossession: userInfoSnap.data().playersInPossession,
  //             Connections:
  //               userInfoSnap.data()?.Connections === undefined
  //                 ? []
  //                 : userInfoSnap.data()?.Connections,
  //             AgentandScoutConnections:
  //               userInfoSnap.data()?.AgentandScoutConnections === undefined
  //                 ? []
  //                 : userInfoSnap.data()?.AgentandScoutConnections,
  //           })
  //         );

  //         const savedProfileSubCollectionRef = collection(
  //           db,
  //           `users_db/${accountId}/SavedProfiles`
  //         );

  //         const q = query(savedProfileSubCollectionRef);
  //         await onSnapshot(q, (querySnapshot) => {
  //           const profileItems = [];
  //           querySnapshot.forEach((doc) => {
  //             profileItems.push(doc.data());
  //           });

  //           dispatch(setUserSavedProfiles(profileItems));

  //           // return () => {
  //           //   allNotifications();
  //           // };
  //         });

  //         const notificationsSubCollectionRef = collection(
  //           db,
  //           `users_db/${accountId}/Notifications`
  //         );
  //         // user.uid
  //         const qNot = query(notificationsSubCollectionRef);
  //         await onSnapshot(qNot, async (querySnapshot) => {
  //           const notificationItems = [];
  //           querySnapshot.forEach((doc) => {
  //             notificationItems.push(doc.data());
  //           });

  //           dispatch(setUserNotifications(notificationItems));
  //           // const citiesRef = collection(db, "cities");

  //           // const q = query(citiesRef, where("capital", "==", true));

  //           // const docRef = doc(db, "players_database", accountId);

  //           // ****** TURNED OFF THIS VIDEO QUERY BECAUSE THE PLAYERVERSION VIDEOS SCREEN  RETRIEVES THE VIDEO THERE

  //           // setIsLoading(false);
  //         });

  //         Navigate("/");
  //       }

  //       // ...
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // console.error("Error code:", errorCode);
  //       // console.error("Error message:", errorMessage);
  //       switch (errorCode) {
  //         case "auth/wrong-password":
  //           triggerWarningAlertModal("The password you entered was wrong");
  //           break;
  //         case "auth/missing-password":
  //           triggerWarningAlertModal("Please enter a password");
  //           break;
  //         case "auth/network=request-failed":
  //           triggerWarningAlertModal("Please check your internet connectivity");
  //           break;
  //         case "auth/user-not-found":
  //           triggerWarningAlertModal("Account doesn't exist");
  //           break;
  //         case "auth/user-disabled":
  //           triggerWarningAlertModal("Account has been disabled");
  //           break;
  //         case "auth/invalid-email":
  //           triggerWarningAlertModal("Please enter an email");
  //         case "auth/invalid-login-credentials":
  //           triggerWarningAlertModal(
  //             "This account does not exist or your credentials are wrong"
  //           );
  //           break;
  //         default:
  //       }
  //     });
  // };

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const accountId = user.uid;

      if (user) {
        localStorage.setItem("LoggedAccountId", accountId);

        dispatch(setLoginStatus(true));
        const userInfoRef = doc(db, `users_db/${accountId}`);
        const userInfoSnap = await getDoc(userInfoRef);

        dispatch(
          setUserDetailsObject({
            Nationality: userInfoSnap.data().Nationality,
            email: userInfoSnap.data().email,
            CountryCode: userInfoSnap.data().CountryCode,
            stripeLink:
              userInfoSnap?.data()?.stripeLink === undefined
                ? ""
                : userInfoSnap?.data()?.stripeLink,
            DateOfBirth: userInfoSnap.data().DateOfBirth,
            organization: userInfoSnap.data().organization,
            phoneNumber: userInfoSnap.data().phoneNumber,
            subscriptionPackage: userInfoSnap.data().subscriptionPackage,
            surname: userInfoSnap.data().surname,
            profileImage:
              userInfoSnap.data().profileImage === undefined
                ? ""
                : userInfoSnap.data().profileImage,
            // paymentDetails: {
            //   phoneNumber: userInfoSnap.data().paymentDetails.phoneNumber,
            // },
            accountId: accountId,
            firstName: userInfoSnap.data().firstName,
            role: userInfoSnap.data().role,
            dateCreated: {
              seconds: userInfoSnap.data().dateCreated.seconds,
              nanoseconds: userInfoSnap.data().dateCreated.nanoseconds,
            },
            stripeId: userInfoSnap.data().stripeId,
            subscriptionPrice: userInfoSnap.data().subscriptionPrice,
            playersInPossession: userInfoSnap.data().playersInPossession,
            Connections:
              userInfoSnap.data()?.Connections === undefined
                ? []
                : userInfoSnap.data()?.Connections,
            AgentandScoutConnections:
              userInfoSnap.data()?.AgentandScoutConnections === undefined
                ? []
                : userInfoSnap.data()?.AgentandScoutConnections,
          })
        );
        const savedProfileSubCollectionRef = collection(
          db,
          `users_db/${accountId}/SavedProfiles`
        );
        const notificationsSubCollectionRef = collection(
          db,
          `users_db/${accountId}/Notifications`
        );

        const [profileSnapshot, notificationsSnapshot] = await Promise.all([
          getDocs(savedProfileSubCollectionRef),
          getDocs(notificationsSubCollectionRef),
        ]);

        const profileItems = profileSnapshot.docs.map((doc) => doc.data());
        const notificationItems = notificationsSnapshot.docs.map((doc) =>
          doc.data()
        );

        dispatch(setUserSavedProfiles(profileItems));
        dispatch(setUserNotifications(notificationItems));

        Navigate("/"); // Navigate after all data is fetched and set
      }
    } catch (error) {
      setIsLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.error("Error code:", errorCode);
      // console.error("Error message:", errorMessage);
      switch (errorCode) {
        case "auth/wrong-password":
          triggerWarningAlertModal("The password you entered was wrong");
          break;
        case "auth/missing-password":
          triggerWarningAlertModal("Please enter a password");
          break;
        case "auth/network=request-failed":
          triggerWarningAlertModal("Please check your internet connectivity");
          break;
        case "auth/user-not-found":
          triggerWarningAlertModal("Account doesn't exist");
          break;
        case "auth/user-disabled":
          triggerWarningAlertModal("Account has been disabled");
          break;
        case "auth/invalid-email":
          triggerWarningAlertModal("Please enter an email");
          break;
        case "auth/invalid-login-credentials":
          triggerWarningAlertModal(
            "This account does not exist or your credentials are wrong"
          );
          break;
        default:
      }
    }
  };

  // const onSubmit = (formData) => {
  //   let isSubmit = true
  //   signInWithEmailAndPassword(auth, formData.email, formData.password)
  //     .then(async (userCredential) => {
  //       setIsLoading(true);
  //       const user = userCredential.user;
  //       const accountId = user.uid;

  //       // Fetch user details
  //       const userInfoRef = doc(db, `users_db/${accountId}`);
  //       const userInfoSnap = await getDoc(userInfoRef);

  //       if (user) {
  //         dispatch(setLoginStatus(true));
  //         dispatch(
  //           setUserDetailsObject({
  //             Nationality: userInfoSnap.data().Nationality,
  //             email: userInfoSnap.data().email,
  //             CountryCode: userInfoSnap.data().CountryCode,
  //             stripeLink:
  //               userInfoSnap?.data()?.stripeLink === undefined
  //                 ? ""
  //                 : userInfoSnap?.data()?.stripeLink,
  //             DateOfBirth: userInfoSnap.data().DateOfBirth,
  //             organization: userInfoSnap.data().organization,
  //             phoneNumber: userInfoSnap.data().phoneNumber,
  //             subscriptionPackage: userInfoSnap.data().subscriptionPackage,
  //             surname: userInfoSnap.data().surname,
  //             profileImage:
  //               userInfoSnap.data().profileImage === undefined
  //                 ? ""
  //                 : userInfoSnap.data().profileImage,
  //             // paymentDetails: {
  //             //   phoneNumber: userInfoSnap.data().paymentDetails.phoneNumber,
  //             // },
  //             accountId: userInfoSnap.data().accountId,
  //             firstName: userInfoSnap.data().firstName,
  //             role: userInfoSnap.data().role,
  //             dateCreated: {
  //               seconds: userInfoSnap.data().dateCreated.seconds,
  //               nanoseconds: userInfoSnap.data().dateCreated.nanoseconds,
  //             },
  //             stripeId: userInfoSnap.data().stripeId,
  //             subscriptionPrice: userInfoSnap.data().subscriptionPrice,
  //             playersInPossession: userInfoSnap.data().playersInPossession,
  //             Connections:
  //               userInfoSnap.data()?.Connections === undefined
  //                 ? []
  //                 : userInfoSnap.data()?.Connections,
  //             AgentandScoutConnections:
  //               userInfoSnap.data()?.AgentandScoutConnections === undefined
  //                 ? []
  //                 : userInfoSnap.data()?.AgentandScoutConnections,
  //           })
  //         );
  //         // Subscribe to SavedProfiles collection
  //         const savedProfileSubCollectionRef = collection(
  //           db,
  //           `users_db/${accountId}/SavedProfiles`
  //         );
  //         const profileListener = onSnapshot(
  //           savedProfileSubCollectionRef,
  //           (querySnapshot) => {
  //             const profileItems = [];
  //             querySnapshot.forEach((doc) => {
  //               profileItems.push(doc.data());
  //             });
  //             dispatch(setUserSavedProfiles(profileItems));
  //           }
  //         );

  //         // Subscribe to Notifications collection
  //         const notificationsSubCollectionRef = collection(
  //           db,
  //           `users_db/${accountId}/Notifications`
  //         );
  //         const notificationsListener = onSnapshot(
  //           notificationsSubCollectionRef,
  //           (querySnapshot) => {
  //             const notificationItems = [];
  //             querySnapshot.forEach((doc) => {
  //               notificationItems.push(doc.data());
  //             });
  //             dispatch(setUserNotifications(notificationItems));
  //           }
  //         );

  //         // Wait for both listeners to complete before navigating to "/"
  //         Promise.all([profileListener, notificationsListener])
  //           .then(() => {
  //             setIsLoading(false);

  //             Navigate("/");
  //           })
  //           .catch((error) => {
  //             setIsLoading(false);
  //             console.error("Error:", error);
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       switch (
  //         errorCode
  //         // Handle different error codes
  //       ) {
  //       }
  //     });
  // };

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
        // display: "flex",
        // flexDirection: "column",
        // // padding: "2vw",
        // paddingLeft: "3vw",
        // padding: "3vw",
        // paddingTop: "1.5vh",

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
        // style={{ flex: ".9", display: "flex" }}
      >
        {/* CREATE ACCOUNT SECTION */}
        <div
          style={{ paddingTop: "6vh" }}
          className="md:basis-[45%] md:w-[100%] md:flex-shrink-0   sm:basis-[100%] sm:w-[100%]  sm:flex-shrink-0 "
        >
          <h1
            className="sm:block sm:text-[3em]  md:block md:text-[3.3em] "
            //  style={{ fontSize: "3.3em" }}
          >
            Welcome Back{" "}
            {/* <span className="md:hidden lg:block sm:block" style={{ fontSize: "2em", color: "blue" }}>.</span>{" "} */}
          </h1>
          <div>
            <div className="sm:pt-[5%] md:pt-[0%]">
              <h5>
                Dont have an account?{" "}
                <span
                  style={{ color: "#5585FE", cursor: "pointer" }}
                  onClick={() => {
                    Navigate("/create-account/freetrial");
                  }}
                >
                  Choose a plan
                </span>{" "}
              </h5>
            </div>

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
                {/* Password */}

                <FormControl
                  className="sm:w-[100%] md:w-[80%]"
                  sx={{ marginBottom: "3vh" }}
                  variant="outlined"
                  focused
                  color="info"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    {...register("password", { required: true })}
                    required
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff style={iconColor} />
                          ) : (
                            <Visibility style={iconColor} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />

                  <div style={{ color: "red" }}>{errorMessage}</div>
                </FormControl>

                {/* Login ACCOUNT */}

                <div
                  className="mb-3"
                  onMouseEnter={() => setFpHover(true)}
                  onMouseLeave={() => setFpHover(false)}
                >
                  <Link to={"/forgotpassword"}>
                    <Typography color={fpHover ? null : "white"} variant="h6">
                      Forgot Password
                    </Typography>
                  </Link>
                </div>

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
                      }}
                    >
                      Login
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* SOCIAL MEDIA SECTIONS / EMPTY SECTIOn */}
        <div
          className="md:basis-[55%] md:flex md:flex-col-reverse md:w-[100%] md:flex-shrink-0   sm:hidden"
          style={
            {
              // flex: ".55",
              // display: "flex",
              // flexDirection: "column-reverse",
            }
          }
        >
          {/* //ICON AREA */}
          <div style={{ flex: ".2" }}>
            {" "}
            <div style={{ float: "right" }}>
              <ul>
                <li>
                  <Instagram sx={{ color: "white" }} />
                </li>
                <li>
                  <Facebook sx={{ color: "white" }} />
                </li>
                <li>
                  <Twitter sx={{ color: "white" }} />
                </li>
              </ul>{" "}
            </div>{" "}
          </div>
          <div style={{ flex: ".8" }}>
            <h4 style={{ marginTop: "9vh", marginBottom: "5vh" }}>
              Get matched with player accros the globe
            </h4>
            <WorldMaps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
