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
import { selectPlayersInAgencyArray } from "../statemanager/slices/PlayersInAgencySlice";

const PlayerDetails = () => {
  const { playerId } = useParams();
  const [selectedPlayerArray, setSelectedPlayerArray] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");

  const allPlayersArray = useSelector(selectPlayersInAgencyArray);

  useEffect(() => {
    const fileteredPlayer = allPlayersArray.filter((data) => {
      // should be id for filtering not name
      const { firstName, surName } = data;
      return playerId === `${firstName}${surName}`;
    });

    // setSurName(selectedPlayerArray[0]?.surName);
    // console.log(surName);
    setSelectedPlayerArray(fileteredPlayer);
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
  const dispatch = useDispatch();

  const handleSetCollapseCards = async () => {
    if (isCardsCollapsedVariable === false) {
      await dispatch(setIsCollapseTrue());
    } else {
      await dispatch(setIsCollapseFalse());
    }

    // alert(isCardsCollapsedVariable);
  };

  return (
    <div
      // md:gap-[0em]   sm:gap-[10%]
      className="md:w-[100%] md:h-[95%]  sm:w-[100%] sm:h-[100%]"
      style={{
        // height: "95%",
        // width: "100%",
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
          // background: "red",
        }}
      >
        {/* // Image And Name Area */}
        <div
          className=" md:basis-[26%] sm:basis-[26%]"
          style={{ padding: "1vw" }}
        >
          <NameAndImageCard
            firstname={selectedPlayerArray[0]?.firstName}
            surname={selectedPlayerArray[0]?.surName}
            position={selectedPlayerArray[0]?.position}
            age={selectedPlayerArray[0]?.Age}
            image={selectedPlayerArray[0]?.image}
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
            clubImage={selectedPlayerArray[0]?.clubLogo}
            countryImage={
              selectedPlayerArray[0]?.Nationality === "Ghana"
                ? ghana
                : selectedPlayerArray[0]?.Nationality === "Nigeria"
                ? nigeria
                : ""
            }
            ClubName={selectedPlayerArray[0]?.clubName}
          />
        </div>
        {/* Achievements and Trophies Area */}
        <div
          className="sm:hidden md:block md:basis-[27%] sm:basis-[27%]"
          style={{ padding: "1vw" }}
        >
          {" "}
          <AchievementAndMarketValueCard
            worldCup={worldCup}
            BalonDor={BalonDor}
            uefa={uefa}
          />
        </div>
        {/* Socials And Contact Area */}
        <div
          className="sm:hidden md:block md:basis-[20%] sm:basis-[20%]"
          style={{ padding: "1vw" }}
        >
          {" "}
          <SocialAndContactAreaCard instagram={instagram} facebook={facebook} />
        </div>
      </div>
      {/* ============================================= */}
      <div
        style={{
          gridArea: "MenuStrip",
        }}
      >
        <PlayerDetailsMenuTab PlayerTabItemsArray={menuLabelArray} />
      </div>
      <div style={{ gridArea: "ContentArea" }}></div>
    </div>
  );
};

export default PlayerDetails;
