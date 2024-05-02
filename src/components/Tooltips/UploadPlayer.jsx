import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";

export default function UploadPlayer({ info, image, studioUrl }) {
  const loginUserDetails = useSelector(selectUserDetailsObject);
  const { role } = loginUserDetails || {};
  const navigate = useNavigate();

  const navigateToStudio = () => {
    if (role === "Player") {
      navigate("/studio/dashboard");
    } else {
      navigate("/multiStudio/dashboard");
    }
  };

  return (
    <Tooltip title={info}>
      <IconButton onClick={navigateToStudio}>
        {/* <Icon fontSize="medium" className="primaryTextColor">
          {image}
        </Icon> */}
        <FontAwesomeIcon
          className="primaryTextColor"
          icon={faPersonCirclePlus}
        />
      </IconButton>
    </Tooltip>
  );
}
