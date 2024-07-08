import React from "react";

const SoccerPitch = () => {
  const pitchWidth = 800; // Adjust width as needed
  const pitchHeight = 500; // Adjust height as needed

  const styles = {
    container: {
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    pitch: {
      width: pitchWidth,
      height: pitchHeight,
      backgroundColor: "#bcc5d0", // Light green for the pitch
      position: "relative",
    },
    fieldLines: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "2px solid black",
      boxSizing: "border-box",
    },
    centerCircle: {
      position: "absolute",
      top: pitchHeight / 2 - 9.5, // Center the circle vertically (radius is 9.5)
      left: pitchWidth / 2 - 9.5, // Center the circle horizontally
      width: 19,
      height: 19,
      borderRadius: "50%",
      backgroundColor: "white",
    },
    goalPost: {
      position: "absolute",
      top: pitchHeight / 2 - 8, // Center the post vertically (goal height is 8)
      width: 4,
      height: 16,
      backgroundColor: "black",
    },
    goalBox: {
      position: "absolute",
      top: pitchHeight / 2 - 16.5, // Center the box vertically (16.5 for half of 18 yards)
      width: 132, // 18 yards in pixels (adjust based on pitchWidth)
      height: 33, // Penalty area depth
      backgroundColor: "rgba(0, 0, 0, 0.2)", // Transparent gray for the box
    },
    cornerArc: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 18, // Adjust based on pitchWidth
      height: 18,
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "2px solid black",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    cornerFlag: {
      position: "absolute",
      top: 0,
      left: 9, // Adjust based on cornerArc width
      width: 8,
      height: 50,
      backgroundColor: "yellow",
      border: "2px solid black",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.pitch}>
        <div style={styles.fieldLines} />
        <div style={styles.centerCircle} />
        <div style={styles.goalPost} />
        <div style={styles.goalPost} style={{ left: pitchWidth - 4 }} />{" "}
        {/* Duplicate for other side */}
        <div style={styles.goalBox} />
        <div style={styles.goalBox} style={{ left: pitchWidth - 132 }} />{" "}
        {/* Duplicate for other side */}
        <div style={styles.cornerArc} />
        <div style={styles.cornerArc} style={{ left: pitchWidth - 18 }} />{" "}
        {/* Duplicate for other corner */}
        <div style={styles.cornerFlag} />
        <div
          style={styles.cornerFlag}
          style={{ left: pitchWidth - 18, top: pitchHeight - 50 }}
        />{" "}
        {/* Duplicate for other corner */}
      </div>
    </div>
  );
};

export default SoccerPitch;
