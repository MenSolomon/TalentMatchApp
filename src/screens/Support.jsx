import React from "react";
import BasicMenu from "../components/Menu/BasicMenu";
import logoImage from "../assets/images/AppLogoBlue.png";
import { ArrowRight } from "@mui/icons-material";

const Support = () => {
  const rolesMenu = ["Agent", "Player", "Coach", "Scout"];
  return (
    <div className="body_container">
      <div className="body">
        <div className="header">
          <div style={{ display: "flex", height: "100%" }}>
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
              <h3>login</h3>
            </div>
          </div>
        </div>
        <div className="main">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              background: "pink",
            }}
          >
            <div
              style={{
                flex: "0.38",
                background: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>What can we help you with?</h1>
            </div>
            <div
              style={{
                flex: "0.02",
                background: "yellow",
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
                <h6>Support </h6>
                <span>
                  <ArrowRight />
                </span>
                <h6>Talent</h6>
              </div>
            </div>
            <div style={{ flex: "0.6", background: "peru" }}></div>
          </div>
        </div>
        <div className="foot">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus
          ex ullam ipsa! Ea cum, doloremque error recusandae ipsum pariatur
          minus repellendus eos, nobis commodi dicta deserunt eum esse, mollitia
          fugiat!
        </div>
      </div>
    </div>
  );
};

export default Support;
