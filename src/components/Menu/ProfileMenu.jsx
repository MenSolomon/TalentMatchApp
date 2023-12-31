import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserDetailsObject,
  setLoginStatus,
  setUserDetailsObject,
} from "../../statemanager/slices/LoginUserDataSlice";

import avatarImage from "../../assets/images/avatar.jpg";
import { Avatar } from "@mui/material";
import { setUserSavedProfiles } from "../../statemanager/slices/SavedProfileSlice";

export default function ProfileMenu({ style, name }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let importStyle = style;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const loginUserDetails = useSelector(selectUserDetailsObject);
  const { firstName, surname } = loginUserDetails;

  return (
    <div style={importStyle}>
      {/* <Button
        className="primaryColor"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        endIcon={<KeyboardArrowDown />}
        sx={{ color: "black", width: "15vw", fontWeight: "800" }}
        onClick={handleClick}
      >
        {firstName.substring(0, 10) + " " + surname.substring(0, 10)}
      </Button> */}

      <Avatar
        sx={{
          // marginLeft: "2vw",
          width: 55,
          height: 55,
          border: "4px solid blue",
          marginLeft: ".4vw",
          marginRight: ".4vw",
          float: "right",
        }}
        src={avatarImage}
        onClick={handleClick}
      ></Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          sx={{ color: "black" }}
          color="secondary"
          onClick={handleClose}
        >
          Profile
        </MenuItem>
        <MenuItem sx={{ color: "black" }} onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem
          sx={{ color: "black" }}
          onClick={() => {
            handleClose();
            Navigate("/login");
            dispatch(setLoginStatus(false));
            dispatch(setUserDetailsObject({}));
            dispatch(setUserSavedProfiles([]));
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
