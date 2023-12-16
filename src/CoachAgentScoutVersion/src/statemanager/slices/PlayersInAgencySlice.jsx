import { createSlice } from "@reduxjs/toolkit";

export const PlayersInAgencySlice = createSlice({
  name: "PlayersInAgencySlice",
  initialState: {
    playersInAgencyArray: [
      {
        firstName: "Richard",
        surName: "Attah",
        Age: "28",
        position: "GK",
        Nationality: "Ghana",
        jerseyNumber: "1",
        image: "/richard attah.jpeg",
        clubName: "Accra Hearts of Oak SC",
        clubLogo: "/Accra_hearts_of_oak_sc.png",
      },
      {
        firstName: "Benjamin",
        surName: "Bature",
        Age: "26",
        Nationality: "Ghana",
        position: "CF",
        jerseyNumber: "21",
        image: "/bature.jpg",
        clubName: "Medeama SC",
        clubLogo: "/Medeama_SC_logo.png",
      },
      {
        firstName: "Ishak",
        surName: "Shaibu",
        Nationality: "Ghana",
        Age: "14",
        position: "CAM",
        jerseyNumber: "15",
        image: "/OlderPlayer.jpg",
        clubName: "GoiCity SC",
        clubLogo: "/goicity.png",
        videos: [
          {
            src: "/shaibuJuggling.mp4",
            category: "skills",
            description: "juggling skills from trainning session",
          },
        ],
      },
      {
        firstName: "Amos",
        surName: "Acheampong",
        Age: "30",
        position: "CDM",
        Nationality: "Ghana",
        jerseyNumber: "6",
        image: "/acheampong.webp",
        clubName: "Bechem united",
        clubLogo: "/Bechem_United_FC_logo.jpg",
      },

      {
        firstName: "Believer",
        surName: "Yeboah",
        Age: "12",
        position: "CM",
        Nationality: "Ghana",
        jerseyNumber: "18",
        image: "/BelieverPlayer.jpg",
        clubName: "GoiCity SC",
        clubLogo: "/goicity.png",
        videos: [
          {
            src: "/believerJuggling.mp4",
            category: "skills",
            description: "juggling skills from trainning session",
          },
        ],
      },
      {
        firstName: "Stephen",
        surName: "Owusu",
        Age: "26",
        position: "ST",
        Nationality: "Ghana",
        jerseyNumber: "9",
        image: "/stephen owusu.webp",
        clubName: "Bofoakwa Tano SC",
        clubLogo: "/Bofoakwa_Tano.png",
      },
      {
        firstName: "Solomon",
        surName: "Safo-Taylor",
        Age: "25",
        position: "CF",
        Nationality: "Ghana",
        jerseyNumber: "17",
        image: "/Solomon safo-taylor.jpg",
        clubName: "Asante Kotoko SC",
        clubLogo: "/Asante_Kotoko_SC_(logo).png",
      },
      {
        firstName: "Solomon",
        surName: "Agbasi",
        Age: "23",
        position: "GK",
        Nationality: "Ghana",
        jerseyNumber: "32",
        image: "/solomon agbasi.jpeg",
        clubName: "Dreams FC",
        clubLogo: "/Dreams_FC_logo.png",
      },
    ],
  },

  reducers: {
    setPlayersInAgencyArray: (state, action) => {
      state.playersInAgencyArray = action.payload;
    },
  },
});

export const selectPlayersInAgencyArray = (state) =>
  state.PlayersInAgencySlice.playersInAgencyArray;

export const { setPlayersInAgencyArray } = PlayersInAgencySlice.actions;
export default PlayersInAgencySlice.reducer;
