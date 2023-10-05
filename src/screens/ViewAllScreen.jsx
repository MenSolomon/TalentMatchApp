import ViewPlayerCard from "../components/Cards/ViewPlayerCard";
import Ronaldo from "../assets/images/RonaldoImage.png";
import kudus from "../assets/images/kudus.webp";

const ViewAllScreen = () => {
  const PlayerArray = [
    {
      firstName: "Cristiano",
      surName: "Ronaldo",
      Age: "7",
      position: "ST",
      Nationality: "Portugal",
      jerseyNumber: "7",
      //   image: "../assets/images/Ronaldo.png",
    },
    {
      firstName: "Lionel",
      surName: "Messi",
      Age: "33",
      Nationality: "Argentina",
      position: "CF",
      jerseyNumber: "10",
      // image: "../assets/images/Ronaldo.png",
    },
    {
      firstName: "Thomas",
      surName: "Partey",
      Nationality: "Ghana",
      Age: "25",
      position: "CDM",
      jerseyNumber: "17",
      // image: "../assets/images/Ronaldo.png",
    },
    {
      firstName: "Mohammed",
      surName: "Kudus",
      Age: "22",
      position: "RW",
      Nationality: "Ghana",
      jerseyNumber: "17",
      image: "../assets/images/Ronaldo.png",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: ".1" }}>
        <h4>Default Profile</h4>
      </div>
      {/* Cards */}
      <div
        style={{
          flex: ".85",
          //   paddingTop: "2vh",
          //   gap: "2vw",
          flexWrap: "wrap",
          display: "flex",
        }}
      >
        {PlayerArray.map((data, key) => {
          const {
            firstName,
            surName,
            Age,
            position,
            jerseyNumber,
            image,
            Nationality,
          } = data;

          if (firstName === "Mohammed") {
            return (
              <ViewPlayerCard
                key={key}
                image={kudus}
                firstName={firstName}
                surName={surName}
                age={Age}
                nationality={Nationality}
                position={position}
                jerseyNumber={jerseyNumber}
              />
            );
          } else {
            return (
              <ViewPlayerCard
                key={key}
                image={Ronaldo}
                firstName={firstName}
                surName={surName}
                age={Age}
                nationality={Nationality}
                position={position}
                jerseyNumber={jerseyNumber}
              />
            );
          }
        })}
      </div>

      <div
        style={{
          flex: ".05",
          //   paddingTop: "2vh",
          //   gap: "2vw",
          flexWrap: "wrap",
        }}
      >
        {" "}
        Pagination{" "}
      </div>
    </div>
  );
};

export default ViewAllScreen;
