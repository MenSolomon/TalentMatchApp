import { LocalPoliceOutlined, Star, StarBorder } from "@mui/icons-material";
import { Card, Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import { selectPlayerSelectedToView } from "../../statemanager/slices/PlayersInAgencySlice";
import { db } from "../../Firebase/Firebase";

const AdvancedStatsPlayerCard = ({
  image,
  firstName,
  surName,
  clubImage,
  clubName,
}) => {
  const navigate = useNavigate();

  const handlePlayerNavigation = () => {
    // navigate(`/player-details/${id}`);
  };

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { primaryTextColor } = themeProviderObject;

  return (
    <div style={{ marginBottom: "1vh" }} onClick={handlePlayerNavigation}>
      <Card
        className="cardBackground primaryTextColor md:flex md:w-[100%] md:h-[13vh]    sm:flex sm:w-[95vw] sm:h-[15vh]"
        style={{
          // display: "flex",
          // width: "100%",
          // height: "100%",
          borderRadius: "1vw",
          padding: ".7vw",
          gap: ".4vw",
          cursor: "pointer",
          fontSize: ".8em",
        }}
      >
        {/* Image Area */}
        <div style={{ flex: ".3" }}>
          <img
            src={image}
            style={{ width: "100%", height: "100%", borderRadius: ".8vw" }}
          />

          {/* {} */}
        </div>

        <div
          style={{
            flex: ".4",

            // display: "flex",
            // flexDirection: "column",
          }}
        >
          {/* Name Details */}
          <div>
            <p style={{ margin: 0 }}>
              {firstName?.length >= 10 ? (
                <Tooltip title={firstName}>
                  {firstName?.slice(0, 10)}...
                </Tooltip>
              ) : (
                firstName
              )}
            </p>{" "}
            <h4 style={{ margin: 0, fontSize: "1.4em" }}>
              {surName?.length >= 10 ? (
                <Tooltip title={surName}>{surName?.slice(0, 7)}...</Tooltip>
              ) : (
                surName
              )}
            </h4>
          </div>
        </div>
        {/* Jersey Number */}
        <div
          style={{
            flex: ".3",
            display: "flex",
            // alignContent: "center",
            // justifyContent: "center",
          }}
        >
          {clubImage ? (
            <Tooltip title={clubName}>
              <img
                src={clubImage}
                style={{ width: "100%", height: "100%", borderRadius: ".8vw" }}
              />
            </Tooltip>
          ) : (
            <Tooltip title={"Free Agent"}>
              {" "}
              <LocalPoliceOutlined
                style={{ width: "100%", height: "100%", borderRadius: ".8vw" }}
              />{" "}
            </Tooltip>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdvancedStatsPlayerCard;
