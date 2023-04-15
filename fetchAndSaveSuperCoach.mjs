import fetch from 'node-fetch';
import fs from 'fs';

async function fetchData(url) {
  const corsProxy = "http://localhost:8080/";
  try {
    const response = await fetch(corsProxy + url, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "origin" : "localhost"
      },
      "referrer": "https://supercoach.heraldsun.com.au/afl/classic/gameday/matches(popup:gameday/matches)",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
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
  const url = "https://supercoach.heraldsun.com.au/2023/api/afl/classic/v1/players-cf?embed=notes%2Codds%2Cplayer_stats%2Cpositions&round=4&xredir=1&subid=8&subkey=ae5bb2f467df19ce4d0ed8d02c5ed67d";
  const data = await fetchData(url);
  
  if (data !== null) {
    fs.writeFileSync("superCoach.json", JSON.stringify(data, null, 2));
    console.log("Data saved to liveStats.json");
  } else {
    console.log("Error: Unable to fetch data or data is invalid");
  }
}

saveSCDataToFile();
