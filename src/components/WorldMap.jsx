import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
const WorldMaps = () => {
  const countries = {
    IN: 88,
    CN: 33,
    RU: 79,
    MY: 2,
    GB: 100,
    FK: 10,
    AR: 800,
    VE: 90,
    GH: 70,
  };

  const missingCountries = [
    { name: "Singapore", LatLng: [1.3521, 103.8198] },
    { name: "Bermuda", LatLng: [32.3078, 64.7505] },
  ];

  const colorScale = ["#5585FE", "#0e328e"];

  return (
    <div style={{ width: "80%", height: "80%" }}>
      <VectorMap
        map={worldMill}
        backgroundColor="transparent" // Set the background color
        markers={missingCountries}
        markerStyle={{
          initial: {
            fill: "pink",
          },
        }}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        series={{
          regions: [
            {
              scale: colorScale,
              values: countries,
              min: 0,
              max: 100,
            },
          ],
        }}
        onRegionTipShow={function regionalTip(event, label, code) {
          return label.html(
            `<div style="background-color:black; border-radius:6px ; min-height:50px ; width: 125px ; color: white ;">
                    <p> <b> ${label.html()} </b> ${countries[code]} </p> </div>
                    `
          );
        }}
        onMarkerTipShow={function regionalTip(event, label) {
          return label.html(
            `<div style="background-color:white; border-radius:6px ; min-height:50px ; width: 125px ; color: black ;">
                      <p style="color:black !important:" > <b> ${label.html()} </b> </p> </div>
                      `
          );
        }}
      />
    </div>
  );
};

export default WorldMaps;
