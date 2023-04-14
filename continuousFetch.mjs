import { saveDataToFile } from './fetchAndSave.mjs';

async function continuousFetch() {
  while (true) {
    try {
      await saveDataToFile();
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

continuousFetch();