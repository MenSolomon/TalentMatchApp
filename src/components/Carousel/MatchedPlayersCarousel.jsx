import { Carousel } from "react-bootstrap";
import MatchedPlayerCard from "../Cards/MatchedPlayerCard";
import manutd from "../../assets/images/manutd.png";
import ghana from "../../assets/images/ghana.png";
import nigeria from "../../assets/images/nigeria.jpg";
import senegal from "../../assets/images/senegal.png";

const MatchedPlayersCarousel = ({ MatchedPlayersArray }) => {
  // using the

  return (
    <Carousel
      interval={100000}
      //   controls={false}
      touch={true}
      style={{
        // background: "black",
        height: "100%",
        width: "100%",
        borderRadius: "1vw",
        paddingLeft: "5.5vw",
      }}
    >
      <Carousel.Item>
        <div style={{ display: "flex", gap: "1.2vw" }}>
          {MatchedPlayersArray &&
            MatchedPlayersArray.slice(0, 6).map((data, index) => {
              const {
                firstName,
                surName,
                Age,
                position,
                Nationality,
                jerseyNumber,
                image,
                clubLogo,
              } = data;
              return (
                <MatchedPlayerCard
                  key={index}
                  PlayerClub={clubLogo}
                  PlayerCountry={
                    Nationality === "Ghana"
                      ? ghana
                      : Nationality === "Nigeria"
                      ? nigeria
                      : Nationality === "Senegal"
                      ? senegal
                      : ""
                  }
                  PlayerImage={`${image}`}
                  PlayerFirstName={firstName}
                  PlayerSurName={surName}
                  PlayerPosition={position}
                />
              );
            })}
        </div>
      </Carousel.Item>
      {/* // dummy data to show the carousel can change */}
      {/* In implementing this carousel well we have to group our filtered players /
      matched players in 6's and loop through */}

      <Carousel.Item>
        <div style={{ display: "flex", gap: "1.2vw" }}>
          {MatchedPlayersArray &&
            MatchedPlayersArray.slice(6, 12).map((data, index) => {
              const {
                firstName,
                surName,
                Age,
                position,
                Nationality,
                jerseyNumber,
                image,
                clubLogo,
              } = data;

              return (
                <MatchedPlayerCard
                  key={index}
                  PlayerClub={clubLogo}
                  PlayerCountry={
                    Nationality === "Ghana"
                      ? ghana
                      : Nationality === "Nigeria"
                      ? nigeria
                      : Nationality === "Senegal"
                      ? senegal
                      : ""
                  }
                  PlayerImage={`${image}`}
                  PlayerFirstName={firstName}
                  PlayerSurName={surName}
                  PlayerPosition={position}
                />
              );
            })}
        </div>
      </Carousel.Item>
      {/* <Carousel.Item>JEad</Carousel.Item> */}
    </Carousel>
  );
};

export default MatchedPlayersCarousel;
