import {
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import BasicButton from "../../../../components/Buttons/BasicButton";

const PlayerManagementStatistics = () => {
  const seasonsMenu = [
    {
      value: "Overall",
      label: "Overall",
    },
    {
      value: "23/24",
      label: "23/24",
    },
    {
      value: "22/23",
      label: "22/23",
    },
    {
      value: "21/22",
      label: "21/22",
    },
    {
      value: "20/21",
      label: "20/21",
    },
    {
      value: "19/20",
      label: "19/20",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "48vh",
        overflowY: "scroll",
        // background: "red",
      }}
    >
      <TextField
        id="outlined-select-currency"
        size="small"
        select
        // label="Select"
        defaultValue="23/24"
        style={{ width: "15%" }}
      >
        {seasonsMenu.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>{" "}
      <BasicButton innerText={"Save"} />
      <br />
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>
        General
      </h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Games played">
                <TextField
                  id="standard-basic"
                  label="Games played"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>

            <TableCell>
              <Tooltip title="Minutes Played">
                <TextField
                  id="standard-basic"
                  label="Minutes Played"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Starts">
                <TextField
                  id="standard-basic"
                  label="Starts"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Subbed off">
                <TextField
                  id="standard-basic"
                  label="Subbed off"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>
        Defence
      </h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Clearance">
                <TextField
                  id="standard-basic"
                  label="Clearance"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Tackles">
                <TextField
                  id="standard-basic"
                  label="Tackles"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Duels">
                <TextField
                  id="standard-basic"
                  label="Duels"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Aeriel duels">
                <TextField
                  id="standard-basic"
                  label="Aeriel duels"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Blocks">
                <TextField
                  id="standard-basic"
                  label="Blocks"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Interceptions">
                <TextField
                  id="standard-basic"
                  label="Interceptions"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>Attack</h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Total shots">
                <TextField
                  id="standard-basic"
                  label="Total shots"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Shots on target">
                <TextField
                  id="standard-basic"
                  label="Shots on target"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Goals scored">
                <TextField
                  id="standard-basic"
                  label="Goals scored"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Conversion rate">
                <TextField
                  id="standard-basic"
                  label="Conversion rate"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip
                title="Minutes per
                goal"
              >
                <TextField
                  id="standard-basic"
                  label="Minutes per
                goal"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Header goals">
                <TextField
                  id="standard-basic"
                  label="Header goals"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Left goals">
                <TextField
                  id="standard-basic"
                  label="Left goals"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>{" "}
            <TableCell>
              <Tooltip title="Right goals">
                <TextField
                  id="standard-basic"
                  label="Right goals"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>{" "}
            <TableCell>
              <Tooltip title="Other goals">
                <TextField
                  id="standard-basic"
                  label="Other goals"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip
                title="Goals outside
                the box"
              >
                <TextField
                  id="standard-basic"
                  label="Goals outside
                the box"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>{" "}
            <TableCell>
              <Tooltip
                title="Goals inside
                the box"
              >
                <TextField
                  id="standard-basic"
                  label="Goals inside
                the box"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>{" "}
            <TableCell>
              <Tooltip title="Goals from freekicks">
                <TextField
                  id="standard-basic"
                  label="Goals from freekicks"
                  variant="standard"
                  value={0}
                  type="number"
                />{" "}
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>
        Discipline
      </h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Fouls">
                <TextField
                  id="standard-basic"
                  label="Fouls
                conceeded"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Fouls won">
                <TextField
                  id="standard-basic"
                  label="Fouls won"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Yellow cards">
                <TextField
                  id="standard-basic"
                  label="Yellow cards"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              {" "}
              <Tooltip title="Red cards">
                <TextField
                  id="standard-basic"
                  label="Red cards"
                  variant="standard"
                  value={0}
                  type="number"
                  value={"5"}
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <h6 style={{ margin: 0, marginTop: "4vh", fontWeight: "800" }}>
        Distribution
      </h6>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip title="Assists">
                <TextField
                  id="standard-basic"
                  label="Assists "
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip
                title="Pass
                success rate"
              >
                <TextField
                  id="standard-basic"
                  label="Pass
                success rate"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Long passes rate">
                <TextField
                  id="standard-basic"
                  label="Long passes rate"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Opponent half pass accuracy">
                <TextField
                  id="standard-basic"
                  label="Opponent half pass accuracy"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Own half pass accuracy">
                <TextField
                  id="standard-basic"
                  label="Own half pass
                accuracy"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Pass direction forward %">
                <TextField
                  id="standard-basic"
                  label="Pass direction forward %"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Pass direction backward %">
                <TextField
                  id="standard-basic"
                  label="Pass direction backward %"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>{" "}
            <TableCell>
              <Tooltip title="Pass direction left %">
                <TextField
                  id="standard-basic"
                  label="Pass direction left %"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Pass direction right %">
                <TextField
                  id="standard-basic"
                  label="Pass direction right %"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>{" "}
            <TableCell>
              <Tooltip title="Total passes">
                <TextField
                  id="standard-basic"
                  label="Total passes"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Successful passes">
                <TextField
                  id="standard-basic"
                  label="Successful passes"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>{" "}
            <TableCell>
              <Tooltip title="Key passes">
                <TextField
                  id="standard-basic"
                  label="Key passes"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>{" "}
            <TableCell>
              <Tooltip title="Total passes per 90 mins">
                <TextField
                  id="standard-basic"
                  label="Total passes per 90 mins"
                  variant="standard"
                  value={0}
                  type="number"
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  );
};

export default PlayerManagementStatistics;
