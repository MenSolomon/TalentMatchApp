import { useEffect } from "react";
import { db } from "../Firebase/Firebase";
import {
  getDocs,
  doc,
  Firestore,
  getDoc,
  collection,
  //   serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { setPlayersDatabase, setUsersDatabase } from "./slices/DatabaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectTempUsersDatabase } from "./slices/TempDatabaseSlice";
import {
  selectCurrentProfile,
  setUserSavedProfiles,
} from "./slices/SavedProfileSlice";
import {
  selectUserDetailsObject,
  setUserDetailsObject,
} from "./slices/LoginUserDataSlice";
import { selectInternetConnectionStatus } from "./slices/InternetActivitiesSlice";
import { setUserNotifications } from "./slices/NofiticationsSlice";

const BackEndDataCatalog = ({ children }) => {
  // const id = useSelector(selectLogInUserID).id;
  const collectionRefUSers = collection(db, `users_db`);
  const loginUserObject = useSelector(selectUserDetailsObject);

  const collectionAllPlayersInDatabase = collection(db, `players_database`);

  const dispatch = useDispatch();

  const temDataBase = useSelector(selectTempUsersDatabase);
  const currentCreatedSearchProfileName = useSelector(selectCurrentProfile);
  const onlineStatus = useSelector(selectInternetConnectionStatus);

  // const { accountId } = loginUserObject;

  // dispatch(setUserDetailsObject(matchUserAccount[0]));

  // getting the user_detail
  // REMOVING THIS USE EFFECT OR FIXING IT IS A CLUE TO GETTING user.firstname setting

  // useEffect(() => {
  //   const q = query(collectionRefUSers, orderBy("dateCreated", "desc"));
  //   const alldata = onSnapshot(q, (querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });

  //     items.forEach((item) => {
  //       if (item.dateCreated !== "" && item.dateCreated !== null) {
  //         const firestoreTimestamp = item.dateCreated;
  //         const date = firestoreTimestamp.toDate();
  //         const options = {
  //           year: "numeric",
  //           month: "long",
  //           day: "numeric",
  //           hour: "numeric",
  //           minute: "numeric",
  //           second: "numeric",
  //         };
  //         const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  //         const dateString = dateTimeFormat.format(date);
  //         item.dateCreated = dateString;
  //       }
  //     });

  //     console.log(items, "Account ID", loginUserObject?.accountId);
  //     alert(loginUserObject?.accountId + "Acc Backend");
  //     if (items.length > 0) {
  //       // alert(`${accountId} Vas`);
  //       dispatch(setUsersDatabase(items));
  //       if (loginUserObject?.accountId !== undefined) {
  //         dispatch(
  //           setUserDetailsObject(
  //             items.find((obj) => obj.accountId === loginUserObject?.accountId)
  //           )
  //         );
  //       }
  //     }
  //   });
  //   return () => {
  //     alldata();
  //   };
  //   // currentCreatedSearchProfileName (DEPENDENCY)
  // }, []);

  // Updating User profile when any update happens for the user

  useEffect(() => {
    // if (item.dateCreated !== "" && item.dateCreated !== null) {
    //   const firestoreTimestamp = item.dateCreated;
    //   const date = firestoreTimestamp.toDate();
    //   const options = {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //     hour: "numeric",
    //     minute: "numeric",
    //     second: "numeric",
    //   };
    //   const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
    //   const dateString = dateTimeFormat.format(date);
    //   item.dateCreated = dateString;
    // }
    if (loginUserObject === undefined) {
      const unsub = onSnapshot(
        doc(db, "users_db", loginUserObject?.accountId),
        (doc) => {
          if (doc.data() !== undefined) {
            const firestoreTimestamp = doc.data().dateCreated;
            const date = firestoreTimestamp.toDate();
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            };
            const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
            const dateString = dateTimeFormat.format(date);

            const userObject = {
              ...doc.data(),
              dateCreated: dateString,
            };

            dispatch(setUserDetailsObject(userObject));
          }
        }
      );

      return () => {
        unsub();
      };
    } else {
      // alert("trumu");
    }
  }, []);

  //Saved Progiles
  useEffect(() => {
    // const savedProfileSubCollectionRef = doc(
    //   db,
    //   `users_db/${loginUserObject?.accountId}/SavedProfiles`,
    //   loginUserObject?.accountId
    // );

    const savedProfileSubCollectionRef = collection(
      db,
      `users_db/${loginUserObject?.accountId}/SavedProfiles`
    );

    const q = query(savedProfileSubCollectionRef);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      console.log(loginUserObject?.accountId, items, "SavedPFS");
      dispatch(setUserSavedProfiles(items));
    });
    return () => {
      alldata();
    };
  }, []);

  // Notifications
  useEffect(() => {
    // const savedProfileSubCollectionRef = doc(
    //   db,
    //   `users_db/${loginUserObject?.accountId}/SavedProfiles`,
    //   loginUserObject?.accountId
    // );

    const notificationsSubCollectionRef = collection(
      db,
      `users_db/${loginUserObject?.accountId}/Notifications`
    );

    const q = query(notificationsSubCollectionRef);
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      console.log(loginUserObject?.accountId, items, "SavedPFS");
      dispatch(setUserNotifications(items));
    });
    return () => {
      alldata();
    };
  }, []);

  // Players in database-
  useEffect(() => {
    const q = query(
      collectionAllPlayersInDatabase,
      orderBy("dateCreated", "desc")
    );
    const alldata = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      items.forEach((item) => {
        if (item.dateCreated !== "" && item.dateCreated !== null) {
          const firestoreTimestamp = item.dateCreated;
          const date = firestoreTimestamp.toDate();
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          };
          const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
          const dateString = dateTimeFormat.format(date);
          item.dateCreated = dateString;
        }
      });

      if (items.length > 0) {
        dispatch(setPlayersDatabase(items));

        console.log(items, "All Players array");
      }

      // const updatedLoginUserDetails = items.filter((data) => {
      //   return data.accountId ===  loginUserObject?.accountId;
      // });

      // if (loginUserObject?.accountId
      //   ) {
      //   dispatch(setUserDetailsObject(updatedLoginUserDetails[0]));
      //   console.log("UdatedLoginUserDetails", updatedLoginUserDetails);
      // }
    });
    return () => {
      alldata();
    };
  }, []);

  return (
    <div>
      {/* Other content or logic specific to BackEndDataCatalog */}
      {children}
    </div>
  );
};

export default BackEndDataCatalog;
