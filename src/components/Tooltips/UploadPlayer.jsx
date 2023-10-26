import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

export default function UploadPlayer({ info, image, studioUrl }) {
  const navigate = useNavigate();

  const navigateToStudio = () => {
    navigate(studioUrl);
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
