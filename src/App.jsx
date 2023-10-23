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
        </Route>
        <Route path="/freetrial" element={<FreeTrial />} />
        <Route path="/subscribeTrial" element={<SubscribeTrial />} />
        <Route path="/confirm-details" element={<ConfirmDetails />} />
      </Routes>
    </div>
  );
};

export default App;
