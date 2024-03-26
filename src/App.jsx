import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./screens/HomePage";
import PlayerDetails from "./screens/PlayerDetails";
import ViewAllScreen from "./screens/ViewAllScreen";
import MotherComponent from "./MotherComponent";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Community from "./screens/Community";
import PlayerComparison from "./screens/PlayerComparison";
import News from "./screens/News";
import MembershipPlanPage from "./screens/MembershipPlanPage";
import FreeTrial from "./screens/FreeTrial";
import SubscribeTrial from "./screens/SubscribeTrial";
import ConfirmDetails from "./screens/ConfirmDetails";
import SignupFormsMotherComponent from "./screens/SignupFormsMotherComponent";
import CreateAccount from "./screens/CreateAccount";
import PlayerVersionMotherComponent from "./PlayerVersion/src/PlayerVersionMotherComponent";
import PlayerVersionDashboard from "./PlayerVersion/src/screens/PlayerVersionDashboard";
import PlayerVersionVideos from "./PlayerVersion/src/screens/PlayerVersionVideos";
import PlayerVersionStatistics from "./PlayerVersion/src/screens/PlayerVersionStatistics";
import PlayerVersionFavorites from "./PlayerVersion/src/screens/PlayerVersionFavorites";
import PlayerVersionAnalytics from "./PlayerVersion/src/screens/PlayerVersionAnalytics";
import PlayerVersionInbox from "./PlayerVersion/src/screens/PlayerVersionInbox";
import CoachAgentScoutVersionMotherComponent from "./CoachAgentScoutVersion/src/CoachAgentScoutVersionMotherComponent";
import CoachAgentScoutVersionDashboard from "./CoachAgentScoutVersion/src/screens/CoachAgentScoutVersionDashboard";
import CoachAgentScoutVersionPlayers from "./CoachAgentScoutVersion/src/screens/CoachAgentScoutVersionPlayers";
import CoachAgentScoutVersionStatistics from "./CoachAgentScoutVersion/src/screens/CoachAgentScoutVersionStatistics";
import CoachAgentScoutVersionFavorites from "./CoachAgentScoutVersion/src/screens/CoachAgentScoutVersionFavorites";
import CoachAgentScoutVersionInbox from "./CoachAgentScoutVersion/src/screens/CoachAgentScoutVersionInbox";
import CoachAgentScoutVersionAnalytics from "./CoachAgentScoutVersion/src/screens/CoachAgentScoutVersionAnalytics";
import CoachAgentScoutVersionPlayerManagement from "./CoachAgentScoutVersion/src/screens/CoachAgentScoutVersionPlayerManagement";
import PrivateRoutes from "./utilities/PrivateRoute";
import Support from "./screens/Support";
import SupportSettings from "./screens/SupportSettings";
import WarningAlertModal from "./components/Modals/WarningAlertModal";
import {
  createTheme,
  ThemeProvider,
  Button,
  CssBaseline,
  Alert,
} from "@mui/material";
import Error404 from "./screens/Error404";
import ErrorPageNotFound from "./screens/ErrorPageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeProviderObject } from "./statemanager/slices/ThemeProviderSlice";
import {
  selectIsSubscriptionActive,
  selectUserDetailsObject,
  setIsSubscriptionActive,
  setNextBillingDate,
  setSubscriptionFeatures,
} from "./statemanager/slices/LoginUserDataSlice";
import { useEffect, useState } from "react";
import {
  setCurrentBrowserSize,
  setCurrentScreenSize,
} from "./statemanager/slices/OtherComponentStatesSlice";
import BasicBackdrop from "./components/Backdrops/BasicBackdrop";
import {
  setInternetConnectionOffline,
  setInternetConnectionOnline,
} from "./statemanager/slices/InternetActivitiesSlice";
import ContactSupportModal from "./components/Modals/ContactSupportModal";
import { selectUsersDatabase } from "./statemanager/slices/DatabaseSlice";
import Favorites from "./screens/Favorites";
import Settings from "./screens/Settings";
import PlanItem from "./screens/PlanItem";
import ChangeSubscriptionPackagePage from "./screens/ChangeSubscriptionPackagePage";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./Firebase/Firebase";
import { setPriceID } from "./statemanager/slices/SignupStepperSlice";
import CoachAgentScoutVersionConnetions from "./CoachAgentScoutVersion/src/screens/CoachAgentScoutVersionConnections";
import PlayerVersionConnections from "./PlayerVersion/src/screens/PlayerVersionConnections";

