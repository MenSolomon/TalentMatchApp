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
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import BasicSelect from "../Selects/BasicSelect";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVideoBelow15mbSelected,
  setVideoBelow15mbSelected,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../../../statemanager/slices/OtherComponentStatesSlice";

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "65%",
  // height: "94%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  padding: "2vw",
  // display: "flex",
  // flexDirection: "column",
  paddingTop: "3vh",
};

const styles = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "65%",
  // height: "94%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  padding: "2vw",
  // display: "flex",
  // flexDirection: "column",
  paddingTop: "3vh",
};

const PublishVideoModal = ({ openState, videoUrl, selectedFile }) => {
  const dispatch = useDispatch();
  const isVideoSelected = useSelector(selectVideoBelow15mbSelected);

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setVideoBelow15mbSelected(false));
  };

  useEffect(() => {
    if (isVideoSelected === true) {
      setOpen(true);
    } else if (isVideoSelected === false) {
      setOpen(false);
    }
  }, [isVideoSelected]);

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

  useEffect(() => {
    console.log("cl", selectedFile);
  }, [selectedFile]);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Upload Videos</Button> */}
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
          <div
            className="cardBackground primaryTextColor md:w-[65%] md:h-[94%] md:absolute md:top-[50%] md:left-[50%] md:flex md:flex-col 

             sm:w-[100%] sm:h-[100%] sm:absolute sm:top-[50%] sm:left-[50%] sm:flex sm:flex-col 
             "
            style={styles}
          >
            <div style={{ flex: "0.1", display: "flex" }}>
              <div
                style={{
                  flex: "0.8",
                  // background: "yellow",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>Upload video</h3>
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
                {/* <div>saving..</div>
                <Feedback /> */}
                <IconButton onClick={handleClose}>
                  {" "}
                  <Close />{" "}
                </IconButton>
              </div>
            </div>
            <Divider style={{ background: "black" }} />
            <div
              className="md:flex md:flex-row md:gap-[0em]   sm:gap-[1em]   sm:flex sm:flex-col"
              style={{
                flex: "0.8",
                // background: "peru",
                // display: "flex",
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
                      // background: "red",
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
                      className="md:w-[80%] sm:w-[100%]"
                      // sx={{ width: "80%" }}
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
                    // background: "black",
                  }}
                >
                  <video src={videoUrl} controls />
                </div>
                {/* End of Display Video here */}
                <div
                  style={{
                    flex: "0.5",
                    // background: "blue",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "2vh",
                  }}
                >
                  <h6 style={{ textDecoration: "underline" }}>File name </h6>{" "}
                  <h6>{selectedFile?.name}</h6>
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
                {/* <h5>Checks complete. No issues found.</h5> */}
              </div>
              <div
                style={{
                  flex: "0.2",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button onClick={handleClose} variant="contained">
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default function UploadVideoModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const [fileName, setFileName] = useState([]);
  const [file, setFile] = useState([]);
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const [videoObject, setVideoObject] = useState({});
  const [vidUrl, setVidUrl] = useState("");

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles.length > 0) {
      // Assuming you want to handle each selected file
      const file = selectedFiles[0]; // Take the first file

      const videoBlob = URL.createObjectURL(file);

      if (file.type.startsWith("video/")) {
        const maxSizeInBytes = 15 * 1024 * 1024; // 15 MB

        if (file.size <= maxSizeInBytes) {
          console.log("File accepted:", file);
          setVideoObject(file); // Store the file itself

          dispatch(setVideoBelow15mbSelected(true));
          setVidUrl(videoBlob);

          // Reset the value of the file input element
          event.target.value = [];
        } else {
          triggerWarningAlertModal("File size exceeds the limit (15 MB).");
        }
      } else {
        triggerWarningAlertModal("Please select a video file.");
      }
    }
  };

  //   useEffect(() => {
  //     // Listen for changes in the secondModalOpen state
  //     if (secondModalOpen) {
  //       setOpen(true);
  //     } else {
  //       setOpen(false);
  //     }
  //   }, [secondModalOpen]);

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
          <div
            className="cardBackground primaryTextColor md:w-[65%] md:h-[94%] md:absolute md:top-[50%] md:left-[50%] md:flex md:flex-col

            sm:w-[100%] sm:h-[94%] sm:absolute sm:top-[50%] sm:left-[50%] sm:flex sm:flex-col
            "
            style={style}
          >
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
                {/* <Feedback /> */}
                <IconButton onClick={handleClose}>
                  <Close />{" "}
                </IconButton>
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
                      <small>Your video should noy be larger than 15mb</small>
                    </div>
                    <div>
                      <Button onClick={handleClick} variant="contained">
                        select Files
                      </Button>
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
                By submitting your video to Talent Meet, you acknowledge that
                you agree to Talent Meet{" "}
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
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
              accept="video/*" // Limit to video files
              multiple
            />
            <PublishVideoModal videoUrl={vidUrl} selectedFile={videoObject} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
