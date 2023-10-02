import { Star, StarBorder } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import BasicButton from "../../Buttons/BasicButton";

const SocialAndContactAreaCard = ({ instagram, facebook }) => {
  return (
    <div
      className="playerCard"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "1vw",
        paddingTop: "1.5vw",
        paddingLeft: "1.5vw",

        color: "black",
      }}
    >
      {/* <Card
      sx={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(133deg, rgba(218,233,234,1) 0%, rgba(189,202,203,1) 35%, rgba(221,234,235,1) 73%, rgba(218,233,234,1) 100%)",
        borderBottom: "1px solid #0d818e",
        borderRight: "1px solid #0d818e",
        // borderTop: "2px solid #0d818e",
        padding: "1vw",
        // fontWeight: "800",
        borderRadius: "1vw",
      }}
    > */}

      <div
        style={{
          display: "flex",
          gap: ".3vw",
          // background: "white",
          width: "100%",
          height: "20%",
        }}
      >
        {" "}
        <img src={facebook} style={{ width: "20%" }} />{" "}
        <img src={instagram} style={{ width: "20%" }} />{" "}
        {/* <img src={x} style={{ width: "25%", height: "100%" }} />{" "} */}
      </div>

      <FormControlLabel
        control={<Checkbox icon={<StarBorder />} checkedIcon={<Star />} />}
        label={<span style={{ fontSize: "0.8em" }}>Mark as favourite</span>}
        sx={{ fontSize: ".8em" }}
      />
      <BasicButton
        style={{
          textTransform: "none",
          fontWeight: "bold",

          color: "white",
        }}
        innerText={"Show interest"}
      />
    </div>
  );
};

export default SocialAndContactAreaCard;
