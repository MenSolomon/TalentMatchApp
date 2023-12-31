import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function ChoosePlanDrawerMenu({ menuTitle, menuItemsArray }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        sx={{
          color: "#5585FE",
          textTransform: "none",
          fontWeight: "bolder",
          fontSize: "1.1em",
          marginRight: 3,
        }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // onMouseOver={handleClick}
        // onMouseOut={handleClose}
      >
        {menuTitle} &nbsp; <KeyboardArrowDown />
      </Button>
      <Menu
        color="secondary"
        id="basic-menu"
        style={{ width: "40vw" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItemsArray &&
          menuItemsArray.map((data, index) => {
            return (
              <MenuItem
                key={index}
                sx={{ color: "black" }}
                onClick={handleClose}
              >
                {data}
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
}
