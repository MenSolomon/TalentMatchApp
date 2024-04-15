import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../../../Firebase/Firebase";
import { signOut } from "firebase/auth";

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
  {
    firstName.substring(0, 10) + " " + surname.substring(0, 10);
  }

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
        {name && name.substring(0, 16)}
      </Button>
      <Menu
        id="basic-menu"
        sx={{ color: "black" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={{ color: "black" }} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem sx={{ color: "black" }} onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem
          sx={{ color: "black" }}
          onClick={() => {
            handleClose();
            console.log("logging out");
            signOut(auth)
              .then(() => {
                // Sign-out successful.

                Navigate("/login");
                localStorage.setItem("LoggedAccountId", "");
              })
              .catch((error) => {
                console.log("error:", error);
              });
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
