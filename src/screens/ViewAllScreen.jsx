import { useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../statemanager/slices/PlayersInAgencySlice";
import ViewPlayerCard from "../components/Cards/ViewPlayerCard";
import { Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { selectCurrentProfile } from "../statemanager/slices/SavedProfileSlice";
import ProfileEditTooltipToTrigerCreateProfileModal from "../components/Tooltips/ProfileEditTooltipToTrigerCreateProfileModal";
import CreateProfileModal from "../components/Modals/CreateProfileModal";

const Players = () => {
  const PlayerArray = useSelector(selectPlayersInAgencyArray);
  const { profileName } = useParams();

  // alert(profileName);

  const currentProfile = useSelector(selectCurrentProfile);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ flex: ".1", display: "flex" }}>
        <h3 style={{ margin: 0, float: "left" }}>{currentProfile} Profile</h3>

        <CreateProfileModal ProfileType="Edit" />
      </div>

      <div style={{ flex: ".8", flexWrap: "wrap", display: "flex" }}>
        {PlayerArray.slice(0, 9).map((data, index) => {
          const {
            firstName,
            surName,
            Age,
            position,
            Nationality,
            jerseyNumber,
            image,
          } = data;

          return (
            <ViewPlayerCard
              key={index}
              image={image}
              surName={surName}
              age={Age}
              position={position}
              jerseyNumber={jerseyNumber}
              firstName={firstName}
              nationality={Nationality}
            />
          );
        })}
      </div>
      {/* // Pagination Area  */}

      <div
        style={{
          flex: ".1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Pagination
          className="primaryTextColor"
          sx={{ color: "white" }}
          count={1}
          color="primary"
        />{" "}
      </div>
    </div>
  );
};

export default Players;
