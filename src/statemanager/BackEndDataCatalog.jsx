import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import {
  getDocs,
  doc,
  Firestore,
  getDoc,
  collection,
  //   serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  selectPlayersDatabase,
  setApiPlayersDatabase,
  setPlayersDatabase,
  setUsersDatabase,
} from "./slices/DatabaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectTempUsersDatabase } from "./slices/TempDatabaseSlice";
import {
  selectCurrentProfile,
  setUserSavedProfiles,
} from "./slices/SavedProfileSlice";
import {
  selectLoginStatus,
  selectUserDetailsObject,
  setUserDetailsObject,
} from "./slices/LoginUserDataSlice";
import { selectInternetConnectionStatus } from "./slices/InternetActivitiesSlice";
import { setUserNotifications } from "./slices/NofiticationsSlice";
import {
  selectPlayerSelectedByClubOrScoutInPlayerManagement,
  setPlayerSelectedByClubOrScoutInPlayerManagement,
  setPlayersFromApi,
} from "./slices/PlayersInAgencySlice";
import { useParams } from "react-router-dom";
import { setuserMessages } from "./slices/MessagesSlice";
import { setAllPlayersVideos } from "./slices/VideosSlice";
import SplashScreen from "../screens/SplashScreen";

const BackEndDataCatalog = ({ children }) => {
  // const id = useSelector(selectLogInUserID).id;
  const collectionRefUSers = collection(db, `users_db`);
  const loginUserObject = useSelector(selectUserDetailsObject);

  const collectionAllPlayersInDatabase = collection(db, `players_database`);

  const dispatch = useDispatch();

  const temDataBase = useSelector(selectTempUsersDatabase);
  const currentCreatedSearchProfileName = useSelector(selectCurrentProfile);
  const onlineStatus = useSelector(selectInternetConnectionStatus);
  const loginStatus = useSelector(selectLoginStatus);

  const allPlayersDatabaseFromSlice = useSelector(selectPlayersDatabase);

  const [isLoading, setIsLoading] = useState(true);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const [spDat, setSpDat] = useState([]);

  // Given array

  // Function to merge statistics for a player

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3001/api/sportmonks";

      try {
        const response = await fetch(url);
        const result = await response.json();
        setSpDat(result.data);
        console.log(result, "SPORTMONK");

        // Given array
        // const dataArray = [
        //   ...result.data.statistics,
        // ]; /* Your array goes here */
        // **** OLD
        // const allPlayersArray = [...result.data];

        // allPlayersArray.map((data, index) => {
        //   const statisticsObject = {};

        //   // Accumulate values for each statistic type
        //   data.statistics.forEach((player) => {
        //     player.details.forEach((statistic) => {
        //       const { name } = statistic.type;
        //       const totalValue = statistic.value.total || 0;

        //       if (statisticsObject[name]) {
        //         statisticsObject[name] += totalValue;
        //       } else {
        //         statisticsObject[name] = totalValue;
        //       }
        //     });
        //   });

        //   // Convert accumulated values to the desired array format
        //   const accumulatedStatisticsArray = Object.entries(
        //     statisticsObject
        //   ).map(([name, value]) => ({
        //     name,
        //     value,
        //   }));

        //   console.log(accumulatedStatisticsArray, "Medici");
        // });
        // '8888 OLD'

        const allPlayersArray = [...result.data];

        const updatedPlayersArray = allPlayersArray.map((player) => {
          const statisticsObject = {};

          // Accumulate values for each statistic type
          player.statistics.forEach((stat) => {
            stat.details.forEach((detail) => {
              const { name } = detail.type;
              const totalValue = detail.value.total || 0;

              if (statisticsObject[name]) {
                statisticsObject[name] += totalValue;
              } else {
                statisticsObject[name] = totalValue;
              }
            });
          });

          // Convert accumulated values to the desired array format
          const accumulatedStatisticsArray = Object.entries(
            statisticsObject
          ).map(([name, value]) => ({
            name,
            value,
          }));

          // Add the new statistics array to the player object
          return {
            ...player,
            statistics: accumulatedStatisticsArray,
          };
        });

        // Output the updated array
        console.log(updatedPlayersArray, "New players");

        if (updatedPlayersArray.length > 0) {
          dispatch(setPlayersFromApi(updatedPlayersArray));
        }

        // console.log(dataArray, "Medici");

        // const statisticsArray = dataArray.map((player) => {
        //   const playerStatistics = player.details.reduce((acc, statistic) => {
        //     const index = acc.findIndex(
        //       (item) => item.name === statistic.type.name
        //     );
        //     if (index !== -1) {
        //       acc[index].value += statistic.value.total;
        //     } else {
        //       acc.push({
        //         name: statistic.type.name,
        //         value: statistic.value.total,
        //       });
        //     }
        //     return acc;
        //   }, []);

        //   return { statistics: playerStatistics };
        // });

        // console.log(statisticsArray, "Medici2");

        // Output the updated array
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // https://api.sportmonks.com/v3/football/players/172104?api_token=S8oul8IWiFmwZNVgnTCMq6chLdo6VIt2ZbHxXAFcepZVp8rHCzc0O4jEc9SR&include=statistics.details.type

  // const { accountId } = loginUserObject;

  // dispatch(setUserDetailsObject(matchUserAccount[0]));

  // getting the user_detail
  // REMOVING THIS USE EFFECT OR FIXING IT IS A CLUE TO GETTING user.firstname setting

  // useEffect(() => {
  //   const q = query(collectionRefUSers, orderBy("dateCreated", "desc"));
  //   const alldata = onSnapshot(q, (querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });

  //     items.forEach((item) => {
  //       if (item.dateCreated !== "" && item.dateCreated !== null) {
  //         const firestoreTimestamp = item.dateCreated;
  //         const date = firestoreTimestamp.toDate();
  //         const options = {
  //           year: "numeric",
  //           month: "long",
  //           day: "numeric",
  //           hour: "numeric",
  //           minute: "numeric",
  //           second: "numeric",
  //         };
  //         const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  //         const dateString = dateTimeFormat.format(date);
  //         item.dateCreated = dateString;
  //       }
  //     });

  //     console.log(items, "Account ID", loginUserObject?.accountId);
  //     alert(loginUserObject?.accountId + "Acc Backend");
  //     if (items.length > 0) {
  //       // alert(`${accountId} Vas`);
  //       dispatch(setUsersDatabase(items));
  //       if (loginUserObject?.accountId !== undefined) {
  //         dispatch(
  //           setUserDetailsObject(
  //             items.find((obj) => obj.accountId === loginUserObject?.accountId)
  //           )
  //         );
  //       }
  //     }
  //   });
  //   return () => {
  //     alldata();
  //   };
  //   // currentCreatedSearchProfileName (DEPENDENCY)
  // }, []);

  // Updating User profile when any update happens for the user

  // useEffect(() => {
  //   if (Object.keys(loginUserObject).length > 0) {
  //     alert("readl");

  //     const unsub = onSnapshot(
  //       doc(db, "users_db", loginUserObject?.accountId), // Use optional chaining here
  //       (doc) => {
  //         if (doc.data() !== undefined) {
  //           const firestoreTimestamp = doc.data().dateCreated;
  //           const date = firestoreTimestamp.toDate();
  //           const options = {
  //             year: "numeric",
  //             month: "long",
  //             day: "numeric",
  //             hour: "numeric",
  //             minute: "numeric",
  //             second: "numeric",
  //           };
  //           const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  //           const dateString = dateTimeFormat.format(date);

  //           const userObject = {
  //             ...doc.data(),
  //             dateCreated: dateString,
  //           };

  //           dispatch(setUserDetailsObject(userObject));
  //         }
  //       }
  //     );

  //     return () => {
  //       if (loginUserObject) {
  //         unsub();
  //       }
  //     };
  //   } else {
  //     // alert("trumu");
  //   }
  // }, [loginUserObject]); // Include loginUserObject in the dependency array

  //Saved Progiles
  useEffect(() => {
    // const savedProfileSubCollectionRef = doc(
    //   db,
    //   `users_db/${loginUserObject?.accountId}/SavedProfiles`,
    //   loginUserObject?.accountId
    // );

    const savedProfileSubCollectionRef = collection(
      db,
      `users_db/${loginUserObject?.accountId}/SavedProfiles`
    );

    const q = query(savedProfileSubCollectionRef);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      console.log(loginUserObject?.accountId, items, "SavedPFS");
      dispatch(setUserSavedProfiles(items));
    });
    return () => {
      alldata();
    };
  }, []);

  // Notifications
  useEffect(() => {
    // const savedProfileSubCollectionRef = doc(
    //   db,
    //   `users_db/${loginUserObject?.accountId}/SavedProfiles`,
    //   loginUserObject?.accountId
    // );

    const notificationsSubCollectionRef = collection(
      db,
      `users_db/${loginUserObject?.accountId}/Notifications`
    );

    const q = query(notificationsSubCollectionRef);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      console.log(loginUserObject?.accountId, items, "SavedPFS");
      dispatch(setUserNotifications(items));
    });
    return () => {
      alldata();
    };
  }, []);

  // GHANA PREMIER LEAGUE ID: 5610 V3 570
  // NIGERIA PREMIER LEAGUE ID: 5801 V3 399
  // SOUTH AFRICA PREMIER LEAGUE ID: 5606 V3 288
  // GAMBIA PREMIER LEAGUE ID: 5823 V3 845
  // BURKINA FASO PREMIER LEAGUE ID: 5575 V3 423
  // MOROCCO  PREMIER LEAGUE ID: 5575 v3 200
  // COTE D'IVOIRE PREMIER LEAGUE ID: 386

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://v3.football.api-sports.io/players?league=570&season=2023";
      // "https://v3.football.api-sports.io/players?id=276&season=2019";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "48fbd72f828e84cbac320dad600443fd",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result, "FootballAPI2");
        // dispatch(set(result.response));
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // useEffect(()=>{

  //   const qVid = query(
  //     collection(db, `players_database/${item.id}`, "videos")
  //   );

  //   const querySnapshot = await getDocs(qVid);
  //   const videosData = [];

  //   const alldata = onSnapshot(q, (querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });

  //     items.forEach((item) => {
  //       if (item.dateCreated !== "" && item.dateCreated !== null) {
  //         const firestoreTimestamp = item.dateCreated;
  //         const date = firestoreTimestamp.toDate();
  //         const options = {
  //           year: "numeric",
  //           month: "long",
  //           day: "numeric",
  //           hour: "numeric",
  //           minute: "numeric",
  //           second: "numeric",
  //         };
  //         const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  //         const dateString = dateTimeFormat.format(date);
  //         item.dateCreated = dateString;
  //       }
  //     });

  //     if (items.length > 0) {
  //       dispatch(setPlayersDatabase(items));

  //       console.log(items, "All Players array");
  //     }

  //   });
  //   return () => {
  //     alldata();
  //   };

  // },[])

  // Players in database-
  // useEffect(() => {
  //   const q = query(
  //     collectionAllPlayersInDatabase,
  //     orderBy("dateCreated", "desc")
  //   );
  //   const alldata = onSnapshot(q, (querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });

  //     items.forEach((item) => {
  //       if (item.dateCreated !== "" && item.dateCreated !== null) {
  //         const firestoreTimestamp = item.dateCreated;
  //         const date = firestoreTimestamp.toDate();
  //         const options = {
  //           year: "numeric",
  //           month: "long",
  //           day: "numeric",
  //           hour: "numeric",
  //           minute: "numeric",
  //           second: "numeric",
  //         };
  //         const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  //         const dateString = dateTimeFormat.format(date);
  //         item.dateCreated = dateString;
  //       }
  //     });

  //     if (items.length > 0) {
  //       dispatch(setPlayersDatabase(items));

  //       console.log(items, "All Players array");
  //     }

  //     // const updatedLoginUserDetails = items.filter((data) => {
  //     //   return data.accountId ===  loginUserObject?.accountId;
  //     // });

  //     // if (loginUserObject?.accountId
  //     //   ) {
  //     //   dispatch(setUserDetailsObject(updatedLoginUserDetails[0]));
  //     //   console.log("UdatedLoginUserDetails", updatedLoginUserDetails);
  //     // }
  //   });
  //   return () => {
  //     alldata();
  //   };
  // }, []);

  // Retriving videos

  // useEffect for retriving user object realtime

  // import {
  //   collection,
  //   query,
  //   getDocs,
  //   onSnapshot,
  //   subcollection,
  // } from "firebase/firestore";
  // import { useDispatch } from "react-redux";
  // import { setPlayersDatabase, setPlayerVideos } from "yourReduxActions"; // Assuming you have actions for setting players and player videos

  // Assuming 'db' is your Firestore instance

  useEffect(() => {
    // const fetchPlayerData = async () => {
    //   const playersQuery = query(collection(db, "players_database"));
    //   const playersSnapshot = await getDocs(playersQuery);

    //   const playersData = [];

    //   await Promise.all(
    //     playersSnapshot.docs.map(async (playerDoc) => {
    //       const playerId = playerDoc.id;
    //       console.log(playerDoc.id);
    //       alert(playerDoc.id);

    //       const videosQuery = query(
    //         collection(db, `players_database/${playerDoc.id}/videos`)
    //       );
    //       const videosSnapshot = await getDocs(videosQuery);

    //       const playerVideos = videosSnapshot.docs.map((videoDoc) =>
    //         videoDoc.data()

    //         playersData.push({
    //           id: playerId,
    //           videos: videoDoc.data(),
    //           ...playerDoc.data(),
    //         })

    //       );

    //     })
    //   );

    //   console.log(playersData, "pdata");
    //   dispatch(setPlayersDatabase(playersData));
    //   // dispatch(setPlayersDatabase(playersData));
    //   ///

    //   const allVideos = [];

    //   // Loop through each player object
    //   playersData.forEach((player) => {
    //     const {
    //       id: playerId,
    //       player_profile_image: playerProfileImage,
    //       videos,
    //     } = player;

    //     // Check if the player has videos
    //     if (videos && videos.length > 0) {
    //       // Loop through each video of the player
    //       const modifiedVideos = videos.map((video) => ({
    //         ...video,
    //         playerId,
    //         playerProfileImage,
    //       }));

    //       // Concatenate the modified videos to the allVideos array
    //       allVideos.push(...modifiedVideos);
    //     }
    //   });

    //   // alert("Player data retrieved");
    //   console.log(allVideos, "all videos");

    //   dispatch(setAllPlayersVideos(allVideos));
    // };

    // const unsubscribe = onSnapshot(
    //   query(collection(db, "players_database")),
    //   () => {
    //     // You can add logic here if you want to react to real-time changes
    //   }
    // );

    // Call the function to fetch data
    {
      /*Progress */
    }
    // const fetchPlayerData = async () => {
    //   try {
    //     const playersQuery = query(collection(db, "players_database"));
    //     const playersSnapshot = await getDocs(playersQuery);

    //     const playersData = [];

    //     await Promise.all(
    //       playersSnapshot.docs.map(async (playerDoc) => {
    //         const playerId = playerDoc.id;
    //         console.log("Player ID:", playerId);

    //         const videosQuery = query(
    //           collection(db, `players_database/${playerId}/videos`)
    //         );

    //         try {
    //           const videosSnapshot = await getDocs(videosQuery);
    //           const playerVideos = videosSnapshot.docs.map((videoDoc) =>
    //             videoDoc.data()
    //           );

    //           playersData.push({
    //             id: playerId,
    //             videos: playerVideos,
    //             ...playerDoc.data(),
    //           });
    //         } catch (error) {
    //           console.error("Error fetching videos:", error);
    //         }
    //       })
    //     );

    //     console.log("Players Data:", playersData);
    //     dispatch(setPlayersDatabase(playersData));

    //     const allVideos = playersData.flatMap((player) =>
    //       player.videos.map((video) => ({
    //         ...video,
    //         playerId: player.id,
    //         playerProfileImage: player.player_profile_image,
    //       }))
    //     );

    //     console.log("All Videos:", allVideos);
    //     dispatch(setAllPlayersVideos(allVideos));
    //   } catch (error) {
    //     console.error("Error fetching players:", error);
    //   }
    // };
    {
      /* */
    }
    // const fetchPlayerData = async () => {
    //   try {
    //     const playersQuery = query(collection(db, "players_database"));
    //     const playersSnapshot = await getDocs(playersQuery);

    //     const playersData = [];
    //     const totalPlayers = playersSnapshot.docs.length;
    //     let processedPlayers = 0;

    //     await Promise.all(
    //       playersSnapshot.docs.map(async (playerDoc, index) => {
    //         const playerId = playerDoc.id;
    //         console.log("Player ID:", playerId);

    //         const videosQuery = query(
    //           collection(db, `players_database/${playerId}/videos`)
    //         );

    //         try {
    //           const videosSnapshot = await getDocs(videosQuery);
    //           const playerVideos = videosSnapshot.docs.map((videoDoc) =>
    //             videoDoc.data()
    //           );

    //           playersData.push({
    //             id: playerId,
    //             videos: playerVideos,
    //             ...playerDoc.data(),
    //           });

    //           // Update progress
    //           processedPlayers++;
    //           const currentProgress = (processedPlayers / totalPlayers) * 100;

    //           // Simulate real-time updates with a small delay
    //           setTimeout(() => {
    //             setProgressPercentage(currentProgress);
    //           }, index * 100); // Adjust the delay based on your preference
    //         } catch (error) {
    //           console.error("Error fetching videos:", error);
    //         }
    //       })
    //     );

    //     console.log("Players Data:", playersData);
    //     dispatch(setPlayersDatabase(playersData));

    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching players:", error);
    //   }
    // };
    const fetchPlayerData = async () => {
      try {
        await document.fonts.ready;

        const playersQuery = query(collection(db, "players_database"));
        const playersSnapshot = await getDocs(playersQuery);

        const playersData = [];
        const totalPlayers = playersSnapshot.docs.length;
        let processedPlayers = 0;
        let currentProgress = 0;

        const totalTimeInSeconds = 3; // Total time you want the progress to complete (adjustable)
        const intervalStep = (totalTimeInSeconds * 1000) / totalPlayers;

        const updateProgress = () => {
          currentProgress += 9; // Adjust the step value based on your preference

          // Cap the progress at 90
          if (currentProgress >= 90) {
            currentProgress = 90;
          }

          setProgressPercentage(currentProgress);

          // Check if all documents have been collected
          if (processedPlayers === totalPlayers && currentProgress === 90) {
            setIsLoading(false);
          } else {
            // Call the function again after a delay
            setTimeout(updateProgress, intervalStep);
          }
        };

        // Start the updateProgress function initially
        updateProgress();

        await Promise.all(
          playersSnapshot.docs.map(async (playerDoc) => {
            const playerId = playerDoc.id;
            console.log("Player ID:", playerId);

            const videosQuery = query(
              collection(db, `players_database/${playerId}/videos`)
            );

            try {
              const videosSnapshot = await getDocs(videosQuery);
              const playerVideos = videosSnapshot.docs.map((videoDoc) =>
                videoDoc.data()
              );

              playersData.push({
                id: playerId,
                videos: playerVideos,
                ...playerDoc.data(),
              });

              // Update progress
              processedPlayers++;
            } catch (error) {
              console.error("Error fetching videos:", error);
            }
          })
        );

        // console.log("Players Data:", playersData);
        dispatch(setPlayersDatabase(playersData));
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayerData();

    // return () => {
    //   unsubscribe();
    // };
  }, [dispatch, db, loginUserObject, onlineStatus]); // Make sure to include 'db' in the dependency array if it's used inside the useEffect

  useEffect(() => {
    if (loginUserObject?.accountId !== undefined) {
      const unsub = onSnapshot(
        doc(db, "users_db", loginUserObject?.accountId),
        // { includeMetadataChanges: true },
        (doc) => {
          console.log(doc.data());

          if (doc.data() !== undefined) {
            dispatch(setUserDetailsObject(doc.data()));
          }
        }
      );
      return () => {
        unsub();
      };
    }
  }, []);
  ///
  const dummyUserArray = [
    {
      contactId: "70dc7675-af46-44cb-beb4-4104e55db9f8",
      name: "Gory g",
      image: "",
      messages: [
        {
          senderId: "1234",
          recepientId: "2134",
          senderName: "Michael Solomon",
          recepientName: "Jeff Asamoah",
          message: "Play styleas",
          dateSent: "11/12/22",
        },
        {
          senderId: "2134",
          recepientId: "1234",
          senderName: "Jeff Asamoah",
          recepientName: "Michael Solomon",
          message: "Seen it",
          dateSent: "11/12/22",
        },
        {
          senderId: "2134",
          recepientId: "1234",
          senderName: "Jeff Asamoah",
          recepientName: "Michael Solomon",
          message: "Seen it",
          dateSent: "11/12/22",
        },
      ],
    },
    {
      contactId: "231",
      name: "Esther Addae",
      image: "",
      messages: [
        {
          senderId: "1234",
          recepientId: "2134",
          senderName: "Michael Solomon",
          recepientName: "Jeff Asamoah",
          message: "Play styleas",
          dateSent: "11/12/22",
        },
        {
          senderId: "2134",
          recepientId: "1234",
          senderName: "Jeff Asamoah",
          recepientName: "Michael Solomon",
          message: "Seconds",
          dateSent: "11/12/22",
        },
        {
          senderId: "2134",
          recepientId: "1234",
          senderName: "Jeff Asamoah",
          recepientName: "Michael Solomon",
          message: "Real Estate",
          dateSent: "11/12/22",
        },
      ],
    },
  ];

  // useEffect(()=>{
  //   const unsubscribeFunctions = documentIdsArray.map((documentId) =>
  //   onSnapshot(doc(db, 'yourCollection', documentId), (docSnapshot) => {
  //     const data = docSnapshot.data();
  //     console.log(data);

  //     // Handle the updated data here, update your state or UI
  //   })
  // );

  // },[])

  {
    /*CHATTED USERS */
  }

  // Notifications
  // Notifications

  useEffect(() => {
    const userToSelfMessageRef = collection(
      db,
      `Chats/${loginUserObject.accountId}/Messages`
    );

    const q = query(userToSelfMessageRef);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        // alert(doc.id());
      });

      dispatch(setuserMessages(items));
      console.log(loginUserObject?.accountId, items, "Gakpo");
    });
    return () => {
      alldata();
    };
  }, []);

  // RETRIEVE PLAYERS FROM API DATABASE
  useEffect(() => {
    const apiPlayers = collection(db, `api_data`);

    // const playersQuery = query(collection(db, "players_database"));
    // const playersSnapshot =  getDocs(playersQuery);
    const q = query(apiPlayers);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        // alert(doc.id());
      });

      const mixedPlayers = [...allPlayersDatabaseFromSlice, ...items];

      dispatch(setApiPlayersDatabase(items));
      console.log(items, "Retrieve Api Data");
    });
    return () => {
      alldata();
    };
  }, []);

  // useEffect(() => {
  //   const documentRef = doc(
  //     db,
  //     `users_db/${loginUserObject.accountId}/Chats/`,
  //     "messages"
  //   );

  //   const unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
  //     if (docSnapshot.exists()) {
  //       const documentData = docSnapshot.data();
  //       console.log("Document Data:", documentData);

  //       // Handle the real-time updates of the document data here
  //     } else {
  //       console.log("Document does not exist");
  //       // Handle the case where the document does not exist
  //     }
  //   });

  //   return () => {
  //     // Unsubscribe from the snapshot listener when the component unmounts
  //     unsubscribe();
  //   };
  // }, []);
  return (
    <div>
      {/* Other content or logic specific to BackEndDataCatalog */}
      {loginStatus === false ? (
        children
      ) : isLoading === true ? (
        <SplashScreen progressPercentage={progressPercentage} />
      ) : (
        children
      )}
    </div>
  );
};

export default BackEndDataCatalog;
