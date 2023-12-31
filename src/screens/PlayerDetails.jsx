import {
  Avatar,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Icon,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ronaldo from "../assets/images/Ronaldo.png";
import manu from "../assets/images/manunited.png";
import ghana from "../assets/images/ghana.png";
import nigeria from "../assets/images/Nigeria.jpg";

import uefa from "../assets/images/uefa.png";
import BalonDor from "../assets/images/BalonDor.png";
import worldCup from "../assets/images/worldCup.png";
import facebook from "../assets/images/facebook.svg";
import twitter from "../assets/images/twitter.svg";
import instagram from "../assets/images/instagram.svg";
import x from "../assets/images/x.svg";

import {
  Details,
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
} from "@mui/icons-material";
import PlayerDetailsMenuTab from "../components/Tabs/PlayerDetailsTab";
import ClubandNationalTeamDisplayCard from "../components/Cards/PlayerDetailsPage/CubAndNationalTeamCard";
import AchievementAndMarketValueCard from "../components/Cards/PlayerDetailsPage/AchievementsAndMarketDisplayCard";
import SocialAndContactAreaCard from "../components/Cards/PlayerDetailsPage/SocialsAndContactCard";
import NameAndImageCard from "../components/Cards/PlayerDetailsPage/NameAndImageCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsCollapesedVariable,
  setIsCollapseFalse,
  setIsCollapseTrue,
} from "../statemanager/slices/CollapsePlayerDisplayCards";
import { useParams } from "react-router-dom";
import {
  selectPlayersInAgencyArray,
  setPlayerSelectedToView,
} from "../statemanager/slices/PlayersInAgencySlice";
import { selectPlayersDatabase } from "../statemanager/slices/DatabaseSlice";
import { selectClubsInDatabase } from "../statemanager/slices/ClubsInDatabaseSlice";
import { selectUserDetailsObject } from "../statemanager/slices/LoginUserDataSlice";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

