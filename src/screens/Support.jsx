// ========================================

import { Button, Card, InputAdornment, TextField } from "@mui/material";
import logoImage from "../assets/images/AppLogoBlue.png";
import BasicMenu from "../components/Menu/BasicMenu";
import {
  ArrowRight,
  Email,
  Facebook,
  Search,
  Settings,
  WhatsApp,
} from "@mui/icons-material";

import SupportCard from "../components/Cards/SupportCard/SupportCard";

const Support = () => {
  const rolesMenu = ["Agent", "Player", "Coach", "Scout"];
  return (
    <div className="body_container">
      <div className="container">
        <div className="header_container">
          {/* header */}
          <div className="head">
            <div
              style={{
                display: "flex",
                // width: "100%",
                // height: "100%",
                background: "peru",
              }}
            >
              {/* Logo */}
              <div
                style={{
                  flex: "0.5",
                  // background: "pink",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img style={{ width: "120px" }} src={logoImage} />
              </div>
              {/* MENU ITEMS */}
              <div
                style={{
                  flex: ".3",
                  display: "flex",
                  alignItems: "center",
                  // background: "pink",
                }}
              >
                {" "}
                <BasicMenu
                  menuTitle={"Roles"}
                  menuItemsArray={rolesMenu}
                />{" "}
                <BasicMenu menuTitle={"Support"} menuItemsArray={rolesMenu} />{" "}
                <BasicMenu menuTitle={"Resources"} menuItemsArray={rolesMenu} />{" "}
              </div>
              <div
                style={{
                  flex: "2",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  // background: "pink",
                }}
              >
                <h3>Login</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="main_container">
          {/* title & search */}
          <div className="title_search">
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                paddingTop: "10%",
              }}
            >
              <h5 style={{ color: "white" }}>What can we help you with ?</h5>
            </div>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                // borderRadius: "10%",
              }}
            >
              <TextField
                sx={{ width: "50%" }}
                placeholder="search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          {/* cards content */}
          <div className="cards">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                // background: "brown",
                overflow: "hidden",
              }}
            >
              <div style={{ flex: "0.2" }}>
                <ul
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <li>support</li>
                  <li>
                    {" "}
                    <ArrowRight />{" "}
                  </li>
                  <li>talent</li>
                </ul>
              </div>
              {/* Cards */}
              <div
                style={{
                  flex: "0.8",
                }}
              >
                {/* Talent Natch Tutorials */}
                <div style={{ textAlign: "center" }}>
                  <h1>Talent Match Tutorials</h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "2%",
                    // overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <SupportCard
                      btn={"Go to settings"}
                      g1={"Activate your Account"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      btn={"Go to settings"}
                      g1={"Activate your Account"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      btn={"Go to settings"}
                      g1={"Activate your Account"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      btn={"Go to settings"}
                      g1={"Activate your Account"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      btn={"Go to settings"}
                      g1={"Activate your Account"}
                      g2={"Download your Invoice"}
                      g3={"Move from One Team to Another"}
                      cardHeader={"General settings"}
                      icon={<Settings sx={{ color: "white" }} />}
                    />
                    <SupportCard
                      btn={"Go to settings"}
                      g1={"Activate your Account"}
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
          {/* footer */}
          <div className="footer">
            <div className="email">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15%",
                  textAlign: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h1
                  style={{
                    marginLeft: "3%",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Contact Us
                </h1>

                <ul
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <l>
                    {" "}
                    <Email sx={{ fontSize: "40px" }} />{" "}
                  </l>
                  <l>
                    {" "}
                    <WhatsApp sx={{ fontSize: "40px" }} />{" "}
                  </l>
                  <l>
                    {" "}
                    <Facebook sx={{ fontSize: "40px" }} />{" "}
                  </l>
                </ul>
              </div>
            </div>
            <div className="foot">
              <h2 style={{ textAlign: "center" }}>The footer will be here</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
