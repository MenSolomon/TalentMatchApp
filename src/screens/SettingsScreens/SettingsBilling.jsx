import { Button, Card, CircularProgress, Divider, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilteredPlayersTable from "../../components/Tables/FilterPlayersTable";
import { auth, db, functions } from "../../Firebase/Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { productDetails } from "../../utils/ProductDetails";
import { httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsSubscriptionActive,
  selectNextBillingDate,
  selectUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";
import { useQuery } from "@tanstack/react-query";

function SettingsBilling() {
  const navigate = useNavigate();

  const userDetailsObject = useSelector(selectUserDetailsObject);
  const { subscriptionPackage, accountId } = userDetailsObject;

  // state to display circular progress animation
  const [isLoading, setIsLoading] = useState(false);
  // state to set subscription status
  const [subscriptionStatus, setSubscriptionStatus] = useState();
  // state to set next billing date
  const nextBillingDate = useSelector(selectNextBillingDate);

  // product details array
  // We take the names from a dublicate array in the src directory to prevent unecessary reads from firestore
  const productids = productDetails;
  const isSubscriptionActive = useSelector(selectIsSubscriptionActive);

  useEffect(() => {
    const activeQueryFn = () => {
      const activeProductsQuery = query(
        collection(db, "products"),
        where("active", "==", true)
      );

      onSnapshot(activeProductsQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const { doc } = change;
          console.log(
            `Product ${doc.id} ${
              change.type === "added" ? "added" : "changed"
            }:`,
            doc.data()
          );

          // Fetch and log prices only for added or modified products
          if (change.type === "added" || change.type === "modified") {
            onSnapshot(doc.ref.collection("prices"), (priceSnapshot) => {
              priceSnapshot.docChanges().forEach((priceChange) => {
                const { doc } = priceChange;
                console.log(
                  `Price ${
                    priceChange.type === "added" ? "added" : "changed"
                  } for product ${doc.ref.parent.id}:`,
                  doc.data()
                );
              });
            });
          }
        });
      });
    };
    // get status of subscription
    const getSubscriptionStatus = async () => {
      if (isSubscriptionActive === false) {
        setSubscriptionStatus("Inactive");
      } else if (isSubscriptionActive === true) {
        setSubscriptionStatus("Active");
      }
    };
    // activeQueryFn();
    getSubscriptionStatus();
  }, []);

  const handleCustomerPortal = async () => {
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
        <h5>Billing</h5>
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
            className="cardBackground primaryTextColor md:w-[30vw] md:h-[90%] md:flex md:flex-col sm:pt-[20px]   sm:w-[90vw] sm:h-[15vh] sm:flex sm:flex-col"
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
                {productids.map((item) => {
                  if (subscriptionPackage === item.id) {
                    return <div>{item.name}</div>;
                  }
                })}
                {isSubscriptionActive ? "Active" : "Inactive"}
              </div>
              <div style={{ flex: ".3" }}>
                <div style={{ padding: "5px 0px" }}>
                  <Button
                    variant="outlined"
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
              <h4>Subscription</h4>
              <small>
                Modify your subscription <br /> Cancel or renew
              </small>
            </div>
          </div>
          <div style={{ flex: ".3" }}>
            <div style={{ padding: "10px 0px" }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={() => {
                    handleCustomerPortal();
                    setIsLoading(true);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    // padding: "10px",
                  }}
                  size="small"
                  variant="outlined">
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
