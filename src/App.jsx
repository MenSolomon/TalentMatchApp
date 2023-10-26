import { Route, Routes } from "react-router-dom";
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
import Support from "./screens/Support";
import SupportSettings from "./screens/SupportSettings";
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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MotherComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="view-all" element={<ViewAllScreen />} />
          <Route path="player-details/:playerId" element={<PlayerDetails />} />
          <Route path="/community" element={<Community />} />
          <Route path="/player-conmpare" element={<PlayerComparison />} />
          <Route path="/news" element={<News />} />
        </Route>

        {/* //PLayerVersion */}

        <Route path="/studio" element={<PlayerVersionMotherComponent />}>
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
            path="/multiStudio/players/:playerfullname"
            element={<CoachAgentScoutVersionPlayerManagement />}
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/membership-plans" element={<MembershipPlanPage />} />

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
        {/* <Route path="/freetrial" element={<FreeTrial />} />
        <Route path="/subscribeTrial" element={<SubscribeTrial />} />
        <Route path="/confirm-details" element={<ConfirmDetails />} />
      </Routes>
    </div>
  );
};

export default App;
