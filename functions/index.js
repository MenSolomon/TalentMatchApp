/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// index.js

const {onCall, HttpsError} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

exports.incrementBoost = onCall(async (request) => {
  const db = admin.firestore();
  const accountId = request.auth.uid;

  // Check if accountId is provided
  if (!accountId) {
    throw new HttpsError("invalid-argument", "Missing accountId");
  }

  const docRef = db.collection("players_database").doc(request.data.id);

  try {
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new HttpsError("not-found", "User document not found");
    }

    await docRef.update({
      boostPoints: admin.firestore.FieldValue.increment(10),
    });

    // Schedule a timeout function to reset boost after 1 minute
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await docRef.update({
            boostPoints: 0,
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 60 * 1000); // 1 minute in milliseconds
    });
    return {message: "Boost incremented successfully"};
  } catch (error) {
    throw new HttpsError("unknown", error.message, error);
  }
});
