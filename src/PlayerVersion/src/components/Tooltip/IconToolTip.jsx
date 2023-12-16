import { Icon } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function IconTooltip({ info, image }) {
  return (
    <Tooltip
      // className="primaryTextColor"
      title={info}
    >
      <IconButton>
        <Icon>{image}</Icon>
      </IconButton>
    </Tooltip>
  );
}
