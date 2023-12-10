import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Notifications } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";
import { selectUserNotifications } from "../../statemanager/slices/NofiticationsSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function NotificationBadge({ onClick }) {
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);
  const notificationsArray = useSelector(selectUserNotifications);

  const notificationsWithUnreadStatus =
    notificationsArray &&
    notificationsArray.filter((data) => {
      return data.readStatus === false;
    });

  return (
    <IconButton
      onClick={() => {
        onClick();
      }}
      aria-label="cart"
    >
      <StyledBadge
        badgeContent={
          notificationsArray === undefined ||
          notificationsArray === 0 ||
          notificationsWithUnreadStatus.length === 0
            ? 0
            : notificationsWithUnreadStatus.length
        }
        color="secondary"
      >
        <Notifications />
      </StyledBadge>
    </IconButton>
  );
}
