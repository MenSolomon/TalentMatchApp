import axios from "axios";

const BASE_URL = "https://apirest.wyscout.com/v3/players";
// TALENT_MEET_WYSCOUT_CLIENT_ID=
// TALENT_MEET_WYSCOUT_CLIENT_SECRET=

// https://apirest.wyscout.com/v3/players/{wyId}/advancedstats
// `${BASE_URL}/${playerId}/matches/${matchId}/advancedstats`,

const getAdvancedStats = async (playerId, matchId) => {
  // alert(playerId);

  const clientId = "vrshi5s-j6xb75uby-f0u25b7-c8bpyg131v";
  const clientSecret = "(!f7ERn%ql+Mfay7vT+J25.K%mUtEI";
  const token = btoa(`${clientId}:${clientSecret}`); // Encode credentials to base64

  try {
    const response = await axios.get(
      `${BASE_URL}/${playerId}/matches/${matchId}/advancedstats`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advanced stats:", error);
    throw error;
  }
};

export default getAdvancedStats;
