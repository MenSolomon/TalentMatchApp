import { useEffect } from "react";
import logoImage from "../assets/images/AppLogoBlue.png";
import LinearDeterminateProgress from "../components/Progess/LinearDeterminateProgress";

const SplashScreen = ({ progressPercentage }) => {
  useEffect(() => {
    // Add the increaseWidth class to trigger the animation
    const img = document.querySelector(".splash-screen img");
    img.classList.add("increaseWidth");
  }, []);

  return (
    <div
      className="splash-screen"
      style={{
        width: "100vw",
        height: "100vh",
        background: "white",
        color: "black",
        display: "grid",
        placeContent: "center",
        gap: "5.5vh",
        paddingBottom: "4vh",
      }}
    >
      <img src={logoImage} width="400px" />

      <LinearDeterminateProgress progressPercentage={progressPercentage} />
    </div>
  );
};

export default SplashScreen;
