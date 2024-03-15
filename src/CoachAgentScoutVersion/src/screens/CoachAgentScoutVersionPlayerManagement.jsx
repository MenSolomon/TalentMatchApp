import { Avatar, Card, IconButton, Tooltip } from "@mui/material";
import PlayerManagementTabs from "../components/Tabs/PlayerManagementTabs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { selectUserDetailsObject } from "../../../statemanager/slices/LoginUserDataSlice";
import EditPlayerProfileModal from "../components/Modals/EditPlayerModal";
import TransferPlayerModal from "../components/Modals/TransferPlayerModal";
import {
  selectPlayerSelectedByClubOrScoutInPlayerManagement,
  setPlayerSelectedByClubOrScoutInPlayerManagement,
} from "../../../statemanager/slices/PlayersInAgencySlice";
import ConfirmClubExitModal from "../components/Modals/ConfirmClubExitModal";
import { selectPlayersDatabase } from "../../../statemanager/slices/DatabaseSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import BasicButtonWithEndIcon from "../../../components/Buttons/BasicButtonWithEndIcon";
import { selectCurrentBrowserSize, setWarningAlertModalCounter, setWarningAlertModalMessage } from "../../../statemanager/slices/OtherComponentStatesSlice";
import { getFunctions, httpsCallable } from "firebase/functions";

const CoachAgentScoutVersionPlayerManagement = () => {
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoginObject = useSelector(selectUserDetailsObject);
  const browserSize = useSelector(selectCurrentBrowserSize);
  let browserWidth = parseInt(browserSize?.width, 10);
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

  // Useeffect to redirect player to all players page if playerTo display's ID isnt included in playersInPossessionArray

  useEffect(() => {
    const checkPlayerInPossessionArray =
      userLoginObject?.playersInPossession.filter((data) => {
        return data.playerId === playerId;
      });

    if (checkPlayerInPossessionArray.length === 0) {
      navigate("/multiStudio/players");
    }
  }, [playerId, userLoginObject]);

  // const history = useHistory();

  // const handleUsernameChange = (newUsername) => {
  //   // Change the username in the URL
  //   history.push(`/user/${newUsername}`);
  // };

  const subscreensTabArrayEmpty = [];
  const subscreensTabArrayScoutAndCoach = [
    "Dashboard",
    "Videos",
    // "Inbox",
    // "Interested Scouts",
    "Analytics",
    // "Settings",
  ];

  const subscreensTabArrayClubVersion = [
    "Dashboard",
    "Videos",
    // "Inbox",
    // "Interested Scouts",
    "Analytics",
    "Statistics",
    // "Settings",
  ];

  // this selectPlayersInAgencyArray is for dummy player created in the database however the  current selector is for the players in the database
  const PlayerArray = useSelector(selectPlayersDatabase);

  useEffect(() => {
    const playerObjectRef = collection(
      db,
      `players_database/${playerId}/videos`
    );

    const q = query(playerObjectRef);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      const selectedArray = PlayerArray.filter((data) => {
        const { id } = data;
        return playerId === id;
      });

      // console.log("playNow", selectedArray);

      dispatch(
        setPlayerSelectedByClubOrScoutInPlayerManagement({
          ...selectedArray[0],
          videos: items,
        })
      );
      setFilteredPlayerArray(selectedArray);
    });
    return () => {
      alldata();
    };
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

  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };
