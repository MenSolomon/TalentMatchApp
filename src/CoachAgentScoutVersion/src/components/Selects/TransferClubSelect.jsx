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

  const clubImageLinks = [
    {
      clubName: "Asante Kotoko SC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/f/fd/Asante_Kotoko_SC_%28logo%29.png",
    },
    {
      clubName: "Accra Lions",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/commons/e/e8/Accra_lions_logo.png",
    },
    {
      clubName: "Berekum Chelsea",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/1/1a/Berekum_Chelsea_Logo.png",
    },
    {
      clubName: "Accra Great Olympics",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/8/8f/The_Official_Accra_Great_Olympics_logo.jpg",
    },
    {
      clubName: "Karela United FC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/6/69/Karela_United_FC_logo.png",
    },
    {
      clubName: "King Faisal Babes FC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/c/c7/King_Faisal_Babes_FC_%28logo%29.png",
    },
    {
      clubName: "Kotoku Royals F.C.",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/a/a0/Kotoku_Royals_F.C._logo.png",
    },
    {
      clubName: "Legon Cities FC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/b/b1/Legon_Cities_FC.png",
    },
    {
      clubName: "Medeama SC",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/b/bb/Medeama_SC_logo.png",
    },
    {
      clubName: "Real Tamale United",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/b/b1/Real_Tamale_United_logo.png",
    },
    {
      clubName: "Samartex",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/f/fb/Samartex_logo.png",
    },
    {
      clubName: "Bofoakwa Tano",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/a/a5/Bofoakwa_Tano.jpg",
    },
    {
      clubName: "Hasmal",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/Hasmal_logo.jpg",
    },
    {
      clubName: "Sekondi Wise Fighters",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/2/21/Sekondi_Wise_Fighters_logo.jpg",
    },
    {
      clubName: "Berekum Arsenal",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/0/0a/Berekum_Arsenal_Logo.png",
    },
    {
      clubName: "New Edubiase United",
      clubImage:
        "https://upload.wikimedia.org/wikipedia/en/6/61/New_Edubiase_United.gif",
    },
  ];

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
        {clubImageLinks.map((data, index) => {
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
