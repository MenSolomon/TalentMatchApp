import { createSlice } from "@reduxjs/toolkit";

export const ClubsInDatabaseSlice = createSlice({
  name: "clubsInTalentMeetDatabase",
  initialState: {
    clubsInDatabase: [
      {
        clubName: "Asante Kotoko SC",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/f/fd/Asante_Kotoko_SC_%28logo%29.png",
      },
      {
        clubName: "Accra Lions",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/commons/e/e8/Accra_lions_logo.png",
      },
      {
        clubName: "Berekum Chelsea",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/1/1a/Berekum_Chelsea_Logo.png",
      },
      {
        clubName: "Accra Great Olympics",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/8/8f/The_Official_Accra_Great_Olympics_logo.jpg",
      },
      {
        clubName: "Karela United FC",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/6/69/Karela_United_FC_logo.png",
      },
      {
        clubName: "King Faisal Babes FC",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/c/c7/King_Faisal_Babes_FC_%28logo%29.png",
      },
      {
        clubName: "Kotoku Royals F.C.",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/a/a0/Kotoku_Royals_F.C._logo.png",
      },
      {
        clubName: "Legon Cities FC",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/b/b1/Legon_Cities_FC.png",
      },
      {
        clubName: "Medeama SC",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/b/bb/Medeama_SC_logo.png",
      },
      {
        clubName: "Real Tamale United",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/b/b1/Real_Tamale_United_logo.png",
      },
      {
        clubName: "Samartex",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/f/fb/Samartex_logo.png",
      },
      {
        clubName: "Bofoakwa Tano",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/a/a5/Bofoakwa_Tano.jpg",
      },
      {
        clubName: "Hasmal",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/commons/a/ae/Hasmal_logo.jpg",
      },
      {
        clubName: "Sekondi Wise Fighters",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/2/21/Sekondi_Wise_Fighters_logo.jpg",
      },
      {
        clubName: "Berekum Arsenal",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/0/0a/Berekum_Arsenal_Logo.png",
      },
      {
        clubName: "New Edubiase United",
        clubImage:
          "https://upload.wikimedia.org/wikipedia/en/6/61/New_Edubiase_United.gif",
      },
    ],
  },

  reducers: {
    setClubsInDatabase: (state, action) => {
      state.clubsInDatabase = action.payload;
    },
  },
});

export const selectClubsInDatabase = (state) =>
  state.clubsInTalentMeetDatabase.clubsInDatabase;

export const { setClubsInDatabase } = ClubsInDatabaseSlice.actions;
export default ClubsInDatabaseSlice.reducer;
