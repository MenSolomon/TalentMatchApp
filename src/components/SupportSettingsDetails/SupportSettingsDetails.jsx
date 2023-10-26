import { Divider } from "@mui/material";

const SupportSettingsDetails = ({ supportDetails }) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <Divider sx={{ background: "black" }} />
        </div>
        <div>{supportDetails}</div>
        <div>
          <Divider sx={{ background: "black" }} />
        </div>
      </div>
    </>
  );
};

export default SupportSettingsDetails;
