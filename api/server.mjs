import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/fetch-data', async (req, res) => {
    try {
        const response = await fetch('https://api.afl.com.au/cfs/afl/playerStats/match/CD_M20230140501', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'x-media-mis-token': 'f98212b7dff7ab75640bab2acede3323',
            },
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
