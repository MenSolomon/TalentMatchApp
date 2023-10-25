// ========================================

import { Button, Card } from "@mui/material";
import logoImage from "../assets/images/AppLogoBlue.png";
import BasicMenu from "../components/Menu/BasicMenu";
import { ArrowRight, Settings } from "@mui/icons-material";
import imageBackground from "../assets/images/kudus.webp";
import SupportCard from "../components/Cards/SupportCard/SupportCard";

const Support = () => {
  const rolesMenu = ["Agent", "Player", "Coach", "Scout"];
  return (
    <>
      <div className="Body_Support">
        {/* fIRST_DIV */}

        <div className="tittle">
          {/* lOGO */}
          <div>
            <img style={{ width: "120px" }} src={logoImage} />
          </div>

          {/* lIST */}
          <div style={{ display: "flex" }}>
            <BasicMenu menuTitle={"Roles"} menuItemsArray={rolesMenu} />
            <BasicMenu menuTitle={"Support"} menuItemsArray={rolesMenu} />
            <BasicMenu menuTitle={"Resources"} menuItemsArray={rolesMenu} />
          </div>

          {/* lOGIN */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* BTN */}
            <Button
              onClick={() => {}}
              sx={{
                background: "#5585FE",
                width: "10vw",
                height: "7vh",
                color: "white",
                textTransform: "none",
                borderRadius: "1.2vw",
              }}
            >
              Start free trial
            </Button>
            {/* End_of bTN*/}
          </div>
        </div>

        {/* eND_OF_DIV */}

        {/* sECOND_DIV */}

        <div className="sEARCH_cARDS">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: ` linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h5 style={{ color: "white" }}>What can we help you with ?</h5>
          </div>
          <div>
            <ul style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <li>support</li>
              <li>
                {" "}
                <ArrowRight />{" "}
              </li>
              <li>talent</li>
            </ul>
          </div>
        </div>

        {/* eND_OF_DIV */}

        {/* tHIRD_DIV */}

        <div className="Cards">
          <div>
            <div
              style={{
                width: "90%",
                height: "70%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <SupportCard
                btn={"Go to settings"}
                g1={"Activate your Account"}
                g2={"Download your Invoice"}
                g3={"Move from One Team to Another"}
                cardHeader={"General settings"}
                icon={<Settings sx={{ color: "white" }} />}
              />
              <SupportCard
                btn={"Go to settings"}
                g1={"Activate your Account"}
                g2={"Download your Invoice"}
                g3={"Move from One Team to Another"}
                cardHeader={"General settings"}
                icon={<Settings sx={{ color: "white" }} />}
              />
              <SupportCard
                btn={"Go to settings"}
                g1={"Activate your Account"}
                g2={"Download your Invoice"}
                g3={"Move from One Team to Another"}
                cardHeader={"General settings"}
                icon={<Settings sx={{ color: "white" }} />}
              />
              <SupportCard
                btn={"Go to settings"}
                g1={"Activate your Account"}
                g2={"Download your Invoice"}
                g3={"Move from One Team to Another"}
                cardHeader={"General settings"}
                icon={<Settings sx={{ color: "white" }} />}
              />
            </div>
          </div>
        </div>

        {/* eND_OF_DIV */}
      </div>
    </>
  );
};

export default Support;

// ======================================>>>>>>>>

// import { Button, Card } from "@mui/material";
// import logoImage from "../assets/images/AppLogoBlue.png";
// import BasicMenu from "../components/Menu/BasicMenu";
// import { ArrowRight, Settings } from "@mui/icons-material";
// import imageBackground from "../assets/images/kudus.webp";
// import SupportCard from "../components/Cards/SupportCard/SupportCard";

// const Support = () => {
//   const rolesMenu = ["Agent", "Player", "Coach", "Scout"];
//   return (
//     <div style={{ width: "100vw", height: "100vh", overflowY: "scroll" }}>
//       <div
//         style={{
//           display: "flex",
//           height: "100%",
//         }}
//       >
//         {/* HEADER FOR SUPPORT PAGE */}
//         <div
//           style={{
//             flex: "0.01",
//             display: "flex",
//             padding: "3vw",
//             paddingTop: "1.5vh",
//             // position: "fixed",
//             background: "red",
//           }}
//         >
//           {/* LOGO AREA */}
//           <div style={{ flex: ".15", display: "flex" }}>
//             {" "}
//             <img style={{ width: "120px" }} src={logoImage} />
//           </div>
//           {/* MENU ITEMS */}
//           {/* <div style={{ flex: ".55", display: "flex" }}>
//             {" "}
//             <BasicMenu menuTitle={"Roles"} menuItemsArray={rolesMenu} />{" "}
//             <BasicMenu menuTitle={"Support"} menuItemsArray={rolesMenu} />{" "}
//             <BasicMenu menuTitle={"Resources"} menuItemsArray={rolesMenu} />{" "}
//           </div> */}

//           {/* FREE TRIAL BUTTON */}
//           {/* <div
//             style={{
//               flex: ".3",

//               display: "flex",
//               justifyContent: "flex-end",
//               paddingTop: "1vh",
//             }}
//           >
//             <div
//               style={{
//                 width: "17vw",
//                 height: "8.4vh",
//                 background: "white",
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignItems: "center",
//                 borderRadius: "1.5vw",
//                 padding: "0vh .6vw",
//                 gap: "2vw",
//               }}
//             >
//               <h6
//                 style={{
//                   marginTop: "1.5vh",
//                   alignSelf: "center",
//                   color: "#5585FE",
//                   cursor: "pointer",
//                 }}
//               >
//                 Login
//               </h6>

//               <Button
//                 onClick={() => {}}
//                 sx={{
//                   background: "#5585FE",
//                   width: "10vw",
//                   height: "7vh",
//                   color: "white",
//                   textTransform: "none",
//                   borderRadius: "1.2vw",
//                 }}
//               >
//                 Start free trial
//               </Button>
//             </div>
//           </div> */}
//         </div>
//         {/* SEARCH $ CARDS PLACEMENT */}
//         <div style={{ flex: "0.89", display: "flex", flexDirection: "column" }}>
//           <div
//             style={{
//               flex: "0.48",
//               background: "pink",
//               backgroundImage: ` linear-gradient(90deg, rgba(32,32,32,0.975210066936931) 0%, rgba(55,54,54,0.9780111873851103) 34%, rgba(23,21,21,1) 100%),url("${imageBackground}")`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <h5 style={{ color: "white" }}>What can we help you with ?</h5>
//           </div>
//           <div
//             style={{
//               flex: "0.01",
//               marginLeft: "10%",
//             }}
//           >
//             <ul style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//               <li>support</li>
//               <li>
//                 {" "}
//                 <ArrowRight />{" "}
//               </li>
//               <li>talent</li>
//             </ul>
//           </div>
//           <div
//             style={{
//               flex: "0.6",
//               // background: "red",
//               display: "flex",
//               // justifyContent: "center",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <h1>Talent Match Tutorials</h1>
//             <div
//               style={{
//                 width: "70%",
//                 height: "40%",
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "20px",
//                 flexWrap: "wrap",
//               }}
//             >
//               <SupportCard
//                 btn={"Go to settings"}
//                 g1={"Activate your Account"}
//                 g2={"Download your Invoice"}
//                 g3={"Move from One Team to Another"}
//                 cardHeader={"General settings"}
//                 icon={<Settings sx={{ color: "white" }} />}
//               />
//               <SupportCard
//                 btn={"Go to settings"}
//                 g1={"Activate your Account"}
//                 g2={"Download your Invoice"}
//                 g3={"Move from One Team to Another"}
//                 cardHeader={"General settings"}
//                 icon={<Settings sx={{ color: "white" }} />}
//               />
//               <SupportCard
//                 btn={"Go to settings"}
//                 g1={"Activate your Account"}
//                 g2={"Download your Invoice"}
//                 g3={"Move from One Team to Another"}
//                 cardHeader={"General settings"}
//                 icon={<Settings sx={{ color: "white" }} />}
//               />
//               <SupportCard
//                 btn={"Go to settings"}
//                 g1={"Activate your Account"}
//                 g2={"Download your Invoice"}
//                 g3={"Move from One Team to Another"}
//                 cardHeader={"General settings"}
//                 icon={<Settings sx={{ color: "white" }} />}
//               />
//               <SupportCard
//                 btn={"Go to settings"}
//                 g1={"Activate your Account"}
//                 g2={"Download your Invoice"}
//                 g3={"Move from One Team to Another"}
//                 cardHeader={"General settings"}
//                 icon={<Settings sx={{ color: "white" }} />}
//               />
//               <SupportCard
//                 btn={"Go to settings"}
//                 g1={"Activate your Account"}
//                 g2={"Download your Invoice"}
//                 g3={"Move from One Team to Another"}
//                 cardHeader={"General settings"}
//                 icon={<Settings sx={{ color: "white" }} />}
//               />
//             </div>
//           </div>
//         </div>
//         {/* Email */}
//         <div style={{ flex: "0.1" }} className="email"></div>
//       </div>
//     </div>
//   );
// };

// export default Support;
