import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import avatarImage from "../../assets/images/avatar.jpg";

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
        onClick={handleClick}
        sx={{
          // marginLeft: "2vw",
          width: 55,
          height: 55,
          border: "4px solid blue",
          marginLeft: ".4vw",
          marginRight: ".4vw",
          float: "right",
        }}
        src={avatarImage}></Avatar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem sx={{ color: "black" }} onClick={handleClose}>
          Profiles
        </MenuItem>
        <MenuItem sx={{ color: "black" }} onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem
          sx={{ color: "black" }}
          onClick={() => {
            handleClose();
            Navigate("/login");
          }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
