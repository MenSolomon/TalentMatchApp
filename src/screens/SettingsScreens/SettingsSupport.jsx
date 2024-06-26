import React, { useState } from "react";
import {
  Button,
  Divider,
  TextField,
  MenuItem,
  Grid,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";

function SettingsSupport() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState([]);
  const maxImages = 3;
  const maxSize = 5 * 1024 * 1024; // 5MB

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];

    let totalSize = images.reduce((acc, img) => acc + img.size, 0);

    files.forEach((file) => {
      if (
        validFiles.length < maxImages - images.length &&
        totalSize + file.size <= maxSize
      ) {
        validFiles.push(file);
        totalSize += file.size;
      }
    });

    setImages([...images, ...validFiles]);
  };

  return (
    <div className="md:flex md:flex-col md:w-[100%] md:h-[82vh] sm:w-[100%] sm:h-[82vh] sm:flex sm:flex-col primaryTextColor">
      <div style={{ flex: "0.01" }}>
        <h4 className="lg:text-[1em] md:text-[1em] tb:text-[1em]">Support</h4>
      </div>
      <div style={{ flex: "0.01" }}>
        <Divider style={{ background: "white" }} />
      </div>
      <div
        className="md:flex md:flex-row sm:flex sm:flex-col"
        style={{ flex: "0.98" }}>
        <div
          className="md:flex md:flex-col sm:flex sm:flex-col"
          style={{ flex: ".49" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={!!errors.reason}
                  sx={{ border: "2px solid #F7F7F9" }}>
                  <InputLabel id="reason-label">Reason</InputLabel>
                  <Select
                    labelId="reason-label"
                    id="reason"
                    {...register("reason", {
                      required: "This field is required",
                    })}
                    label="Reason">
                    <MenuItem value="Subscription">Subscription</MenuItem>
                    <MenuItem value="BoostPoints">BoostPoints</MenuItem>
                    <MenuItem value="Account Verification">
                      Account Verification
                    </MenuItem>
                    <MenuItem value="Account Retrieval">
                      Account Retrieval
                    </MenuItem>
                  </Select>
                  <FormHelperText>{errors.reason?.message}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ border: "2px solid #F7F7F9" }}
                  fullWidth
                  label="Explain your problem"
                  multiline
                  rows={4}
                  {...register("explanation", {
                    required: "This field is required",
                  })}
                  error={!!errors.explanation}
                  helperText={errors.explanation?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </Button>
                <div
                  className="md:flex md:flex-col sm:flex sm:flex-col"
                  style={{ flex: ".4" }}>
                  {/* <b className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
                    Contact Support
                  </b> */}
                  <small> Upload a maximum of 3 pictures</small>
                </div>

                {images.length > 0 && (
                  <Grid container spacing={2} style={{ marginTop: "10px" }}>
                    {images.map((image, index) => (
                      <Grid item key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`upload-${index}`}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>

          <div
            className="md:flex md:flex-col sm:flex sm:flex-col"
            style={{ flex: ".4" }}>
            <b className="lg:text-[1em] md:text-[1em] tb:text-[1em]">
              Contact Support
            </b>
            <small>24/7 help from our support staff</small>
            <Button style={{ width: "50%" }}>Contact</Button>
          </div>
        </div>
        <div
          className="md:flex md:flex-col sm:flex sm:flex-col"
          style={{ flex: ".02" }}>
          <Divider
            style={{ background: "white", height: "90%", width: "3%" }}
          />
        </div>
        <div
          className="md:flex md:flex-col sm:flex sm:flex-col"
          style={{ flex: ".49" }}>
          <div style={{ flex: ".1" }}>
            <h3>FAQs</h3>
          </div>
          <div style={{ flex: ".9", overflowY: "scroll", maxHeight: "55vh" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="h6">
                  How long do TalentMeet subscriptions last?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  TalentMeet subscriptions are active for one full year from the
                  date of purchase.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header">
                <Typography variant="h6">
                  Do I pay each year or month-to-month?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Subscriptions are charged on a monthly basis.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header">
                <Typography variant="h6">
                  How does a TalentMeet free trial work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You can access the Service indefinitely but you will have very
                  limited access.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsSupport;
