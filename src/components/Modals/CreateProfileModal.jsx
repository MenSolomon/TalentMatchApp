import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Card, Divider, TextField } from "@mui/material";
import CountrySelect from "../Autocompletes/CountrySelect";
import IconTooltip from "../Tooltips/IconToolTip";
import DatePickerTool from "../DatePicker/DatePicker";
import BasicAutoComplete from "../Autocompletes/BasicAutoComplete";
import GroupedRadio from "../Radio/GroupedRadio";
import CheckboxesGroup from "../CheckBoxes/GroupedCheckBox";
import AgeRangeSlider from "../Slider/AgeRangeSlider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  height: "94%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  padding: "2vw",
  display: "flex",
  flexDirection: "column",
  paddingTop: "3vh",
};

const inputStyles = {
  width: "85%",
};

export default function CreateProfileModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const soccerPositions = [
    "Any",
    "Goalkeeper (GK)",
    "Defender (D)",
    "Center Back (CB)",
    "Full-back (FB)",
    "Wing-back (WB)",
    "Midfielder (MF)",
    "Central Midfielder (CM)",
    "Defensive Midfielder (CDM)",
    "Attacking Midfielder (CAM)",
    "Wide Midfielder (WM)",
    "Forward (F)",
    "Striker (ST)",
    "Center Forward (CF)",
    "Winger (W)",
  ];

  const preferredFootArray = ["Left", "Right", "Both", "Any"];
  const captainArray = ["Yes", "No", "Any"];

  const contractStatusArray = [
    "Transfer Listed",
    "Loan Listed",
    "Free Agent",
    "Youth Player",
    "Contract Expiring less than 6 months",
    "Currently renewed contract",
  ];
  return (
    <div>
      <Card
        onClick={handleOpen}
        sx={{
          width: 145,
          height: 80,
          marginLeft: "4.6vw",
          paddingTop: "1vh",
          paddingLeft: ".6vw",
          paddingRight: ".6vw",
          display: "flex",
          // background:
          //   "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
          background: "#5585fe",
          // background: "#1B1E2B",
          color: "white",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            flex: ".93",
            fontSize: "1em",
            display: "grid",
            placeItems: "center",
          }}
        >
          {" "}
          Create new profile{" "}
        </div>
        <div
          style={{
            flex: ".07",
            display: "flex",
          }}
        >
          {" "}
          <Add sx={{ marginTop: "4.4vh", color: "gold" }} />{" "}
        </div>
      </Card>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className="cardBackground primaryTextColor" style={style}>
            {/* HEader MEssage */}
            <div
              style={{
                flex: ".1",
                // background: "green",
                display: "flex",
                gap: "4vw",
              }}
            >
              <h2 className="secondaryTextColor"> Create Profile </h2>{" "}
              <h6>Who are you looking for?</h6>{" "}
              <div style={{ justifySelf: "flex-end" }}>
                {" "}
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Profile Name"
                  variant="outlined"
                />
              </div>
            </div>
            <div style={{ flex: ".9", display: "flex" }}>
              {/* // Personal information */}
              <div
                style={{
                  flex: ".33",
                  display: "flex",
                  gap: "2vh",
                  flexDirection: "column",
                  paddingRight: "1.5vw",
                  position: "relative",
                }}
              >
                {" "}
                <h4 className="secondaryTextColor">
                  Personal Information{" "}
                  <IconTooltip
                    info={
                      "MEssaes from perspnmnali information m as dsam,d  io asdsaoi lasd;sakd sad"
                    }
                    image="help"
                  />{" "}
                </h4>{" "}
                {/* Place of birth */}
                <CountrySelect selectLabel="Place of birth" />
                {/* Nationality  */}
                <CountrySelect selectLabel="Nationality" />
                {/* Height rANGE */}
                <AgeRangeSlider rangeName={"Height range"} max={8} min={4} />
                {/* <DatePickerTool style={inputStyles} label="Date of birth" /> */}
                {/* Age */}
                <AgeRangeSlider rangeName={"Age range"} max={50} min={10} />
                <Button
                  sx={{
                    width: "23vw",
                    background: "blue",
                    color: "white",
                    border: ".5vw",
                    position: "absolute",
                    bottom: 50,
                  }}
                >
                  Submit
                </Button>{" "}
              </div>
              {/* Player Data */}
              <div
                style={{
                  flex: ".34",
                  paddingRight: "1.5vw",
                  display: "flex",
                  gap: "2vh",
                  flexDirection: "column",
                }}
              >
                <h4 className="secondaryTextColor">
                  Player Information{" "}
                  <IconTooltip
                    info={
                      "MEssaes from perspnmnali information m as dsam,d  io asdsaoi lasd;sakd sad"
                    }
                    image="help"
                  />{" "}
                </h4>
                <BasicAutoComplete
                  style={inputStyles}
                  ListArray={soccerPositions}
                  label="Main Position"
                />{" "}
                <BasicAutoComplete
                  style={inputStyles}
                  ListArray={soccerPositions}
                  label="Other Positions"
                />
                {/* MARKET VALUE RANGE */}
                <AgeRangeSlider
                  rangeName={"Market Value ($ 000,000)"}
                  max={300}
                  min={10}
                />
                {/* Captiain Selection */}
                <GroupedRadio radioArray={captainArray} labelName="Captain" />
                {/* // Preffered foot */}
                <GroupedRadio
                  radioArray={preferredFootArray}
                  labelName="Preferred foot"
                />
              </div>
              {/* Extra Info Data */}
              <div
                style={{
                  flex: ".33",
                  display: "flex",
                  gap: "2vh",
                  flexDirection: "column",
                }}
              >
                <h4 className="secondaryTextColor">
                  Other Information{" "}
                  <IconTooltip
                    info={
                      "MEssaes from perspnmnali information m as dsam,d  io asdsaoi lasd;sakd sad"
                    }
                    image="help"
                  />{" "}
                </h4>

                <CountrySelect selectLabel="Club Country" />
                <CountrySelect selectLabel="Club Division" />

                <CheckboxesGroup
                  CheckboxLabel="Contract Status"
                  checkboxArray={contractStatusArray}
                />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