const App = () => {
  const themeProviderObject = useSelector(selectThemeProviderObject);
  const usersDatabase = useSelector(selectUsersDatabase);

  const { primaryTextColor } = themeProviderObject;

  const theme = createTheme({
    palette: {
      text: {
        // primary: "#000000",
        // alternate : `${primaryTextColor}`, // Set your desired text color
        // secondary: "#000000",
      },
    },
    typography: {
      fontFamily: "Nunito, sans-serif",
    },

    overrides: {
      MuiStepLabel: {
        label: {
          "&.Mui-completed": {
            color: "black", // Set the color for completed StepLabel to black
          },
        },
      },
      MuiFormControl: {
        root: {
          "&.MuiTextField-root": {
            color: "black", // Set your desired text color for MuiTextField
            // Add other styles as needed
          },
        },
      },
      MuiSvgIcon: {
        root: {
          color: "black", // Set your desired color for MuiSvgIcon
          // Add other styles as needed
        },
      },
      MuiInputBase: {
        input: {
          "&.MuiOutlinedInput-input": {
            color: "black", // Set your desired text color for MuiInputBase input
            // Add other styles as needed
          },
        },
      },
      MuiFormLabel: {
        root: {
          "& .MuiFormLabel-root-MuiInputLabel-root": {
            color: "black", // Set your desired text color for MuiFormLabel
            background: "black",
          },
        },
      },
      MuiInputLabel: {
        root: {
          "&.Mui-focused": {
            color: "black", // Set your desired text color for focused MuiInputLabel
            // Add other styles as needed
          },
          color: "black",
        },
      },
      MuiAutocomplete: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
            // Add other styles as needed
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
            // Add other styles as needed
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
            // Add other styles as needed
          },
          "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
            color: "black", // Set your desired text color for MuiAutocomplete input
            // Add other styles as needed
          },
        },
      },
      MuiSelect: {
        select: {
          "& .MuiInputBase-input.MuiOutlinedInput-input": {
            color: "black", // Set your desired text color for MuiSelect input
            // Add other styles as needed
          },
        },
        outlined: {
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: "black",
            // Add other styles as needed
          },
          "&$focused $notchedOutline": {
            borderColor: "blue",
            // Add other styles as needed
          },
        },
        notchedOutline: {
          borderColor: "yellow",
          // Add other styles as needed
        },
      },
      MuiTable: {
        root: {
          color: "black", // Set your desired text color
        },
      },
      MuiTableCell: {
        root: {
          color: "black", // Set your desired text color for MuiTableCell
          // Add other styles as needed
        },
      },
      "-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
        color: "purple", // Set your desired text color for focused MuiFormLabel with MuiInputLabel
        // Add other styles as needed
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover $notchedOutline": {
              borderColor: "green",
              // Set your desired color for hover
            },
            "& .MuiInputBase-input.MuiOutlinedInput-input:focus": {
              background: "white",
              color: "black",
            },
            "&.Mui-focused $notchedOutline": {
              background: "white", // Set your desired color for focus
              color: "black",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: `${primaryTextColor}`, // Set your desired label color
          },
        },
      },
    },
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname, search, hash } = location;
  const userLoginObject = useSelector(selectUserDetailsObject);
  const isSubscriptionActive = useSelector(selectIsSubscriptionActive);

  // this use effect is to redirect studio for the desired role on user change
  useEffect(() => {
    if (
      userLoginObject?.role === "Player" &&
      pathname.includes("multiStudio") === true
    ) {
      navigate("/studio/dashboard");
    } else if (
      userLoginObject?.role === "Club" ||
      userLoginObject?.role === "Scout" ||
      userLoginObject?.role === "Agent" ||
      userLoginObject?.role === "Coach"
    ) {
      if (pathname.includes("/studio/") === true) {
        navigate("/multiStudio/dashboard");
      }
    }
  }, [userLoginObject]);

  const [screenSize, setScreenSize] = useState({
    width: window.screen.width,
    height: window.screen.height,
  });

  const [browserSize, setBrowserSize] = useState({
    width:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    height:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.screen.width,
        height: window.screen.height,
      });
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  // GETTING THE SIZE OF THE WINDOW

  useEffect(() => {
    const handleResize = () => {
      setBrowserSize({
        width:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        height:
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight,
      });
    };

    console.log(browserSize, "Deava");
    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect to handle setting browser size
  useEffect(() => {
    console.log(`${browserSize.width} ,width`, `${browserSize.height} ,height`);

    const { width, height } = browserSize;

    dispatch(setCurrentBrowserSize({ width, height }));
  }, [browserSize]);

  /// Useeffect to handle screen size

  useEffect(() => {
    console.log(`${screenSize.width} ,width`, `${screenSize.height} ,height`);

    const { width, height } = screenSize;

    dispatch(setCurrentScreenSize({ width, height }));
  }, [screenSize]);

  // useEffect(() => {
  //   // alert("SubscriptionValidationChecker");
  //   const currentUser = auth.currentUser;

  //   if (currentUser) {
  //     const SubscriptionValidationChecker = async () => {
  //       const accountId = await currentUser.uid;

  //       try {
  //         // get subscription
  //         const subscriptionsRef = collection(
  //           db,
  //           "users_db",
  //           accountId,
  //           "subscriptions"
  //         );

  //         const queryActiveOrTrialing = query(
  //           subscriptionsRef,
  //           where("status", "in", ["trialing", "active"])
  //         );

  //         const subscriptionDocPromise = new Promise((resolve, reject) => {
  //           onSnapshot(queryActiveOrTrialing, async (snapshot) => {
  //             const doc = snapshot.docs[0];
  //             const length = snapshot.docs.length;
  //             if (doc.data().status === "active") {
  //               dispatch(setIsSubscriptionActive(true));
  //               // get end next billing date
  //               const timestamp = doc.data().current_period_end.seconds;
  //               const date = await new Date(timestamp * 1000);
  //               dispatch(setNextBillingDate(date.toDateString()));
  //               resolve(doc);
  //             } else if (length == 0) {
  //               dispatch(setIsSubscriptionActive(false));
  //               dispatch(setNextBillingDate("N/A"));
  //               resolve(null);
  //             }
  //           });
  //         });

  //         const docData = await subscriptionDocPromise;
  //         // if an active subscription exist get the product id and store it
  //         if (docData) {
  //           // get product id from database if an active
  //           const productID = await docData.data().items[0].plan.product;
  //           const priceID = await docData.data().items[0].plan.id;
  //           // alert(await docData.data().items[0].plan.product);
  //           //get and store maxProfiles
  //           const featuresRef = await doc(db, `products/${productID}`);
  //           const featuresSnap = await getDoc(featuresRef);
  //           const features = await featuresSnap.data().features;
  //           // save features to redux
  //           dispatch(setSubscriptionFeatures(features));

  //           // save priceID to redux
  //           dispatch(setPriceID(priceID));
  //         } else if (docData == null) {
  //           alert("docData null");

  //           dispatch(
  //             setSubscriptionFeatures({
  //               canHideVisibility: false,
  //               maxPlayersInAgency: 1,
  //               maxProfiles: 1,
  //               maxVideosPerPlayer: 1,
  //             })
  //           );
  //           dispatch(setPriceID(null));
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     SubscriptionValidationChecker();
  //   } else {
  //     dispatch(setIsSubscriptionActive(true));
  //   }
  // }, []);

  /// Listen wherther or not internet is connected
  useEffect(() => {
    const handleOnline = () => {
      dispatch(setInternetConnectionOnline());
    };

    const handleOffline = () => {
      dispatch(setInternetConnectionOffline());
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]); // Include dispatch in the dependency array to avoid lint warnings

  // useEffect(() => {
  //   alert(userLoginObject.accountId + "  from App JSZ");
  // }, [usersDatabase]);

  return (
    <ThemeProvider theme={theme}>
      {isSubscriptionActive ? null : (
        <Alert
          severity="error"
          variant="filled"
          action={
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => navigate("/changeSubscription")}>
              Get One
            </Button>
          }>
          No or Inactive Subscrtiption
        </Alert>
      )}
      <CssBaseline />
      <Routes>
        {/* PROTECTED ROUTES  */}

        <Route element={<PrivateRoutes />}>
          <Route path="/plans" element={<PlanItem />} />

          <Route path="/" element={<MotherComponent />}>
            <Route path="/favorite" element={<Favorites />} />
            <Route path="/help" element={<Error404 />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:profileName" element={<ViewAllScreen />} />

            <Route
              path="player-details/:playerId"
              element={<PlayerDetails />}
            />
            <Route path="/community" element={<Community />} />
            <Route path="/player-compare" element={<PlayerComparison />} />
            <Route path="/news" element={<News />} />
          </Route>

          {/* //PLayerVersion */}

          <Route path="/studio" element={<PlayerVersionMotherComponent />}>
            <Route path="/studio/favorite" element={<Error404 />} />
            <Route path="/studio/help" element={<Error404 />} />
            <Route path="/studio/settings" element={<Settings />} />
            <Route
              path="/studio/connections"
              // element={<PlayerVersionConnections />}
              element={<CoachAgentScoutVersionConnetions />}
            />
            <Route
              path="/studio/dashboard"
              element={<PlayerVersionDashboard />}
            />
            <Route path="/studio/videos" element={<PlayerVersionVideos />} />
            <Route
              path="/studio/Statistics"
              element={<PlayerVersionStatistics />}
            />
            <Route
              path="/studio/favorites"
              element={<PlayerVersionFavorites />}
            />
            <Route
              path="/studio/messages"
              element={<CoachAgentScoutVersionInbox />}
            />

            <Route
              path="/studio/analytics"
              element={<PlayerVersionAnalytics />}
            />
          </Route>
          {/* End of Player Version */}

          {/* COACH AGENT AND SCOUT VERSION */}
          <Route
            path="/multiStudio"
            element={<CoachAgentScoutVersionMotherComponent />}>
            <Route path="/multiStudio/favorite" element={<Error404 />} />
            <Route path="/multiStudio/help" element={<Error404 />} />
            <Route path="/multiStudio/settings" element={<Settings />} />

            <Route
              path="/multiStudio/dashboard"
              element={<CoachAgentScoutVersionDashboard />}
            />
            {/* <Route path="/videos" element={<Videos />} /> */}
            <Route
              path="/multiStudio/players"
              element={<CoachAgentScoutVersionPlayers />}
            />
            <Route
              path="/multiStudio/Statistics"
              element={<CoachAgentScoutVersionStatistics />}
            />
            <Route
              path="/multiStudio/favorites"
              element={<CoachAgentScoutVersionFavorites />}
            />
            <Route
              path="/multiStudio/connections"
              element={<CoachAgentScoutVersionConnetions />}
            />
            <Route
              path="/multiStudio/messages"
              element={<CoachAgentScoutVersionInbox />}
            />
            <Route
              path="/multiStudio/analytics"
              element={<CoachAgentScoutVersionAnalytics />}
            />
            <Route
              path="/multiStudio/players/:playerId"
              element={<CoachAgentScoutVersionPlayerManagement />}
            />
          </Route>

          <Route
            path="/changeSubscription"
            element={<ChangeSubscriptionPackagePage />}
          />
        </Route>

        {/* END OF PROTECTED ROUTES */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/membership-plans" element={<MembershipPlanPage />} />

        {/* <Route path="/spt" element={<Support />} />
        <Route path="/sptss" element={<SupportSettings />} /> */}

        {/* // CREATE ACCOUNT STEPPER URLS */}
        <Route path="/create-account" element={<SignupFormsMotherComponent />}>
          <Route path="/create-account/freetrial" element={<FreeTrial />} />
          <Route
            path="/create-account/subscribeTrial"
            element={<SubscribeTrial />}
          />

          <Route
            path="/create-account/confirm-details"
            element={<ConfirmDetails />}
          />

          <Route path="/create-account/user-form" element={<CreateAccount />} />
        </Route>

        <Route path="*" element={<ErrorPageNotFound />} />
      </Routes>
      {/* //// Alert Modal to display error messages */}
      <WarningAlertModal />

      <BasicBackdrop />
      <ContactSupportModal />
    </ThemeProvider>
  );
};

export default App;
