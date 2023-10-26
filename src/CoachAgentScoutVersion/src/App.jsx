import { Route, Routes } from "react-router-dom";
import MotherComponent from "./MotherComponent";
import Dashboard from "./screens/Dashboard";
import Statistics from "./screens/Statistics";
import Favorites from "./screens/Favorites";
import Inbox from "./screens/Inbox";
import Analytics from "./screens/Analytics";
import Players from "./screens/Players";
import PlayerManagement from "./screens/PlayerManagement";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MotherComponent />}>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/videos" element={<Videos />} /> */}
          <Route path="/players" element={<Players />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="/players/:playerfullname"
            element={<PlayerManagement />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
