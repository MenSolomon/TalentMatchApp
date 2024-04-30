import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";

function Media(props) {
  const { loading = false } = props;
  //   className =
  //     "matchedPlayersCarousel md:relative md:h-[44.2vh] sm:relative sm:h-[46vh]";

  return (
    // <Card  sx={{ maxWidth: 645 }}>
    <div
      className="cardBackground md:h-[44.2vh] md:w-[45vw]"
      style={{
        borderRadius: "1vw",
        padding: "1vh 1vw",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: ".33",
          gap: "2vh",
          display: "flex",
          flexDirection: "column",
          //   background: "green",
        }}
      >
        <Skeleton
          sx={{ bgcolor: "grey.400" }}
          animation="wave"
          variant="circular"
          width={80}
          height={80}
        />
        <Skeleton
          sx={{ bgcolor: "grey.400", marginBottom: 3 }}
          animation="wave"
          variant="rounded"
          width={180}
          height={60}
        />
        <Skeleton
          sx={{ bgcolor: "grey.400" }}
          animation="wave"
          variant="rounded"
          width={180}
          height={60}
        />
      </div>
      <div
        style={{
          flex: ".34",
        }}
      >
        <Skeleton sx={{ bgcolor: "grey.400" }} height={50} />
        <Skeleton sx={{ bgcolor: "grey.400" }} height={50} animation="wave" />
        <Skeleton sx={{ bgcolor: "grey.400" }} height={50} />
        <Skeleton sx={{ bgcolor: "grey.400" }} height={50} animation="wave" />
        <Skeleton sx={{ bgcolor: "grey.400" }} height={50} />
      </div>
      <div style={{ flex: ".33", paddingLeft: "1vw" }}>
        <Skeleton
          sx={{ bgcolor: "grey.400" }}
          variant="rounded"
          style={{ height: "35vh" }}
          width={180}
        />
      </div>
    </div>
    // {/* </Card> */}
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function PlayerDisplaySkeleton() {
  return (
    <div>
      <Media loading />
    </div>
  );
}
