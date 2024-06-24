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
import { auth, db } from "../../Firebase/Firebase";
import handleVideoGloballyClick from "../../utilities/VideoPausePlayFunction";
import PlayerDisplaySkeleton from "../Skeletons/PlayerCardSkeleton";
import moment from "moment/moment";
import { getFunctions, httpsCallable } from "firebase/functions";

const NewsCarousel = ({ NewsArray }) => {
  const allClubsInDatabase = useSelector(selectClubsInDatabase);
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  // const [isMatchedPlayersArrayFetching, setIsMatchedPlayersArrayFetching] =
  //   useState(true);
  // const [MatchedPlayersArray, setMatchedPlayersArray] = useState([]);
  const [carouselRange, setCarouselRange] = useState(10);
  const currentProfileNameSelected = useSelector(selectCurrentProfile);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
    // Load more items when reaching the end of the current range
    if (selectedIndex >= carouselRange - 1) {
      setCarouselRange(carouselRange + 10);
    }
  };

  useEffect(() => {
    const videoElement = document.getElementById(`video-${prevActiveIndex}`);
    if (videoElement) {
      videoElement.pause();
    }
    setPrevActiveIndex(activeIndex);
  }, [activeIndex]);

  const functions = getFunctions();
  const getSortedPlayers = httpsCallable(functions, "getSortedPlayers");

  // const fetchSortedPlayers = async (userIdParam, profileNameParam) => {
  //   try {
  //     const result = await getSortedPlayers({
  //       userId: userIdParam,
  //       profileName: profileNameParam,
  //     });
  //     setIsMatchedPlayersArrayFetching(false);
  //     setMatchedPlayersArray(result.data.sortedPlayers);
  //   } catch (error) {
  //     console.error("Error fetching sorted players:", error);
  //     setIsMatchedPlayersArrayFetching(false);
  //   }
  // };

  // useEffect(() => {
  //   const userId = userLoginDetailsObject?.accountId;
  //   const profileName = "Default";
  //   if (userId) {
  //     fetchSortedPlayers(userId, profileName);
  //   } else {
  //     console.error("userLoginDetailsObject is missing accountId");
  //   }
  // }, []);

  const currentUser = auth?.currentUser;

  const fetchSortedPlayers = async (userIdParam, profileNameParam) => {
    try {
      const result = await getSortedPlayers({
        userId: userIdParam,
        profileName: profileNameParam,
      });
      return result.data.sortedPlayers;
    } catch (error) {
      console.error("Error fetching sorted players:", error);
      // setIsMatchedPlayersArrayFetching(false);
    }
  };

  const {
    status,
    data: MatchedPlayersArray,
    error,
    refetch,
    isFetching: isMatchedPlayersArrayFetching,
  } = useQuery({
    queryKey: ["fetchSortedPlayers", currentProfileNameSelected], // Include AllPlayers in the queryKey
    queryFn: async () => {
      try {
        const userId = userLoginDetailsObject?.accountId;
        // const profileName = "Default";
        // alert(currentUser + currentProfileNameSelected);
        let sortedPlayers = fetchSortedPlayers(
          userId,
          currentProfileNameSelected ? currentProfileNameSelected : "Default"
        );

        return sortedPlayers;
      } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <>
      {isMatchedPlayersArrayFetching ? (
        <PlayerDisplaySkeleton />
      ) : (
        <Carousel
          className="MatchedPlayers md:h-[100%] md:w-[100%] sm:w-[100%] sm:h-[100%] "
          activeIndex={activeIndex}
          onSelect={handleSelect}
          onSlide={() => {
            const videoElement = document.getElementById(
              `video-${prevActiveIndex}`
            );
            if (videoElement) {
              videoElement.pause();
            }
          }}
          style={{
            height: "100%",
            borderRadius: "1vw",
          }}
        >
          {MatchedPlayersArray?.slice(0, carouselRange).map((data, index) => {
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
              isApiData,
              currentTeamId,
            } = data;

            const clubObject = allClubsInDatabase.find((data) => {
              return data.wyId === currentTeamId;
            });

            var positionABR = position.match(/\((.*?)\)/);
            var result = positionABR ? positionABR[1] : null;

            return (
              <Carousel.Item
                key={index}
                className="matchedPlayersCarousel md:relative md:h-[44.2vh] sm:relative sm:h-[46vh]"
                style={{
                  backgroundSize: "cover",
                  borderRadius: "1vw",
                  padding: ".2vw",
                  background:
                    "linear-gradient(90deg, hsla(280, 81%, 58%, 1) 0%, hsla(279, 81%, 59%, 1) 3%, hsla(276, 79%, 60%, 1) 9%, hsla(274, 79%, 60%, 1) 15%, hsla(269, 76%, 61%, 1) 15%, hsla(271, 77%, 61%, 1) 23%, hsla(259, 72%, 62%, 1) 32%, hsla(246, 68%, 64%, 1) 49%, hsla(226, 67%, 60%, 1) 56%, hsla(194, 96%, 42%, 1) 74%, hsla(196, 80%, 79%, 1) 100%)",
                }}
              >
                <div
                  className="cardBackground md:flex md:h-[100%] md:w-[100%]   sm:flex sm:h-[100%] sm:w-[100%]"
                  style={{
                    borderRadius: "1vw",
                    gap: ".5vw",
                  }}
                >
                  <div className="md:basis-[30%] sm:basis-[50%]">
                    <div className="md:h-[100%] md:w-[100%]   sm:h-[100%] sm:w-[100%]">
                      <MatchedPlayerCard
                        key={index}
                        PlayerClubImage={clubObject?.imageDataURL || ""}
                        PlayerClubName={clubObject?.name || ""}
                        PlayerCountry={data?.Nationality}
                        PlayerCountryCode={CountryCode}
                        PlayerImage={player_profile_image}
                        PlayerFirstName={firstName}
                        PlayerSurName={surName}
                        PlayerPosition={position}
                        PlayerPositionABR={result}
                        PlayerId={id}
                        IsPlayerVerifiedFromApi={isApiData}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:flex-col  md:basis-[70%]  sm:flex sm:flex-col-reverse sm:basis-[70%] sm:pb-[1vh] lg:flex lg:flex-row lg:basis-[70%]">
                    <div
                      className="md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0    lg:basis-[50%] lg:flex-shrink-0"
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

                    <div className="  lg:basis-[50%] lg:flex-shrink-0 md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0">
                      <div
                        className="sm:w-[100%] sm:relative sm:h-[10%] md:w-[90%] md:h-[100%] md:relative lg:w-[90%] lg:h-[100%] lg:relative"
                        style={{
                          borderRadius: "1vw",
                          paddingTop: "1vh",
                        }}
                      >
                        {videos.length <= 0 ? (
                          <div
                            className="sm:h-[19vh]  md:h-[90%]"
                            style={{
                              width: "100%",
                              borderRadius: "1vw",
                              display: "grid",
                              placeContent: "center",
                              background: "black",
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
                            src={videos[0].url}
                            width="100%"
                            style={{
                              position: "absolute",
                            }}
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
        </Carousel>
      )}
    </>
  );
};

export default NewsCarousel;
