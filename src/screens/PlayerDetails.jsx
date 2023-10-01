import {
  Avatar,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Icon,
} from "@mui/material";
import React from "react";
import ronaldo from "../assets/images/Ronaldo.png";
import manu from "../assets/images/manunited.png";
import ghana from "../assets/images/ghana.png";
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

const PlayerDetails = () => {
  const hTagStyle = {
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
  };

  const menuLabelArray = [
    "Bio",
    "Stats",
    "News",
    "MarketValue",
    "Achievements",
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
      style={{
        width: "100%",
        height: "100%",
        // background: "blue",
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
        <Button onClick={handleSetCollapseCards}>
          {isCardsCollapsedVariable == false ? "Collapse" : "expand"}{" "}
        </Button>{" "}
        {isCardsCollapsedVariable.toString()}
      </div>
      {/* // Card Display Area */}
      <div
        style={{
          gridArea: "CardDisplay",
          display: isCardsCollapsedVariable === false ? "flex" : "none",
        }}
      >
        {/* // Image And Name Area */}
        <div style={{ flex: ".26", padding: "1vw" }}>
          <NameAndImageCard ronaldo={ronaldo} hTagStyle={hTagStyle} />
        </div>
        {/* Club and Value Area */}
        <div style={{ flex: ".27", padding: "1vw" }}>
          {" "}
          <ClubandNationalTeamDisplayCard
            hTagStyle={hTagStyle}
            clubImage={manu}
            countryImage={ghana}
          />
        </div>
        {/* Achievements and Trophies Area */}
        <div style={{ flex: ".27", padding: "1vw" }}>
          {" "}
          <AchievementAndMarketValueCard
            worldCup={worldCup}
            BalonDor={BalonDor}
            uefa={uefa}
          />
        </div>
        {/* Socials And Contact Area */}
        <div style={{ flex: ".2", padding: "1vw" }}>
          {" "}
          <SocialAndContactAreaCard instagram={instagram} facebook={facebook} />
        </div>
      </div>
      <div style={{ gridArea: "MenuStrip" }}>
        <PlayerDetailsMenuTab PlayerTabItemsArray={menuLabelArray} />
      </div>
      <div style={{ gridArea: "ContentArea" }}></div>
    </div>
  );
};

export default PlayerDetails;
