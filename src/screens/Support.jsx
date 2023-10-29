import React from "react";
import BasicMenu from "../components/Menu/BasicMenu";
import logoImage from "../assets/images/AppLogoBlue.png";
import imageBackground from "../assets/images/kudus.webp";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Search,
  Settings,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import SupportCard from "../components/Cards/SupportCard/SupportCard";
import ProfileMenu from "../components/Menu/ProfileMenu";
import { InputAdornment, TextField } from "@mui/material";

const Support = () => {
  const rolesMenu = ["Agent", "Player", "Coach", "Scout"];
  return (
    <div style={{ background: "peru", overflowX: "hidden" }}>
      <div className="body_container">
        <div className="body">
          <div className="header">
            <div
              style={{
                display: "flex",
                height: "100%",
                background: "rgb(99, 53, 53)",
                width: "100vw",
              }}
            >
              <div
                style={{
                  flex: "0.2",
                  // background: "green",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img style={{ width: "120px" }} src={logoImage} />
              </div>
              <div
                style={{
                  flex: "0.5",
                  // background: "pink",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <BasicMenu menuTitle={"Roles"} menuItemsArray={rolesMenu} />
                <BasicMenu menuTitle={"Support"} menuItemsArray={rolesMenu} />
                <BasicMenu menuTitle={"Resources"} menuItemsArray={rolesMenu} />
              </div>
              <div
                style={{
                  flex: "0.3",
                  // background: "yellow",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <ProfileMenu name={"Login"} />
              </div>
            </div>
          </div>
          <div className="main">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                // background: "pink",
              }}
            >
              <div
                style={{
                  flex: "0.38",
                  // background: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                  backgroundImage: `linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h1 style={{ color: "white" }}>What can we help you with?</h1>
                <div>
                  {" "}
                  <TextField
                    sx={{ width: "70vw", borderRadius: "50px" }}
                    id="outlined-basic"
                    label="search"
                    variant="outlined"
                    startAdornment={
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    }
                  />
                </div>
              </div>
              <div
                style={{
                  flex: "0.02",
                  // background: "yellow",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10%",
                    gap: "20px",
                  }}
                >
                  <h6 style={{ color: "white" }}>Support </h6>
                  <span>
                    <ArrowRight sx={{ color: "white" }} />
                  </span>
                  <h6 style={{ color: "white" }}>Talent</h6>
                </div>
              </div>
              <div
                style={{
                  flex: "0.6",
                  // background: "peru",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    flex: "0.2",
                    // background: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                  }}
                >
                  <h2 style={{ color: "white" }}>Talent Match Tutorials</h2>
                </div>
                <div
                  style={{
                    flex: "0.8",
                    // background: "green",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      height: "60%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      gap: "50px",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <SupportCard
                      g1={"Activate your Account"}
                      btn={"See all tutorials in this category"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      g1={"Activate your Account"}
                      btn={"See all tutorials in this category"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      g1={"Activate your Account"}
                      btn={"See all tutorials in this category"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      g1={"Activate your Account"}
                      btn={"See all tutorials in this category"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      g1={"Activate your Account"}
                      btn={"See all tutorials in this category"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      g1={"Activate your Account"}
                      btn={"See all tutorials in this category"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="foot">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  flex: "0.8",
                  // background: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <h1>Contact Our Support Team</h1>
                <div
                  style={{
                    border: "1px solid black",
                    width: "15%",
                    height: "15%",
                    textAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Email Us
                </div>
              </div>
              <div
                style={{
                  flex: "0.2",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginLeft: "5%" }}>
                  <small style={{ fontWeight: "bold" }}>
                    Privacy Policy | Terms & conditions | Software License
                    Agreement | Do Not Sell or Share My Personal Information |
                    Cookies | Security{" "}
                    <p>
                      Talent is a product and service of Agile Sports
                      Technologies, Inc. All text and design © 20023-2029. All
                      rights reserved.
                    </p>
                  </small>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Facebook />
                    <Twitter />
                    <Instagram />
                    <YouTube />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
