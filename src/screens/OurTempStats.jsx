// function callApi(endpoint, params = {}) {
//   const parameters =
//     Object.keys(params).length > 0 ? "?" + new URLSearchParams(params) : "";
//   const url = `https://v3.football.api-sports.io/${endpoint}${parameters}`;

//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "YOUR_API_KEY_HERE",
//       "Content-Type": "application/json", // Added Content-Type header
//     },
//   };

//   return fetch(url, options)
//     .then((response) => response.json())
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//       return error; // Provide informative error handling
//     });
// }

// function playersData(league, season, page = 1, playersData = []) {
//   return callApi("players", { league, season, page })
//     .then((response) => {
//       if (response.error) {
//         console.error("API error:", response.error);
//         return playersData; // Handle API errors gracefully
//       }

//       playersData = [...playersData, ...response.response];

//       if (response.paging.current < response.paging.total) {
//         const nextPage = response.paging.current + 1;

//         if (nextPage % 2 === 1) {
//           // Consider using promises or async/await for better control
//           // over sleep timing and avoiding blocking behavior
//           // return new Promise(resolve => setTimeout(() => {
//           //   resolve(playersData(league, season, nextPage, playersData));
//           // }, 1000));
//         }

//         return playersData(league, season, nextPage, playersData);
//       }

//       return playersData;
//     })
//     .catch((error) => {
//       console.error("Error fetching players:", error);
//       return []; // Provide default value for failed requests
//     });
// }

// // Example usage (using async/await for clarity and error handling):
// async function main() {
//   try {
//     const teams = await callApi("teams", { league: 39, season: 2021 });
//     console.log("Teams:", teams);

//     const players = await playersData(39, 2021);
//     console.log("Players:", players);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// main();

const handleCreateProfile = async () => {
  // get accountid and product id
  const currentUser = auth.currentUser;
  const accountId = await currentUser.uid;

  // get product id form database if the redux state is empty
  const productIDRef = doc(db, `users_db/${accountId}`);
  const productIdSnap = await getDoc(productIDRef);
  const productID = await productIdSnap.data().subscriptionPackage;
  const priceID = await productIdSnap.data().subscriptionPrice;

  try {
    const subscriptionsRef = collection(
      db,
      "users_db",
      accountId,
      "subscriptions"
    );

    const queryActiveOrTrialing = query(
      subscriptionsRef,
      where("status", "in", ["trialing", "active"])
    );

    onSnapshot(queryActiveOrTrialing, (snapshot) => {
      const doc = snapshot.docs[0];
      if (doc) {
        console.log("subs exists");
        const uuid = uuidv4();
        // alert("Saved prof" + accountId);

        if (userSavedProfiles.length < 1) {
          // This is the rest of users in the database devoid of the current user logged in

          // doing this because its not an online database and not a snapshot or realtime update so i have to update the logged in user object and also same user object in the database

          ///. HAVE TO WRITE A TRY CATCH BLOCK TO DETECT ANY ERRORS
          try {
            const savedProfileSubCollectionRef = doc(
              db,
              `users_db/${accountId}/SavedProfiles`,
              "Default"
            );

            setDoc(savedProfileSubCollectionRef, {
              label: "Default",
              dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
              filter: currentProfileFilterObject,
              labelId: "Default",
            });
          } catch (error) {
            console.log(error);
          }

          handleClose();

          /// REset the filter object after createion
          dispatch(
            setCurrentProfileFilterObject({
              // PlaceOfBirth: "Any",
              NationalityValue: "Any",
              AgeRangeValue: [0, 40],
              HeightRangeValue: [0, 2.5],
              positionRangeSliderValues: {
                "Clean sheet": [0, 100],
                Saves: [0, 100],
                "Long pass accuracy": [0, 100],
                Interception: [0, 100],

                Blocks: [0, 100],
                "Successful tackles rate %": [0, 100],
                "pass success": [0, 100],
                "total passes": [0, 100],
                assists: [0, 100],

                Goals: [0, 100],
                "Goal/match played ratio": [0, 100],
                Assists: [0, 100],
                // "Shots per game": [0, 100],
              },
              MarketValue: "0 - 99,999",
              SalaryExpectationValue: "0 - 4,999",

              ClubCountryValue: "Any",
              // CaptainRadioValue: "Any",
              PrefferedFootRadioValue: "Any",
              PlayerDivisionValue: "Any",
              ContractStatusCheckBoxes: "Any",

              // REview below
              PlayerPositionAutoCompleteValue: "Any",
              PlayerAlternatePositionAutoCompleteValue: "None",

              previousProfile: "",
            })
          );
        } else {
          const savedProfileSubCollectionRef = doc(
            db,
            `users_db/${accountId}/SavedProfiles`,
            uuid
          );
          if (profileName !== "" && profileName.toLowerCase() !== "") {
            ///. HAVE TO WRITE A TRY CATCH BLOCK TO DETECT ANY ERRORS

            const profileNameMatch = userSavedProfiles.filter((data) => {
              const { label } = data;
              return (
                label.replace(/\s/g, "").toLowerCase() ===
                profileName.replace(/\s/g, "").toLowerCase()
              );
            });

            console.log("ProfileLabelMatxh", profileNameMatch);
            // This it to make sure that we dont create a profile with the same name

            if (profileNameMatch.length <= 0) {
              setDoc(savedProfileSubCollectionRef, {
                label: profileName,
                dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
                filter: currentProfileFilterObject,
                labelId: uuid,
              });

              handleClose();
              dispatch(
                setCurrentProfileFilterObject({
                  // PlaceOfBirth: "Any",
                  NationalityValue: "Any",
                  AgeRangeValue: [0, 40],
                  HeightRangeValue: [0, 2.5],
                  positionRangeSliderValues: {
                    "Clean sheet": [0, 100],
                    Saves: [0, 100],
                    "Long pass accuracy": [0, 100],
                    Interception: [0, 100],

                    Blocks: [0, 100],
                    "Successful tackles rate %": [0, 100],
                    "pass success": [0, 100],
                    "total passes": [0, 100],
                    assists: [0, 100],

                    Goals: [0, 100],
                    "Goal/match played ratio": [0, 100],
                    Assists: [0, 100],
                    // "Shots per game": [0, 100],
                  },
                  SalaryExpectationValue: "0 - 4,999",

                  MarketValue: "0 - 99,999",

                  ClubCountryValue: "Any",
                  // CaptainRadioValue: "Any",
                  PrefferedFootRadioValue: "Any",
                  PlayerDivisionValue: "Any",
                  ContractStatusCheckBoxes: "Any",
                  // REview below
                  PlayerPositionAutoCompleteValue: "Any",
                  PlayerAlternatePositionAutoCompleteValue: "None",
                  previousProfile: "",
                })
              );
              /// Snackbar show
              dispatch(setSnackbarMessage(`"${profileName}" filter created`));
              dispatch(setSnackbarTriggerCounter());

              setProfileName("");
            } else {
              triggerWarningAlertModal(
                "Please change your profile name a similar name already exists"
              );
            }
          } else {
            triggerWarningAlertModal(
              "Please enter a profile name (cannot be name default)"
            );
          }
        }
        // changing the click current clicked value to the edited name

        // reset the textfields after save
      } else {
        StripeCheckout(priceID);
        // Handle the case where no active/trialing subscription exists
        console.log("No active or trialing subscriptions found.");
        // set isLoading to true
        setIsloading(true);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
