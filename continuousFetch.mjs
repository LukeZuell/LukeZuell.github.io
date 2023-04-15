import { saveDataToFile } from './fetchAndSaveAFL.mjs';
import { saveSCDataToFile } from './fetchAndSaveSuperCoach.mjs';
import * as readline from 'readline';

async function continuousFetch(ans) {
  
  while (true) {
    
    try {
      await saveDataToFile(ans);
      await saveSCDataToFile();
      console.log("Data saved successfully. Waiting for next fetch...");
    } catch (error) {
      console.error("Error while saving data:", error);
    }

    // Generate a random delay between 20 and 30 seconds (in milliseconds)
    const delay = Math.floor(Math.random() * (30000 - 20000 + 1)) + 20000;
    console.log(`Waiting for ${delay / 1000} seconds...`);

    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

function askQuestion(query) {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
      rl.close();
      resolve(ans);
  }))
}

const ans = await askQuestion("What game do you want to update? ");

continuousFetch(ans);