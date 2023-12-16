import { Route, Routes } from "react-router-dom";
import MotherComponent from "./MotherComponent";
import Dashboard from "./screens/Dashboard";
import Videos from "./screens/Videos";
import Statistics from "./screens/Statistics";
import Favorites from "./screens/Favorites";
import Inbox from "./screens/Inbox";
import Analytics from "./screens/Analytics";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MotherComponent />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