const PlayerDetails = () => {
  const { playerId } = useParams();
  const dispatch = useDispatch();

  const allPlayersArray = useSelector(selectPlayersDatabase);

  const allClubsInDatabase = useSelector(selectClubsInDatabase);
  const fileteredPlayer = allPlayersArray.filter((data) => {
    // should be id for filtering not name
    const { id } = data;
    return playerId === id;
  });
  const [selectedPlayerArray, setSelectedPlayerArray] =
    useState(fileteredPlayer);
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");

  const clubObject = allClubsInDatabase.find((data) => {
    return data.clubName === selectedPlayerArray[0]?.clubName;
  });

  // console.log(clubObject);

  useEffect(() => {
    const fileteredPlayer = allPlayersArray.filter((data) => {
      // should be id for filtering not name
      const { id } = data;
      return playerId === id;
    });

    // setSurName(selectedPlayerArray[0]?.surName);
    // console.log(surName);
    setSelectedPlayerArray(fileteredPlayer);
    dispatch(setPlayerSelectedToView(fileteredPlayer[0]));
    console.log(selectedPlayerArray, fileteredPlayer);
  }, [playerId, allPlayersArray]);

  const hTagStyle = {
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
  };

  const menuLabelArray = [
    "Bio",
    "Stats",
    // "News",
    "MarketValue",
    "Achievements",
    "Gallery",
  ];

  const isCardsCollapsedVariable = useSelector(selectIsCollapesedVariable);

  const handleSetCollapseCards = async () => {
    if (isCardsCollapsedVariable === false) {
      await dispatch(setIsCollapseTrue());
    } else {
      await dispatch(setIsCollapseFalse());
    }

    // alert(isCardsCollapsedVariable);
  };

  const userLoginObject = useSelector(selectUserDetailsObject);
  const [playerViewCounter, setPlayerViewCounter] = useState(1);

  useEffect(() => {
    const handleProfileViewUpdate = async () => {
      try {
        // this is to make sure an owner of account's view doesnt get counted as player view
        if (playerViewCounter <= 1) {
          if (userLoginObject.accountId !== playerId) {
            const playerVideoToUpdateRef = doc(
              db,
              `players_database/`,
              playerId
            );
            // Atomically increment the views of the video by 1.
            await updateDoc(playerVideoToUpdateRef, {
              views: increment(1),
            });
            setPlayerViewCounter(playerViewCounter + 1);
            // alert("Player updated");
          }
        }
      } catch (error) {
        console.error(error);
        // alert("Player updated Error");
      }
    };

    return () => {
      handleProfileViewUpdate();
    };
  }, []);

  return (
    <div
      className="md:w-[100%] md:h-[95%]  sm:w-[100%] sm:h-[100%]"
      style={{
        // width: "100%",
        // height: "95%",
        // background: "red",
        display: "grid",
        gridTemplateRows:
          isCardsCollapsedVariable === false ? "2% 35% 9% 54%" : "2% 9% 89%",
        gridTemplateColumns: "1fr",
        gridTemplateAreas:
          isCardsCollapsedVariable === false
            ? `"collapse""CardDisplay""MenuStrip""ContentArea"`
            : `"collapse""MenuStrip""ContentArea"`,
      }}
    >
      <div style={{ gridArea: "collapse" }}>
        {" "}
        {/* <Button onClick={handleSetCollapseCards}>
          {isCardsCollapsedVariable == false ? "Collapse" : "expand"}{" "}
        </Button>{" "}
        {isCardsCollapsedVariable.toString()} */}
      </div>
      {/* // Card Display Area */}
      <div
        className="sm:flex sm:flex-col sm:gap-[0%]  md:flex md:flex-row"
        style={{
          gridArea: "CardDisplay",
          display: isCardsCollapsedVariable === false ? "flex" : "none",
        }}
      >
        {/* // Image And Name Area */}
        {/* sm:flex sm:justify-center  */}
        <div
          className=" md:basis-[26%] sm:basis-[26%] "
          style={{ padding: "1vw" }}
        >
          <NameAndImageCard
            firstname={selectedPlayerArray[0]?.firstName}
            surname={selectedPlayerArray[0]?.surName}
            position={selectedPlayerArray[0]?.position}
            age={
              selectedPlayerArray[0]?.Age === null
                ? ""
                : selectedPlayerArray[0]?.Age
            }
            image={selectedPlayerArray[0]?.player_profile_image}
            hTagStyle={hTagStyle}
          />
        </div>
        {/* Club and Value Area */}
        <div
          className="sm:hidden md:block md:basis-[27%] sm:basis-[27%]"
          style={{ padding: "1vw" }}
        >
          {" "}
          <ClubandNationalTeamDisplayCard
            hTagStyle={hTagStyle}
            clubImage={clubObject === undefined ? "" : clubObject?.clubImage}
            Nationality={selectedPlayerArray[0]?.Nationality}
            countryCode={selectedPlayerArray[0]?.CountryCode}
            ClubName={selectedPlayerArray[0]?.clubName}
            PreferredFoot={selectedPlayerArray[0]?.preferredFoot}
            Height={selectedPlayerArray[0]?.height}
          />
        </div>
        {/* Achievements and Trophies Area */}
        <div
          className="sm:hidden md:block md:basis-[27%] sm:basis-[27%]"
          style={{ flex: ".27", padding: "1vw" }}
        >
          {" "}
          <AchievementAndMarketValueCard
            marketValue={selectedPlayerArray[0]?.marketValue}
            healthCondition={selectedPlayerArray[0]?.current_health}
          />
        </div>
        {/* Socials And Contact Area */}
        <div
          className="sm:hidden md:block md:basis-[20%] sm:basis-[20%]"
          style={{ padding: "1vw" }}
        >
          {" "}
          <SocialAndContactAreaCard
            facebookImg={facebook}
            instaImg={instagram}
            instagram={selectedPlayerArray[0]?.Social_media[0]?.Instagram}
            facebook={selectedPlayerArray[0]?.Social_media[0]?.Facebook}
          />
        </div>
      </div>
      <div style={{ gridArea: "MenuStrip" }}>
        <PlayerDetailsMenuTab
          Nationality={selectedPlayerArray[0]?.Nationality}
          PlaceOfBirth={selectedPlayerArray[0]?.Nationality}
          DateOfBirth={selectedPlayerArray[0]?.date_of_birth}
          clubName={selectedPlayerArray[0]?.clubName}
          contractStartDate={selectedPlayerArray[0]?.contractStartDate}
          contactEndDate={selectedPlayerArray[0]?.contractEndDate}
          Position={selectedPlayerArray[0]?.position}
          PlayerTabItemsArray={menuLabelArray}
          Statistics={selectedPlayerArray[0]?.Statistics}
        />
      </div>
      <div style={{ gridArea: "ContentArea" }}></div>
    </div>
  );
};

export default PlayerDetails;
