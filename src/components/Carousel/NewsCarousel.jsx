import { Avatar, Card } from "@mui/material";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../../statemanager/slices/PlayersInAgencySlice";
import ghana from "../../assets/images/ghana.png";
import MatchedPlayerCard from "../Cards/MatchedPlayerCard";
import PlayerComparisonAccordion from "../Accordions/PlayerComparisonAccordion/PlayerComparisonAccordion";
import { useEffect, useState } from "react";
import { selectPlayersDatabase } from "../../statemanager/slices/DatabaseSlice";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";
import {
  selectCurrentProfile,
  selectUserSavedProfiles,
} from "../../statemanager/slices/SavedProfileSlice";
import { VideocamOff } from "@mui/icons-material";

const NewsCarousel = ({ NewsArray }) => {
  // const MatchedPlayersArray = useSelector(selectPlayersInAgencyArray);
  const MatchedPlayersArray = useSelector(selectPlayersDatabase);
  const allClubsInDatabase = useSelector(selectClubsInDatabase);

  // const [activeIndex, setActiveIndex] = useState(0);
  // const [prevIndex, setPrevIndex] = useState(0);

  // const handleSelect = (selectedIndex, e) => {
  //   setPrevIndex(activeIndex);
  //   setActiveIndex(selectedIndex);
  // };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  // Store the index of the previously active item
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);

  useEffect(() => {
    // Pause the video of the previously active item when a new item becomes active
    const videoElement = document.getElementById(`video-${prevActiveIndex}`);
    if (videoElement) {
      videoElement.pause();
    }
    setPrevActiveIndex(activeIndex);
  }, [activeIndex]);

  // ************************* RETRIEVEING P;LAYERS OF SPECIFIC PROFILES   ***************************************

  const currentProfileNameSelected = useSelector(selectCurrentProfile);

  const savedUserProfiles = useSelector(selectUserSavedProfiles);
  // const MatchedPlayersArray = useSelector(selectPlayersDatabase);

  const currentProfileFilterObjectInEffect = savedUserProfiles.find((data) => {
    return data.label.toLowerCase() === "Default".toLowerCase();
  });

  const ExistingPlayerProfile = MatchedPlayersArray.filter((data) => {
    const {
      Nationality,
      position,
      // date_of_birth,
      Statsitics,
      height,
    } = data;

    // Define the variables to compare
    const variablesToCompare = [
      Nationality.toLowerCase() ===
        currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
      Nationality.toLowerCase() ===
        currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
      data?.Age >=
        currentProfileFilterObjectInEffect?.filter.AgeRangeValue[0] &&
        data?.Age <=
          currentProfileFilterObjectInEffect?.filter.AgeRangeValue[1],
      height >=
        currentProfileFilterObjectInEffect?.filter.HeightRangeValue[0] &&
        height <=
          currentProfileFilterObjectInEffect?.filter.HeightRangeValue[1],
      data?.marketValue >=
        currentProfileFilterObjectInEffect?.filter.MarketValue[0] &&
        data?.marketValue <=
          currentProfileFilterObjectInEffect?.filter.MarketValue[1],
      currentProfileFilterObjectInEffect?.filter?.PlayerPositionAutoCompleteValue.toLowerCase() ===
        position.toLowerCase(),
      data?.preferredFoot.toLowerCase() ===
        currentProfileFilterObjectInEffect?.filter.PrefferedFootRadioValue.toLowerCase(),
      currentProfileFilterObjectInEffect?.filter.ContractStatusCheckBoxes.includes(
        data?.clubName
      ),
      // Add more variables to compare as needed
    ];

    // Count the number of matches
    const numberOfMatches = variablesToCompare.filter((match) => match).length;

    // Check if at least 4 variables match
    return numberOfMatches >= 5;
  });

  console.log("All Players", ExistingPlayerProfile);
  // const ClubLogo = clubObject === undefined ? "" : clubObject?.clubImage;
  const [PossiblePlayerMatch, setPossiblePlayerMatch] = useState(
    ExistingPlayerProfile
  );

  // useEffect(() => {
  //   const currentProfileFilterObjectInEffect = savedUserProfiles.find(
  //     (data) => {
  //       return (
  //         data.label.toLowerCase() === currentProfileNameSelected.toLowerCase()
  //       );
  //     }
  //   );

  //   const ExistingPlayerProfile = MatchedPlayersArray.filter((data) => {
  //     const {
  //       Nationality,
  //       position,
  //       // date_of_birth,
  //       Statsitics,
  //       height,
  //     } = data;

  //     // Define the variables to compare
  //     const variablesToCompare = [
  //       Nationality.toLowerCase() ===
  //         currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
  //       Nationality.toLowerCase() ===
  //         currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
  //       data?.Age >=
  //         currentProfileFilterObjectInEffect?.filter.AgeRangeValue[0] &&
  //         data?.Age <=
  //           currentProfileFilterObjectInEffect?.filter.AgeRangeValue[1],
  //       height >=
  //         currentProfileFilterObjectInEffect?.filter.HeightRangeValue[0] &&
  //         height <=
  //           currentProfileFilterObjectInEffect?.filter.HeightRangeValue[1],
  //       data?.marketValue >=
  //         currentProfileFilterObjectInEffect?.filter.MarketValue[0] &&
  //         data?.marketValue <=
  //           currentProfileFilterObjectInEffect?.filter.MarketValue[1],
  //       currentProfileFilterObjectInEffect?.filter?.PlayerPositionAutoCompleteValue.toLowerCase() ===
  //         position.toLowerCase(),
  //       data?.preferredFoot.toLowerCase() ===
  //         currentProfileFilterObjectInEffect?.filter.PrefferedFootRadioValue.toLowerCase(),
  //       currentProfileFilterObjectInEffect?.filter.ContractStatusCheckBoxes.includes(
  //         data?.clubName
  //       ),
  //       // Add more variables to compare as needed
  //     ];

  //     // Count the number of matches
  //     const numberOfMatches = variablesToCompare.filter(
  //       (match) => match
  //     ).length;

  //     // Check if at least 4 variables match
  //     return numberOfMatches >= 5;
  //   });

  //   console.log(ExistingPlayerProfile + "Mawu");
  //   setPossiblePlayerMatch(ExistingPlayerProfile);
  //   // alert(ExistingPlayerProfile.length);
  // }, [currentProfileNameSelected, savedUserProfiles]);

  // useEffect(() => {
  //   alert(ExistingPlayerProfile.length);
  // }, [ExistingPlayerProfile]);

  return (
    <Carousel
      className="MatchedPlayers"
      activeIndex={activeIndex}
      onSelect={handleSelect}
      //   controls={false}
      //   interval={1000}
      onSlide={() => {
        // Additional code to pause videos that are leaving the view
        const videoElement = document.getElementById(
          `video-${prevActiveIndex}`
        );
        if (videoElement) {
          videoElement.pause();
        }
      }}
      style={{
        // background: "black",
        height: "100%",
        borderRadius: "1vw",
        // width: "93vw",
      }}
    >
      {PossiblePlayerMatch &&
        PossiblePlayerMatch.map((data, index) => {
          const {
            firstName,
            surName,
            id,
            Age,
            position,
            Nationality,
            jerseyNumber,
            CountryCode,
            player_profile_image,
            clubName,
            videos,
            prferredFoot,
            Social_media,
            Statistics,
            marketValue,
            contractStartDate,
            contractEndDate,
            current_health,
          } = data;

          const clubObject = allClubsInDatabase.find((data) => {
            return data.clubName === clubName;
          });

          console.log(clubObject, "CLUBBB");

          var positionABR = position.match(/\((.*?)\)/);

          // Check if there are matches and get the value inside parentheses
          var result = positionABR ? positionABR[1] : null;

          return (
            <Carousel.Item
              key={index}
              className="matchedPlayersCarousel"
              style={{
                backgroundSize: "cover",
                //   background: "white",
                borderRadius: "1vw",
                height: "44.2vh",
                // paddingLeft: "2vw",
                position: "relative",
                padding: ".2vw",
                background:
                  "linear-gradient(90deg, hsla(280, 81%, 58%, 1) 0%, hsla(279, 81%, 59%, 1) 3%, hsla(276, 79%, 60%, 1) 9%, hsla(274, 79%, 60%, 1) 15%, hsla(269, 76%, 61%, 1) 15%, hsla(271, 77%, 61%, 1) 23%, hsla(259, 72%, 62%, 1) 32%, hsla(246, 68%, 64%, 1) 49%, hsla(226, 67%, 60%, 1) 56%, hsla(194, 96%, 42%, 1) 74%, hsla(196, 80%, 79%, 1) 100%)",
              }}
            >
              <div
                className="cardBackground"
                style={{
                  borderRadius: "1vw",
                  display: "flex",
                  gap: ".5vw",
                  width: "100%",
                  height: "100%",
                  // background: `linear-gradient(90deg, rgba(32,32,32,0.9582366589327146) 0%, rgba(55,54,54,0.9535962877030162) 31%, rgba(23,21,21,0.7540603248259861) 44%, rgba(14,50,142,0.8120649651972158) 100%)`,
                }}
              >
                {/* // Player information */}
                <div style={{ flex: ".25" }}>
                  <div style={{ width: "100%", height: "100%" }}>
                    <MatchedPlayerCard
                      key={index}
                      PlayerClubImage={
                        clubObject?.clubImage === undefined
                          ? ""
                          : clubObject?.clubImage
                      }
                      PlayerClubName={clubName}
                      PlayerCountry={Nationality}
                      PlayerCountryCode={CountryCode}
                      PlayerImage={player_profile_image}
                      PlayerFirstName={firstName}
                      PlayerSurName={surName}
                      PlayerPosition={position}
                      PlayerPositionABR={result}
                      PlayerId={id}
                    />
                  </div>
                </div>
                {/* Plyer statistics */}
                <div style={{ flex: ".35", overflowY: "scroll" }}>
                  <PlayerComparisonAccordion
                    GeneralObject={Statistics[0].General}
                    DefenseObject={Statistics[0].Defence}
                    AttackingObject={Statistics[0].Attack}
                    DistributionObject={Statistics[0].Distribution}
                    Discipline={Statistics[0].Discipline}
                  />
                </div>

                {/* Player video higlights */}
                <div style={{ flex: ".4" }}>
                  <div
                    style={{
                      width: "90%",
                      height: "100%",
                      borderRadius: "1vw",
                      position: "relative",
                      paddingTop: "1vh",
                      // background: "blue",
                    }}
                  >
                    {videos.length <= 0 ? (
                      <div
                        style={{
                          height: "90%",
                          width: "100%",
                          borderRadius: "1vw",
                          background: "black",
                          display: "grid",
                          placeContent: "center",
                        }}
                      >
                        <VideocamOff
                          sx={{ color: "white", width: 45, height: 45 }}
                        />
                      </div>
                    ) : (
                      <video
                        id={`video-${index}`}
                        src={videos[0].url}
                        width="100%"
                        style={{ position: "absolute" }}
                        // autoPlay={true}
                        controls
                      ></video>
                    )}
                  </div>
                </div>
              </div>
            </Carousel.Item>
          );
        })}

      {/* Add more Carousel.Item components as needed */}
    </Carousel>
  );
};

export default NewsCarousel;
