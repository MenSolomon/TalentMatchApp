import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  selectLoginStatus,
  selectUserDetailsObject,
} from "../statemanager/slices/LoginUserDataSlice";
import { useEffect } from "react";
import { auth } from "../Firebase/Firebase";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  let authEN = useSelector(selectLoginStatus);
  const userId = useSelector(selectUserDetailsObject);
  const currentUser = auth?.currentUser;
  useEffect(() => {
    // console.log(currentUser, userId?.accountId, "LOGi");

    // alert(currentUser + userId?.accountId);
    if (!authEN) {
      navigate("/login");
    }
  }, [userId, authEN]);

  return authEN ? <Outlet /> : null;
};

export default PrivateRoutes;
