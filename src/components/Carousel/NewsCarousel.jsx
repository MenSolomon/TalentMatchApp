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
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import { collection, getDocs, query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "../../Firebase/Firebase";
import handleVideoGloballyClick from "../../utilities/VideoPausePlayFunction";
import PlayerDisplaySkeleton from "../Skeletons/PlayerCardSkeleton";

const NewsCarousel = ({ NewsArray }) => {
  // const MatchedPlayersArray = useSelector(selectPlayersInAgencyArray);
  // const MatchedPlayersArray = useSelector(selectPlayersDatabase);
  const allClubsInDatabase = useSelector(selectClubsInDatabase);

  const userLoginDetailsObject = useSelector(selectUserDetailsObject);

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

  const carouselProfileName =
    userLoginDetailsObject?.carouselProfileName === undefined
      ? "Default"
      : userLoginDetailsObject?.carouselProfileName;

  const {
    status,
    data: MatchedPlayersArray,
    error,
    refetch,
    isFetching: isMatchedPlayersArrayFetching,
  } = useQuery({
    queryKey: ["fetchAllPlayers"],
    queryFn: async () => {
      const playersQuery = query(collection(db, "players_database"));
      const playersSnapshot = await getDocs(playersQuery);
      const allProducts = [];
      const playersSnapshotData = await playersSnapshot.forEach((doc) => {
        // save them to allProducts array
        allProducts.push(doc.data());
      });
      // console.log("playersSnapshotData", allProducts);
      return allProducts;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  // remount component when usequery completes fetch
  useEffect(() => {}, [MatchedPlayersArray]);

  //   const {
  //     Nationality,
  //     position,
  //     // date_of_birth,
  //     Statsitics,
  //     height,
  //   } = data;

  //   // Define the variables to compare
  //   const variablesToCompare = [
  //     Nationality.toLowerCase() ===
  //       currentProfileFilterObject?.filter.NationalityValue.toLowerCase(),
  //     Nationality.toLowerCase() ===
  //       currentProfileFilterObject?.filter.NationalityValue.toLowerCase(),
  //     data?.Age >= currentProfileFilterObject?.filter.AgeRangeValue[0] &&
  //       data?.Age <= currentProfileFilterObject?.filter.AgeRangeValue[1],
  //     height >= currentProfileFilterObject?.filter.HeightRangeValue[0] &&
  //       height <= currentProfileFilterObject?.filter.HeightRangeValue[1],
  //     data?.marketValue >= currentProfileFilterObject?.filter.MarketValue[0] &&
  //       data?.marketValue <= currentProfileFilterObject?.filter.MarketValue[1],
  //     currentProfileFilterObject?.filter?.PlayerPositionAutoCompleteValue.toLowerCase() ===
  //       position.toLowerCase(),
  //     data?.preferredFoot.toLowerCase() ===
  //       currentProfileFilterObject?.filter.PrefferedFootRadioValue.toLowerCase(),
  //     currentProfileFilterObject?.filter.ContractStatusCheckBoxes.includes(
  //       data?.clubName
  //     ),
  //     // Add more variables to compare as needed
  //   ];

  //   // Count the number of matches
  //   const numberOfMatches = variablesToCompare.filter((match) => match).length;

  //   // alert(numberOfMatches);
  //   // Check if at least 4 variables match
  //   return numberOfMatches >= 5;
  // });

  // alert("first one" + ExistingPlayerProfile.length);

  // const [PossiblePlayerMatch, setPossiblePlayerMatch] = React.useState(
  //   ExistingPlayerProfile
  // );
  const [PossiblePlayerMatch, setPossiblePlayerMatch] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // alert(profileName);
    const currentProfileFilterObjectInEffect = savedUserProfiles.find(
      (data) => {
        return (
          data.label.toLowerCase() === carouselProfileName.trim().toLowerCase()
        );
      }
    );

    console.log("filterObjectsOnline", currentProfileFilterObjectInEffect);

    const ExistingPlayerProfile = MatchedPlayersArray?.filter((data) => {
      const {
        Nationality,
        position,
        Age,
        Statsitics,
        contractEndDate,
        preferredFoot,
        height,
        clubName,
      } = data;
      const filterNationalityValue =
        currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase();
      const filterPositionRangeSliderValues =
        currentProfileFilterObjectInEffect?.filter.PositionRangeSliderValues;
      const filterPlayerPosition =
        currentProfileFilterObjectInEffect?.filter
          .PlayerPositionAutoCompleteValue;
      const filterpreferredFoot =
        currentProfileFilterObjectInEffect?.filter.PrefferedFootRadioValue;
      // const defenceValues = Statsitics.find(
      //   (data) => data?.Season === "Overall"
      // ).Defence;
      // const attackValues = Statsitics.find(
      //   (data) => data?.Season === "Overall"
      // ).Attack;
      // const distributionValues = Statsitics.find(
      //   (data) => data?.Season === "Overall"
      // ).Distribution;
      // const disciplineValues = Statsitics.find(
      //   (data) => data?.Season === "Overall"
      // ).Discipline;
      // const generalValues = Statsitics.find(
      //   (data) => data?.Season === "Overall"
      // ).General;
      const filterFirstHeightRange =
        currentProfileFilterObjectInEffect?.filter.HeightRangeValue[0];
      const filterSecondHeightRange =
        currentProfileFilterObjectInEffect?.filter.HeightRangeValue[1];
      const filterFirstAgeRange =
        currentProfileFilterObjectInEffect?.filter?.AgeRangeValue[0];
      const filterSecondAgeRange =
        currentProfileFilterObjectInEffect?.filter?.AgeRangeValue[1];

      const filterStatistics =
        currentProfileFilterObjectInEffect?.filter?.positionRangeSliderValues;
      const filterContractStatus =
        currentProfileFilterObjectInEffect?.filter?.ContractStatusCheckBoxes;

      const sampleDate = new Date(contractEndDate);
      // Get the current date
      const currentDate = new Date();
      // Calculate the difference in milliseconds
      const diffMilliseconds = sampleDate - currentDate;

      // Convert milliseconds to months
      const monthsDifference = diffMilliseconds / (1000 * 60 * 60 * 24 * 30.44); // Approximate average number of days in a month

      // const filterAgeRange =
      //   currentProfileFilterObjectInEffect?.filter.AgeRangeValue;

      // Define the variables to compare
      // filterPlayerPosition === "Any" ? 1*2 :( playerPosition === "Winger (W)" ||  playerPosition === "Striker (ST)" )? (attackValues.filterPlayerPosition.Goals >= filterPositionRangeSliderValues.Goals[0] && attackValues.filterPlayerPosition.Goals <= filterPositionRangeSliderValues.Goals[1] )? 1 : 0
      const variablesToCompare = [
        Nationality.toLowerCase() === filterNationalityValue ? 3 : 0,

        preferredFoot === filterpreferredFoot || filterpreferredFoot === "Any"
          ? 1
          : 0,
        height >= filterFirstHeightRange && height <= filterSecondHeightRange
          ? 1
          : 0,

        Age >= filterFirstAgeRange && Age <= filterSecondAgeRange ? 2 : 0,

        filterContractStatus === "Any"
          ? 1
          : filterContractStatus ===
              "Contract Expiring in less than 6 months" && monthsDifference <= 6
          ? 1
          : filterContractStatus ===
              "Contract Expiring in more than 6 months" && monthsDifference >= 6
          ? 1
          : clubName === filterContractStatus
          ? 1
          : 0,
        // Add more variables to compare as needed
      ];

      const numberOfMatches = variablesToCompare.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      data.numberOfMatches = numberOfMatches;
      // Check if at least 4 variables match
      return numberOfMatches >= 5;
    });

    const sortedPlayers = ExistingPlayerProfile?.sort((player1, player2) => {
      return player2.numberOfMatches - player1.numberOfMatches;
    });

    // console.log(ExistingPlayerProfile + "Mawu");
    setPossiblePlayerMatch(sortedPlayers);

    const temporalRows = sortedPlayers
      ?.sort((a, b) => b.boostPoints - a.boostPoints)
      .map((data, index) => {
        const {
          firstName,
          surName,
          Age,
          position,
          CountryCode,
          Nationality,
          jerseyNumber,
          player_profile_image,
          clubName,
          Statistics,
          preferredFoot,
          height,
          marketValue,
          contractStartDate,
          id,
        } = data;

        const clubObject = allClubsInDatabase.find((data) => {
          return data.clubName === clubName;
        });

        const ClubLogo = clubObject === undefined ? "" : clubObject?.clubImage;

        return (
          `${firstName} ${surName}`,
          Age,
          preferredFoot,
          height,
          CountryCode,
          marketValue,
          ClubLogo,
          clubName,
          contractStartDate,
          player_profile_image,
          id,
          Nationality,
          Statistics,
          data.videos
        );
      });
    setRows(sortedPlayers);

    console.log(sortedPlayers);
    // alert(ExistingPlayerProfile.length);
  }, [carouselProfileName, MatchedPlayersArray]);

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
    <>
      {isMatchedPlayersArrayFetching ? (
        <PlayerDisplaySkeleton />
      ) : (
        <Carousel
          className="MatchedPlayers md:h-[100%] md:w-[100%] sm:w-[100%] sm:h-[100%] "
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
          {rows?.length === 0
            ? rows?.map((data, index) => {
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

                // console.log(clubObject, "CLUBBB");

                var positionABR = position.match(/\((.*?)\)/);

                // Check if there are matches and get the value inside parentheses
                var result = positionABR ? positionABR[1] : null;

                return (
                  <Carousel.Item
                    key={index}
                    className="matchedPlayersCarousel md:relative md:h-[44.2vh] sm:relative sm:h-[46vh]"
                    style={{
                      backgroundSize: "cover",
                      //   background: "white",
                      borderRadius: "1vw",
                      // height: "44.2vh",
                      // paddingLeft: "2vw",
                      // position: "relative",
                      padding: ".2vw",
                      background:
                        "linear-gradient(90deg, hsla(280, 81%, 58%, 1) 0%, hsla(279, 81%, 59%, 1) 3%, hsla(276, 79%, 60%, 1) 9%, hsla(274, 79%, 60%, 1) 15%, hsla(269, 76%, 61%, 1) 15%, hsla(271, 77%, 61%, 1) 23%, hsla(259, 72%, 62%, 1) 32%, hsla(246, 68%, 64%, 1) 49%, hsla(226, 67%, 60%, 1) 56%, hsla(194, 96%, 42%, 1) 74%, hsla(196, 80%, 79%, 1) 100%)",
                    }}
                  >
                    <div
                      className="cardBackground md:flex md:h-[100%] md:w-[100%]   sm:flex sm:h-[100%] sm:w-[100%]"
                      style={{
                        borderRadius: "1vw",
                        // display: "flex",
                        gap: ".5vw",
                        // width: "100%",
                        // height: "100%",
                        // background: `linear-gradient(90deg, rgba(32,32,32,0.9582366589327146) 0%, rgba(55,54,54,0.9535962877030162) 31%, rgba(23,21,21,0.7540603248259861) 44%, rgba(14,50,142,0.8120649651972158) 100%)`,
                      }}
                    >
                      {/* // Player information   */}
                      {/* style={{ flex: ".25" }} */}
                      <div className="md:basis-[30%] sm:basis-[50%]">
                        {/* style={{ width: "100%", height: "100%" }} */}
                        <div className="md:h-[100%] md:w-[100%]   sm:h-[100%] sm:w-[100%]">
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

                      <div
                        className="md:flex md:flex-row md:basis-[70%]  sm:flex sm:flex-col-reverse sm:basis-[70%] sm:pb-[1vh] "
                        // style={{ background: "peru" }}
                      >
                        {/* Plyer statistics */}
                        <div
                          className="md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0"
                          style={{
                            overflowY: "scroll",
                          }}
                        >
                          <PlayerComparisonAccordion
                            GeneralObject={Statistics[0].General}
                            DefenseObject={Statistics[0].Defence}
                            AttackingObject={Statistics[0].Attack}
                            DistributionObject={Statistics[0].Distribution}
                            Discipline={Statistics[0].Discipline}
                          />
                        </div>

                        {/* Player video higlights  */}
                        <div className="md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0">
                          <div
                            className="sm:w-[100%] sm:relative sm:h-[10%] md:w-[90%] md:h-[100%] md:relative"
                            style={{
                              // width: "90%",
                              // height: "100%",
                              borderRadius: "1vw",
                              // position: "relative",
                              paddingTop: "1vh",
                              // background: "blue",
                            }}
                          >
                            {videos.length <= 0 ? (
                              <div
                                className="sm:h-[19vh] md:h-[90%]"
                                style={{
                                  // height: "90%",
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
                                onClick={handleVideoGloballyClick}
                                className="sm:h-[19vh] md:h-[90%]"
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
                    </div>
                  </Carousel.Item>
                );
              })
            : rows?.map((data, index) => {
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
                  prferredFoot,
                  Social_media,
                  Statistics,
                  marketValue,
                  contractStartDate,
                  contractEndDate,
                  current_health,
                } = data;

                const videos = data?.videos;

                const clubObject = allClubsInDatabase?.find((data) => {
                  return data.clubName === clubName;
                });

                var positionABR = position.match(/\((.*?)\)/);

                // Check if there are matches and get the value inside parentheses
                var result = positionABR ? positionABR[1] : null;

                return (
                  <Carousel.Item
                    key={index}
                    className="matchedPlayersCarousel md:relative md:h-[44.2vh] sm:relative sm:h-[46vh]"
                    style={{
                      backgroundSize: "cover",
                      //   background: "white",
                      borderRadius: "1vw",
                      // height: "44.2vh",
                      // paddingLeft: "2vw",
                      // position: "relative",
                      padding: ".2vw",
                      background:
                        "linear-gradient(90deg, hsla(280, 81%, 58%, 1) 0%, hsla(279, 81%, 59%, 1) 3%, hsla(276, 79%, 60%, 1) 9%, hsla(274, 79%, 60%, 1) 15%, hsla(269, 76%, 61%, 1) 15%, hsla(271, 77%, 61%, 1) 23%, hsla(259, 72%, 62%, 1) 32%, hsla(246, 68%, 64%, 1) 49%, hsla(226, 67%, 60%, 1) 56%, hsla(194, 96%, 42%, 1) 74%, hsla(196, 80%, 79%, 1) 100%)",
                    }}
                  >
                    <div
                      className="cardBackground md:flex md:h-[100%] md:w-[100%]   sm:flex sm:h-[100%] sm:w-[100%]"
                      style={{
                        borderRadius: "1vw",
                        // display: "flex",
                        gap: ".5vw",
                        // width: "100%",
                        // height: "100%",
                        // background: `linear-gradient(90deg, rgba(32,32,32,0.9582366589327146) 0%, rgba(55,54,54,0.9535962877030162) 31%, rgba(23,21,21,0.7540603248259861) 44%, rgba(14,50,142,0.8120649651972158) 100%)`,
                      }}
                    >
                      {/* // Player information   */}
                      {/* style={{ flex: ".25" }} */}
                      <div className="md:basis-[30%] sm:basis-[50%]">
                        {/* style={{ width: "100%", height: "100%" }} */}
                        <div className="md:h-[100%] md:w-[100%]   sm:h-[100%] sm:w-[100%]">
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

                      <div
                        className="md:flex md:flex-row md:basis-[70%]  sm:flex sm:flex-col-reverse sm:basis-[70%] sm:pb-[1vh] "
                        // style={{ background: "peru" }}
                      >
                        {/* Plyer statistics */}
                        <div
                          className="md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0"
                          style={{
                            overflowY: "scroll",
                          }}
                        >
                          <PlayerComparisonAccordion
                            GeneralObject={Statistics[0].General}
                            DefenseObject={Statistics[0].Defence}
                            AttackingObject={Statistics[0].Attack}
                            DistributionObject={Statistics[0].Distribution}
                            Discipline={Statistics[0].Discipline}
                          />
                        </div>

                        {/* Player video higlights  */}
                        <div className="md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0">
                          <div
                            className="sm:w-[100%] sm:relative sm:h-[10%] md:w-[90%] md:h-[100%] md:relative"
                            style={{
                              // width: "90%",
                              // height: "100%",
                              borderRadius: "1vw",
                              // position: "relative",
                              paddingTop: "1vh",
                              // background: "blue",
                            }}
                          >
                            {videos?.length <= 0 ? (
                              <div
                                className="sm:h-[19vh] md:h-[90%]"
                                style={{
                                  // height: "90%",
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
                                onClick={handleVideoGloballyClick}
                                id={`video-${index}`}
                                src={videos && videos[0]?.url}
                                width="100%"
                                style={{ position: "absolute" }}
                                // autoPlay={true}
                                controls
                              ></video>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                );
              })}

          {/* Add more Carousel.Item components as needed */}
        </Carousel>
      )}
    </>
  );
};

export default NewsCarousel;
