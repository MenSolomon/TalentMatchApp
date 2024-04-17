/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onCall, HttpsError, https} = require("firebase-functions/v2/https");
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
          boostPoints: admin.firestore.FieldValue.increment(request.data.points),
        });
        transaction.update(userDocRef, {
          boostPoints: admin.firestore.FieldValue.increment(-request.data.points),
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

// function to apply boostPoints purchased
exports.buyBoostPoints = onCall(async (request) => {
  console.log("buyBoostPoints started");
  // Check user authentication
  if (!request.auth) {
    throw new https.HttpsError("unauthenticated", "The function must be called while authenticated");
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
      if (
        payment.items &&
        payment.items.length > 0 &&
        payment.items[0].price
      ) {
        const type = payment.items[0].price.type;
        if (
          payment.status === "succeeded" &&
          type === "one_time"
        ) {
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
      if (
        !prev ||
        current.price.created > prev.price.created
      ) {
        return current;
      } else {
        return prev;
      }
    }, null);

    // Check if the latest item's purchase time exists in the boostPurchaseTime collection
    const boostPurchaseTimeRef = db.collection(`users_db/${uid}/boostPurchaseTime`);
    const boostPurchaseTimeQuery = await boostPurchaseTimeRef.where("created", "==", latestItem.price.created).get();
    if (boostPurchaseTimeQuery.empty) {
    // Extract purchased boost points from description
      const description = latestItem.description;
      const purchasedBoostPoints = parseInt(description.match(/\d+/)[0]);

      // Update user boost points
      await db.collection("users_db").doc(uid).update({
        boostPoints: admin.firestore.FieldValue.increment(purchasedBoostPoints),
      });
    }
    return {message: `You purchased ${latestItem.description}`};
  } catch (error) {
    return {error};
  }
  // Optional success message
});
