import { useDispatch, useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../statemanager/slices/PlayersInAgencySlice";
import ViewPlayerCard from "../components/Cards/ViewPlayerCard";
import { Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  selectCurrentProfile,
  setCurrentProfile,
} from "../statemanager/slices/SavedProfileSlice";
import ProfileEditTooltipToTrigerCreateProfileModal from "../components/Tooltips/ProfileEditTooltipToTrigerCreateProfileModal";
import CreateProfileModal from "../components/Modals/CreateProfileModal";
import { useEffect } from "react";
import FilteredPlayersTable from "../components/Tables/FilterPlayersTable";
import DeleteProfileModal from "../components/Modals/DeleteProfileModal";

const Players = () => {
  const PlayerArray = useSelector(selectPlayersInAgencyArray);
  const { profileName } = useParams();

  // alert(profileName);

  const currentProfile = useSelector(selectCurrentProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentProfile(profileName));
  }, []);

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
        <h3 style={{ margin: 0, float: "left" }}>{profileName} Profile</h3>

        <CreateProfileModal ProfileType="Edit" />

        {profileName.toLocaleLowerCase() === "default" ? (
          ""
        ) : (
          <DeleteProfileModal profileName={profileName} />
        )}
      </div>
      {/* /// Matched players display */}
      <div
        style={{
          flex: ".8",
          // flexWrap: "wrap",
          // display: "flex",
          // background: "red",
        }}
      >
        {/* {PlayerArray.slice(0, 9).map((data, index) => {
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
        })} */}

        <FilteredPlayersTable />
      </div>
      {/* // Pagination Area  */}
      {/* <div
        style={{
          flex: "0.1",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Use space-between to push the last two divs to the far right
        }}
      >
        <div>Rows per page: 20</div>
        <Pagination
          className="primaryTextColor"
          sx={{ color: "white" }}
          count={1}
          color="primary"
        />
        <div>Matched players: 11</div>
      </div> */}
    </div>
  );
};

export default Players;
