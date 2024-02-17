//PlanItem.js

import { loadStripe } from "@stripe/stripe-js";
//Firebase db import from firebase.js
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectCredentials } from "../statemanager/slices/LoginUserDataSlice";

const PlanItem = ({ productData, isCurrentPackage }) => {
  const user = useSelector(selectCredentials);

  const loadCheckout = async (priceId) => {
    //Disable submit button while checkout processing
    setBtnStatus({
      isLoading: true,
      isDisabled: true,
    });

    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occurred: ${error.message}`);
        setBtnStatus({
          isLoading: false,
          isDisabled: false,
        });
      }

      if (sessionId) {
        const stripe = await loadStripe(
          process.env.REACT_APP_STRIPE_PUBLIC_KEY
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
};

export default PlanItem;
