import { Button, Divider } from "@mui/material";
import React from "react";
import { ConfirmDetailTextField } from "../../components/TextFields/ConfirmDetailTextField";
// =================
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function SettingsSupport() {
  return (
    <div
      className="md:flex md:flex-col md:w-[100%] md:h-[82vh]   sm:w-[100%] sm:h-[82vh] sm:flex sm:flex-col primaryTextColor "
      style={
        {
          // width: "100%",
          // height: "82vh",
          // display: "flex",
          // flexDirection: "column",
          // overflowY: "scroll",
        }
      }
    >
      {/* Support Header */}
      <div style={{ flex: "0.01" }}>
        <h4 className="lg:text-[2.5em] md:text-[2.7em] tb:text-[2.2em]">
          Support{" "}
        </h4>
      </div>
      {/* Divider */}
      <div style={{ flex: "0.01" }}>
        <Divider style={{ background: "white" }} />
      </div>
      <div
        className="md:flex md:flex-row   sm:flex sm:flex-col"
        style={{ flex: "0.98" }}
      >
        <div
          className="md:flex md:flex-col  sm:flex sm:flex-col"
          style={{ flex: ".49" }}
        >
          <div style={{ flex: ".6" }}>
            {/* Helpline */}
            <h4 className="lg:text-[2.5em] md:text-[2.7em] tb:text-[2.2em]">
              How can we help you ?
            </h4>
            <ConfirmDetailTextField
              placeholder={"text"}
              sxStyle={{ width: "60%" }}
            />
          </div>
          <div
            className="md:flex md:flex-col sm:flex sm:flex-col"
            style={{ flex: ".4" }}
          >
            <b className="lg:text-[1.2em] md:text-[1.7em] tb:text-[1.2em]">
              Contact Support
            </b>
            <small>24/7 help from our support staff</small>
            <Button style={{ width: "50%" }}>Contact</Button>
          </div>
        </div>
        <div
          className="md:flex md:flex-col sm:flex sm:flex-col"
          style={{ flex: ".02" }}
        >
          <Divider
            style={{
              background: "white",
              rotate: "-0deg",
              height: "90%",
              width: "3%",
            }}
          />
        </div>
        <div
          className="md:flex md:flex-col    sm:flex sm:flex-col"
          style={{ flex: ".49" }}
        >
          {/* FAQ */}
          <div style={{ flex: ".1" }}>
            <h3>FAQ</h3>
          </div>
          {/* Accordion for FAQ */}
          <div style={{ flex: ".9", overflowY: "scroll", maxHeight: "55vh" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
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
