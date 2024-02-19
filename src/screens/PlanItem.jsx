import { Button, Card, CardActions } from "@mui/material";
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
import { auth, db } from "../Firebase/Firebase";

const PlanItem = () => {
  // credentials state
  // const accountId = useSelector(selectCredentials);
  const [products, setProducts] = useState([]);
  // const db = getFirestore();

  // const FetchProducts = () => {
  //   const q = query(collection(db, "products"), where("active", "==", true));
  //   getDocs(q).then((querySnapshot) => {
  //     querySnapshot.forEach(async (doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //       setProducts(doc.data());

  //       getDocs(collection(doc.ref, "prices")).then((priceSnap) => {
  //         priceSnap.forEach((priceDoc) => {
  //           console.log(priceDoc.id, " => ", priceDoc.data());
  //         });
  //       });
  //     });
  //   });
  // };

  const productIds = [
    { id: "prod_PaUHk97wgtKo0H", name: "Club Premium Pack", role: "Club" },
    { id: "prod_PaUHRN5h6D6QKA", name: "Club Starter Pack", role: "Club" },
    { id: "prod_PaUF5OfYMdzFMf", name: "Player Starter Pack", role: "Player" },
    { id: "prod_PaUE0WeQlZ2Cbl", name: "Player Premium Pack", role: "Player" },
    { id: "prod_PaUDv3uRDwWYKc", name: "Scout Premium Pack", role: "Scout" },
    { id: "prod_PaUClniIfnFCUO", name: "Scout Starter Pack", role: "Scout" },
    { id: "prod_PaUCj9WT4b4zWI", name: "Coach Starter Pack", role: "Coach" },
    { id: "prod_PaUB3JqrDbTutg", name: "Coach Premium Pack", role: "Coach" },
    { id: "prod_PaUAvtceTmYGJV", name: "Agent Premium Pack", role: "Agent" },
    { id: "prod_PaU961QtG9oT80", name: "Agent Premium Pack", role: "Agent" },
  ];
  const roleSelected = "Agent";

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

  const FetchProducts = async () => {
    const q = query(collection(db, "products"), where("active", "==", true));
    const allProducts = [];

    try {
      const querySnapshot = await getDocs(q);

      // get all the products
      querySnapshot.forEach((doc) => {
        // save them to allProducts array
        allProducts.push({ id: doc.id, data: doc.data() });
      });

      const selectedIds = productIds
        .filter((prodId) => prodId.role === roleSelected)
        .map((prodId) => prodId.id);

      const productPromises = allProducts.map(async (prods) => {
        if (selectedIds.includes(prods.id)) {
          const priceSnap = await getDocs(
            collection(db, `products/${prods.id}/prices`)
          );

          priceSnap.forEach((priceDoc) => {
            console.log({
              name: prods.data.name,
              image: prods.data.images,
              price: priceDoc.data().unit_amount,
              id: prods.id,
            });
            setProducts((prevProducts) => [
              ...prevProducts,
              {
                name: prods.data.name,
                image: prods.data.images,
                price: priceDoc.data().unit_amount,
                id: prods.id,
              },
            ]);

            // Collect data for state update
            // return {
            //   name: prods.data.name,
            //   image: prods.data.images,
            //   price: priceDoc.data().unit_amount,
            // };
          });
        }
      });

      // Wait for all promises to resolve before updating the state
      // const resolvedProducts = await Promise.all(productPromises);
      // console.log(resolvedProducts);
      // // Filter out any undefined values
      // const filteredProducts = resolvedProducts.filter((product) => product);

      // setProducts(filteredProducts);
      // console.log("products", filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <Button onClick={FetchProducts}>Fetch Products</Button>
      <Button onClick={Checkout}>Checkout</Button>
      <div>
        {products.map((item) => (
          <Card key={item.id}>
            <div>{item.name}</div>
            <div>{item.price}</div>

            <CardActions>
              <Button size="small">Buy Now</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanItem;
