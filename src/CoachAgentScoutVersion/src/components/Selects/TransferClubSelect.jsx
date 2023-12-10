import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import { useSelector } from "react-redux";
import { Avatar, Tooltip, Typography } from "@mui/material";
import avatarImage from "../../assets/images/avatar.jpg";
import { useState } from "react";
import badgeLogo from "../../../../assets/images/badge.png";
import { selectClubsInDatabase } from "../../../../statemanager/slices/ClubsInDatabaseSlice";

export default function TransferClubSelect({
  style,
  name,
  nameOfClubSelected,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
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
  const [selectedClubImage, setSelectedClubImage] = useState("");
  const [selectedClubName, setSelectedClubName] = useState("Select a club");

  const { firstName, surname } = loginUserDetails;
  const clubsInDatabase = useSelector(selectClubsInDatabase);

  const handleSelecetedClub = (clubImage, clubName) => {
    setSelectedClubName(clubName);
    setSelectedClubImage(clubImage);
    nameOfClubSelected(clubName);
  };

  return (
    <div style={importStyle}>
      {/* <Avatar
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
        src={avatarImage}
      ></Avatar> */}

      <div onClick={handleClick}>
        <AvatarWithLabel
          label="Destinated Club"
          clubName={selectedClubName}
          avatarSrc={selectedClubImage === "" ? badgeLogo : selectedClubImage}
        />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ height: "50vh" }}
      >
        {clubsInDatabase.map((data, index) => {
          const { clubName, clubImage } = data;
          return (
            <MenuItem
              key={index}
              sx={{ color: "black", display: "flex" }}
              onClick={() => {
                handleSelecetedClub(clubImage, clubName);
                handleClose();
              }}
            >
              <Avatar src={clubImage} sx={{ marginRight: 2 }} />
              {clubName}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

const AvatarWithLabel = ({ label, avatarSrc, style, clubName }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", placeContent: "center" }}
    >
      <Tooltip title={clubName}>
        <Typography variant="h5">
          {label}
          <Avatar
            sx={{ ...style, marginLeft: 4, width: 90, height: 90 }}
            src={avatarSrc}
            alt="Avatar"
          />
        </Typography>
      </Tooltip>
    </div>
  );
};
