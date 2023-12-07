import { Avatar, Card, IconButton } from "@mui/material";
import PlayerManagementTabs from "../components/Tabs/PlayerManagementTabs";
import { selectPlayersInAgencyArray } from "../statemanager/slices/PlayersInAgencySlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Instagram, Twitter } from "@mui/icons-material";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import BasicButton from "../../../components/Buttons/BasicButton";
import BasicButtonWithEndIcon from "../../../components/Buttons/BasicButtonWithEndIcon";
import EditPlayerProfileModal from "../components/Modals/EditPlayerModal";
import TransferPlayerModal from "../components/Modals/TransferPlayerModal";
import { setPlayerSelectedByClubOrScoutInPlayerManagement } from "../../../statemanager/slices/PlayersInAgencySlice";
import ConfirmClubExitModal from "../components/Modals/ConfirmClubExitModal";

const CoachAgentScoutVersionPlayerManagement = () => {
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const userLoginObject = useSelector(selectUserDetailsObject);
  const [filteredPlayerArray, setFilteredPlayerArray] = useState([]);
  const [playerData, setPlayerData] = useState({
    firstName: "",
    surName: "",
    image: "",
    Age: "",
    position: "",
    jerseyNumber: "",
    clubName: "",
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

  const PlayerArray = useSelector(selectPlayersInAgencyArray);

  useEffect(() => {
    const selectedArray = PlayerArray.filter((data) => {
      const { id } = data;
      return playerId === id;
    });

    dispatch(
      setPlayerSelectedByClubOrScoutInPlayerManagement(selectedArray[0])
    );
    setFilteredPlayerArray(selectedArray);
  }, [playerId]);

  useEffect(() => {
    console.log(filteredPlayerArray);
  }, [filteredPlayerArray]);

  // Setting the filtered array to playerData state only when it is not undefined and has a length of greater than 0 which prevents page break down // write a no reults when page array is less than 0
  useEffect(() => {
    if (filteredPlayerArray && filteredPlayerArray.length > 0) {
      const {
        firstName,
        surName,
        image,
        Age,
        position,
        jerseyNumber,
        clubName,
      } = filteredPlayerArray[0];

      setPlayerData({
        firstName,
        surName,
        image,
        Age,
        position,
        jerseyNumber,
        clubName,
      });
    } else {
      // Set default values or handle the case when filteredPlayerArray is undefined or empty
      setPlayerData({
        firstName: "",
        surName: "",
        image: "",
        Age: "",
        position: "",
        jerseyNumber: "",
      });
    }
  }, [filteredPlayerArray]);

  // Destructuring the items of playerData

  const { firstName, surName, Age, image, position, jerseyNumber, clubName } =
    playerData;

  return (
    <div
      className="md:w-[100%] md:h-[100%] md:flex md:flex-col md:gap-[0px]   sm:gap-[50px]   sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col"
      style={
        {
          // display: "flex",
          // flexDirection: "column",
          // height: "100%",
          // width: "100%",
          // background: "red",
        }
      }
    >
      {/* // Player Name , Image an jerseyNumber */}
      <div style={{ flex: ".25", display: "flex" }}>
        {/* Player Image */}
        <div
          className="md:relative sm:relative"
          style={{
            flex: ".25",
            // background: "red",
            paddingTop: "1.5vh",
            // position: "relative",
          }}
        >
          {/* // Image Canvas */}
          <Card
            className="md:w-[8.5vw] md:h-[18vh] md:float-right  sm:float-left sm:w-[30vw] sm:h-[18vh]"
            style={{
              // float: "right",
              // width: "8.5vw",
              // height: "18vh",
              background: "blue",
              marginRight: ".5vw",
              borderRadius: "1vw",
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
            }}
          ></Card>

          {/* Club Logo Canvas */}

          <Avatar
            className="md:absolute md:left-[30%] md:bottom-[-15vh]    sm:absolute sm:left-[140%] sm:bottom-[-7vh]"
            sx={{
              width: 56,
              height: 56,
              // position: "absolute",
              // bottom: "-3vh",
              // left: "30%",
            }}
            src="/ghana.png"
          />
        </div>
        {/* Player Name */}
        <div
          className="md:pl-[1vw] sm:pl-[-100%]"
          style={{ flex: ".6", padding: "1vw" }}
        >
          <h2 style={{ margin: "0" }}> {firstName} </h2>
          <h1 style={{ margin: "0" }}>{surName} </h1>
        </div>
        {/* Jersey Number*/}
        <div
          style={{
            flex: ".15",
            display: "grid",
            placeContent: "center",
            // background: "green",
          }}
        >
          <h1 style={{ fontSize: "5em" }}>{jerseyNumber}</h1>
        </div>
      </div>

      {/* // Player details */}
      <div
        className="md:flex md:basis-[75%]  md:flex-row   sm:flex sm:flex-col sm:basis-[75%]"
        // style={{ flex: ".75" }}
      >
        {/* Player basic information */}

        <div
          className=" sm:basis-[22%]  md:basis-[22%] "
          style={{
            // flex: ".22",
            // background: "white",
            paddingTop: "6vh",
            // background: "red",
            padding: ".8vw",
          }}
        >
          <Card
            className="cardBackground primaryTextColor md:w-[100%] md:h-[100%] md:flex md:flex-col md:p-[1.4vw]   sm:p-[2vw] sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col"
            style={{
              // width: "100%",
              // height: "100%",
              // background: "red",
              // display: "flex",
              // flexDirection: "column",
              borderRadius: "1vw",
              // padding: "1.4vw",
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
              <IconButton>
                <Twitter style={{ color: "#5585FE" }} />
              </IconButton>
              <IconButton>
                <Instagram style={{ color: "#5585FE" }} />
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
        <div className="md:basis-[78%] sm:basis-[78%]">
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
