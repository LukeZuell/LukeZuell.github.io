import fetch from 'node-fetch';
import fs from 'fs';

async function fetchData(url) {
  const corsProxy = "http://localhost:8080/";
  try {
    const response = await fetch(corsProxy + url, {
      "credentials": "omit",
      "headers": {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0",
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "Sec-GPC": "1",
          "Pragma": "no-cache",
          "Cache-Control": "no-cache",
          "origin": "localhost"
      },
      "referrer": "https://www.heraldsun.com.au/",
      "method": "GET",
      "mode": "cors"
    });
    const responseText = await response.text();
    console.log('Raw response text:', responseText);
    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    console.log('Not working:', error);
    console.error('Error fetching data:', error);
    throw new Error("Invalid JSON data");
  }
}

export async function saveSCDataToFile() {
  const url = "https://supercoach.heraldsun.com.au/2023/api/afl/classic/v1/players-cf?embed=notes%2Codds%2Cplayer_stats%2Cpositions%2Cplayer_match_stats&round=5&xredir=1&subid=8&subkey=4921f8a0a10179360b5caad146665e9b";
  const data = await fetchData(url);
  
  if (data !== null) {
    fs.writeFileSync("superCoach.json", JSON.stringify(data, null, 2));
    console.log("Data saved to liveStats.json");
  } else {
    console.log("Error: Unable to fetch data or data is invalid");
  }
}

saveSCDataToFile();
