import { Settings } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const ProfileEditTooltipToTrigerCreateProfileModal = ({ info, image }) => {
  return (
    <div>
      <Tooltip title={"Edit Profile"}>
        <IconButton>
          <Settings />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ProfileEditTooltipToTrigerCreateProfileModal;
