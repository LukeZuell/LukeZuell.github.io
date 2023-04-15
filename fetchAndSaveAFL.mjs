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
          "x-media-mis-token": "f1a0d0003c563ec7db779a4c679a6fff",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "Sec-GPC": "1",
          "origin": "http://localhost"
      },
      "referrer": "https://www.afl.com.au/",
      "method": "GET",
      "mode": "cors"
    });
    const responseText = await response.text();
    //console.log('Raw response text:', responseText);
    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    console.log('Not working:', error);
    console.error('Error fetching data:', error);
    throw new Error("Invalid JSON data");
  }
}

export async function saveDataToFile(lastTwoNumbers) {
  const url = "https://api.afl.com.au/cfs/afl/playerStats/match/CD_M202301405" + lastTwoNumbers;
  const data = await fetchData(url);
  
  if (data !== null) {
    fs.writeFileSync(lastTwoNumbers + ".json", JSON.stringify(data, null, 2));
    console.log("Data saved to liveStats.json");
  } else {
    console.log("Error: Unable to fetch data or data is invalid");
  }
}

saveDataToFile('06');
