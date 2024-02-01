import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = 3001;

app.use(cors());

// https://api.sportmonks.com/v3/football/players/172104?api_token={{api_token}}&include=nationality;statistics;

app.get("/api/sportmonks", async (req, res) => {
  const sportMonksUrl =
    "https://api.sportmonks.com/v3/football/players?api_token=S8oul8IWiFmwZNVgnTCMq6chLdo6VIt2ZbHxXAFcepZVp8rHCzc0O4jEc9SR&include=teams1`;detailedPosition;nationality;statistics.details.type";

  try {
    const response = await fetch(sportMonksUrl);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `SportMonks API error: ${response.status} - ${errorData.message}`
      );
    }

    const data = await response.json();
    res.json(data);
    console.log("Man u");
    console.log(res.json(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
