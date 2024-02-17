function callApi(endpoint, params = {}) {
  const parameters =
    Object.keys(params).length > 0 ? "?" + new URLSearchParams(params) : "";
  const url = `https://v3.football.api-sports.io/${endpoint}${parameters}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "YOUR_API_KEY_HERE",
      "Content-Type": "application/json", // Added Content-Type header
    },
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching data:", error);
      return error; // Provide informative error handling
    });
}

function playersData(league, season, page = 1, playersData = []) {
  return callApi("players", { league, season, page })
    .then((response) => {
      if (response.error) {
        console.error("API error:", response.error);
        return playersData; // Handle API errors gracefully
      }

      playersData = [...playersData, ...response.response];

      if (response.paging.current < response.paging.total) {
        const nextPage = response.paging.current + 1;

        if (nextPage % 2 === 1) {
          // Consider using promises or async/await for better control
          // over sleep timing and avoiding blocking behavior
          // return new Promise(resolve => setTimeout(() => {
          //   resolve(playersData(league, season, nextPage, playersData));
          // }, 1000));
        }

        return playersData(league, season, nextPage, playersData);
      }

      return playersData;
    })
    .catch((error) => {
      console.error("Error fetching players:", error);
      return []; // Provide default value for failed requests
    });
}

// Example usage (using async/await for clarity and error handling):
async function main() {
  try {
    const teams = await callApi("teams", { league: 39, season: 2021 });
    console.log("Teams:", teams);

    const players = await playersData(39, 2021);
    console.log("Players:", players);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
