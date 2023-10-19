import { Flag } from "@mui/icons-material";
import { Card, Divider } from "@mui/material";

const NewsFeatureMatchCard = () => {
  return (
    <>
      <div>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            background: "green",
            borderRadius: "5px",
            gap: "22px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Flag />
                <small>Kotoko</small>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <small>Thur 20</small>
                <small>2:00 AM</small>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Flag />
                <small>Kotoko</small>
              </div>
            </div>
          </div>
          <div>Country Name</div>
        </Card>
      </div>
      <div>
        <Divider />
      </div>
    </>
  );
};

export default NewsFeatureMatchCard;
