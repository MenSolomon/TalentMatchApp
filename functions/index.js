/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onCall, HttpsError, https } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

// function to add boost points to player
exports.incrementBoost = onCall(async (request) => {
  const db = admin.firestore();
  const userId = await request.auth.uid;

  // Check if userId is provided
  if (!userId) {
    throw new HttpsError("invalid-argument", "Missing userId");
  }

  const playerDocRef = db.collection("players_database").doc(request.data.id);
  const userDocRef = db.collection("users_db").doc(userId);

  try {
    // Create a transaction
    const transaction = db.runTransaction(async (transaction) => {
      // Read current boost points (optional for checking)
      const userSnapshot = await transaction.get(userDocRef);
      const currentUserBoostPoints = await userSnapshot.data().boostPoints;
      if (currentUserBoostPoints > 0) {
        // Update player and user boost points within the transaction
        transaction.update(playerDocRef, {
          boostPoints: admin.firestore.FieldValue.increment(
            request.data.points
          ),
        });
        transaction.update(userDocRef, {
          boostPoints: admin.firestore.FieldValue.increment(
            -request.data.points
          ),
        });
        return { message: "Boost completed" };
      } else if (currentUserBoostPoints == 0) {
        return { message: "You have no boost points left" };
      }
    });

    return await transaction; // Wait for the transaction to complete
  } catch (error) {
    throw new HttpsError("unknown", error.message, error);
  }
});

// function to apply boostPoints purchased
exports.buyBoostPoints = onCall(async (request) => {
  // console.log("buyBoostPoints started");
  // Check user authentication
  if (!request.auth) {
    throw new https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated"
    );
  }

  const uid = request.auth.uid;
  const db = admin.firestore();

  // Get all payment documents
  const paymentsRef = await db.collection(`users_db/${uid}/payments`).get();

  const filteredItems = [];

  try {
    // Filter documents by status and price type
    for (const doc of paymentsRef.docs) {
      const payment = doc.data();
      if (payment.items && payment.items.length > 0 && payment.items[0].price) {
        const type = payment.items[0].price.type;
        if (payment.status === "succeeded" && type === "one_time") {
          filteredItems.push(payment.items);
        }
        // Use type value as needed
      }
    }

    const filtered = [];

    for (const itemsArray of filteredItems) {
      // Assuming itemsArray is an array containing objects like the one you provided
      for (const item of itemsArray) {
        filtered.push(item);
      }
    }

    // Find item with latest created timestamp
    const latestItem = filtered.reduce((prev, current) => {
      // Check if prev is null or if current has a higher created timestamp
      if (!prev || current.price.created > prev.price.created) {
        return current;
      } else {
        return prev;
      }
    }, null);

    // Check if the latest item's purchase time exists in the boostPurchaseTime collection
    const boostPurchaseTimeRef = db.collection(
      `users_db/${uid}/boostPurchaseTime`
    );
    const boostPurchaseTimeQuery = await boostPurchaseTimeRef
      .where("created", "==", latestItem.price.created)
      .get();
    if (boostPurchaseTimeQuery.empty) {
      // Extract purchased boost points from description
      const description = latestItem.description;
      const purchasedBoostPoints = parseInt(description.match(/\d+/)[0]);

      // Update user boost points
      await db
        .collection("users_db")
        .doc(uid)
        .update({
          boostPoints:
            admin.firestore.FieldValue.increment(purchasedBoostPoints),
        });
    }
    return { message: `You purchased ${latestItem.description}` };
  } catch (error) {
    return { error };
  }
  // Optional success message
});

// function to filterePlayers

