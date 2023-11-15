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
import { setUsersDatabase } from "./slices/DatabaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectTempUsersDatabase } from "./slices/TempDatabaseSlice";
import { selectCurrentProfile } from "./slices/SavedProfileSlice";
import {
  selectUserDetailsObject,
  setUserDetailsObject,
} from "./slices/LoginUserDataSlice";

const BackEndDataCatalog = ({ children }) => {
  // const id = useSelector(selectLogInUserID).id;
  const collectionRefUSers = collection(db, `users_db`);
  const dispatch = useDispatch();

  const temDataBase = useSelector(selectTempUsersDatabase);
  const currentCreatedSearchProfileName = useSelector(selectCurrentProfile);
  const loginUserObject = useSelector(selectUserDetailsObject);

  // const { accountId } = loginUserObject;

  // dispatch(setUserDetailsObject(matchUserAccount[0]));

  // getting the user_detail
  // REMOVING THIS USE EFFECT OR FIXING IT IS A CLUE TO GETTING user.firstname setting

  useEffect(() => {
    const q = query(collectionRefUSers, orderBy("dateCreated", "desc"));
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

      console.log(items, "All Users array");
      dispatch(setUsersDatabase(items));

      const updatedLoginUserDetails = items.filter((data) => {
        return data.accountId ===  loginUserObject?.accountId;
      });

      if (loginUserObject?.accountId
        ) {
        dispatch(setUserDetailsObject(updatedLoginUserDetails[0]));
        console.log("UdatedLoginUserDetails", updatedLoginUserDetails);
      }
    });
    return () => {
      alldata();
    };
  }, [temDataBase, currentCreatedSearchProfileName]);

  return (
    <div>
      {/* Other content or logic specific to BackEndDataCatalog */}
      {children}
    </div>
  );
};

export default BackEndDataCatalog;
