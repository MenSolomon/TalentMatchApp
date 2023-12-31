import { Card, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPlayersDatabase } from "../../../../statemanager/slices/DatabaseSlice";
import { setPlayerSelectedByClubOrScoutInPlayerManagement } from "../../../../statemanager/slices/PlayersInAgencySlice";

const PlayerViewCardFromPlayersScreen = ({
  image,
  firstName,
  surName,
  age,
  nationality,
  position,
  jerseyNumber,
  id,
  positionToolTipInFull,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const PlayerArray = useSelector(selectPlayersDatabase);

  const handlePlayerManagementNavigation = () => {
    const selectedArray = PlayerArray.filter((data) => {
      return data.id === id;
    });

    dispatch(
      setPlayerSelectedByClubOrScoutInPlayerManagement(selectedArray[0])
    );
    navigate(`/multiStudio/players/${id}`);
  };

  return (
    <div onClick={handlePlayerManagementNavigation}>
      <Card
        className="cardBackground primaryTextColor md:flex md:w-[24.7vw] md:h-[23.5vh]    sm:flex sm:w-[100%] sm:h-[15vh]"
        style={{
          // display: "flex",
          // width: "24.7vw",
          // height: "20vh",
          borderRadius: "1vw",
          padding: ".7vw",
          gap: ".4vw",
          marginRight: "1.2vw",
          cursor: "pointer",
        }}
      >
        {/* Image Area */}
        <div style={{ flex: ".3" }}>
          <img
            src={image}
            className="sm:w-[100%] sm:h-[100%]   md:w-[100%] md:h-[100%]"
            style={{ borderRadius: ".8vw" }}
          />

          {}
        </div>
        {/* NAme Details  and Descriptive Data*/}
        <div
          style={{
            flex: ".6",

            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Name Details */}
          <div style={{ flex: ".5" }}>
            <p style={{ margin: 0 }}>
              {firstName.length >= 10 ? (
                <Tooltip title={firstName}>{firstName.slice(0, 10)}...</Tooltip>
              ) : (
                firstName
              )}
            </p>{" "}
            <h4 style={{ margin: 0 }}>
              {surName.length >= 10 ? (
                <Tooltip title={surName}>{surName.slice(0, 7)}...</Tooltip>
              ) : (
                surName
              )}
            </h4>
          </div>
          {/* Descriptive area (Age , Nationality , Postion) */}
          <div style={{ flex: ".5", display: "flex" }}>
            {/* Age */}
            <div style={{ flex: ".25" }}>
              <span style={{ fontWeight: "700" }}>Age</span> <br />
              {age}
            </div>
            {/* Nationality */}
            <div style={{ flex: ".5" }}>
              <span style={{ fontWeight: "700" }}>Country </span> <br />{" "}
              {nationality.length >= 20 ? (
                <Tooltip title={nationality}>
                  {nationality.slice(0, 18)}...
                </Tooltip>
              ) : (
                nationality
              )}
            </div>
            {/* Position */}
            <div style={{ flex: ".25" }}>
              {" "}
              <Tooltip title={positionToolTipInFull}>
                <span style={{ fontWeight: "700" }}>Pos </span> <br />{" "}
                {position}{" "}
              </Tooltip>
            </div>
          </div>
        </div>
        {/* Jersey Number */}
        <div
          style={{
            flex: ".1",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <h2>{jerseyNumber}</h2>{" "}
        </div>
      </Card>
    </div>
  );
};

export default PlayerViewCardFromPlayersScreen;
