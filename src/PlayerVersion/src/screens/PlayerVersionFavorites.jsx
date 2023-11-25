import kotokoImage from "../assets/images/kotokocrest.jpg";
import heartsImage from "../assets/images/hearts.png";

import userImage from "../assets/images/avatar.jpg";
import ScoutsDisplayCard from "../components/Cards/ScoutsDisplayCard";

const PlayerVersionFavorites = () => {
  return (
    <div className="primaryTextColor md:flex md:flex-col md:w-[100%] md:h-[100%]  sm:flex sm:flex-col sm:w-[100%] sm:h-[100%]">
      {/* // Heading Area */}
      <div className="md:basis-[10%] sm:basis-[10%]">
        <h3 style={{ margin: 0, float: "left" }}>Interested scouts</h3>
      </div>
      {/* Video DISPLAY AREA */}
      <div className="md:basis-[90%] md:flex md:gap-[5%] md:flex-wrap  sm:basis-[90%] sm:flex sm:gap-[5%] sm:flex-wrap sm:overflow-y-scroll md:overflow-y-hidden">
        <div className="md:flex md:justify-center md:flex-wrap md:gap-[15px]  sm:flex sm:justify-center sm:flex-wrap sm:gap-[15px] ">
          <ScoutsDisplayCard
            AgencyName="Kotoko FC"
            UserName="Nana K"
            avatarUrl={userImage}
            backgroundUrl={kotokoImage}
          />
          <ScoutsDisplayCard
            AgencyName="Hearts of oak"
            UserName="Nana K"
            avatarUrl={userImage}
            backgroundUrl={heartsImage}
          />
          <ScoutsDisplayCard
            AgencyName="Kotoko FC"
            UserName="Nana K"
            avatarUrl={userImage}
            backgroundUrl={kotokoImage}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerVersionFavorites;
