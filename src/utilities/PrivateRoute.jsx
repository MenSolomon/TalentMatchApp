import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectLoginStatus } from "../statemanager/slices/LoginUserDataSlice";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  let auth = useSelector(selectLoginStatus);
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth]);

  return auth ? <Outlet /> : null;
};

export default PrivateRoutes;
