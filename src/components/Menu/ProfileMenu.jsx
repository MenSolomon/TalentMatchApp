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
      <Button
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
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            Navigate("/login");
            dispatch(setLoginStatus(false));
            dispatch(setUserDetailsObject({}));
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
