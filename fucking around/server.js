const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON payloads in POST requests

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
const fs = require('fs');

app.post('/save-data', (req, res) => {
    const data = req.body;
    const jsonString = JSON.stringify(data, null, 2);

    fs.writeFile('data.json', jsonString, (err) => {
        if (err) {
            console.error('Error writing JSON data to a file:', err);
            res.status(500).send({ message: 'Error writing JSON data to a file' });
        } else {
            console.log('JSON data has been successfully saved to data.json');
            res.status(200).send({ message: 'JSON data has been successfully saved to data.json' });
        }
    });
});
