import { Avatar, Card, IconButton, Tooltip } from "@mui/material";
import PlayerManagementTabs from "../components/Tabs/PlayerManagementTabs";
import { selectPlayersInAgencyArray } from "../statemanager/slices/PlayersInAgencySlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import BasicButton from "../../../components/Buttons/BasicButton";
import BasicButtonWithEndIcon from "../../../components/Buttons/BasicButtonWithEndIcon";
import EditPlayerProfileModal from "../components/Modals/EditPlayerModal";
import TransferPlayerModal from "../components/Modals/TransferPlayerModal";
import {
  selectPlayerSelectedByClubOrScoutInPlayerManagement,
  setPlayerSelectedByClubOrScoutInPlayerManagement,
} from "../../../statemanager/slices/PlayersInAgencySlice";
import ConfirmClubExitModal from "../components/Modals/ConfirmClubExitModal";
import { selectPlayersDatabase } from "../../../statemanager/slices/DatabaseSlice";

const CoachAgentScoutVersionPlayerManagement = () => {
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const userLoginObject = useSelector(selectUserDetailsObject);
  const currentPlayerInfoObject = useSelector(
    selectPlayerSelectedByClubOrScoutInPlayerManagement
  );
  const [filteredPlayerArray, setFilteredPlayerArray] = useState([]);
  const [playerData, setPlayerData] = useState({
    firstName: "",
    surName: "",
    player_profile_image: "",
    Age: "",
    position: "",
    jerseyNumber: "",
    clubName: "",
    CountryCode: "",
    Nationality: "",
    Social_media: [],
  });
  // const history = useHistory();

  // const handleUsernameChange = (newUsername) => {
  //   // Change the username in the URL
  //   history.push(`/user/${newUsername}`);
  // };

  const subscreensTabArrayEmpty = [];
  const subscreensTabArrayScoutAndCoach = [
    "Dashboard",
    "Videos",
    "Inbox",
    "Interested Scouts",
    "Analytics",
    // "Settings",
  ];

  const subscreensTabArrayClubVersion = [
    "Dashboard",
    "Videos",
    "Inbox",
    "Interested Scouts",
    "Analytics",
    "Statistics",
    // "Settings",
  ];

  // this selectPlayersInAgencyArray is for dummy player created in the database however the  current selector is for the players in the database
  const PlayerArray = useSelector(selectPlayersDatabase);

  useEffect(() => {
    // alert(playerId);
    const selectedArray = PlayerArray.filter((data) => {
      const { id } = data;
      return playerId === id;
    });

    console.log("playNow", selectedArray);

    dispatch(
      setPlayerSelectedByClubOrScoutInPlayerManagement(selectedArray[0])
    );
    setFilteredPlayerArray(selectedArray);
  }, [playerId]);

  useEffect(() => {
    setFilteredPlayerArray([currentPlayerInfoObject]);
  }, [currentPlayerInfoObject]);

  // Setting the filtered array to playerData state only when it is not undefined and has a length of greater than 0 which prevents page break down // write a no reults when page array is less than 0
  useEffect(() => {
    if (filteredPlayerArray && filteredPlayerArray.length > 0) {
      const {
        firstName,
        surName,
        player_profile_image,
        Age,
        position,
        jerseyNumber,
        clubName,
        CountryCode,
        Nationality,
        Social_media,
      } = filteredPlayerArray[0];

      console.log(Social_media, "Social_media");
      setPlayerData({
        firstName,
        surName,
        player_profile_image,
        Age,
        position,
        jerseyNumber,
        clubName,
        CountryCode,
        Nationality,
        Social_media,
      });
    } else {
      // Set default values or handle the case when filteredPlayerArray is undefined or empty
      setPlayerData({
        firstName: "",
        surName: "",
        player_profile_image: "",
        Age: "",
        position: "",
        jerseyNumber: "",
        CountryCode: "",
        Nationality: "",
        Social_media: [],
      });
    }
  }, [filteredPlayerArray]);

  // Destructuring the items of playerData

  const {
    firstName,
    surName,
    Age,
    player_profile_image,
    position,
    jerseyNumber,
    clubName,
    CountryCode,
    Nationality,
    Social_media,
  } = playerData;

  const openLinkInNewPage = (link) => {
    // Open the link in a new tab or window
    window.open(link, "_blank");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      {/* // Player Name , Image an jerseyNumber */}
      <div style={{ flex: ".25", display: "flex" }}>
        {/* Player Image */}
        <div
          style={{
            flex: ".25",
            // background: "red",
            paddingTop: "1.5vh",
            position: "relative",
          }}
        >
          {/* // Image Canvas */}
          <Card
            style={{
              float: "right",
              width: "8.5vw",
              height: "18vh",
              // background: "blue",
              marginRight: ".5vw",
              borderRadius: "1vw",
              backgroundImage: `url('${player_profile_image}')`,
              backgroundSize: "cover",
            }}
          ></Card>

          {/* Club Logo Canvas */}
          <div className="PlayerManagementNationalityTooltip">
            <Tooltip title={Nationality}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  // position: "absolute",
                  // bottom: "-3vh",
                  // left: "30%",
                  // did the positioning Styling in css because wanted the tooltip to move with the avatar
                }}
                src={`https://flagcdn.com/${CountryCode.toLowerCase()}.svg`}
                alt={CountryCode}
              />{" "}
            </Tooltip>{" "}
          </div>
        </div>
        {/* Player Name */}
        <div style={{ flex: ".6", padding: "1vw", paddingLeft: "1vw" }}>
          <h2 style={{ margin: "0" }}> {firstName} </h2>
          <h1 style={{ margin: "0" }}>{surName} </h1>
        </div>
        {/* Jersey Number*/}
        <div style={{ flex: ".15", display: "grid", placeContent: "center" }}>
          <h1 style={{ fontSize: "5em" }}>{jerseyNumber}</h1>
        </div>
      </div>

      {/* // Player details */}
      <div style={{ flex: ".75", display: "flex" }}>
        {/* Player basic information */}

        <div
          style={{
            flex: ".22",
            // background: "white",
            paddingTop: "6vh",
            // background: "red",
            padding: ".8vw",
          }}
        >
          <Card
            className="cardBackground primaryTextColor"
            style={{
              width: "100%",
              height: "100%",
              //   background: "red",
              display: "flex",
              flexDirection: "column",
              borderRadius: "1vw",
              padding: "1.4vw",
              paddingTop: "8vh",
            }}
          >
            {/* // Player position , age , height */}
            <div style={{ flex: ".08", display: "flex" }}>
              {/* // CLUB name  Area */}
              <h6 style={{ width: "100%", fontWeight: "bolder" }}>
                Club :{" "}
                <span style={{ float: "right" }}>
                  {" "}
                  {userLoginObject?.role === "Club"
                    ? userLoginObject?.club
                    : userLoginObject?.role === "Scout" ||
                      userLoginObject?.role === "Coach"
                    ? clubName
                    : ""}{" "}
                </span>{" "}
              </h6>
            </div>
            {/* Postion Area */}
            <div style={{ flex: ".08", display: "flex" }}>
              <h6 style={{ width: "100%", fontWeight: "bolder" }}>
                Position :<span style={{ float: "right" }}>{position}</span>
              </h6>
            </div>

            {/* // Socials Area (Twitter and instagram) */}

            <div style={{ flex: ".1", display: "flex" }}>
              <Tooltip
                title={
                  Social_media.length == 0 ||
                  Social_media[0].Instagram === "https://www.instagram.com//"
                    ? ""
                    : Social_media[0].Instagram
                }
              >
                {" "}
                <IconButton
                  onClick={() => {
                    Social_media.length == 0 ||
                    Social_media[0].Instagram === "https://www.instagram.com//"
                      ? ""
                      : openLinkInNewPage(Social_media[0].Instagram);
                  }}
                >
                  <Instagram style={{ color: "#5585FE" }} />
                </IconButton>
              </Tooltip>
              <IconButton
                onClick={() => {
                  Social_media.length == 0 ||
                  Social_media[0].Facebook === "https://web.facebook.com/"
                    ? ""
                    : openLinkInNewPage(Social_media[0].Facebook);
                }}
              >
                <Tooltip
                  title={
                    Social_media.length == 0 ||
                    Social_media[0].Facebook === "https://web.facebook.com/"
                      ? ""
                      : Social_media[0].Facebook
                  }
                >
                  <Facebook style={{ color: "#5585FE" }} />
                </Tooltip>
              </IconButton>
            </div>

            {/* .// Honors and awards area */}
            <div
              style={{
                flex: ".70",
                // display: "flex",
                fontWeight: "bolder",
                paddingTop: "1.5vh",
              }}
            >
              {/* <h5>Honors & Awards</h5> */}

              {/* // Edit Profile button */}
              {/*  */}
              <EditPlayerProfileModal />

              {userLoginObject?.role === "Club" ? <TransferPlayerModal /> : ""}

              {userLoginObject?.role === "Club" ? <ConfirmClubExitModal /> : ""}
            </div>
          </Card>
        </div>

        {/* // TABS AND SUBSCREEMS SECTION */}
        <div style={{ flex: ".78" }}>
          <PlayerManagementTabs
            PlayerManagementTabItemsArray={
              userLoginObject?.role === "Club"
                ? subscreensTabArrayClubVersion
                : userLoginObject?.role === "Coach" ||
                  userLoginObject?.role === "Scout"
                ? subscreensTabArrayScoutAndCoach
                : subscreensTabArrayEmpty
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CoachAgentScoutVersionPlayerManagement;
