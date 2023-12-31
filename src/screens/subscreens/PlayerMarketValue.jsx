import { useSelector } from "react-redux";
import MarketValueGraph from "../../components/Charts/Line/MarketValueGraph";
import { AttachMoney, CurrencyPound, Money } from "@mui/icons-material";
import { selectPlayerSelectedToView } from "../../statemanager/slices/PlayersInAgencySlice";

const PlayerMarketValue = () => {
  const PlayerSelectedToViewObject = useSelector(selectPlayerSelectedToView);
  const { Market_Value_History, marketValue } = PlayerSelectedToViewObject;

  return (
    <div
      className="primaryTextColor md:w-[95%] md:h-[40vh] md:flex md:flex-row md:overflow-y-hidden           sm:w-[100%] sm:h-[40vh] sm:flex sm:flex-col sm:overflow-y-scroll "
      // style={{ width: "100%", height: "40vh", display: "flex" }}
      style={{ overflowY: "scroll" }}
    >
      <div style={{ flex: ".15", padding: "1vw", paddingTop: "4vh" }}>
        <h6> Current Value </h6>
        <h1 className="styleTextColor" style={{ fontWeight: "bolder" }}>
          {" "}
          {marketValue === "" ? "NA" : `${marketValue}M`} <AttachMoney />
          {/* <MonetizationOn />{" "} */}
        </h1>
        <h6 className="secondaryTextColor"> Last update </h6>
        <h5> {Market_Value_History.length === 0 ? "NA" : "Oct 2, 2022"} </h5>
      </div>

      <div style={{ flex: ".85" }}>
        {" "}
        <MarketValueGraph
          marketValueDates={Market_Value_History}
          MarketValuePrice={Market_Value_History}
        />
      </div>
    </div>
  );
};

export default PlayerMarketValue;
