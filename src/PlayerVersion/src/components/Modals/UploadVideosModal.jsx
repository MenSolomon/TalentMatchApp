import {
  CheckCircle,
  Close,
  CloudCircleOutlined,
  ContentCopy,
  Download,
  Feedback,
  HdRounded,
} from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Divider,
  Fade,
  Modal,
  TextField,
} from "@mui/material";
import { useState } from "react";
import BasicSelect from "../Selects/BasicSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
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

export default function UploadVideoModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CategorySelectArray = [
    { Label: "Goals Scored", Value: "Goals Scored" },
    { Label: "Assists", Value: "Assists" },
    { Label: "Appearances", Value: "Appearances" },
    { Label: "Minutes Played", Value: "Minutes Played" },
    { Label: "Yellow Cards", Value: "Yellow Cards" },
    { Label: "Red Cards", Value: "Red Cards" },
    { Label: "Shots on Target", Value: "Shots on Target" },
    { Label: "Shots off Target", Value: "Shots off Target" },
    { Label: "Passing Accuracy", Value: "Passing Accuracy" },
    { Label: "Key Passes", Value: "Key Passes" },
    { Label: "Successful Dribbles", Value: "Successful Dribbles" },
    { Label: "Tackles Won", Value: "Tackles Won" },
    { Label: "Interceptions", Value: "Interceptions" },
    { Label: "Clearances", Value: "Clearances" },
    { Label: "Aerial Duels Won", Value: "Aerial Duels Won" },
    { Label: "Saves (for goalkeepers)", Value: "Saves (for goalkeepers)" },
    {
      Label: "Clean Sheets (for goalkeepers)",
      Value: "Clean Sheets (for goalkeepers)",
    },
    {
      Label: "Goals Conceded (for goalkeepers)",
      Value: "Goals Conceded (for goalkeepers)",
    },
    {
      Label: "Penalty Saves (for goalkeepers)",
      Value: "Penalty Saves (for goalkeepers)",
    },
  ];

  return (
    <div>
      <Button onClick={handleOpen}>Upload Videos</Button>
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
            {/* Upload Videos */}
            <div style={{ flex: "0.1", display: "flex" }}>
              <div
                style={{
                  flex: "0.9",
                  // background: "red",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <h2>Upload Videos</h2>
              </div>
              <div
                style={{
                  flex: "0.1",
                  // background: "peru",
                  alignItems: "center",
                  display: "flex",
                  gap: "10%",
                }}
              >
                <Feedback />
                <Close />
              </div>
            </div>
            {/* End of Upload Videos */}

            {/* Drag and Drop Files */}
            <div
              style={{
                flex: "0.8",
                // background: "yellow",
                display: "flex",
                alignItems: "center",
                justifyContent: "center ",
              }}
            >
              {/* Selected files in column*/}
              <div
                style={{
                  // background: "peru",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* column Top style  */}
                <div style={{ flex: "0.2" }}></div>
                {/* End of column Top style  */}

                {/* CloudCircleOutlined  */}
                <div
                  style={{
                    flex: "0.5",
                    // background: "yellow",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CloudCircleOutlined sx={{ fontSize: "10em" }} />
                </div>
                {/* End of CloudCircleOutlined  */}

                {/* Select_files */}
                <div style={{ flex: "0.3" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      // gap: "5px",
                      // background: "green",
                    }}
                  >
                    <div>
                      <h5>Drag and drop video files to Upload</h5>
                      <small>
                        Your videos will be private until you publish them
                      </small>
                    </div>
                    <div>
                      <Button variant="contained">select Files</Button>
                    </div>
                  </div>
                </div>
                {/* End of Select_files */}
              </div>
            </div>
            {/* End of Drag and Drop Files */}

            {/* Terms and services guidelines */}
            <div style={{ flex: "0.1", textAlign: "center" }}>
              <small>
                By submitting your video to TalentMatch, you acknowledge that
                you agree to TalentMatch{" "}
                <span style={{ color: "blue" }}>Terms of Service</span> and
                <span style={{ color: "blue" }}>
                  {" "}
                  Community Guidelines.
                </span>{" "}
                Please be sure not to violate others copyright or privacy
                rights.
                <span style={{ color: "blue" }}>Learn more</span>
              </small>
            </div>
            {/* End of Terms and services guidelines */}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
