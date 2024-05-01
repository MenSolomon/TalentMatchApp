import { TextField } from "@mui/material";
import PlayerManagementSettingsTab from "../../components/Tabs/PlayerManagementSettingsTab";
import DatePickerTool from "../../../../components/DatePicker/DatePicker";
import CountrySelect from "../../../../components/Autocompletes/CountrySelect";

const PlayerManagementSettings = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "48vh",
        display: "none",
      }}
    >
      <div
        style={{
          flex: ".6",
          // background: "yellow",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Edit profile Header */}
        <div style={{ flex: ".1" }}>
          <h5>Edit Profile </h5>
        </div>
        {/* Edit profile text fiedlds  */}
        <div style={{ flex: ".9", display: "flex" }}>
          <div style={{ flex: ".5" }}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              fullWidth={true}
              sx={{ width: "0vw" }}
            />
            <TextField
              id="outlined-basic"
              label="Surname"
              variant="outlined"
              fullWidth={true}
              sx={{ width: "0vw" }}
            />
            <DatePickerTool
              style={{ width: "0vw" }}
              containerStyle={{ marginTop: "-1vh" }}
              label="Date of birth"
              // defaultValue={userData.DOB}
              dateValue={(e) => {
                // setDOB(e);
              }}
            />
            <CountrySelect
              selectLabel="Nationality"
              styles={{
                minWidth: "0vw",
                marginLeft: "-0.5vw",
                marginTop: "1vh",
              }}
            />

            <TextField
              id="outlined-basic"
              label="Height"
              type="number"
              variant="outlined"
              fullWidth={true}
              className="primaryTextColor"
              sx={{ width: "0vw" }}
            />
          </div>
          <div style={{ flex: ".5" }}></div>
        </div>
      </div>

      <div style={{ flex: ".4", background: "red" }}></div>
    </div>
  );
};

export default PlayerManagementSettings;
