import { Avatar, Card } from "@mui/material";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectPlayersInAgencyArray } from "../../statemanager/slices/PlayersInAgencySlice";
import ghana from "../../assets/images/ghana.png";
import MatchedPlayerCard from "../Cards/MatchedPlayerCard";
import PlayerComparisonAccordion from "../Accordions/PlayerComparisonAccordion/PlayerComparisonAccordion";
import { useEffect, useState } from "react";
import {
  selectApiPlayersDatabase,
  selectPlayersDatabase,
} from "../../statemanager/slices/DatabaseSlice";
import { selectClubsInDatabase } from "../../statemanager/slices/ClubsInDatabaseSlice";
import {
  selectCurrentProfile,
  selectUserSavedProfiles,
} from "../../statemanager/slices/SavedProfileSlice";
import { VideocamOff } from "@mui/icons-material";
import { selectUserDetailsObject } from "../../statemanager/slices/LoginUserDataSlice";

const NewsCarousel = ({ NewsArray }) => {
  // const MatchedPlayersArray = useSelector(selectPlayersInAgencyArray);

  const createdPlayers = useSelector(selectPlayersDatabase);
  const apiPlayers = useSelector(selectApiPlayersDatabase);

  const MatchedPlayersArray = useSelector(selectApiPlayersDatabase);
  const allClubsInDatabase = useSelector(selectClubsInDatabase);

  console.log(MatchedPlayersArray, "parad");
  const userLoginDetailsObject = useSelector(selectUserDetailsObject);

  // const [activeIndex, setActiveIndex] = useState(0);
  // const [prevIndex, setPrevIndex] = useState(0);

  // const handleSelect = (selectedIndex, e) => {
  //   setPrevIndex(activeIndex);
  //   setActiveIndex(selectedIndex);
  // };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  // Store the index of the previously active item
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);

  useEffect(() => {
    // Pause the video of the previously active item when a new item becomes active
    const videoElement = document.getElementById(`video-${prevActiveIndex}`);
    if (videoElement) {
      videoElement.pause();
    }
    setPrevActiveIndex(activeIndex);
  }, [activeIndex]);

  // ************************* RETRIEVEING P;LAYERS OF SPECIFIC PROFILES   ***************************************

  const currentProfileNameSelected = useSelector(selectCurrentProfile);

  const savedUserProfiles = useSelector(selectUserSavedProfiles);
  // const MatchedPlayersArray = useSelector(selectPlayersDatabase);

  const carouselProfileName =
    userLoginDetailsObject?.carouselProfileName === undefined
      ? "Default"
      : userLoginDetailsObject?.carouselProfileName;

  const currentProfileFilterObjectInEffect = savedUserProfiles.find((data) => {
    return data.label.toLowerCase() === carouselProfileName.toLowerCase();
  });

  const ExistingPlayerProfile = MatchedPlayersArray.filter((data) => {
    const {
      Nationality,
      position,
      // date_of_birth,
      Statsitics,
      height,
    } = data;

    // Define the variables to compare
    const variablesToCompare = [
      Nationality.toLowerCase() ===
        currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
      Nationality.toLowerCase() ===
        currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
      data?.Age >=
        currentProfileFilterObjectInEffect?.filter.AgeRangeValue[0] &&
        data?.Age <=
          currentProfileFilterObjectInEffect?.filter.AgeRangeValue[1],
      height >=
        currentProfileFilterObjectInEffect?.filter.HeightRangeValue[0] &&
        height <=
          currentProfileFilterObjectInEffect?.filter.HeightRangeValue[1],
      data?.marketValue >=
        currentProfileFilterObjectInEffect?.filter.MarketValue[0] &&
        data?.marketValue <=
          currentProfileFilterObjectInEffect?.filter.MarketValue[1],
      currentProfileFilterObjectInEffect?.filter?.PlayerPositionAutoCompleteValue.toLowerCase() ===
        position.toLowerCase(),
      data?.preferredFoot?.toLowerCase() ===
        currentProfileFilterObjectInEffect?.filter.PrefferedFootRadioValue.toLowerCase(),
      currentProfileFilterObjectInEffect?.filter.ContractStatusCheckBoxes.includes(
        data?.clubName
      ),
      // Add more variables to compare as needed
    ];

    // Count the number of matches
    const numberOfMatches = variablesToCompare.filter((match) => match).length;

    // Check if at least 4 variables match
    return numberOfMatches >= 5;
  });

  // console.log("All Players", ExistingPlayerProfile);
  // const ClubLogo = clubObject === undefined ? "" : clubObject?.clubImage;
  const [PossiblePlayerMatch, setPossiblePlayerMatch] = useState(
    ExistingPlayerProfile
  );

  // useEffect(() => {
  //   const currentProfileFilterObjectInEffect = savedUserProfiles.find(
  //     (data) => {
  //       return (
  //         data.label.toLowerCase() === currentProfileNameSelected.toLowerCase()
  //       );
  //     }
  //   );

  //   const ExistingPlayerProfile = MatchedPlayersArray.filter((data) => {
  //     const {
  //       Nationality,
  //       position,
  //       // date_of_birth,
  //       Statsitics,
  //       height,
  //     } = data;

  //     // Define the variables to compare
  //     const variablesToCompare = [
  //       Nationality.toLowerCase() ===
  //         currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
  //       Nationality.toLowerCase() ===
  //         currentProfileFilterObjectInEffect?.filter.NationalityValue.toLowerCase(),
  //       data?.Age >=
  //         currentProfileFilterObjectInEffect?.filter.AgeRangeValue[0] &&
  //         data?.Age <=
  //           currentProfileFilterObjectInEffect?.filter.AgeRangeValue[1],
  //       height >=
  //         currentProfileFilterObjectInEffect?.filter.HeightRangeValue[0] &&
  //         height <=
  //           currentProfileFilterObjectInEffect?.filter.HeightRangeValue[1],
  //       data?.marketValue >=
  //         currentProfileFilterObjectInEffect?.filter.MarketValue[0] &&
  //         data?.marketValue <=
  //           currentProfileFilterObjectInEffect?.filter.MarketValue[1],
  //       currentProfileFilterObjectInEffect?.filter?.PlayerPositionAutoCompleteValue.toLowerCase() ===
  //         position.toLowerCase(),
  //       data?.preferredFoot.toLowerCase() ===
  //         currentProfileFilterObjectInEffect?.filter.PrefferedFootRadioValue.toLowerCase(),
  //       currentProfileFilterObjectInEffect?.filter.ContractStatusCheckBoxes.includes(
  //         data?.clubName
  //       ),
  //       // Add more variables to compare as needed
  //     ];

  //     // Count the number of matches
  //     const numberOfMatches = variablesToCompare.filter(
  //       (match) => match
  //     ).length;

  //     // Check if at least 4 variables match
  //     return numberOfMatches >= 5;
  //   });

  //   console.log(ExistingPlayerProfile + "Mawu");
  //   setPossiblePlayerMatch(ExistingPlayerProfile);
  //   // alert(ExistingPlayerProfile.length);
  // }, [currentProfileNameSelected, savedUserProfiles]);

  // useEffect(() => {
  //   alert(ExistingPlayerProfile.length);
  // }, [ExistingPlayerProfile]);

  return (
    <Carousel
      className="MatchedPlayers md:h-[100%] md:w-[100%] sm:w-[100%] sm:h-[100%] "
      activeIndex={activeIndex}
      onSelect={handleSelect}
      //   controls={false}
      //   interval={1000}
      onSlide={() => {
        // Additional code to pause videos that are leaving the view
        const videoElement = document.getElementById(
          `video-${prevActiveIndex}`
        );
        if (videoElement) {
          videoElement.pause();
        }
      }}
      style={{
        // background: "black",
        height: "100%",
        borderRadius: "1vw",
        // width: "93vw",
      }}>
      {PossiblePlayerMatch.length === 0
        ? MatchedPlayersArray.map((data, index) => {
            const {
              firstName,
              surName,
              id,
              Age,
              position,
              Nationality,
              jerseyNumber,
              CountryCode,
              player_profile_image,
              clubName,
              videos,
              prferredFoot,
              Social_media,
              Statistics,
              marketValue,
              contractStartDate,
              contractEndDate,
              current_health,
            } = data;

            const clubObject = allClubsInDatabase.find((data) => {
              return data.clubName === clubName;
            });

            // console.log(clubObject, "CLUBBB");

            var positionABR = position.match(/\((.*?)\)/);

            // Check if there are matches and get the value inside parentheses
            var result = positionABR ? positionABR[1] : null;

            const countries = [
              { code: "AF", label: "Afghanistan", phone: "93" },
              { code: "AL", label: "Albania", phone: "355" },
              { code: "DZ", label: "Algeria", phone: "213" },
              { code: "AS", label: "American Samoa", phone: "1-684" },
              { code: "AD", label: "Andorra", phone: "376" },
              { code: "AO", label: "Angola", phone: "244" },
              { code: "AI", label: "Anguilla", phone: "1-264" },
              { code: "AQ", label: "Antarctica", phone: "672" },
              { code: "AG", label: "Antigua and Barbuda", phone: "1-268" },
              { code: "AR", label: "Argentina", phone: "54" },
              { code: "AM", label: "Armenia", phone: "374" },
              { code: "AW", label: "Aruba", phone: "297" },
              { code: "AU", label: "Australia", phone: "61", suggested: true },
              { code: "AT", label: "Austria", phone: "43" },
              { code: "AZ", label: "Azerbaijan", phone: "994" },
              { code: "BS", label: "Bahamas", phone: "1-242" },
              { code: "BH", label: "Bahrain", phone: "973" },
              { code: "BD", label: "Bangladesh", phone: "880" },
              { code: "BB", label: "Barbados", phone: "1-246" },
              { code: "BY", label: "Belarus", phone: "375" },
              { code: "BE", label: "Belgium", phone: "32" },
              { code: "BZ", label: "Belize", phone: "501" },
              { code: "BJ", label: "Benin", phone: "229" },
              { code: "BM", label: "Bermuda", phone: "1-441" },
              { code: "BT", label: "Bhutan", phone: "975" },
              { code: "BO", label: "Bolivia", phone: "591" },
              { code: "BA", label: "Bosnia and Herzegovina", phone: "387" },
              { code: "BW", label: "Botswana", phone: "267" },
              { code: "BR", label: "Brazil", phone: "55" },
              {
                code: "IO",
                label: "British Indian Ocean Territory",
                phone: "246",
              },
              { code: "VG", label: "British Virgin Islands", phone: "1-284" },
              { code: "BN", label: "Brunei Darussalam", phone: "673" },
              { code: "BG", label: "Bulgaria", phone: "359" },
              { code: "BF", label: "Burkina Faso", phone: "226" },
              { code: "BI", label: "Burundi", phone: "257" },
              { code: "KH", label: "Cambodia", phone: "855" },
              { code: "CM", label: "Cameroon", phone: "237" },
              { code: "CA", label: "Canada", phone: "1", suggested: true },
              { code: "CV", label: "Cape Verde", phone: "238" },
              { code: "KY", label: "Cayman Islands", phone: "1-345" },
              { code: "CF", label: "Central African Republic", phone: "236" },
              { code: "TD", label: "Chad", phone: "235" },
              { code: "CL", label: "Chile", phone: "56" },
              { code: "CN", label: "China", phone: "86" },
              { code: "CX", label: "Christmas Island", phone: "61" },
              { code: "CC", label: "Cocos (Keeling) Islands", phone: "61" },
              { code: "CO", label: "Colombia", phone: "57" },
              { code: "KM", label: "Comoros", phone: "269" },
              { code: "CG", label: "Congo, Republic of the", phone: "242" },
              {
                code: "CD",
                label: "Congo, Democratic Republic of the",
                phone: "243",
              },
              { code: "CK", label: "Cook Islands", phone: "682" },
              { code: "CR", label: "Costa Rica", phone: "506" },
              { code: "HR", label: "Croatia", phone: "385" },
              { code: "CU", label: "Cuba", phone: "53" },
              { code: "CW", label: "Curacao", phone: "599" },
              { code: "CY", label: "Cyprus", phone: "357" },
              { code: "CZ", label: "Czech Republic", phone: "420" },
              { code: "DK", label: "Denmark", phone: "45" },
              { code: "DJ", label: "Djibouti", phone: "253" },
              { code: "DM", label: "Dominica", phone: "1-767" },
              { code: "DO", label: "Dominican Republic", phone: "1-809" },
              { code: "EC", label: "Ecuador", phone: "593" },
              { code: "EG", label: "Egypt", phone: "20" },
              { code: "SV", label: "El Salvador", phone: "503" },
              { code: "GQ", label: "Equatorial Guinea", phone: "240" },
              { code: "ER", label: "Eritrea", phone: "291" },
              { code: "EE", label: "Estonia", phone: "372" },
              { code: "ET", label: "Ethiopia", phone: "251" },
              { code: "FO", label: "Faroe Islands", phone: "298" },
              { code: "FJ", label: "Fiji", phone: "679" },
              { code: "FI", label: "Finland", phone: "358" },
              { code: "FR", label: "France", phone: "33", suggested: true },
              { code: "GF", label: "French Guiana", phone: "594" },
              { code: "PF", label: "French Polynesia", phone: "689" },
              { code: "GA", label: "Gabon", phone: "241" },
              { code: "GM", label: "Gambia", phone: "220" },
              { code: "GE", label: "Georgia", phone: "995" },
              { code: "DE", label: "Germany", phone: "49", suggested: true },
              { code: "GH", label: "Ghana", phone: "233" },
              { code: "GI", label: "Gibraltar", phone: "350" },
              { code: "GR", label: "Greece", phone: "30" },
              { code: "GL", label: "Greenland", phone: "299" },
              { code: "GD", label: "Grenada", phone: "1-473" },
              { code: "GP", label: "Guadeloupe", phone: "590" },
              { code: "GU", label: "Guam", phone: "1-671" },
              { code: "GT", label: "Guatemala", phone: "502" },
              { code: "GG", label: "Guernsey", phone: "44" },
              { code: "GN", label: "Guinea", phone: "224" },
              { code: "GW", label: "Guinea-Bissau", phone: "245" },
              { code: "GY", label: "Guyana", phone: "592" },
              { code: "HT", label: "Haiti", phone: "509" },
              {
                code: "HM",
                label: "Heard Island and McDonald Islands",
                phone: "672",
              },
              {
                code: "VA",
                label: "Holy See (Vatican City State)",
                phone: "379",
              },
              { code: "HN", label: "Honduras", phone: "504" },
              { code: "HK", label: "Hong Kong", phone: "852" },
              { code: "HU", label: "Hungary", phone: "36" },
              { code: "IS", label: "Iceland", phone: "354" },
              { code: "IN", label: "India", phone: "91" },
              { code: "ID", label: "Indonesia", phone: "62" },
              { code: "IR", label: "Iran, Islamic Republic of", phone: "98" },
              { code: "IQ", label: "Iraq", phone: "964" },
              { code: "IE", label: "Ireland", phone: "353" },
              { code: "IM", label: "Isle of Man", phone: "44" },
              { code: "IL", label: "Israel", phone: "972" },
              { code: "IT", label: "Italy", phone: "39" },
              { code: "JM", label: "Jamaica", phone: "1-876" },
              { code: "JP", label: "Japan", phone: "81", suggested: true },
              { code: "JE", label: "Jersey", phone: "44" },
              { code: "JO", label: "Jordan", phone: "962" },
              { code: "KZ", label: "Kazakhstan", phone: "7" },
              { code: "KE", label: "Kenya", phone: "254" },
              { code: "KI", label: "Kiribati", phone: "686" },
              {
                code: "KP",
                label: "Korea, Democratic People's Republic of",
                phone: "850",
              },
              { code: "KR", label: "Korea, Republic of", phone: "82" },
              { code: "KW", label: "Kuwait", phone: "965" },
              { code: "KG", label: "Kyrgyzstan", phone: "996" },
              {
                code: "LA",
                label: "Lao People's Democratic Republic",
                phone: "856",
              },
              { code: "LV", label: "Latvia", phone: "371" },
              { code: "LB", label: "Lebanon", phone: "961" },
              { code: "LS", label: "Lesotho", phone: "266" },
              { code: "LR", label: "Liberia", phone: "231" },
              { code: "LY", label: "Libya", phone: "218" },
              { code: "LI", label: "Liechtenstein", phone: "423" },
              { code: "LT", label: "Lithuania", phone: "370" },
              { code: "LU", label: "Luxembourg", phone: "352" },
              { code: "MO", label: "Macao", phone: "853" },
              {
                code: "MK",
                label: "Macedonia, the Former Yugoslav Republic of",
                phone: "389",
              },
              { code: "MG", label: "Madagascar", phone: "261" },
              { code: "MW", label: "Malawi", phone: "265" },
              { code: "MY", label: "Malaysia", phone: "60" },
              { code: "MV", label: "Maldives", phone: "960" },
              { code: "ML", label: "Mali", phone: "223" },
              { code: "MT", label: "Malta", phone: "356" },
              { code: "MH", label: "Marshall Islands", phone: "692" },
              { code: "MQ", label: "Martinique", phone: "596" },
              { code: "MR", label: "Mauritania", phone: "222" },
              { code: "MU", label: "Mauritius", phone: "230" },
              { code: "YT", label: "Mayotte", phone: "262" },
              { code: "MX", label: "Mexico", phone: "52" },
              {
                code: "FM",
                label: "Micronesia, Federated States of",
                phone: "691",
              },
              { code: "MD", label: "Moldova, Republic of", phone: "373" },
              { code: "MC", label: "Monaco", phone: "377" },
              { code: "MN", label: "Mongolia", phone: "976" },
              { code: "ME", label: "Montenegro", phone: "382" },
              { code: "MS", label: "Montserrat", phone: "1-664" },
              { code: "MA", label: "Morocco", phone: "212" },
              { code: "MZ", label: "Mozambique", phone: "258" },
              { code: "MM", label: "Myanmar", phone: "95" },
              { code: "NA", label: "Namibia", phone: "264" },
              { code: "NR", label: "Nauru", phone: "674" },
              { code: "NP", label: "Nepal", phone: "977" },
              { code: "NL", label: "Netherlands", phone: "31" },
              { code: "NC", label: "New Caledonia", phone: "687" },
              { code: "NZ", label: "New Zealand", phone: "64" },
              { code: "NI", label: "Nicaragua", phone: "505" },
              { code: "NE", label: "Niger", phone: "227" },
              { code: "NG", label: "Nigeria", phone: "234" },
              { code: "NU", label: "Niue", phone: "683" },
              { code: "NF", label: "Norfolk Island", phone: "672" },
              { code: "MP", label: "Northern Mariana Islands", phone: "1-670" },
              { code: "NO", label: "Norway", phone: "47" },
              { code: "OM", label: "Oman", phone: "968" },
              { code: "PK", label: "Pakistan", phone: "92" },
              { code: "PW", label: "Palau", phone: "680" },
              { code: "PS", label: "Palestine, State of", phone: "970" },
              { code: "PA", label: "Panama", phone: "507" },
              { code: "PG", label: "Papua New Guinea", phone: "675" },
              { code: "PY", label: "Paraguay", phone: "595" },
              { code: "PE", label: "Peru", phone: "51" },
              { code: "PH", label: "Philippines", phone: "63" },
              { code: "PN", label: "Pitcairn", phone: "870" },
              { code: "PL", label: "Poland", phone: "48" },
              { code: "PT", label: "Portugal", phone: "351" },
              { code: "PR", label: "Puerto Rico", phone: "1" },
              { code: "QA", label: "Qatar", phone: "974" },
              { code: "RE", label: "Reunion", phone: "262" },
              { code: "RO", label: "Romania", phone: "40" },
              { code: "RU", label: "Russian Federation", phone: "7" },
              { code: "RW", label: "Rwanda", phone: "250" },
              { code: "BL", label: "Saint Barthelemy", phone: "590" },
              { code: "SH", label: "Saint Helena", phone: "290" },
              { code: "KN", label: "Saint Kitts and Nevis", phone: "1-869" },
              { code: "LC", label: "Saint Lucia", phone: "1-758" },
              { code: "MF", label: "Saint Martin (French part)", phone: "590" },
              { code: "PM", label: "Saint Pierre and Miquelon", phone: "508" },
              {
                code: "VC",
                label: "Saint Vincent and the Grenadines",
                phone: "1-784",
              },
              { code: "WS", label: "Samoa", phone: "685" },
              { code: "SM", label: "San Marino", phone: "378" },
              { code: "ST", label: "Sao Tome and Principe", phone: "239" },
              { code: "SA", label: "Saudi Arabia", phone: "966" },
              { code: "SN", label: "Senegal", phone: "221" },
              { code: "RS", label: "Serbia", phone: "381" },
              { code: "SC", label: "Seychelles", phone: "248" },
              { code: "SL", label: "Sierra Leone", phone: "232" },
              { code: "SG", label: "Singapore", phone: "65" },
              {
                code: "SX",
                label: "Sint Maarten (Dutch part)",
                phone: "1-721",
              },
              { code: "SK", label: "Slovakia", phone: "421" },
              { code: "SI", label: "Slovenia", phone: "386" },
              { code: "SB", label: "Solomon Islands", phone: "677" },
              { code: "SO", label: "Somalia", phone: "252" },
              { code: "ZA", label: "South Africa", phone: "27" },
              {
                code: "GS",
                label: "South Georgia and the South Sandwich Islands",
                phone: "500",
              },
              { code: "SS", label: "South Sudan", phone: "211" },
              { code: "ES", label: "Spain", phone: "34" },
              { code: "LK", label: "Sri Lanka", phone: "94" },
              { code: "SD", label: "Sudan", phone: "249" },
              { code: "SR", label: "Suriname", phone: "597" },
              { code: "SJ", label: "Svalbard and Jan Mayen", phone: "47" },
              { code: "SZ", label: "Swaziland", phone: "268" },
              { code: "SE", label: "Sweden", phone: "46" },
              { code: "CH", label: "Switzerland", phone: "41" },
              { code: "SY", label: "Syrian Arab Republic", phone: "963" },
              { code: "TW", label: "Taiwan, Republic of China", phone: "886" },
              { code: "TJ", label: "Tajikistan", phone: "992" },
              {
                code: "TZ",
                label: "United Republic of Tanzania",
                phone: "255",
              },
              { code: "TH", label: "Thailand", phone: "66" },
              { code: "TL", label: "Timor-Leste", phone: "670" },
              { code: "TG", label: "Togo", phone: "228" },
              { code: "TK", label: "Tokelau", phone: "690" },
              { code: "TO", label: "Tonga", phone: "676" },
              { code: "TT", label: "Trinidad and Tobago", phone: "1-868" },
              { code: "TN", label: "Tunisia", phone: "216" },
              { code: "TR", label: "Turkey", phone: "90" },
              { code: "TM", label: "Turkmenistan", phone: "993" },
              { code: "TC", label: "Turks and Caicos Islands", phone: "1-649" },
              { code: "TV", label: "Tuvalu", phone: "688" },
              { code: "UG", label: "Uganda", phone: "256" },
              { code: "UA", label: "Ukraine", phone: "380" },
              { code: "AE", label: "United Arab Emirates", phone: "971" },
              { code: "GB", label: "United Kingdom", phone: "44" },
              { code: "US", label: "United States", phone: "1" },
              {
                code: "UM",
                label: "United States Minor Outlying Islands",
                phone: "1",
              },
              { code: "UY", label: "Uruguay", phone: "598" },
              { code: "VI", label: "US Virgin Islands", phone: "1-340" },
              { code: "UZ", label: "Uzbekistan", phone: "998" },
              { code: "VU", label: "Vanuatu", phone: "678" },
              { code: "VE", label: "Venezuela", phone: "58" },
              { code: "VN", label: "Vietnam", phone: "84" },
              { code: "WF", label: "Wallis and Futuna", phone: "681" },
              { code: "EH", label: "Western Sahara", phone: "212" },
              { code: "YE", label: "Yemen", phone: "967" },
              { code: "ZM", label: "Zambia", phone: "260" },
              { code: "ZW", label: "Zimbabwe", phone: "263" },
            ];

            // Find the country object with matching label
            const country = countries.find(
              (country) =>
                country.label.toLowerCase() === Nationality.toLowerCase()
            );

            // Extract the code if country is found, otherwise default to empty string
            const PlayerCountryCode = country ? country.code : "";

            return (
              <Carousel.Item
                key={index}
                className="matchedPlayersCarousel md:relative md:h-[44.2vh] sm:relative sm:h-[46vh]"
                style={{
                  backgroundSize: "cover",
                  //   background: "white",
                  borderRadius: "1vw",
                  // height: "44.2vh",
                  // paddingLeft: "2vw",
                  // position: "relative",
                  padding: ".2vw",
                  background:
                    "linear-gradient(90deg, hsla(280, 81%, 58%, 1) 0%, hsla(279, 81%, 59%, 1) 3%, hsla(276, 79%, 60%, 1) 9%, hsla(274, 79%, 60%, 1) 15%, hsla(269, 76%, 61%, 1) 15%, hsla(271, 77%, 61%, 1) 23%, hsla(259, 72%, 62%, 1) 32%, hsla(246, 68%, 64%, 1) 49%, hsla(226, 67%, 60%, 1) 56%, hsla(194, 96%, 42%, 1) 74%, hsla(196, 80%, 79%, 1) 100%)",
                }}>
                <div
                  className="cardBackground md:flex md:h-[100%] md:w-[100%]   sm:flex sm:h-[100%] sm:w-[100%]"
                  style={{
                    borderRadius: "1vw",
                    // display: "flex",
                    gap: ".5vw",
                    // width: "100%",
                    // height: "100%",
                    // background: `linear-gradient(90deg, rgba(32,32,32,0.9582366589327146) 0%, rgba(55,54,54,0.9535962877030162) 31%, rgba(23,21,21,0.7540603248259861) 44%, rgba(14,50,142,0.8120649651972158) 100%)`,
                  }}>
                  {/* // Player information   */}
                  {/* style={{ flex: ".25" }} */}
                  <div className="md:basis-[30%] sm:basis-[50%]">
                    {/* style={{ width: "100%", height: "100%" }} */}
                    <div className="md:h-[100%] md:w-[100%]   sm:h-[100%] sm:w-[100%]">
                      <MatchedPlayerCard
                        key={index}
                        PlayerClubImage={
                          data?.clubLogo === undefined
                            ? clubObject?.clubImage
                            : data?.clubLogo
                          // clubObject?.clubImage === undefined
                          //   ? ""
                          //   : clubObject?.clubImage
                        }
                        PlayerClubName={clubName}
                        PlayerCountry={Nationality}
                        // This if statement is temporary because the country code wasnt handled well from the api remind to remove and change when new api arrives from smrtsts
                        PlayerCountryCode={PlayerCountryCode}
                        PlayerImage={player_profile_image}
                        PlayerFirstName={firstName}
                        PlayerSurName={surName}
                        PlayerPosition={position}
                        PlayerPositionABR={result}
                        PlayerId={id}
                        // THis is to provide a temporal solution for deter,imimg a verified player
                        DoesClubLogoKeyExist={
                          data?.clubLogo === undefined ? false : true
                        }
                      />
                    </div>
                  </div>

                  <div
                    className="md:flex md:flex-row md:basis-[70%]  sm:flex sm:flex-col-reverse sm:basis-[70%] sm:pb-[1vh] "
                    // style={{ background: "peru" }}
                  >
                    {/* Plyer statistics */}
                    <div
                      className="md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0"
                      style={{
                        overflowY: "scroll",
                      }}>
                      <PlayerComparisonAccordion
                        GeneralObject={Statistics[0].General}
                        DefenseObject={Statistics[0].Defence}
                        AttackingObject={Statistics[0].Attack}
                        DistributionObject={Statistics[0].Distribution}
                        Discipline={Statistics[0].Discipline}
                      />
                    </div>

                    {/* Player video higlights  */}
                    <div className="md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0">
                      <div
                        className="sm:w-[100%] sm:relative sm:h-[10%] md:w-[90%] md:h-[100%] md:relative"
                        style={{
                          // width: "90%",
                          // height: "100%",
                          borderRadius: "1vw",
                          // position: "relative",
                          paddingTop: "1vh",
                          // background: "blue",
                        }}>
                        {videos.length <= 0 ? (
                          <div
                            className="sm:h-[19vh] md:h-[90%]"
                            style={{
                              // height: "90%",
                              width: "100%",
                              borderRadius: "1vw",
                              background: "black",
                              display: "grid",
                              placeContent: "center",
                            }}>
                            <VideocamOff
                              sx={{ color: "white", width: 45, height: 45 }}
                            />
                          </div>
                        ) : (
                          <video
                            className="sm:h-[19vh] md:h-[90%]"
                            id={`video-${index}`}
                            src={videos[0].url}
                            width="100%"
                            style={{ position: "absolute" }}
                            // autoPlay={true}
                            controls></video>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            );
          })
        : PossiblePlayerMatch.map((data, index) => {
            const {
              firstName,
              surName,
              id,
              Age,
              position,
              Nationality,
              jerseyNumber,
              CountryCode,
              player_profile_image,
              clubName,
              videos,
              prferredFoot,
              Social_media,
              Statistics,
              marketValue,
              contractStartDate,
              contractEndDate,
              current_health,
            } = data;

            const clubObject = allClubsInDatabase.find((data) => {
              return data.clubName === clubName;
            });

            console.log(clubObject, "CLUBBB");

            var positionABR = position.match(/\((.*?)\)/);

            // Check if there are matches and get the value inside parentheses
            var result = positionABR ? positionABR[1] : null;

            return (
              <Carousel.Item
                key={index}
                className="matchedPlayersCarousel md:relative md:h-[44.2vh] sm:relative sm:h-[46vh]"
                style={{
                  backgroundSize: "cover",
                  //   background: "white",
                  borderRadius: "1vw",
                  // height: "44.2vh",
                  // paddingLeft: "2vw",
                  // position: "relative",
                  padding: ".2vw",
                  background:
                    "linear-gradient(90deg, hsla(280, 81%, 58%, 1) 0%, hsla(279, 81%, 59%, 1) 3%, hsla(276, 79%, 60%, 1) 9%, hsla(274, 79%, 60%, 1) 15%, hsla(269, 76%, 61%, 1) 15%, hsla(271, 77%, 61%, 1) 23%, hsla(259, 72%, 62%, 1) 32%, hsla(246, 68%, 64%, 1) 49%, hsla(226, 67%, 60%, 1) 56%, hsla(194, 96%, 42%, 1) 74%, hsla(196, 80%, 79%, 1) 100%)",
                }}>
                <div
                  className="cardBackground md:flex md:h-[100%] md:w-[100%]   sm:flex sm:h-[100%] sm:w-[100%]"
                  style={{
                    borderRadius: "1vw",
                    // display: "flex",
                    gap: ".5vw",
                    // width: "100%",
                    // height: "100%",
                    // background: `linear-gradient(90deg, rgba(32,32,32,0.9582366589327146) 0%, rgba(55,54,54,0.9535962877030162) 31%, rgba(23,21,21,0.7540603248259861) 44%, rgba(14,50,142,0.8120649651972158) 100%)`,
                  }}>
                  {/* // Player information   */}
                  {/* style={{ flex: ".25" }} */}
                  <div className="md:basis-[30%] sm:basis-[50%]">
                    {/* style={{ width: "100%", height: "100%" }} */}
                    <div className="md:h-[100%] md:w-[100%]   sm:h-[100%] sm:w-[100%]">
                      <MatchedPlayerCard
                        key={index}
                        PlayerClubImage={
                          clubObject?.clubImage === undefined
                            ? ""
                            : clubObject?.clubImage
                        }
                        PlayerClubName={clubName}
                        PlayerCountry={Nationality}
                        PlayerCountryCode={CountryCode}
                        PlayerImage={player_profile_image}
                        PlayerFirstName={firstName}
                        PlayerSurName={surName}
                        PlayerPosition={position}
                        PlayerPositionABR={result}
                        PlayerId={id}
                      />
                    </div>
                  </div>

                  <div
                    className="md:flex md:flex-row md:basis-[70%]  sm:flex sm:flex-col-reverse sm:basis-[70%] sm:pb-[1vh] "
                    // style={{ background: "peru" }}
                  >
                    {/* Plyer statistics */}
                    <div
                      className="md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0"
                      style={{
                        overflowY: "scroll",
                      }}>
                      <PlayerComparisonAccordion
                        GeneralObject={Statistics[0].General}
                        DefenseObject={Statistics[0].Defence}
                        AttackingObject={Statistics[0].Attack}
                        DistributionObject={Statistics[0].Distribution}
                        Discipline={Statistics[0].Discipline}
                      />
                    </div>

                    {/* Player video higlights  */}
                    <div className="md:basis-[50%] md:flex-shrink-0 sm:basis-[50%] sm:flex-shrink-0">
                      <div
                        className="sm:w-[100%] sm:relative sm:h-[10%] md:w-[90%] md:h-[100%] md:relative"
                        style={{
                          // width: "90%",
                          // height: "100%",
                          borderRadius: "1vw",
                          // position: "relative",
                          paddingTop: "1vh",
                          // background: "blue",
                        }}>
                        {videos.length <= 0 ? (
                          <div
                            className="sm:h-[19vh] md:h-[90%]"
                            style={{
                              // height: "90%",
                              width: "100%",
                              borderRadius: "1vw",
                              background: "black",
                              display: "grid",
                              placeContent: "center",
                            }}>
                            <VideocamOff
                              sx={{ color: "white", width: 45, height: 45 }}
                            />
                          </div>
                        ) : (
                          <video
                            id={`video-${index}`}
                            src={videos[0].url}
                            width="100%"
                            style={{ position: "absolute" }}
                            // autoPlay={true}
                            controls></video>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}

      {/* Add more Carousel.Item components as needed */}
    </Carousel>
  );
};

export default NewsCarousel;
