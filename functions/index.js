/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const {onCall, HttpsError} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

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
          boostPoints: admin.firestore.FieldValue.increment(10),
        });
        transaction.update(userDocRef, {
          boostPoints: admin.firestore.FieldValue.increment(-10),
        });
        return {message: "Boost completed"};
      } else if (currentUserBoostPoints == 0) {
        return {message: "You have no boost points left"};
      }
    });

    return await transaction; // Wait for the transaction to complete
  } catch (error) {
    throw new HttpsError("unknown", error.message, error);
  }
});
