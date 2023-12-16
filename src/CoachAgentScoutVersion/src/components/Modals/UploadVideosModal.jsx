import {
  CheckCircle,
  Close,
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
            <div style={{ flex: "0.1", display: "flex" }}>
              <div
                style={{
                  flex: "0.8",
                  // background: "yellow",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>Category</h3>
              </div>
              <div
                style={{
                  flex: "0.2",
                  // background: "blue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>saving..</div>
                <Feedback />
                <Close />
              </div>
            </div>
            <Divider style={{ background: "black" }} />
            <div
              style={{
                flex: "0.8",
                // background: "peru",
                display: "flex",
                // flexDirection: "column",
              }}
            >
              {/* Details */}
              <div
                style={{
                  flex: "0.6",
                  // background: "red",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    flex: "0.2",
                    // background: "green",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h3>Details</h3>
                </div>
                <div
                  style={{
                    flex: "0.8",
                    // background: "yellow",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                    }}
                  >
                    <BasicSelect
                      label={"Category"}
                      MenuItemArray={CategorySelectArray}
                      widthSize={400}
                    />
                    <TextField
                      // id="outlined-multiline-flexible"
                      multiline
                      rows={8}
                      label="Description"
                      size="medium"
                      sx={{ width: "80%" }}
                    />
                  </div>
                </div>
              </div>
              {/* End of Details */}

              {/* Watch Videos */}
              <div
                style={{
                  flex: "0.4",
                  // background: "pink",
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                {/* Display Video here */}
                <div
                  style={{
                    flex: "0.5",
                    background: "black",
                  }}
                ></div>
                {/* End of Display Video here */}
                <div
                  style={{
                    flex: "0.5",
                    // background: "blue",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      flex: "0.5",
                      // background: "yellow",
                      display: "flex",
                    }}
                  >
                    <div style={{ flex: "0.8" }}>
                      <div style={{ padding: "10px" }}>
                        <h6>Video Link</h6>
                        <h6>https://youtu.be/any</h6>
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "0.2",
                        // background: "yellow",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ContentCopy />
                    </div>
                  </div>
                  <div
                    style={{
                      flex: "0.5",
                      // background: "peru",
                      display: "flex",
                    }}
                  >
                    <div style={{ flex: "0.8" }}>
                      <div style={{ padding: "10px" }}>
                        <h6>Video Link</h6>
                        <h6>https://youtu.be/any</h6>
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "0.2",
                        // background: "yellow",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ContentCopy />
                    </div>
                  </div>
                </div>
              </div>

              {/* End of Watch Videos */}
            </div>
            {/* Footer */}
            <Divider style={{ background: "black" }} />
            <div
              style={{
                flex: "0.1",
                // background: "green",
                display: "flex",
                // alignItems: "center",
              }}
            >
              <div
                style={{
                  flex: "0.8",
                  // background: "pink",
                  alignItems: "center",
                  display: "flex",
                  // justifyContent: "center",
                }}
              >
                <h5>Checks complete. No issues found.</h5>
              </div>
              <div
                style={{
                  flex: "0.2",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained">next</Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
