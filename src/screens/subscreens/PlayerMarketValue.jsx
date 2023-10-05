import MarketValueGraph from "../../components/Charts/Line/MarketValueGraph";
import { CurrencyPound } from "@mui/icons-material";

const PlayerMarketValue = () => {
  return (
    <div
      className="primaryTextColor"
      style={{ width: "100%", height: "40vh", display: "flex" }}
    >
      <div style={{ flex: ".15", padding: "1vw", paddingTop: "4vh" }}>
        <h6> Current Value </h6>
        <h1 className="styleTextColor" style={{ fontWeight: "bolder" }}>
          {" "}
          50M <CurrencyPound />
          {/* <MonetizationOn />{" "} */}
        </h1>
        <h6 className="secondaryTextColor"> Last update </h6>
        <h5> Oct 2, 2022 </h5>
      </div>

      <div style={{ flex: ".5" }}>
        {" "}
        <MarketValueGraph />
      </div>
    </div>
  );
};

export default PlayerMarketValue;
