import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../Firebase/Firebase";

const useFirebaseConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connectedRef = ref(db, ".info/connected");

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      setIsConnected(snapshot.val() === true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    alert(isConnected);
  }, [isConnected]);

  return isConnected;
};

export default useFirebaseConnection;
