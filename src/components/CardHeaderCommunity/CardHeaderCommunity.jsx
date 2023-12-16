import { Avatar, CardHeader, Divider, Typography } from "@mui/material";

function CardHeaderCommunity({ accountProfile, timer, name, subName }) {
  return (
    <div>
      <CardHeader
        avatar={accountProfile}
        action={
          <Typography variant="body2" style={{ marginTop: "5px" }}>
            {timer}
          </Typography>
        }
        title={<Typography variant="body2">{name}</Typography>}
        subheader={<Typography variant="body2">{subName}</Typography>}
      />
      <Divider style={{ background: "black" }} />
    </div>
  );
}

export default CardHeaderCommunity;

{
  /* <Avatar aria-label="recipe"></Avatar> */
}