// s
  // const fetchBoostPoints = async (key ) => {
  //   const { data } = await axios.get()
  //   return data
  // }

  // const {
  //   status,
  //   data,
  //   error,
  //   refetch,
  // } = useQuery(['oostPoints'], fetchBoostPoints)
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
      className="md:w-[100%] md:h-[100%] md:flex md:flex-col md:gap-[0px]   sm:gap-[50px]   sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col"
      style={
        {
          // display: "flex",
          // flexDirection: "column",
          // height: "100%",
          // width: "100%",
          // background: "red",
        }
      }>
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
          }}>
          {/* // Image Canvas */}
          <Card
            className="md:w-[8.5vw] md:h-[18vh] md:float-right  sm:float-left sm:w-[30vw] sm:h-[18vh]"
            style={{
              // float: "right",
              // width: "8.5vw",
              // height: "18vh",
              // background: "blue",
              marginRight: ".5vw",
              borderRadius: "1vw",
              backgroundImage: `url('${player_profile_image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}></Card>

          {/* Club Logo Canvas */}
          <div className="PlayerManagementNationalityTooltip">
            <Tooltip title={Nationality}>
              <Avatar
                className="md:absolute md:left-[30%] md:bottom-[-1vh]    sm:absolute sm:left-[250%] sm:bottom-[-6vh]"
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
        <div
          className="md:pl-[1vw] sm:pl-[-100%]"
          style={{ flex: ".6", paddingLeft: "1vw" }}>
          <h2 style={{ margin: "0" }}> {firstName} </h2>
          <h1 style={{ margin: "0" }}>{surName} </h1>
          <h1 style={{ margin: "0" }}>{boostPoints} </h1>

        </div>
        {/* Jersey Number*/}
        <div style={{ flex: ".15", display: "grid", placeContent: "center" }}>
          <h1 style={{ fontSize: "5em" }}>{jerseyNumber}</h1>
        </div>
      </div>

      {/* // Player details */}
      <div
        className="md:flex md:basis-[75%]  md:flex-row   sm:flex sm:flex-col sm:basis-[75%]"
        // style={{ background: "red" }}
      >
        {/* Player basic information */}

        <div
          className=" sm:basis-[22%]  md:basis-[22%]"
          style={{
            // flex: ".22",
            // background: "white",
            paddingTop: "6vh",
            // background: "green",
            padding: ".8vw",
          }}>
          <Card
            className="cardBackground primaryTextColor md:w-[100%] md:h-[100%] md:flex md:flex-col md:p-[1.4vw]   sm:p-[2vw] sm:w-[100%] sm:h-[100%] sm:flex sm:flex-col"
            style={{
              // width: "100%",
              // height: "100%",
              //   background: "red",
              // display: "flex",
              // flexDirection: "column",
              borderRadius: "1vw",
              // padding: "1.4vw",
              paddingTop: "8vh",
            }}>
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
                }>
                {" "}
                <IconButton
                  onClick={() => {
                    Social_media.length == 0 ||
                    Social_media[0].Instagram === "https://www.instagram.com//"
                      ? ""
                      : openLinkInNewPage(Social_media[0].Instagram);
                  }}>
                  <Instagram style={{ color: "#5585FE" }} />
                </IconButton>
              </Tooltip>
              <IconButton
                onClick={() => {
                  Social_media.length == 0 ||
                  Social_media[0].Facebook === "https://web.facebook.com/"
                    ? ""
                    : openLinkInNewPage(Social_media[0].Facebook);
                }}>
                <Tooltip
                  title={
                    Social_media.length == 0 ||
                    Social_media[0].Facebook === "https://web.facebook.com/"
                      ? ""
                      : Social_media[0].Facebook
                  }>
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
              }}>
              {/* <h5>Honors & Awards</h5> */}

              {/* // Edit Profile button */}
              {/*  */}
              <EditPlayerProfileModal />
              <BasicButtonWithEndIcon
                innerText={"Boost"}
                endIcon={"bolt"}
                style={{
                  width: browserWidth >= 1024 ? "9vw" : "40vw",
                  height: "6vh",
                  marginBottom: "1.5vh",
                }}
                
                onClick={async () => {
                 
                  try {
                    const functions = getFunctions();
                  const incrementBoostFn = httpsCallable(
                    functions,
                    "incrementBoost"
                  );
                  const result = await incrementBoostFn({ id: currentPlayerInfoObject.id })
                  console.log('result', result)
                  triggerWarningAlertModal(`${result.data.message}`)
                  } catch (error) {
                    console.log("cloudFn Error", error)
                   
                  }
                  // triggerWarningAlertModal(`${result.data.message}`)
                  
                  // console.log(result)
                }}
              />
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
