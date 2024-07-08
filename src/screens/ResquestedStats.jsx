import {
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import SoccerPitch from "./SoccerPitch";
import pitchImage from "../assets/images/Pitch.jpg";
import AdvancedStatsPlayerCard from "../components/Cards/AdvancedStatsPlayerCard";
import { useQuery } from "@tanstack/react-query";
import { db } from "../Firebase/Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserDetailsObject } from "../statemanager/slices/LoginUserDataSlice";
import { selectPlayersDatabase } from "../statemanager/slices/DatabaseSlice";
import { selectClubsInDatabase } from "../statemanager/slices/ClubsInDatabaseSlice";
import { LocalPoliceOutlined } from "@mui/icons-material";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import BasicButton from "../components/Buttons/BasicButton";

const RequestedStats = ({ playerPosition }) => {
  const seasonsMenu = [
    {
      value: "23-24",
      label: "23/24",
    },
    {
      value: "22-23",
      label: "22/23",
    },
    {
      value: "21-22",
      label: "21/22",
    },
    {
      value: "20-21",
      label: "20/21",
    },
    {
      value: "19-20",
      label: "19/20",
    },
    {
      value: "18-19",
      label: "18/19",
    },
    {
      value: "17-18",
      label: "17/18",
    },
    // {
    //   value: "16-2",
    //   label: "19/20",
    // },
  ];

  const statsTypes = [
    {
      value: "Total",
      label: "Total",
    },
    {
      value: "Average",
      label: "Average",
    },
    {
      value: "Percentage",
      label: "Percentage",
    },
  ];

  const [statsSeason, setStatsSeason] = useState("23/24");

  // const Attack = {
  //   Average: {
  //     accelerations: 0,
  //     assists: 0,
  //     attackingActions: 0,
  //     counterpressingRecoveries: 0,
  //     dangerousOpponentHalfRecoveries: 0,
  //     dangerousOwnHalfLosses: 0,
  //     directFreeKicks: 0,
  //     directFreeKicksOnTarget: 0,
  //     dribbleDistanceFromOpponentGoal: 0,
  //     dribbles: 0,
  //     freeKicks: 0,
  //     freeKicksOnTarget: 0,
  //     goals: 0,
  //     headShots: 0,
  //     linkupPlays: 0,
  //     longPassLength: 0,
  //     looseBallDuels: 0,
  //     looseBallDuelsWon: 0,
  //     newOffensiveDuelsWon: 0,
  //     newSuccessfulDribbles: 0,
  //     offensiveDuels: 0,
  //     offensiveDuelsWon: 0,
  //     opponentHalfRecoveries: 0,
  //     penalties: 0,
  //     progressiveRun: 0,
  //     secondAssists: 0,
  //     shotAssists: 0,
  //     shotOnTargetAssists: 0,
  //     shots: 0,
  //     shotsOnTarget: 0,
  //     successfulAttackingActions: 0,
  //     successfulDribbles: 0,
  //     successfulGoalKicks: 0,
  //     successfulLinkupPlays: 0,
  //     successfulPenalties: 0,
  //     successfulSlidingTackles: 0,
  //     thirdAssists: 0,
  //     touchInBox: 0,
  //   },

  //   Percentage: {
  //     directFreeKicksOnTarget: 14,
  //     goalConversion: 13,
  //     headShotsOnTarget: 0,
  //     newOffensiveDuelsWon: 0,
  //     newSuccessfulDribbles: 0,
  //     offensiveDuelsWon: 0,
  //     penaltiesConversion: 0,
  //     shotsOnTarget: 0,
  //     successfulDribbles: 0,
  //     successfulGoalKicks: 0,
  //     successfulLinkupPlays: 0,
  //     successfulPassesToFinalThird: 0,
  //     successfulShotAssists: 23,
  //   },
  //   Total: {
  //     assists: 0,
  //     accelerations: 0,
  //     attackingActions: 0,
  //     counterpressingRecoveries: 0,
  //     dangerousOpponentHalfRecoveries: 0,
  //     dribbles: 0,
  //     freeKicks: 0,
  //     freeKicksOnTarget: 0,
  //     goals: 0,
  //     directFreeKicks: 0,
  //     directFreeKicksOnTarget: 0,
  //     headShots: 0,
  //     linkupPlays: 0,
  //     newOffensiveDuelsWon: 0,
  //     newSuccessfulDribbles: 0,
  //     offensiveDuels: 0,
  //     offensiveDuelsWon: 0,
  //     offsides: 0,
  //     opponentHalfRecoveries: 0,
  //     penalties: 0,
  //     pressingDuels: 0,
  //     pressingDuelsWon: 0,
  //     progressiveRun: 0,
  //     recoveries: 0,
  //     secondAssists: 0,
  //     shotAssists: 0,
  //     shotOnTargetAssists: 0,
  //     shots: 0,
  //     shotsOnTarget: 0,
  //     successfulAttackingActions: 0,
  //     successfulDribbles: 0,
  //     successfulLinkupPlays: 0,
  //     successfulPenalties: 0,
  //     thirdAssists: 0,
  //     touchInBox: 0,
  //   },
  // };

  // const Defense = {
  //   Average: {
  //     aerialDuels: 0,
  //     ballLosses: 0,
  //     ballRecoveries: 0,
  //     clearances: 0,
  //     defensiveActions: 0,
  //     defensiveDuels: 0,
  //     defensiveDuelsWon: 0,
  //     dribblesAgainst: 0,
  //     dribblesAgainstWon: 0,
  //     duels: 0,
  //     duelsWon: 0,
  //     fieldAerialDuels: 0,
  //     fieldAerialDuelsWon: 0,
  //     interceptions: 0,
  //     missedBalls: 0,
  //     newDefensiveDuelsWon: 0,
  //     newDuelsWon: 0,
  //     ownHalfLosses: 0,
  //     shotsBlocked: 0,
  //     slidingTackles: 0,
  //     successfulDefensiveAction: 0,
  //   },
  //   Percentage: {
  //     aerialDuelsWon: 0,
  //     defensiveDuelsWon: 0,
  //     dribblesAgainstWon: 0,
  //     duelsWon: 0,
  //     fieldAerialDuelsWon: 0,
  //     newDefensiveDuelsWon: 0,
  //     newDuelsWon: 0,
  //     successfulSlidingTackles: 0,
  //   },
  //   Total: {
  //     aerialDuels: 0,
  //     aerialDuelsWon: 0,
  //     clearances: 0,
  //     dangerousOwnHalfLosses: 0,
  //     defensiveActions: 0,
  //     defensiveDuels: 0,
  //     defensiveDuelsWon: 0,
  //     dribblesAgainst: 0,
  //     dribblesAgainstWon: 0,
  //     duels: 0,
  //     duelsWon: 0,
  //     fieldAerialDuels: 0,
  //     fieldAerialDuelsWon: 0,
  //     interceptions: 0,
  //     looseBallDuels: 0,
  //     looseBallDuelsWon: 0,
  //     losses: 0,
  //     missedBalls: 0,
  //     newDefensiveDuelsWon: 0,
  //     newDuelsWon: 0,
  //     ownHalfLosses: 0,
  //     shotsBlocked: 0,
  //     slidingTackles: 0,
  //     successfulDefensiveAction: 0,
  //     successfulSlidingTackles: 0,
  //   },
  // };

  // const Distribution = {
  //   Average: {
  //     receivedPass: 0,
  //     backPasses: 0,
  //     corners: 0,
  //     crosses: 0,
  //     forwardPasses: 0,
  //     keyPasses: 0,
  //     lateralPasses: 0,
  //     longPasses: 0,
  //     passLength: 0,
  //     passes: 0,
  //     passesToFinalThird: 0,
  //     progressivePasses: 0,
  //     smartPasses: 0,
  //     successfulBackPasses: 0,
  //     successfulCrosses: 0,
  //     successfulForwardPasses: 0,
  //     successfulKeyPasses: 0,
  //     successfulLateralPasses: 0,
  //     successfulLongPasses: 0,
  //     successfulPasses: 0,
  //     successfulPassesToFinalThird: 0,
  //     successfulProgressivePasses: 0,
  //     successfulSmartPasses: 0,
  //     successfulThroughPasses: 0,
  //     successfulVerticalPasses: 0,
  //     throughPasses: 0,
  //     verticalPasses: 0,
  //   },
  //   Percentage: {
  //     successfulBackPasses: 0,
  //     successfulCrosses: 0,
  //     successfulForwardPasses: 0,
  //     successfulKeyPasses: 0,
  //     successfulLateralPasses: 0,
  //     successfulLongPasses: 0,
  //     successfulPasses: 0,
  //     successfulProgressivePasses: 0,
  //     successfulSmartPasses: 0,
  //     successfulThroughPasses: 0,
  //     successfulVerticalPasses: 0,
  //   },
  //   Total: {
  //     backPasses: 0,
  //     corners: 0,
  //     crosses: 0,
  //     forwardPasses: 0,
  //     keyPasses: 0,
  //     lateralPasses: 0,
  //     longPasses: 0,
  //     passes: 0,
  //     passesToFinalThird: 0,
  //     progressivePasses: 0,
  //     receivedPass: 0,
  //     smartPasses: 0,
  //     successfulBackPasses: 0,
  //     successfulCrosses: 0,
  //     successfulForwardPasses: 0,
  //     successfulKeyPasses: 0,
  //     successfulLateralPasses: 0,
  //     successfulLongPasses: 0,
  //     successfulPasses: 0,
  //     successfulPassesToFinalThird: 0,
  //     successfulProgressivePasses: 0,
  //     successfulSmartPasses: 0,
  //     successfulThroughPasses: 0,
  //     successfulVerticalPasses: 0,
  //     throughPasses: 0,
  //     verticalPasses: 0,
  //   },
  // };

  // const General = {
  //   Average: {
  //     directRedCards: 0,
  //     fouls: 0,
  //     foulsSuffered: 0,
  //     offsides: 0,
  //     redCards: 0,
  //     yellowCards: 0,
  //     goalKicks: 0,
  //     goalKicksLong: 0,
  //     goalKicksShort: 0,
  //     losses: 0,
  //   },
  //   Percentage: {
  //     win: 0,
  //     yellowCardsPerFoul: 0,
  //   },
  //   Total: {
  //     directRedCards: 0,
  //     fouls: 0,
  //     foulsSuffered: 0,
  //     matches: 0,
  //     matchesComingOff: 0,
  //     matchesInStart: 0,
  //     matchesSubstituted: 0,
  //     minutesOnField: 0,
  //     minutesTagged: 0,
  //     redCards: 0,
  //     yellowCards: 0,
  //     goalKicks: 0,
  //     goalKicksLong: 0,
  //     goalKicksShort: 0,
  //     successfulGoalKicks: 0,
  //   },
  // };

  // const GoalKeeper = {
  //   Average: {
  //     gkAerialDuels: 0,
  //     gkAerialDuelsWon: 0,
  //     gkConcededGoals: 0,
  //     gkExits: 0,
  //     gkSaves: 0,
  //     gkShotsAgainst: 0,
  //     gkSuccessfulExits: 0,
  //     xgAssist: 0,
  //     xgSave: 0,
  //     xgShot: 0,
  //     goalKicks: 0,
  //     goalKicksLong: 0,
  //     goalKicksShort: 0,
  //   },
  //   Percentage: {
  //     gkAerialDuelsWon: 0,
  //     gkSaves: 0,
  //     gkSuccessfulExits: 0,
  //   },
  //   Total: {
  //     gkAerialDuels: 0,
  //     gkAerialDuelsWon: 0,
  //     gkCleanSheets: 0,
  //     gkConcededGoals: 0,
  //     gkExits: 0,
  //     gkSaves: 0,
  //     gkShotsAgainst: 0,
  //     gkSuccessfulExits: 0,
  //     xgAssist: 0,
  //     xgSave: 0,
  //     xgShot: 0,
  //     goalKicks: 0,
  //     goalKicksLong: 0,
  //     goalKicksShort: 0,
  //     successfulGoalKicks: 0,
  //   },
  // };

  const [Attack, setAttack] = useState([]);
  const [Defense, setDefense] = useState([]);
  const [Distribution, setDistribution] = useState([]);
  const [General, setGeneral] = useState([]);
  const [GoalKeeper, setGoalKeeper] = useState([]);

  const [matchMenu, setMatchMenu] = useState([]);

  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedPlayerObject, setSelectedPlayerObject] = useState({});
  const [selectedPlayerTeamObject, setSelectedPlayerTeamObject] = useState({});

  const [
    selectedPlayerStatsPerSelectedSeason,
    setSelectedPlayerStatsPerSelectedSeason,
  ] = useState({});

  const [selectedStatsTypeOption, setSelectedStatsTypeOption] =
    useState("Total");
  const [selectedMatchLabel, setSelectedMatchLabel] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [playerIdsToBeRendered, setPlayerIdsToBeRendered] = useState([]);

  const handleStatsTypeSelectChange = (event) => {
    // alert(event.target.value);
    setSelectedStatsTypeOption(event.target.value);
    console.log(Attack, Defense, Distribution, General, GoalKeeper);
  };

  const calculateAge = () => {
    const birthDate = moment(
      selectedPlayerObject?.["date_of_birth"],
      "YYYY-MM-DD"
    );
    const today = moment();
    return today.diff(birthDate, "years");
  };

  const playerAge = calculateAge();

  useEffect(() => {
    console.log(
      "DataSorted",
      Attack,
      Defense,
      Distribution,
      General,
      GoalKeeper
    );
  }, [Attack, Defense, Distribution, General, GoalKeeper]);

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Insert a space before each uppercase letter
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const allPlayer = useSelector(selectPlayersDatabase);
  const allTeamsInDatabase = useSelector(selectClubsInDatabase);

  const {
    status,
    data: requestedPlayersIds,
    error,
    refetch,
    isFetching: isFectchingReqeustedPlayersIds,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      try {
        const UserdocRef = doc(
          db,
          `users_db/${userLoginDetailsObject?.accountId}`
        );

        const docSnapshot = await getDoc(UserdocRef);
        const existingArray =
          docSnapshot.data()?.idsOfRequestedPlayersStats || [];

        console.log(existingArray, "retireivedPlayers");
        return existingArray;
      } catch (error) {
        console.log(error);
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  // Fetching STATS FOR PARTICULAR SEASON
  // /users_db/xQXGWGmzJjZzDfJJD7Fw0NzR7h03/requestedAdvancedStatisics/1024625/23-24/playerStatstics

  const fetchStatsForSelectPlayerForSelectedSeason = async (
    selectedSeasonValue
  ) => {
    const selectedPlayerRequestedSeasonStats = doc(
      db,
      `users_db/${userLoginDetailsObject?.accountId}/requestedAdvancedStatisics/${selectedPlayer}/${selectedSeasonValue}/playerStatstics`
    );

    const docSnapshot = await getDoc(selectedPlayerRequestedSeasonStats);
    console.log(docSnapshot.data(), "seasonStats");

    if (docSnapshot.data()) {
      setSelectedPlayerStatsPerSelectedSeason(docSnapshot.data());
    } else {
      setAttack([]);
      setDefense([]);
      setDistribution([]);
      setGeneral([]);
      setGoalKeeper([]);
      setMatchMenu([]);
      setSelectedPlayerStatsPerSelectedSeason({});
      setSelectedStatsTypeOption("Total");
      setSelectedMatchLabel("");
    }
  };

  // to refresh data when a defrent player is selected

  useEffect(() => {
    setAttack([]);
    setDefense([]);
    setDistribution([]);
    setGeneral([]);
    setGoalKeeper([]);
    setMatchMenu([]);
    setSelectedPlayerStatsPerSelectedSeason({});
    setSelectedStatsTypeOption("Total");
    setSelectedMatchLabel("");
  }, [selectedPlayer]);

  // THIS IS TO POULATE THE MATHCES SELECT WIH ALL THE MATCHES IN THE  SEASON
  useEffect(() => {
    if (selectedPlayerStatsPerSelectedSeason?.stats) {
      const newMatchesArray = selectedPlayerStatsPerSelectedSeason?.stats?.map(
        (item) => ({
          label: item.label,
          value: item.matchId,
        })
      );

      setMatchMenu(newMatchesArray);
    }

    // selectedPlayerStatsPerSelectedSeason?.stats?.label
  }, [selectedPlayerStatsPerSelectedSeason]);

  // THIS IS TO RETRIEVE THE PARTICULAR MATCH STATS AND ALSO GROUP THEM ACCOUDING TO STATS CATEGORIES AND ALSO DATA TYPE

  // const handelMatchDataChanged =(matchId)=>{
  //   // FIND THE PARTICULAR MATCH AND RETRIEVE THE STATS

  //   //RETREIVE THE DATA FROM THE STATS DATA ACCORDING TO THE FORMATS I HAVE PROVIDED   ATTACK , DISTRIBUTION ,  DEFNESE ,General , gOALKEEPER

  // }

  const organizeStats = (matchId) => {
    // selectedStatsTypeOption

    setSelectedStatsTypeOption(matchId);

    // alert(matchId);
    const match = selectedPlayerStatsPerSelectedSeason?.stats.find(
      (match) => match.matchId === matchId
    );

    if (!match || !match.stats) {
      console.log("Match not found or stats not available");
    }

    console.log(match, "selectedMatch");

    const { stats } = match || {};

    const { average, percent, total } = stats || {};

    setSelectedStatsTypeOption("Total");

    console.log("averageData", average, percent, total);
    const Attack = {
      Average: {
        accelerations: average.accelerations || 0,
        aerialDuels: average.aerialDuels || 0,
        assists: average.assists || 0,
        attackingActions: average.attackingActions || 0,
        backPasses: average.backPasses || 0,
        ballLosses: average.ballLosses || 0,
        ballRecoveries: average.ballRecoveries || 0,
        clearances: average.clearances || 0,
        corners: average.corners || 0,
        counterpressingRecoveries: average.counterpressingRecoveries || 0,
        crosses: average.crosses || 0,
        dangerousOpponentHalfRecoveries:
          average.dangerousOpponentHalfRecoveries || 0,
        dangerousOwnHalfLosses: average.dangerousOwnHalfLosses || 0,
        defensiveActions: average.defensiveActions || 0,
        defensiveDuels: average.defensiveDuels || 0,
        defensiveDuelsWon: average.defensiveDuelsWon || 0,
        directFreeKicks: average.directFreeKicks || 0,
        directFreeKicksOnTarget: average.directFreeKicksOnTarget || 0,
        directRedCards: average.directRedCards || 0,
        dribbleDistanceFromOpponentGoal:
          average.dribbleDistanceFromOpponentGoal || 0,
        dribbles: average.dribbles || 0,
        dribblesAgainst: average.dribblesAgainst || 0,
        dribblesAgainstWon: average.dribblesAgainstWon || 0,
        duels: average.duels || 0,
        duelsWon: average.duelsWon || 0,
        fieldAerialDuels: average.fieldAerialDuels || 0,
        fieldAerialDuelsWon: average.fieldAerialDuelsWon || 0,
        forwardPasses: average.forwardPasses || 0,
        fouls: average.fouls || 0,
        foulsSuffered: average.foulsSuffered || 0,
        freeKicks: average.freeKicks || 0,
        freeKicksOnTarget: average.freeKicksOnTarget || 0,
        goals: average.goals || 0,
        headShots: average.headShots || 0,
        interceptions: average.interceptions || 0,
        keyPasses: average.keyPasses || 0,
        lateralPasses: average.lateralPasses || 0,
        linkupPlays: average.linkupPlays || 0,
        longPassLength: average.longPassLength || 0,
        longPasses: average.longPasses || 0,
        looseBallDuels: average.looseBallDuels || 0,
        looseBallDuelsWon: average.looseBallDuelsWon || 0,
        losses: average.losses || 0,
        missedBalls: average.missedBalls || 0,
        newDefensiveDuelsWon: average.newDefensiveDuelsWon || 0,
        newDuelsWon: average.newDuelsWon || 0,
        newOffensiveDuelsWon: average.newOffensiveDuelsWon || 0,
        newSuccessfulDribbles: average.newSuccessfulDribbles || 0,
        offensiveDuels: average.offensiveDuels || 0,
        offensiveDuelsWon: average.offensiveDuelsWon || 0,
        offsides: average.offsides || 0,
        opponentHalfRecoveries: average.opponentHalfRecoveries || 0,
        ownHalfLosses: average.ownHalfLosses || 0,
        passLength: average.passLength || 0,
        passes: average.passes || 0,
        passesToFinalThird: average.passesToFinalThird || 0,
        penalties: average.penalties || 0,
        progressivePasses: average.progressivePasses || 0,
        progressiveRun: average.progressiveRun || 0,
        receivedPass: average.receivedPass || 0,
        redCards: average.redCards || 0,
        secondAssists: average.secondAssists || 0,
        shotAssists: average.shotAssists || 0,
        shotOnTargetAssists: average.shotOnTargetAssists || 0,
        shots: average.shots || 0,
        shotsBlocked: average.shotsBlocked || 0,
        shotsOnTarget: average.shotsOnTarget || 0,
        slidingTackles: average.slidingTackles || 0,
        smartPasses: average.smartPasses || 0,
        successfulAttackingActions: average.successfulAttackingActions || 0,
        successfulBackPasses: average.successfulBackPasses || 0,
        successfulCrosses: average.successfulCrosses || 0,
        successfulDefensiveAction: average.successfulDefensiveAction || 0,
        successfulDribbles: average.successfulDribbles || 0,
        successfulForwardPasses: average.successfulForwardPasses || 0,
        successfulGoalKicks: average.successfulGoalKicks || 0,
        successfulKeyPasses: average.successfulKeyPasses || 0,
        successfulLateralPasses: average.successfulLateralPasses || 0,
        successfulLinkupPlays: average.successfulLinkupPlays || 0,
        successfulLongPasses: average.successfulLongPasses || 0,
        successfulPasses: average.successfulPasses || 0,
        successfulPassesToFinalThird: average.successfulPassesToFinalThird || 0,
        successfulPenalties: average.successfulPenalties || 0,
        successfulProgressivePasses: average.successfulProgressivePasses || 0,
        successfulSlidingTackles: average.successfulSlidingTackles || 0,
        successfulSmartPasses: average.successfulSmartPasses || 0,
        successfulThroughPasses: average.successfulThroughPasses || 0,
        successfulVerticalPasses: average.successfulVerticalPasses || 0,
        thirdAssists: average.thirdAssists || 0,
        throughPasses: average.throughPasses || 0,
        touchInBox: average.touchInBox || 0,
        verticalPasses: average.verticalPasses || 0,
        xgAssist: average.xgAssist || 0,
        xgSave: average.xgSave || 0,
        xgShot: average.xgShot || 0,
        yellowCards: average.yellowCards || 0,
      },
      Percentage: {
        directFreeKicksOnTarget: percent?.directFreeKicksOnTarget || 0,
        goalConversion: percent?.goalConversion || 0,
        headShotsOnTarget: percent?.headShotsOnTarget || 0,
        newOffensiveDuelsWon: percent?.newOffensiveDuelsWon || 0,
        offensiveDuelsWon: percent?.offensiveDuelsWon || 0,
        penaltiesConversion: percent?.penaltiesConversion || 0,
        shotsOnTarget: percent?.shotsOnTarget || 0,
        successfulDribbles: percent?.successfulDribbles || 0,
        successfulGoalKicks: percent?.successfulGoalKicks || 0,
        successfulLinkupPlays: percent?.successfulLinkupPlays || 0,
        successfulPassesToFinalThird:
          percent?.successfulPassesToFinalThird || 0,
        successfulShotAssists: percent?.successfulShotAssists || 0,
      },
      Total: {
        assists: total.assists || 0,
        accelerations: total.accelerations || 0,
        attackingActions: total.attackingActions || 0,
        counterpressingRecoveries: total.counterpressingRecoveries || 0,
        dangerousOpponentHalfRecoveries:
          total.dangerousOpponentHalfRecoveries || 0,
        dangerousOwnHalfLosses: total.dangerousOwnHalfLosses || 0,
        directFreeKicks: total.directFreeKicks || 0,
        directFreeKicksOnTarget: total.directFreeKicksOnTarget || 0,
        dribbleDistanceFromOpponentGoal:
          total.dribbleDistanceFromOpponentGoal || 0,
        dribbles: total.dribbles || 0,
        freeKicks: total.freeKicks || 0,
        freeKicksOnTarget: total.freeKicksOnTarget || 0,
        goals: total.goals || 0,
        headShots: total.headShots || 0,
        linkupPlays: total.linkupPlays || 0,
        longPassLength: total.longPassLength || 0,
        looseBallDuels: total.looseBallDuels || 0,
        looseBallDuelsWon: total.looseBallDuelsWon || 0,
        newOffensiveDuelsWon: total.newOffensiveDuelsWon || 0,
        newSuccessfulDribbles: total.newSuccessfulDribbles || 0,
        offensiveDuels: total.offensiveDuels || 0,
        offensiveDuelsWon: total.offensiveDuelsWon || 0,
        opponentHalfRecoveries: total.opponentHalfRecoveries || 0,
        penalties: total.penalties || 0,
        progressiveRun: total.progressiveRun || 0,
        secondAssists: total.secondAssists || 0,
        shotAssists: total.shotAssists || 0,
        shotOnTargetAssists: total.shotOnTargetAssists || 0,
        shots: total.shots || 0,
        shotsOnTarget: total.shotsOnTarget || 0,
        slidingTackles: total.slidingTackles || 0,
        successfulAttackingActions: total.successfulAttackingActions || 0,
        successfulDribbles: total.successfulDribbles || 0,
        successfulForwardPasses: total.successfulForwardPasses || 0,
        successfulGoalKicks: total.successfulGoalKicks || 0,
        successfulKeyPasses: total.successfulKeyPasses || 0,
        successfulLateralPasses: total.successfulLateralPasses || 0,
        successfulLinkupPlays: total.successfulLinkupPlays || 0,
        successfulLongPasses: total.successfulLongPasses || 0,
        successfulPasses: total.successfulPasses || 0,
        successfulPassesToFinalThird: total.successfulPassesToFinalThird || 0,
        successfulPenalties: total.successfulPenalties || 0,
        successfulProgressivePasses: total.successfulProgressivePasses || 0,
        successfulSlidingTackles: total.successfulSlidingTackles || 0,
        successfulSmartPasses: total.successfulSmartPasses || 0,
        successfulThroughPasses: total.successfulThroughPasses || 0,
        successfulVerticalPasses: total.successfulVerticalPasses || 0,
        thirdAssists: total.thirdAssists || 0,
        throughPasses: total.throughPasses || 0,
        touchInBox: total.touchInBox || 0,
        verticalPasses: total.verticalPasses || 0,
        xgAssist: total.xgAssist || 0,
        xgSave: total.xgSave || 0,
        xgShot: total.xgShot || 0,
        yellowCards: total.yellowCards || 0,
      },
    };

    // console.log(Attack);

    const Distribution = {
      Average: {
        receivedPass: average.receivedPass || 0,
        backPasses: average.backPasses || 0,
        corners: average.corners || 0,
        crosses: average.crosses || 0,
        forwardPasses: average.forwardPasses || 0,
        keyPasses: average.keyPasses || 0,
        lateralPasses: average.lateralPasses || 0,
        longPasses: average.longPasses || 0,
        passLength: average.passLength || 0,
        passes: average.passes || 0,
        passesToFinalThird: average.passesToFinalThird || 0,
        progressivePasses: average.progressivePasses || 0,
        smartPasses: average.smartPasses || 0,
        successfulBackPasses: average.successfulBackPasses || 0,
        successfulCrosses: average.successfulCrosses || 0,
        successfulForwardPasses: average.successfulForwardPasses || 0,
        successfulKeyPasses: average.successfulKeyPasses || 0,
        successfulLateralPasses: average.successfulLateralPasses || 0,
        successfulLongPasses: average.successfulLongPasses || 0,
        successfulPasses: average.successfulPasses || 0,
        successfulPassesToFinalThird: average.successfulPassesToFinalThird || 0,
        successfulProgressivePasses: average.successfulProgressivePasses || 0,
        successfulSmartPasses: average.successfulSmartPasses || 0,
        successfulThroughPasses: average.successfulThroughPasses || 0,
        successfulVerticalPasses: average.successfulVerticalPasses || 0,
        throughPasses: average.throughPasses || 0,
        verticalPasses: average.verticalPasses || 0,
      },
      Percentage: {
        successfulBackPasses: percent?.successfulBackPasses || 0,
        successfulCrosses: percent?.successfulCrosses || 0,
        successfulForwardPasses: percent.successfulForwardPasses || 0,
        successfulKeyPasses: percent.successfulKeyPasses || 0,
        successfulLateralPasses: percent.successfulLateralPasses || 0,
        successfulLongPasses: percent.successfulLongPasses || 0,
        successfulPasses: percent.successfulPasses || 0,
        successfulProgressivePasses: percent.successfulProgressivePasses || 0,
        successfulSmartPasses: percent.successfulSmartPasses || 0,
        successfulThroughPasses: percent.successfulThroughPasses || 0,
        successfulVerticalPasses: percent.successfulVerticalPasses || 0,
      },
      Total: {
        backPasses: total.backPasses || 0,
        corners: total.corners || 0,
        crosses: total.crosses || 0,
        forwardPasses: total.forwardPasses || 0,
        keyPasses: total.keyPasses || 0,
        lateralPasses: total.lateralPasses || 0,
        longPasses: total.longPasses || 0,
        passes: total.passes || 0,
        passesToFinalThird: total.passesToFinalThird || 0,
        progressivePasses: total.progressivePasses || 0,
        receivedPass: total.receivedPass || 0,
        smartPasses: total.smartPasses || 0,
        successfulBackPasses: total.successfulBackPasses || 0,
        successfulCrosses: total.successfulCrosses || 0,
        successfulForwardPasses: total.successfulForwardPasses || 0,
        successfulKeyPasses: total.successfulKeyPasses || 0,
        successfulLateralPasses: total.successfulLateralPasses || 0,
        successfulLongPasses: total.successfulLongPasses || 0,
        successfulPasses: total.successfulPasses || 0,
        successfulPassesToFinalThird: total.successfulPassesToFinalThird || 0,
        successfulProgressivePasses: total.successfulProgressivePasses || 0,
        successfulSmartPasses: total.successfulSmartPasses || 0,
        successfulThroughPasses: total.successfulThroughPasses || 0,
        successfulVerticalPasses: total.successfulVerticalPasses || 0,
        throughPasses: total.throughPasses || 0,
        verticalPasses: total.verticalPasses || 0,
      },
    };

    console.log(Distribution);

    const General = {
      Average: {
        directRedCards: average.directRedCards || 0,
        fouls: average.fouls || 0,
        foulsSuffered: average.foulsSuffered || 0,
        offsides: average.offsides || 0,
        redCards: average.redCards || 0,
        yellowCards: average.yellowCards || 0,
        goalKicks: average.goalKicks || 0,
        goalKicksLong: average.goalKicksLong || 0,
        goalKicksShort: average.goalKicksShort || 0,
        losses: average.losses || 0,
      },
      Percentage: {
        win: percent.win || 0,
        yellowCardsPerFoul: percent.yellowCardsPerFoul || 0,
      },
      Total: {
        directRedCards: total.directRedCards || 0,
        fouls: total.fouls || 0,
        foulsSuffered: total.foulsSuffered || 0,
        matches: total.matches || 0,
        matchesComingOff: total.matchesComingOff || 0,
        matchesInStart: total.matchesInStart || 0,
        matchesSubstituted: total.matchesSubstituted || 0,
        minutesOnField: total.minutesOnField || 0,
        minutesTagged: total.minutesTagged || 0,
        redCards: total.redCards || 0,
        yellowCards: total.yellowCards || 0,
        goalKicks: total.goalKicks || 0,
        goalKicksLong: total.goalKicksLong || 0,
        goalKicksShort: total.goalKicksShort || 0,
        successfulGoalKicks: total.successfulGoalKicks || 0,
      },
    };

    console.log(General);

    const GoalKeeper = {
      Average: {
        gkAerialDuels: average.gkAerialDuels || 0,
        gkAerialDuelsWon: average.gkAerialDuelsWon || 0,
        gkConcededGoals: average.gkConcededGoals || 0,
        gkExits: average.gkExits || 0,
        gkSaves: average.gkSaves || 0,
        gkShotsAgainst: average.gkShotsAgainst || 0,
        gkSuccessfulExits: average.gkSuccessfulExits || 0,
        xgAssist: average.xgAssist || 0,
        xgSave: average.xgSave || 0,
        xgShot: average.xgShot || 0,
        goalKicks: average.goalKicks || 0,
        goalKicksLong: average.goalKicksLong || 0,
        goalKicksShort: average.goalKicksShort || 0,
      },
      Percentage: {
        gkAerialDuelsWon: percent.gkAerialDuelsWon || 0,
        gkSaves: percent.gkSaves || 0,
        gkSuccessfulExits: percent.gkSuccessfulExits || 0,
      },
      Total: {
        gkAerialDuels: total.gkAerialDuels || 0,
        gkAerialDuelsWon: total.gkAerialDuelsWon || 0,
        gkCleanSheets: total.gkCleanSheets || 0,
        gkConcededGoals: total.gkConcededGoals || 0,
        gkExits: total.gkExits || 0,
        gkSaves: total.gkSaves || 0,
        gkShotsAgainst: total.gkShotsAgainst || 0,
        gkSuccessfulExits: total.gkSuccessfulExits || 0,
        xgAssist: total.xgAssist || 0,
        xgSave: total.xgSave || 0,
        xgShot: total.xgShot || 0,
        goalKicks: total.goalKicks || 0,
        goalKicksLong: total.goalKicksLong || 0,
        goalKicksShort: total.goalKicksShort || 0,
        successfulGoalKicks: total.successfulGoalKicks || 0,
      },
    };

    console.log(GoalKeeper);

    const Defense = {
      Average: {
        aerialDuels: average.aerialDuels || 0,
        ballLosses: average.ballLosses || 0,
        ballRecoveries: average.ballRecoveries || 0,
        clearances: average.clearances || 0,
        defensiveActions: average.defensiveActions || 0,
        defensiveDuels: average.defensiveDuels || 0,
        defensiveDuelsWon: average.defensiveDuelsWon || 0,
        dribblesAgainst: average.dribblesAgainst || 0,
        dribblesAgainstWon: average.dribblesAgainstWon || 0,
        duels: average.duels || 0,
        duelsWon: average.duelsWon || 0,
        fieldAerialDuels: average.fieldAerialDuels || 0,
        fieldAerialDuelsWon: average.fieldAerialDuelsWon || 0,
        interceptions: average.interceptions || 0,
        missedBalls: average.missedBalls || 0,
        newDefensiveDuelsWon: average.newDefensiveDuelsWon || 0,
        newDuelsWon: average.newDuelsWon || 0,
        ownHalfLosses: average.ownHalfLosses || 0,
        shotsBlocked: average.shotsBlocked || 0,
        slidingTackles: average.slidingTackles || 0,
        successfulDefensiveAction: average.successfulDefensiveAction || 0,
      },
      Percentage: {
        aerialDuelsWon: percent?.aerialDuelsWon || 0,
        defensiveDuelsWon: percent?.defensiveDuelsWon || 0,
        dribblesAgainstWon: percent?.dribblesAgainstWon || 0,
        duelsWon: percent?.duelsWon || 0,
        fieldAerialDuelsWon: percent?.fieldAerialDuelsWon || 0,
        newDefensiveDuelsWon: percent?.newDefensiveDuelsWon || 0,
        newDuelsWon: percent?.newDuelsWon || 0,
        successfulSlidingTackles: percent?.successfulSlidingTackles || 0,
      },
      Total: {
        aerialDuels: total.aerialDuels || 0,
        aerialDuelsWon: total.aerialDuelsWon || 0,
        clearances: total.clearances || 0,
        dangerousOwnHalfLosses: total.dangerousOwnHalfLosses || 0,
        defensiveActions: total.defensiveActions || 0,
        defensiveDuels: total.defensiveDuels || 0,
        defensiveDuelsWon: total.defensiveDuelsWon || 0,
        dribblesAgainst: total.dribblesAgainst || 0,
        dribblesAgainstWon: total.dribblesAgainstWon || 0,
        duels: total.duels || 0,
        duelsWon: total.duelsWon || 0,
        fieldAerialDuels: total.fieldAerialDuels || 0,
        fieldAerialDuelsWon: total.fieldAerialDuelsWon || 0,
        interceptions: total.interceptions || 0,
        looseBallDuels: total.looseBallDuels || 0,
        looseBallDuelsWon: total.looseBallDuelsWon || 0,
        losses: total.losses || 0,
        missedBalls: total.missedBalls || 0,
        newDefensiveDuelsWon: total.newDefensiveDuelsWon || 0,
        newDuelsWon: total.newDuelsWon || 0,
        ownHalfLosses: total.ownHalfLosses || 0,
        shotsBlocked: total.shotsBlocked || 0,
        slidingTackles: total.slidingTackles || 0,
        successfulDefensiveAction: total.successfulDefensiveAction || 0,
        successfulSlidingTackles: total.successfulSlidingTackles || 0,
      },
    };

    setAttack(Attack);
    setDefense(Defense);
    setDistribution(Distribution);
    setGeneral(General);
    setGoalKeeper(GoalKeeper);
  };

  // Algo to filter players based on name typed

  useEffect(() => {
    const FoundPlayersArray = requestedPlayersIds
      ?.map((data) => {
        return allPlayer.find((player) => data === player?.id);
      })
      .filter((player) => player !== undefined);

    if (searchValue.trim() === "") {
      // set tjhe array filtered to an array of ids of the objects ffound
      setPlayerIdsToBeRendered(requestedPlayersIds);
    } else {
      const filteredPlayers = FoundPlayersArray?.filter(
        (data) =>
          data?.firstName
            ?.trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase()) ||
          data?.surName
            ?.trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
      );

      const filteredPlayersId = filteredPlayers?.map((player) => player.id);

      setPlayerIdsToBeRendered(filteredPlayersId);
    }
  }, [searchValue]);

  useEffect(() => {
    setPlayerIdsToBeRendered(requestedPlayersIds);
  }, [requestedPlayersIds]);

  const navigate = useNavigate();

  const handleProfileView = () => {
    navigate(`/player-details/${selectedPlayer}`);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: ".1",
          // background: "red",
          // display: "flex",.
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "4vw",
        }}
        className="flex sm:flex-col md:flex-row lg:flex-row"
      >
        <h4>Requested stats</h4>

        {/* {selectedSources} */}
      </div>
      <div
        style={{
          flex: ".9",
          // display: "flex",
          borderRadius: "1vw",
          padding: "1vw",
          // background: "peru",
          maxHeight: "80vh",
        }}
        className="cardBackground flex sm:flex-col md:flex-row lg:flex-row"
      >
        {/* Names of Players  */}
        <div
          style={{
            flex: ".23",
            paddingRight: "1vw",
            display: "flex",
            flexDirection: "column",
            // background: "red",
          }}
        >
          <div style={{ flex: ".1" }}>
            <TextField
              id="outlined-select-currency"
              size="small"
              variant="outlined"
              style={{ marginBottom: "1vh" }}
              label="Search"
              fullwidth
              // defaultValue="23/24"
              // className="md:w-[15%] sm:w-[90%]"
              // style={{ width: "15%" }}
              onChange={(e) => {
                // alert(e.target.value);
                // setStatsSeason(e.target.value);

                setSearchValue(e.target.value);
              }}
            />
          </div>

          {isFectchingReqeustedPlayersIds ? (
            <div
              style={{ flex: ".9", display: "flex", justifyContent: "center" }}
            >
              <CircularProgress />
            </div>
          ) : playerIdsToBeRendered?.length === 0 ? (
            "No player found"
          ) : (
            <div style={{ flex: ".9", overflowY: "scroll" }}>
              {playerIdsToBeRendered?.map((data, key) => {
                const foundPlayerObject = allPlayer.find(
                  (player) => data === player?.id
                );
                const foundTeamObject = allTeamsInDatabase.find(
                  (team) => team?.wyId === foundPlayerObject?.currentTeamId
                );

                return (
                  <span
                    onClick={() => {
                      setSelectedPlayer(data);
                      setSelectedPlayerObject(foundPlayerObject);
                      setSelectedPlayerTeamObject(foundTeamObject);
                    }}
                    key={key}
                  >
                    <AdvancedStatsPlayerCard
                      image={foundPlayerObject?.player_profile_image}
                      firstName={foundPlayerObject?.firstName}
                      surName={foundPlayerObject?.surName}
                      clubImage={foundTeamObject?.imageDataURL}
                      clubName={foundTeamObject?.name}
                    />
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* src= */}
        {/* src="https://cdn5.wyscout.com/photos/team/public/1208_120x120.png" */}

        {/* Stats of Players  */}
        {selectedPlayer === "" ? (
          <div
            style={{
              flex: ".77",
              // background: "red",
              textAlign: "center",
            }}
          >
            {" "}
            <h3> Select a player to view data </h3>{" "}
          </div>
        ) : (
          <div
            style={{
              flex: ".77",
              // background: "red",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header and Season Selector Area */}
            <div
              style={{
                flex: ".1",
                paddingRight: "4vw",
                // , textAlign:"center"
              }}
            >
              <h5>
                {" "}
                {/* Player Stats{" "} */}
                {selectedPlayer.length === 0 ? (
                  ""
                ) : (
                  <div
                    style={{ float: "left", marginRight: "1vw" }}
                    onClick={handleProfileView}
                  >
                    <BasicButton
                      style={{
                        textTransform: "none",
                        color: "white",
                        fontWeight: "bold",
                        // zIndex: "1000",
                      }}
                      innerText={"View profile"}
                    />
                  </div>
                )}
                <TextField
                  id="outlined-select-currency"
                  size="small"
                  select
                  style={{ float: "right" }}
                  // label="Select"
                  defaultValue="23/24"
                  className="md:w-[15%] sm:w-[90%]"
                  // style={{ width: "15%" }}
                  onChange={(e) => {
                    // alert(e.target.value);
                    setStatsSeason(e.target.value);
                    fetchStatsForSelectPlayerForSelectedSeason(e.target.value);
                  }}
                >
                  {seasonsMenu.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>{" "}
                <FormControl style={{ float: "right", marginRight: "2vw" }}>
                  <InputLabel id="demo-simple-select-label">Match</InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedMatchLabel}
                    label="Match"
                    defaultValue="Overall"
                    sx={{ width: "10vw" }}
                    onChange={(e) => {
                      setSelectedMatchLabel(e.target.value);
                      organizeStats(e.target.value);
                    }}
                  >
                    {matchMenu?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{ float: "right", marginRight: "2vw" }}>
                  <InputLabel id="demo-simple-select-label">
                    Stats type
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedStatsTypeOption}
                    label="Match"
                    defaultValue="total"
                    sx={{ width: "10vw" }}
                    onChange={handleStatsTypeSelectChange}
                    // onChange={(e) => {
                    //   organizeStats(e.target.value);
                    // }}
                  >
                    {statsTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </h5>
            </div>

            {/* Statistics Data Area */}
            <div
              style={{ flex: ".9", display: "flex", flexDirection: "column" }}
            >
              {/* Bio Data and Heat Map */}
              <div
                style={{ flex: ".3" }}
                className="flex  sm:flex-col md:flex-row lg:flex-row"
              >
                {/* Name, Age Position */}

                <div style={{ flex: ".7", display: "flex" }}>
                  {" "}
                  <div style={{ flex: ".4" }}>
                    <h5> {selectedPlayerObject?.firstName} </h5>
                    <h5> {selectedPlayerObject?.surName} </h5>
                    <h6>
                      {" "}
                      Age:{playerAge}
                      {/* {selectedPlayerObject?.}  */}
                    </h6>
                    <h6>Position: {selectedPlayerObject?.position} </h6>
                  </div>
                  {/* player image , clubName , and clublogo */}
                  <div style={{ flex: ".6" }}>
                    <h5>
                      {selectedPlayerTeamObject?.name
                        ? selectedPlayerTeamObject?.name
                        : "Free Agent"}
                    </h5>

                    <div
                      style={{
                        height: "80%",
                        // background: "red",
                        display: "flex",
                        gap: "1vw",
                      }}
                      // className="flex sm:flex-col md:flex-row lg:flex-row"
                    >
                      <Avatar
                        src={selectedPlayerObject?.player_profile_image}
                        sx={{ width: 90, height: 90 }}
                      ></Avatar>

                      {selectedPlayerTeamObject?.imageDataURL ? (
                        <Tooltip title={selectedPlayerTeamObject?.officialName}>
                          <Avatar
                            src={selectedPlayerTeamObject?.imageDataURL}
                            sx={{ width: 60, height: 60 }}
                          ></Avatar>
                        </Tooltip>
                      ) : (
                        <LocalPoliceOutlined sx={{ width: 60, height: 60 }} />
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ flex: ".3" }}>
                  <div
                    style={{
                      flex: "1",
                      // display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center", // Center both rows and columns
                    }}
                    className="flex sm:flex-col md:flex-row lg:flex-row"
                  >
                    {/* Centered h6 tag */}
                    Heat map data not available
                    {/* Centered image */}
                    <img
                      src={pitchImage}
                      style={{ width: "10vw", alignSelf: "center" }}
                    />
                  </div>
                </div>

                {/* Heat map */}
              </div>
              {/*  Statistical Data for all areas */}
              <div
                style={{ flex: ".7", gap: "1vw" }}
                className="flex sm:flex-col md:flex-row lg:flex-row"
              >
                {/* Attacking , Distribution ,  */}

                {selectedPlayerObject?.position == "Goalkeeper" ? (
                  <>
                    <div
                      style={{ flex: ".5", maxHeight: "55vh" }}
                      className="flex sm:flex-col md:flex-row lg:flex-row"
                    >
                      <h6 className="background" style={{ width: "100%" }}>
                        GoalKeeper
                      </h6>
                      <div
                        style={{
                          height: "35vh",
                          // background: "green",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0vh .5vw",
                          overflowY: "scroll",
                        }}
                      >
                        {GoalKeeper.length === 0
                          ? ""
                          : Object.keys(
                              GoalKeeper[selectedStatsTypeOption]
                            ).map((key) => (
                              <div
                                key={key}
                                style={{
                                  width: "48%",
                                  height: "4vh",
                                  // background: "red",
                                  fontSize: ".8em",
                                  margin: "5px 0",
                                  marginBottom: ".5vh",
                                  position: "relative",
                                  lineHeight: "1",
                                }}
                              >
                                <span style={{ paddingRight: ".5vw" }}>
                                  {formatKey(key)}
                                </span>
                                <span
                                  style={{
                                    float: "right",
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                  }}
                                >
                                  {GoalKeeper[selectedStatsTypeOption][key]}
                                  {selectedStatsTypeOption === "Percentage"
                                    ? "%"
                                    : ""}
                                </span>
                              </div>
                            ))}{" "}
                      </div>
                    </div>

                    <div
                      style={{
                        flex: ".5",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* General Side */}
                      <div style={{ flex: ".5", maxHeight: "20vh" }}>
                        <h6 className="background" style={{ width: "100%" }}>
                          General
                        </h6>

                        <div
                          style={{
                            height: "15vh",
                            // background: "green",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0vh .5vw",
                            overflowY: "scroll",
                          }}
                        >
                          {General.length === 0
                            ? ""
                            : Object.keys(General[selectedStatsTypeOption]).map(
                                (key) => (
                                  <div
                                    key={key}
                                    style={{
                                      width: "48%",
                                      height: "4vh",
                                      // background: "red",
                                      fontSize: ".8em",
                                      margin: "5px 0",
                                      marginBottom: ".5vh",
                                      position: "relative",
                                      lineHeight: "1",
                                    }}
                                  >
                                    <span style={{ paddingRight: ".5vw" }}>
                                      {formatKey(key)}
                                    </span>
                                    <span
                                      style={{
                                        float: "right",
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                      }}
                                    >
                                      {General[selectedStatsTypeOption][key]}
                                      {selectedStatsTypeOption === "Percentage"
                                        ? "%"
                                        : ""}
                                    </span>
                                  </div>
                                )
                              )}{" "}
                        </div>
                      </div>
                      {/* Distribution Side */}
                      <div style={{ flex: ".5", maxHeight: "20vh" }}>
                        <h6 className="background" style={{ width: "100%" }}>
                          Distribution
                        </h6>

                        <div
                          style={{
                            height: "15vh",
                            // background: "green",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0vh .5vw",
                            overflowY: "scroll",
                          }}
                        >
                          {Distribution.length === 0
                            ? ""
                            : Object.keys(
                                Distribution[selectedStatsTypeOption]
                              ).map((key) => (
                                <div
                                  key={key}
                                  style={{
                                    width: "48%",
                                    height: "4vh",
                                    // background: "red",
                                    fontSize: ".8em",
                                    margin: "5px 0",
                                    marginBottom: ".5vh",
                                    position: "relative",
                                    lineHeight: "1",
                                  }}
                                >
                                  <span style={{ paddingRight: ".5vw" }}>
                                    {formatKey(key)}
                                  </span>
                                  <span
                                    style={{
                                      float: "right",
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                    }}
                                  >
                                    {Distribution[selectedStatsTypeOption][key]}
                                    {selectedStatsTypeOption === "Percentage"
                                      ? "%"
                                      : ""}
                                  </span>
                                </div>
                              ))}{" "}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        flex: ".5",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Attacking Side */}
                      <div style={{ flex: ".5", maxHeight: "20vh" }}>
                        <h6 className="background" style={{ width: "100%" }}>
                          Attacking
                        </h6>

                        <div
                          style={{
                            height: "15vh",
                            // background: "green",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0vh .5vw",
                            overflowY: "scroll",
                          }}
                        >
                          {Attack.length === 0 && Attack
                            ? ""
                            : Object.keys(Attack[selectedStatsTypeOption]).map(
                                (key) => (
                                  <div
                                    key={key}
                                    style={{
                                      width: "48%",
                                      height: "4vh",
                                      // background: "red",
                                      fontSize: ".8em",
                                      margin: "5px 0",
                                      marginBottom: ".5vh",
                                      position: "relative",
                                      lineHeight: "1",
                                    }}
                                  >
                                    <span style={{ paddingRight: ".5vw" }}>
                                      {formatKey(key)}
                                    </span>
                                    <span
                                      style={{
                                        float: "right",
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                      }}
                                    >
                                      {Attack[selectedStatsTypeOption][key]}
                                      {selectedStatsTypeOption === "Percentage"
                                        ? "%"
                                        : ""}
                                    </span>
                                  </div>
                                )
                              )}{" "}
                        </div>
                      </div>
                      {/* Distribution Side */}
                      <div style={{ flex: ".5", maxHeight: "20vh" }}>
                        <h6 className="background" style={{ width: "100%" }}>
                          Distribution
                        </h6>

                        <div
                          style={{
                            height: "15vh",
                            // background: "green",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0vh .5vw",
                            overflowY: "scroll",
                          }}
                        >
                          {Distribution.length === 0
                            ? ""
                            : Object.keys(
                                Distribution[selectedStatsTypeOption]
                              ).map((key) => (
                                <div
                                  key={key}
                                  style={{
                                    width: "48%",
                                    height: "4vh",
                                    // background: "red",
                                    fontSize: ".8em",
                                    margin: "5px 0",
                                    marginBottom: ".5vh",
                                    position: "relative",
                                    lineHeight: "1",
                                  }}
                                >
                                  <span style={{ paddingRight: ".5vw" }}>
                                    {formatKey(key)}
                                  </span>
                                  <span
                                    style={{
                                      float: "right",
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                    }}
                                  >
                                    {Distribution[selectedStatsTypeOption][key]}
                                    {selectedStatsTypeOption === "Percentage"
                                      ? "%"
                                      : ""}
                                  </span>
                                </div>
                              ))}{" "}
                        </div>
                      </div>
                    </div>
                    {/* Defense , General ,  */}
                    <div
                      style={{
                        flex: ".5",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* General Side */}
                      <div style={{ flex: ".5", maxHeight: "20vh" }}>
                        <h6 className="background" style={{ width: "100%" }}>
                          General
                        </h6>

                        <div
                          style={{
                            height: "15vh",
                            // background: "green",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0vh .5vw",
                            overflowY: "scroll",
                          }}
                        >
                          {General.length === 0
                            ? ""
                            : Object.keys(General[selectedStatsTypeOption]).map(
                                (key) => (
                                  <div
                                    key={key}
                                    style={{
                                      width: "48%",
                                      height: "4vh",
                                      // background: "red",
                                      fontSize: ".8em",
                                      margin: "5px 0",
                                      marginBottom: ".5vh",
                                      position: "relative",
                                      lineHeight: "1",
                                    }}
                                  >
                                    <span style={{ paddingRight: ".5vw" }}>
                                      {formatKey(key)}
                                    </span>
                                    <span
                                      style={{
                                        float: "right",
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                      }}
                                    >
                                      {General[selectedStatsTypeOption][key]}
                                      {selectedStatsTypeOption === "Percentage"
                                        ? "%"
                                        : ""}
                                    </span>
                                  </div>
                                )
                              )}{" "}
                        </div>
                      </div>
                      {/* Defense Side */}
                      <div style={{ flex: ".5", maxHeight: "20vh" }}>
                        <h6 className="background" style={{ width: "100%" }}>
                          Defense
                        </h6>
                        <div
                          style={{
                            height: "15vh",
                            // background: "green",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0vh .5vw",
                            overflowY: "scroll",
                          }}
                        >
                          {Defense.length === 0
                            ? ""
                            : Object.keys(Defense[selectedStatsTypeOption]).map(
                                (key) => (
                                  <div
                                    key={key}
                                    style={{
                                      width: "48%",
                                      height: "4vh",
                                      // background: "red",
                                      fontSize: ".8em",
                                      margin: "5px 0",
                                      marginBottom: ".5vh",
                                      position: "relative",
                                      lineHeight: "1",
                                    }}
                                  >
                                    <span style={{ paddingRight: ".5vw" }}>
                                      {formatKey(key)}
                                    </span>
                                    <span
                                      style={{
                                        float: "right",
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                      }}
                                    >
                                      {Defense[selectedStatsTypeOption][key]}
                                      {selectedStatsTypeOption === "Percentage"
                                        ? "%"
                                        : ""}
                                    </span>
                                  </div>
                                )
                              )}{" "}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestedStats;
