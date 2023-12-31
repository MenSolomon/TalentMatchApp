import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, IconButton, TextField, Tooltip } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import BasicButton from "../../../../components/Buttons/BasicButton";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../Firebase/Firebase";
import {
  selectCurrentBrowserSize,
  setCloseCircularLoadBackdrop,
  setOpenCircularLoadBackdrop,
} from "../../../../statemanager/slices/OtherComponentStatesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsObject } from "../../../../statemanager/slices/LoginUserDataSlice";
import BasicSelect from "../../../../PlayerVersion/src/components/Selects/BasicSelect";
import { selectPlayerSelectedByClubOrScoutInPlayerManagement } from "../../../../statemanager/slices/PlayersInAgencySlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "40vw",
  // height: "62vh",
  border: "2px solid #000",
  borderRadius: "1vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const htagStyle = { margin: 0 };

export default function EditVideoModal({
  title,
  uploadedDate,
  views,
  url,
  id,
  uploaderId,
  description,
}) {
  const browserSize = useSelector(selectCurrentBrowserSize);

  let browserWidth = parseInt(browserSize?.width, 10);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const selectedPlayer = useSelector(
    selectPlayerSelectedByClubOrScoutInPlayerManagement
  );

  const [category, setCategory] = React.useState(title);
  const [vidDescription, setDescription] = React.useState(description);

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

  const handleEditVideo = async () => {
    try {
      // alert(selectedPlayer?.id + id);
      const videoRef = doc(
        db,
        `players_database/${selectedPlayer?.id}/videos`,
        id
      );

      await updateDoc(videoRef, {
        description: vidDescription,
        category: category,
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <IconButton onClick={handleOpen}>
        {" "}
        <Edit />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="cardBackground primaryTextColor md:w-[40vw] md:h-[62vh] sm:w-[90vw] sm:h-[65vh] "
          sx={style}
        >
          <div
            className="sm:w-[100%]  sm:h-[100%]"
            style={{
              width: "100%",
              height: "100%",
              gap: "1vh",
              display: "flex",
              borderRadius: "1vw",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: ".85",
                display: "flex",
                flexDirection: "column",
                gap: "1.5vh",
              }}
            >
              <BasicSelect
                defaultValue={category}
                fullWidth={true}
                label={"Category"}
                MenuItemArray={CategorySelectArray}
                // className="sm:w-[0vw] "
                widthSize={browserWidth >= 1024 ? 500 : 253}
                selectedValue={(e) => {
                  // alert(e);
                  setCategory(e);
                }}
              />
              <TextField
                fullWidth
                // id="outlined-multiline-flexible"
                InputProps={{
                  inputProps: {
                    maxLength: 150, // Set your desired max character limit
                  },
                }}
                multiline
                rows={8}
                label={
                  <span
                    style={{
                      color: vidDescription?.length === 150 ? "red" : "",
                    }}
                  >
                    Description {vidDescription?.length}/150
                  </span>
                }
                value={vidDescription}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                size="medium"
                sx={{ width: "90%" }}
              />
            </div>
            <div
              style={{
                flex: ".15",

                display: "flex",
                gap: "1.5vw",
                padding: "1vw",
              }}
            >
              <BasicButton
                onClick={() => {
                  handleClose();
                }}
                // className="sm:basis-[10%] md:basis-[25%] "
                className="sm:w-[30vw] sm:h-[5vh] md:w-[10vw] "
                innerText="Cancel"
              />
              <BasicButton
                onClick={() => {
                  handleEditVideo();
                }}
                className="sm:w-[30vw] sm:h-[5vh] md:w-[10vw] "
                innerText="Save"
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
