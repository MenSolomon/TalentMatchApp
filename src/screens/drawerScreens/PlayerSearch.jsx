import CustomizedInputsStyled from "../../components/TextFields/Textfields";

const PlayerSearch = () => {
  const styles = {
    display: "flex",
  };
  return (
    <div>
      <CustomizedInputsStyled
        style={styles}
        label={"player name"}
        iconArray={["search"]}
      />
    </div>
  );
};

export default PlayerSearch;
