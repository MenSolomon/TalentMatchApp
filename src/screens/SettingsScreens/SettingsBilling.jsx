import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { app, db, functions } from "../../Firebase/Firebase";
import { productDetails } from "../../utils/ProductDetails";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSubscriptionActive,
  selectNextBillingDate,
  selectUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import { useQuery } from "@tanstack/react-query";
import {
  selectCircularLoadBackdropMessage,
  setCircularLoadBackdropMessage,
  setOpenCircularLoadBackdrop,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { collection, getDocs } from "firebase/firestore";

function SettingsBilling() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetailsObject = useSelector(selectUserDetailsObject);
  const { subscriptionPackage, accountId } = userDetailsObject;
  const circularLoadBackdropMessage = useSelector(
    selectCircularLoadBackdropMessage
  );
  // state to display circular progress animation
  const [isLoading, setIsLoading] = useState(false);
  // state to set subscription status
  const [subscriptionStatus, setSubscriptionStatus] = useState();
  // state to set next billing date
  const nextBillingDate = useSelector(selectNextBillingDate);

  // product details array
  // We take the names from a dublicate array in the src directory to prevent unecessary reads from firestore
  // const productids = productDetails;
  const isSubscriptionActive = useSelector(selectIsSubscriptionActive);
  const fetchProductIds = async () => {
    const productsObjectsArray = [];

    try {
      const productsCollectionRef = collection(db, `products`);
      const productsDocs = await getDocs(productsCollectionRef);

      for (const product of productsDocs.docs) {
        productsObjectsArray.push({
          id: product.id,
          name: product.data().name,
        });
      }
    } catch (error) {
      console.log(`fetchProducts`, error);
    }
    // console.log(productsObjectsArray);
    return productsObjectsArray;
  };

  const {
    status,
    data: productids,
    error,
    refetch,
  } = useQuery({ queryKey: ["fetchProducts"], queryFn: fetchProductIds });

  const handleCustomerPortal = async () => {
    const functions = getFunctions(app);
    const createPortalLink = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );

    const { data } = await createPortalLink({
      returnUrl: window.location.origin,
      locale: "auto", // Optional, defaults to "auto"
      // configuration: "bpc_1JSEAKHYgolSBA358VNoc2Hs", // Optional ID of a portal configuration: https://stripe.com/docs/api/customer_portal/configuration
    });

    window.location.assign(data.url);
  };

  return (
    <div
      className="md:flex md:flex-col md:w-[100%] md:h-[82vh]   sm:flex sm:flex-col sm:w-[100%] sm:h-[82vh]  primaryTextColor"
      style={
        {
          // width: "100%",
          // height: "82vh",
          // display: "flex",
          // flexDirection: "column",
          // overflowY: "scroll",
        }
      }>
      {/* Header Column */}
      <div style={{ flex: "0.01" }}>
        <h5 className="lg:text-[1em] md:text-[1em] tb:text-[1em]">Billing</h5>
      </div>

      {/* Divider */}
      <div style={{ flex: "0.01" }}>
        <Divider sx={{ background: "wheat", width: "100%" }} />
      </div>

      {/* Page content*/}
      <div className="md:flex md:flex-col " style={{ flex: "0.89" }}>
        <div
          style={{
            flex: ".35",
            // background: "red",
            display: "flex",
            flexDirection: "row",
            marginBottom: "5vh",
            gap: "5em",
          }}>
          <Paper
            className="cardBackground primaryTextColor md:w-[30vw] md:h-[90%] md:flex md:flex-col sm:pt-[20px]   sm:w-[90vw] sm:h-[18vh] sm:flex sm:flex-col"
            style={{ padding: "10px 20px" }}>
            <div
              style={{
                flex: ".3",
                // background: "green",
                display: "flex",
                flexDirection: "row",
                // alignItems: "center",
                // justifyContent: "space-between",
              }}>
              <div className="padding" style={{ flex: ".7" }}>
                {productids?.map((item) => {
                  if (subscriptionPackage === item.id) {
                    return <div key={item.id}>{item.name}</div>;
                  }
                })}
                {isSubscriptionActive ? "Active" : "Inactive"}
              </div>
              <div style={{ flex: ".3" }}>
                <div style={{ padding: "5px 0px" }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/changeSubscription")}>
                    Change Package
                  </Button>
                </div>
              </div>
            </div>
            <div style={{ flex: ".7" }}>
              <div>
                Next Billing Date: <span>{nextBillingDate}</span>
              </div>
            </div>
          </Paper>
        </div>
        <div
          style={{
            flex: ".3",
            // background: "red
            marginBottom: "3vh",
            display: "flex",
            flexDirection: "row",
          }}>
          <div style={{ flex: ".7" }}>
            <div style={{ padding: "10px 20px" }}>
              <h4 className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
                Subscription
              </h4>
              <small className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
                Modify your subscription <br /> Cancel or renew
              </small>
            </div>
          </div>
          <div style={{ flex: ".3" }}>
            <div style={{ padding: "10px 0px" }}>
              {isLoading ? (
                <>
                  <CircularProgress />
                  <Typography>
                    Please wait.. Redirecting you to Stripe
                  </Typography>
                </>
              ) : (
                <Button
                  variant={"contained"}
                  onClick={() => {
                    handleCustomerPortal();
                    // setIsLoading(true);
                    dispatch(setOpenCircularLoadBackdrop(true));
                    // dispatch(
                    //   setCircularLoadBackdropMessage(
                    //     "Connecting To Stripe Portal"
                    //   )
                    // );
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    // padding: "10px",
                  }}
                  size="small">
                  Manage Subscription
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsBilling;
