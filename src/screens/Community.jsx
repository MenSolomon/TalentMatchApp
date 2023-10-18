import { Avatar } from "@mui/material";
import CardHeaderCommunity from "../components/CardHeaderCommunity/CardHeaderCommunity";

// Treee
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import CustomizedInputsStyled from "../components/TextFields/Textfields";

const Community = () => {
  return (
    <div
      style={{
        // background: "red",
        width: "80vw",
        height: "90vh",
        display: "flex",
      }}
    >
      {/* Chat List */}
      <div
        style={{
          flex: "0.2",
          // background: "green",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: "0.9" }}>
          <CardHeaderCommunity
            name={"Community"}
            timer={"12:00"}
            subName={"Test"}
          />
        </div>
        <div
          style={{
            flex: "0.1",
            // background: "pink",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomizedInputsStyled />
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
        }}
      >
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
          <h3>Community Chat</h3>
        </div>
        <div style={{ flex: "0.8", background: "pink" }}></div>
        <div
          style={{
            flex: "0.1",
            // background: "cyan",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomizedInputsStyled />
        </div>
      </div>

      {/* Available Chat */}
      <div
        style={{
          flex: "0.2",
          // background: "peru",
          display: "flex",
          flexDirection: "column",
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
              <TreeItem nodeId="3" label={<CustomizedInputsStyled />} />
            </TreeItem>
            <TreeItem nodeId="4" label="Photos">
              <TreeItem nodeId="5" label="OSS" />
              {/* <TreeItem nodeId="6" label="MUI">
                <TreeItem nodeId="8" label="index.js" />
              </TreeItem> */}
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
    </div>
  );
};

export default Community;