exports.getSortedPlayers = onCall(async (request) => {
  const { userId, profileName } = request.data;
  const db = admin.firestore();

  if (!userId || !profileName) {
    throw new HttpsError("invalid-argument", "Missing userId or profileName");
  }

  try {
    // Fetch the saved user profiles
    const savedProfilesRef = db.collection(`users_db/${userId}/SavedProfiles`);
    const savedProfilesSnapshot = await savedProfilesRef.get();
    const savedUserProfiles = savedProfilesSnapshot.docs.map((doc) => doc.data());
    console.log(savedUserProfiles, "profiles retrieved server" , " id " , userId, "  pname " , profileName  );

    // Find the specific profile
    const currentProfileFilterObject = savedUserProfiles.find(
      (profile) => profile.label === profileName
    );

    if (!currentProfileFilterObject) {
      throw new HttpsError("not-found", "Profile not found");
    }

    // Fetch all players
    const playersRef = db.collection("players_database");
    const playersSnapshot = await playersRef.get();
    const allPlayers = playersSnapshot.docs.map((doc) => doc.data());

    console.log(allPlayers, "players"  );

    // Filter and sort players
    const filteredPlayers = allPlayers.filter((player) => {
      const {
        Nationality = "",
        contractEndDate = "",
        preferredFoot = "",
        height = 0,
        date_of_birth = "",
        position= ""
      } = player || {};

      const birthdate = new Date(date_of_birth); // Convert date_of_birth to JavaScript Date
      const today = new Date();
      let Age = today.getFullYear() - birthdate.getFullYear();
      const monthDiff = today.getMonth() - birthdate.getMonth();
      const dayDiff = today.getDate() - birthdate.getDate();

      // Adjust age if the birthday has not occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        Age--;
      }

      const filterNationalityValue =
        currentProfileFilterObject.filter.NationalityValue;
      const filterPreferredFoot =
        currentProfileFilterObject.filter.PreferredFootRadioValue;
      const filterFirstHeightRange =
        currentProfileFilterObject.filter.HeightRangeValue[0];
      const filterSecondHeightRange =
        currentProfileFilterObject.filter.HeightRangeValue[1];
      const filterFirstAgeRange =
        currentProfileFilterObject.filter.AgeRangeValue[0];
      const filterSecondAgeRange =
        currentProfileFilterObject.filter.AgeRangeValue[1];
      const filterContractStatus =
        currentProfileFilterObject.filter.ContractStatusCheckBoxes;
        const filterPosition =
        currentProfileFilterObject.filter.PlayerPositionAutoCompleteValue


      const contractEndDateObj = new Date(contractEndDate);
      const currentDate = new Date();
      const diffMilliseconds = contractEndDateObj - currentDate;
      const monthsDifference = diffMilliseconds / (1000 * 60 * 60 * 24 * 30.44);

      console.log(Nationality , filterNationalityValue ,"Ages view" )
      const variablesToCompare = [
        Nationality === filterNationalityValue || filterNationalityValue === "Any" ? 3 : 0,
        preferredFoot === filterPreferredFoot || filterPreferredFoot === "Any" ? 1 : 0,
        filterPosition.includes(position)  || filterPosition  === "Any" ? 2 : 0 ,
        height >= filterFirstHeightRange && height <= filterSecondHeightRange ? 1 : 0,
        Age >= filterFirstAgeRange && Age <= filterSecondAgeRange ? 2 : 0,
        filterContractStatus === "Any" ? 1 : 
          (filterContractStatus === "Contract Expiring in less than 6 months" && monthsDifference <= 6 ? 1 : 0) ||
          (filterContractStatus === "Contract Expiring in more than 6 months" && monthsDifference >= 6 ? 1 : 0),
      ];

      const numberOfMatches = variablesToCompare.reduce((acc, val) => acc + val, 0);
      player.numberOfMatches = numberOfMatches;

      return numberOfMatches >= 5;
    });

    const sortedPlayers = filteredPlayers.sort(
      (player1, player2) => player2.numberOfMatches - player1.numberOfMatches
    );

    console.log("Success fetching sorted players:", sortedPlayers);
    return { sortedPlayers };
  } catch (error) {
    console.error("Error fetching sorted players:", error);
    throw new HttpsError("internal", "Unable to fetch sorted players", error);
  }
});
