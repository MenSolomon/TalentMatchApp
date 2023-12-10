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
import { createTheme, ThemeProvider, Button, CssBaseline } from "@mui/material";
import Error404 from "./screens/Error404";
import ErrorPageNotFound from "./screens/ErrorPageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeProviderObject } from "./statemanager/slices/ThemeProviderSlice";
import { selectUserDetailsObject } from "./statemanager/slices/LoginUserDataSlice";
import { useEffect, useState } from "react";
import { setCurrentScreenSize } from "./statemanager/slices/OtherComponentStatesSlice";
import BasicBackdrop from "./components/Backdrops/BasicBackdrop";
import {
  setInternetConnectionOffline,
  setInternetConnectionOnline,
} from "./statemanager/slices/InternetActivitiesSlice";
import ContactSupportModal from "./components/Modals/ContactSupportModal";
import { selectUsersDatabase } from "./statemanager/slices/DatabaseSlice";

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

  useEffect(() => {
    console.log(`${screenSize.width} ,width`, `${screenSize.height} ,height`);

    const { width, height } = screenSize;

    dispatch(setCurrentScreenSize({ width, height }));
  }, [screenSize]);

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
      <CssBaseline />
      <Routes>
        {/* PROTECTED ROUTES  */}

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MotherComponent />}>
            <Route path="/favorite" element={<Error404 />} />
            <Route path="/help" element={<Error404 />} />
            <Route path="/settings" element={<Error404 />} />

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
            <Route path="/studio/settings" element={<Error404 />} />

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
            <Route path="/studio/inbox" element={<PlayerVersionInbox />} />

            <Route
              path="/studio/analytics"
              element={<PlayerVersionAnalytics />}
            />
          </Route>
          {/* End of Player Version */}

          {/* COACH AGENT AND SCOUT VERSION */}
          <Route
            path="/multiStudio"
            element={<CoachAgentScoutVersionMotherComponent />}
          >
            <Route path="/multiStudio/favorite" element={<Error404 />} />
            <Route path="/multiStudio/help" element={<Error404 />} />
            <Route path="/multiStudio/settings" element={<Error404 />} />

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
              path="/multiStudio/inbox"
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
