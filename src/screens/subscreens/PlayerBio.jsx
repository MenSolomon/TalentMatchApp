import {
  Card,
  CircularProgress,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import pitch from "../../assets/images/pitch.jpg";
import FootBallPitch from "../../components/Cards/FootBallPitch";
import PlayerPositionStatsBarGraphSummary from "../../components/Charts/Bars/PlayerPositionStatsBarGraphSummary";
import PlayerOverallAttributes from "../../components/Charts/Bars/PlayerOverallAttributes";
import BasicButton from "../../components/Buttons/BasicButton";
import {
  selectIsSubscriptionActive,
  selectUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import { useSelector } from "react-redux";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";
import getAdvancedStats from "../../utilities/GetAdvancedStats";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectAllSeasonsIdFromApi } from "../../statemanager/slices/DatabaseSlice";
import { db } from "../../Firebase/Firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Slide from "@mui/material/Slide";
import TransitionsSnackbar from "../../components/Snackbars/SlideSnackBar";
// import PlayerPositionStatsBarGraphSummary from "../../components/Charts/Bars/PlayerPositionStatsBarGraphSummary";

const PlayerBio = ({
  Nationality,
  PlaceOfBirth,
  DateOfBirth,
  clubName,
  contractStartDate,
  contactEndDate,
  Position,
  matchIdFromPlayerDatabase,
  allMatchesPlayedArray,
}) => {
  const { playerId } = useParams();
  const dateObject = new Date(DateOfBirth);
  const subscriptionStatus = useSelector(selectIsSubscriptionActive);
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);

  // Get the date portion without the time and "GMT"
  const formattedDate = dateObject.toDateString();

  const allClubsInDatabase = useSelector(selectClubsInDatabase);
  const allSeasonsOfApiInDatabase = useSelector(selectAllSeasonsIdFromApi);
  const clubObject = allClubsInDatabase.find((data) => {
    return data.wyId === clubName;
  });

  const ClubLogo = clubObject === undefined ? "" : clubObject?.imageDataURL;
  const ClubName = clubObject === undefined ? "Free agent" : clubObject?.name;

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    Transition: Slide,
  });

  const handleSnackbarOpen = (message, Transition = Slide) => {
    setSnackbarState({
      open: true,
      message: message,
      Transition: Transition,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  const triggerSnackbar = () => {
    handleSnackbarOpen("Custom message from ParentComponent!");
  };

  const fetchStats = async (PlayerId, MatchId) => {
    try {
      const data = await getAdvancedStats(PlayerId, MatchId);
      // console.log(data, "data collected from api stats wyscout");
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      // console.log("its done ");
    }
  };

  //   // {
  //   //   value: "Overall",
  //   //   label: "Overall",
  //   // },
  //   {
  //     value: "23/24",
  //     label: "23/24",
  //   },
  //   {
  //     value: "22/23",
  //     label: "22/23",
  //   },
  //   {
  //     value: "21/22",
  //     label: "21/22",
  //   },
  //   {
  //     value: "20/21",
  //     label: "20/21",
  //   },
  //   {
  //     value: "19/20",
  //     label: "19/20",
  //   },
  // ];
  const [selectedSeasonId, setSelectedSeasonId] = useState("");
  const [seasonsMenu, setSeasonsMenu] = useState([]);
  const [isDataRequestedFetching, setIsDataRequestedFetching] = useState(false);

  useEffect(() => {
    // Retieve all the seasonsIds the player played
    const uniqueSeasonIds = new Set();
    allMatchesPlayedArray?.forEach((match) =>
      uniqueSeasonIds.add(match.seasonId)
    );
    const idsArray = Array.from(uniqueSeasonIds);

    // Retrieve the season years (eg 22/23) of the  particular season Id

    const newSeasonNamesArray = idsArray
      .map((id) => {
        const seasonObj = allSeasonsOfApiInDatabase.find((data) => {
          return data.seasonId === id.toString();
        });
        return seasonObj ? seasonObj.season.name : null;
      })
      .filter((name) => name !== null);

    // seasons menu
    const seasonsMenuRetrieved = idsArray.map((id, index) => {
      const season = newSeasonNamesArray[index];
      const [startYear, endYear] = season
        .split("/")
        .map((year) => year.slice(2));

      return {
        value: id,
        label: `${startYear}/${endYear}`,
      };
    });

    console.log(seasonsMenuRetrieved);

    setSeasonsMenu(seasonsMenuRetrieved);
  }, [allMatchesPlayedArray, allSeasonsOfApiInDatabase, playerId]);

  const requestPlayerDetailedStatisticsBySeason = async () => {
    // Retieve all the seasonsIds the player played

    try {
      setIsDataRequestedFetching(true);

      const uniqueSeasonIds = new Set();
      allMatchesPlayedArray?.forEach((match) =>
        uniqueSeasonIds.add(match.seasonId)
      );
      const idsArray = Array.from(uniqueSeasonIds);

      // Retrieve the season years (eg 22/23) of the  particular season Id

      console.log(idsArray, "seasonIds"); // Output: [185355, 185351]

      const filteredMatches = allMatchesPlayedArray?.filter(
        (match) => match.seasonId === selectedSeasonId
      );

      console.log(filteredMatches);

      // Retreive all match stats for the season selected

      const promises = filteredMatches.map(async (match) => {
        const stats = await fetchStats(playerId, match.matchId);
        return { ...match, stats };
      });

      // alert(userLoginDetailsObject?.accountId);

      Promise.all(promises).then((mergedMatches) => {
        const foundSeasonName = seasonsMenu.find(
          (data) => selectedSeasonId === data.value
        );

        const result = {
          seasonId: selectedSeasonId,
          seasonName: foundSeasonName.label,
          stats: mergedMatches,
        };

        console.log(result, "all retrievedData");

        const reuqestedAdvancedStatsRef = doc(
          db,
          `users_db/${
            userLoginDetailsObject?.accountId
          }/requestedAdvancedStatisics/${playerId}/${foundSeasonName?.label.replace(
            /\//g,
            "-"
          )}`,
          "playerStatstics"
        );

        //Notification sent

        setDoc(reuqestedAdvancedStatsRef, result);
      });

      const UserdocRef = doc(
        db,
        `users_db/${userLoginDetailsObject?.accountId}`
      );

      const docSnapshot = await getDoc(UserdocRef);
      const existingArray =
        docSnapshot.data()?.idsOfRequestedPlayersStats || [];

      if (!existingArray.includes(playerId.toString())) {
        await updateDoc(UserdocRef, {
          idsOfRequestedPlayersStats: arrayUnion(playerId.toString()),
        });
        handleSnackbarOpen("Data successfully added to your catalog");
        setIsDataRequestedFetching(false);
      } else {
        console.log("String already exists in the array.");
        handleSnackbarOpen("Data successfully added to your catalog");
        setIsDataRequestedFetching(false);
      }
    } catch (error) {
      console.error(error);
      handleSnackbarOpen("Data request unsuccessful try again");
      setIsDataRequestedFetching(false);
    }

    // setIsDataRequestedFetching
    // PUSH THE DATA TO THE PLAYERS SUBCOLLECTION CALLED REQUESTED DATA
  };

  return (
    <div
      // className="lg:flex lg:flex-row  md:flex md:flex-col md:w-[100%] md:h-[40vh]  sm:flex sm:w-[100%] sm:h-[100%] sm:flex-col"
      className="md:flex md:flex-row md:w-[100%] md:h-[40vh]  sm:flex sm:w-[100%] sm:h-[100%] sm:flex-col"
      style={
        {
          // width: "100%",
          // height: "40vh",
          // background: "teal",
          // display: "flex",
          // background: "red",
        }
      }
    >
      <div
        className="sm:hidden md:hidden lg:block"
        style={{ flex: ".23", padding: ".3vw" }}
      >
        <FootBallPitch />
      </div>

      <div
        style={{
          flex: ".77",
          padding: ".3vw",
          // background: "red",
          paddingLeft: "1vw",
        }}
      >
        <div
          className="md:flex md:w-[100%] md:h-[100%] md:flex-row     sm:flex-col md:gap-[.5vw]  sm:gap-[10vw] sm:flex sm:w-[100%] sm:h-[100%]"
          style={{
            // width: "100%",
            // height: "100%",
            // display: "flex",
            // gap: ".5vw",
            background: "transparent",
          }}
        >
          <div className="div" style={{ flex: ".32" }}>
            {" "}
            <Card
              className="primaryColor"
              sx={{
                width: "100%",
                height: "100%",
                // background:
                //   "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                // borderBottom: "1px solid #0d818e",
                // borderRight: "1px solid #0d818e",
                // borderTop: "2px solid #0d818e",
                padding: "1vw",
                // fontWeight: "800",
                borderRadius: "1vw",
                background: "transparent",
              }}
            >
              <h6
                className="lg:text-[1em] tb:text-[1.4em]"
                style={{ fontWeight: "bolder" }}
              >
                Personal Information
              </h6>
              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Citizenship : {Nationality}{" "}
              </div>
              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Place of birth : {PlaceOfBirth}{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Date of birth : {formattedDate}{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Current Team : {ClubName}{" "}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Joined : {contractStartDate}{" "}
              </div>
              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Position : {Position}
              </div>

              <div
                style={{
                  fontWeight: "700",
                  // fontSize: ".8em",
                  marginBottom: "1.1vh",
                }}
                className="lg:text-[1em] tb:text-[1.3em]"
              >
                {" "}
                Contract Expires : {contactEndDate}{" "}
              </div>
            </Card>{" "}
          </div>
          <div className="div" style={{ flex: ".33" }}>
            <Card
              className="primaryColor"
              sx={{
                width: "100%",
                height: "100%",
                // background:
                //   "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                // borderBottom: "1px solid #0d818e",
                // borderRight: "1px solid #0d818e",
                // borderTop: "2px solid #0d818e",
                paddingTop: "1vh",
                borderRadius: "1vw",
                background: "transparent",
              }}
            >
              {/* <PlayerPositionStatsBarGraphSummary /> */}
              <PlayerOverallAttributes />
            </Card>{" "}
          </div>
          <div
            className="div"
            style={{
              flex: ".35",
            }}
          >
            <Card
              className="primaryColor"
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                gap: "2vh",
                flexDirection: "column",
                padding: "2vh 1vw 0vh 1vw",
                // background:
                //   "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
                // borderBottom: "1px solid #0d818e",
                // borderRight: "1px solid #0d818e",
                // borderTop: "2px solid #0d818e",

                borderRadius: "1vw",
                background: "transparent",
              }}
            >
              <TextField
                id="outlined-select-currency"
                size="small"
                select
                // label="Select"
                defaultValue={seasonsMenu[0]?.label}
                className="md:w-[10vw] sm:w-[90%]"
                // style={{ width: "15%" }}
                onChange={(e) => {
                  // alert(e.target.value);
                  setSelectedSeasonId(e.target.value);
                }}
              >
                {seasonsMenu.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <div
                onClick={() => {
                  // fetchStats(playerId, matchIdFromPlayerDatabase);
                  requestPlayerDetailedStatisticsBySeason();
                }}
              >
                <BasicButton
                  // onClick={}
                  disabled={isDataRequestedFetching}
                  // disabled={!subscriptionStatus}

                  innerText="Request season stats"
                />
              </div>

              {isDataRequestedFetching ? <CircularProgress /> : ""}

              {/* <BasicButton
                disabled={!subscriptionStatus}
                innerText="Request last 15 games detailed stats"
              />

              <BasicButton
                disabled={!subscriptionStatus}
                innerText="Request last 30 games detailed stats"
              /> */}
            </Card>{" "}
          </div>
        </div>
      </div>
      <TransitionsSnackbar
        open={snackbarState.open}
        onClose={handleSnackbarClose}
        message={snackbarState.message}
        Transition={snackbarState.Transition}
      />
    </div>
  );
};

export default PlayerBio;
