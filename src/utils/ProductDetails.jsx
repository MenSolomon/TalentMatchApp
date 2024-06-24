export const productDetails = [
  {
    id: "prod_PaUHk97wgtKo0H",
    name: "Club Premium",
    role: "Club",
    details: [],
  },
  {
    id: "prod_PaUHRN5h6D6QKA",
    name: "Club Starter",
    role: "Club",
    details: [],
  },
  {
    id: "prod_PaUF5OfYMdzFMf",
    name: "Player Starter",
    role: "Player",
    details: [],
  },
  {
    id: "prod_PaUE0WeQlZ2Cbl",
    name: "Player Premium ",
    role: "Player",
    details: [],
  },
  {
    id: "prod_PaUDv3uRDwWYKc",
    name: "Scout Premium",
    role: "Scout",
    details: [
      "Access to Unlimited Number of Players",
      "Save Up to 20 Profiles",
      "Ability To Hide Your Profile",
      "Send Messages to Unlimited Number of Accounts Per Month",
    ],
  },
  {
    id: "prod_PaUClniIfnFCUO",
    name: "Scout Starter",
    role: "Scout",
    details: [
      "Access to Unlimited Number of Players",
      "Save Up to 5 Profiles",
      "Send Messages to X Accounts Per Month",
    ],
  },
  {
    id: "prod_PaUAvtceTmYGJV",
    name: "Agent Premium",
    role: "Agent",
    details: [],
  },
  {
    id: "prod_Q0dsExeNenv8Bl",
    name: "Agent Starter",
    role: "Agent",
    details: [],
  },
  {
    id: "prod_PsoKSsFkDq1dcy",
    name: "Agent Starter",
    role: "Agent",
    details: [],
  },

  {
    id: "prod_Ps1JzpXiJ69kzn",
    name: "Basic",
    role: "Basic",
  },
];

import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { db } from "../Firebase/Firebase";

export default function ProductDetails() {
  const [prod, setProd] = useState("prod_Ps1JzpXiJ69kzn");
  const uploadFeatures = async () => {
    const docRef = doc(db, `products/${prod}`);
    await updateDoc(docRef, {
      features: {
        canHideVisibility: false,
        maxPlayersInAgency: 0,
        maxProfiles: 1,
        maxVideosPerPlayer: 0,
        maxConnections: 1,
        maxCountries: 3,
      },
    });
  };

  const uploadDetails = async () => {
    const docRef = doc(db, `products/${prod}`);
    await updateDoc(docRef, {
      details: ["Save 1 Player Profiles", "Connect to 1 Account"],
    });
  };

  return (
    <div>
      <Button onClick={uploadFeatures}>Update Features</Button>
      <Button onClick={uploadDetails}>Update Details</Button>
    </div>
  );
}

// exports.processBoostPointsPayment = functions.firestore
//     .document("users_db/{userId}/payments/{paymentId}")
//     .onWrite(async (change, context) => {
//       const paymentData = change.after.data();

//       // Filter payments based on specified conditions
//       if (
//         !paymentData ||
//         !Array.isArray(paymentData.items) ||
//       paymentData.status !== "succeeded" ||
//       !paymentData.items.some((item) => item.price.type === "one_time")
//       ) {
//         return null;
//       }

//       const items = paymentData.items.sort((a, b) => b.created - a.created);
//       const latestItem = items[0];

//       // Check timestamp within one minute
//       const minuteAgo = Date.now() - 60 * 1000;
//       if (latestItem.created < minuteAgo) {
//         return null;
//       }

//       // Extract boost points from description
//       const boostPoints = parseInt(latestItem.description.match(/\d+/)[0]);

//       // Update user's boost points
//       const userId = context.params.userId; // Get user ID from path parameter
//       const userDoc = admin.firestore().collection("users_db").doc(userId);
//       await userDoc.update({
//         boostPoints: admin.firestore.FieldValue.increment(boostPoints),
//       });
//     });

// try {
//   const q = query(
//     collection(db, `users_db/${accountId}/payments`)
//   );
//   const querySnapshot = await getDocs(q);

//   const filteredItems = [];

//   // Filter documents by status and price type
//   for (const doc of querySnapshot.docs) {
//     const payment = doc.data();
//     if (
//       payment.items &&
//       payment.items.length > 0 &&
//       payment.items[0].price
//     ) {
//       const type = payment.items[0].price.type;
//       if (
//         payment.status === "succeeded" &&
//         type === "one_time"
//       ) {
//         filteredItems.push(payment.items);
//       }
//       // Use type value as needed
//     }
//   }
//   console.log("filteredItems", filteredItems);

//   const filtered = [];

//   for (const itemsArray of filteredItems) {
//     // Assuming itemsArray is an array containing objects like the one you provided
//     for (const item of itemsArray) {
//       filtered.push(item);
//     }
//   }

//   console.log("filtered", filtered);

//   // Find item with latest created timestamp
//   const latestItem = filtered.reduce((prev, current) => {
//     // Check if prev is null or if current has a higher created timestamp
//     if (
//       !prev ||
//       current.price.created > prev.price.created
//     ) {
//       return current;
//     } else {
//       return prev;
//     }
//   }, null);

//   console.log("latestItem", latestItem);

//   // Check if the latest item's purchase time exists in the boostPurchaseTime collection
//   const boostPurchaseTimeRef = collection(
//     db,
//     `users_db/${accountId}/boostPurchaseTime`
//   );
//   const boostPurchaseTimeQuery = query(
//     boostPurchaseTimeRef,
//     where("created", "==", latestItem.price.created)
//   );
//   const boostPurchaseTimeSnapshot = await getDocs(
//     boostPurchaseTimeQuery
//   );

//   if (!isEmpty(boostPurchaseTimeSnapshot.docs)) {
//     status = null;
//   }
// } catch (error) {
//   console.log(error);
// }
