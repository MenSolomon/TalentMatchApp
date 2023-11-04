import { Box, Button, Icon, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { selectThemeProviderObject } from "../../statemanager/slices/ThemeProviderSlice";
import {
  selectCurrentProfile,
  setCurrentProfile,
} from "../../statemanager/slices/SavedProfileSlice";

export const SideBarNavButtons = ({
  label,
  startIcon,
  endIcon,
  disabled,
  path,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const themeProviderObject = useSelector(selectThemeProviderObject);
  const { buttonColor } = themeProviderObject;
  // const CurrentProfileClicked = useSelector(selectCurrentProfile)
  const dispatch = useDispatch();

  // const history = useHistory();

  // const handleSetParameter = (paramValue) => {
  //   // Use the history.push method to navigate to the route with the parameter.
  //   history.push(`/user/${paramValue}`);
  // };

  const handleCurrentProfileClicked = () => {
    // alert(label);

    // navigate(`/profile/${label}`);
    // location.pathname = `/profile/${label}`;

    dispatch(setCurrentProfile(label));
  };

  return (
    <NavLink to={`/profile/${label}`}>
      <Button
        onClick={handleCurrentProfileClicked}
        className="styleTextColor NavBarBtns"
        sx={{
          position: "relative",
          right: "17%",
          // fontSize: ".75em",
          fontWeight: "700",
          paddingRight: "2vw",

          // textAlign: "left",
          // color:"red",
          // color: buttonColor,
          textTransform: "none",
          // background: "red",
          textAlign: "center",
          // textAlign: "left",
          // width: "10vw",
        }}
        // onClick={() => {
        //   navigate(`${path}`);
        // }}
        startIcon={startIcon}
        endIcon={endIcon}
        // disabled={disabled}
      >
        {label}{" "}
      </Button>{" "}
    </NavLink>
  );
};
