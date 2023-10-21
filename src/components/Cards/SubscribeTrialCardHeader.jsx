import { AddAPhoto } from "@mui/icons-material";
import { CardHeader, Checkbox, IconButton, Typography } from "@mui/material";

const SubscribeTrialCardHeader = ({ amount, text, tittle, style }) => {
  return (
    <>
      <CardHeader
        sx={{ borderRadius: "10px", height: "7vh" }}
        avatar={<Checkbox />}
        action={
          <Typography>
            {amount}
            <p>
              <small>{text}</small>
            </p>
          </Typography>
        }
        title={tittle}
      />
    </>
  );
};

export default SubscribeTrialCardHeader;
