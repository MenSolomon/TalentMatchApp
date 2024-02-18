import { Button, CardActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  addDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectCredentials } from "../statemanager/slices/LoginUserDataSlice";
import { auth } from "../Firebase/Firebase";

const PlanItem = () => {
  // credentials state
  // const accountId = useSelector(selectCredentials);
  const [products, setProducts] = useState([]);
  const db = getFirestore();

  const FetchProducts = () => {
    const q = query(collection(db, "products"), where("active", "==", true));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        console.log(doc.id, " => ", doc.data());
        setProducts(doc.data());

        getDocs(collection(doc.ref, "prices")).then((priceSnap) => {
          priceSnap.forEach((priceDoc) => {
            console.log(priceDoc.id, " => ", priceDoc.data());
          });
        });
      });
    });
  };
  const currentUser = auth.currentUser;

  const Checkout = async () => {
    const usersDbRef = collection(db, "users_db");
    const currentUserDocRef = doc(usersDbRef, currentUser.uid);
    const checkoutSessionsCollectionRef = collection(
      currentUserDocRef,
      "checkout_sessions"
    );

    const newCheckoutSessionDocRef = await addDoc(
      checkoutSessionsCollectionRef,
      {
        price: "price_1OlHvYDkt4D42P0j3TJjzwyc",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(newCheckoutSessionDocRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occurred: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    });
  };

  return (
    <div>
      <Button onClick={FetchProducts}>Fetch Products</Button>
      <Button onClick={Checkout}>Checkout</Button>
      <div>
        {products.map((item) => {
          <Card>
            <CardActions>
              <Button size="small">Buy Now</Button>
            </CardActions>
          </Card>;
        })}
      </div>
    </div>
  );
};

export default PlanItem;
