import { Avatar, InputAdornment, TextField } from "@mui/material";
import CardHeaderCommunity from "../components/CardHeaderCommunity/CardHeaderCommunity";

// Treee
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import CustomizedInputsStyled from "../components/TextFields/Textfields";

const Community = () => {
  const styles = {
    width: "100%",
  };
  const accordionStyle = {
    width: "125%",
    marginLeft: "-30px",
  };
  return (
    <div
      style={{
        width: "80vw",
        height: "85vh",
        display: "flex",
      }}
    >
      {/* Chat List */}
      <div
        style={{
          flex: "0.2",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        {/* Communication chat list */}
        <div style={{ flex: "0.9" }}>
          <CardHeaderCommunity
            name={"Community"}
            timer={"12:00"}
            subName={"Test"}
          />
          <CardHeaderCommunity
            name={"Social"}
            timer={"1:00"}
            subName={"Test"}
          />
        </div>
        {/* Communication Text field */}
        <div
          style={{
            flex: "0.1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomizedInputsStyled
            style={styles}
            label={"message"}
            iconArray={["send"]}
          />
        </div>
      </div>
      {/* End of Chat List */}

      {/* Main Chat */}
      <div
        style={{
          flex: "0.6",
          // background: "yellow",
          display: "flex",
          flexDirection: "column",
          borderRadius: "2px solid white",
          padding: "10px",
        }}
      >
        {/* Communication main chat header */}
        <div
          style={{
            flex: "0.1",
            // background: "peru",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h2>Community Chat</h2>
        </div>
        <div style={{ flex: "0.8", background: "peru", borderRadius: "5px" }}>
          <div style={{ justifyContent: "flex-end", display: "flex" }}>
            Yo! Boom
          </div>
          <div style={{ justifyContent: "flex-start", display: "flex" }}>
            match dey oo... dem do Ghana
          </div>
          <div style={{ justifyContent: "flex-end", display: "flex" }}>
            {" "}
            Sia..lolx
          </div>
          <div
            style={{
              justifyContent: "flex-start",
              display: "flex",
            }}
          >
            Kaissh
          </div>
        </div>
        <div
          style={{
            flex: "0.1",
            // background: "cyan",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomizedInputsStyled
            style={styles}
            label={"send a message"}
            iconArray={["warning", "error"]}
          />
        </div>
      </div>
      {/* End of Main Chat */}

      {/* Available Chat */}
      <div
        style={{
          flex: "0.2",
          // background: "peru",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <div
          style={{
            flex: "0.1",
            // background: "blue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
          }}
        >
          <h6>Community Group</h6>
        </div>
        <div
          style={{
            flex: "0.9",
            // background: "red",
            overflow: "hidden",
          }}
        >
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId="1" label="People">
              <TreeItem
                nodeId="2"
                label={
                  <CardHeaderCommunity
                    name={"Community"}
                    accountProfile={
                      <Avatar
                        aria-label="recipe"
                        style={{ marginLeft: "-30px" }}
                      ></Avatar>
                    }
                  />
                }
              />
              <TreeItem
                nodeId="2"
                label={
                  <CardHeaderCommunity
                    name={"Social"}
                    accountProfile={
                      <Avatar style={{ marginLeft: "-30px" }}></Avatar>
                    }
                  />
                }
              />
              <TreeItem
                nodeId="3"
                label={
                  <CustomizedInputsStyled
                    style={accordionStyle}
                    label={"Type a username"}
                    iconArray={["search"]}
                  />
                }
              />
            </TreeItem>
            <TreeItem nodeId="4" label="Photos">
              <TreeItem
                nodeId="5"
                label={
                  <CustomizedInputsStyled
                    style={accordionStyle}
                    label={"Type a username"}
                    iconArray={["search"]}
                  />
                }
              />
            </TreeItem>
            <TreeItem nodeId="6" label="Options">
              <TreeItem nodeId="7" label="OSS" />
              <TreeItem nodeId="8" label="MUI">
                <TreeItem nodeId="9" label="index.js" />
              </TreeItem>
            </TreeItem>
          </TreeView>
        </div>
      </div>
      {/* End of Available Chat */}
    </div>
  );
};

export default Community;
