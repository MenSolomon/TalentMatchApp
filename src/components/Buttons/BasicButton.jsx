import { Button } from "@mui/material";

const BasicButton = ({ style, innerText }) => {
  return (
    <Button sx={{ ...style, background: "#5585FE", borderRadius: ".5vw" }}>
      {innerText}
    </Button>
  );
};

export default BasicButton;
