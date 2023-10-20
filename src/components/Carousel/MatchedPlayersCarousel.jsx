import { Carousel } from "react-bootstrap";
import MatchedPlayerCard from "../Cards/MatchedPlayerCard";
import manutd from "../../assets/images/manutd.png";
import ghana from "../../assets/images/ghana.png";

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
        paddingLeft: "2vw",
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
              } = data;

              return (
                <MatchedPlayerCard
                  key={index}
                  PlayerClub={manutd}
                  PlayerCountry={ghana}
                  PlayerImage={`${image}`}
                  PlayerName={surName}
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
            MatchedPlayersArray.slice(7, 12).map((data, index) => {
              const {
                firstName,
                surName,
                Age,
                position,
                Nationality,
                jerseyNumber,
                image,
              } = data;

              return (
                <MatchedPlayerCard
                  key={index}
                  PlayerClub={manutd}
                  PlayerCountry={ghana}
                  PlayerImage={image}
                  PlayerName={surName}
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
