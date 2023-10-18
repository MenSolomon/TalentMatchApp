import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/HomePage";
import PlayerDetails from "./screens/PlayerDetails";
import ViewAllScreen from "./screens/ViewAllScreen";
import MotherComponent from "./MotherComponent";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Community from "./screens/Community";
import PlayerComparison from "./screens/PlayerComparison";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MotherComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="view-all" element={<ViewAllScreen />} />
          <Route path="player-details" element={<PlayerDetails />} />
          <Route path="/community" element={<Community />} />
          <Route path="/player-conmpare" element={<PlayerComparison />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
