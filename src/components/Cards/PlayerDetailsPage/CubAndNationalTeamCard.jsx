import { Avatar, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { selectClubsInDatabase } from "../../../statemanager/slices/ClubsInDatabaseSlice";
import { LocalPolice } from "@mui/icons-material";

const ClubandNationalTeamDisplayCard = ({
  hTagStyle,
  clubImage,
  countryCode,
  ClubName,
  Height,
  PreferredFoot,
  Nationality,
}) => {
  return (
    <div
      className="playerCard"
      style={{
        width: "100%",
        height: "100%",
        // background:
        //   "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
        // background: "white",
        // position: "relative",
        padding: "1.5vw",
        display: "flex",
        flexDirection: "column",
        // borderBottom: "1px solid ",
        // borderRight: "1px solid #BECBCC",
        borderRadius: "1vw",
      }}
    >
      {/* Club name and Club Image Area , Nationality Area */}
      <div
        style={{
          // background: "white",
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: "0.5", display: "flex" }}>
          {/* Club name Nationality */}
          <div
            style={{
              flex: ".7",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: ".6" }}>
              {" "}
              <p
                style={{
                  lineHeight: 1,
                  marginBottom: 0,
                  marginTop: 0,
                  paddingBottom: 0,
                  paddingTop: 0,
                  textAlign: "right",
                  fontSize: ".94em",
                }}
              >
                {ClubName}
              </p>{" "}
            </div>
            <div style={{ flex: ".4" }}>
              {" "}
              <Tooltip title={Nationality}>
                <img
                  src={`https://flagcdn.com/${countryCode
                    .toString()
                    .toLowerCase()}.svg`}
                  style={{ width: "40px", float: "right" }}
                />{" "}
              </Tooltip>
            </div>
          </div>

          {/* Club Image */}
          <div style={{ flex: ".3", paddingLeft: ".3vw" }}>
            {/* <img src={clubImage} style={{ width: "100%" }} /> */}

            {ClubName === "Free agent" ||
            ClubName === undefined ||
            clubImage === "" ? (
              <Tooltip title="Free agent">
                {" "}
                <LocalPolice
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    // zIndex: "10000",
                  }}
                />{" "}
              </Tooltip>
            ) : (
              <Tooltip title={ClubName}>
                {" "}
                <Avatar
                  src={clubImage}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    // zIndex: "1000",
                  }}
                />{" "}
              </Tooltip>
            )}
          </div>
        </div>
        {/* // Height And Preffered Foot Area */}
        <div>
          {" "}
          <h6 style={{ ...hTagStyle, fontSize: ".95em" }}>
            Preferred foot : {PreferredFoot}
          </h6>{" "}
          <h6 style={{ ...hTagStyle, fontSize: ".95em" }}>
            Height : {Height} m
          </h6>{" "}
        </div>
      </div>
    </div>
  );
};

export default ClubandNationalTeamDisplayCard;
