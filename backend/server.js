const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const filePath = './data/excuses.json';

const getExcuses = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading or parsing excuses.json:", error);
        return [];
    }
};

const saveExcuses = (excuses) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(excuses, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing to excuses.json:", error);
        throw new Error('Failed to save data');
    }
};

app.get('/api/excuses', (req, res) => {
    try {
        const excuses = getExcuses();
        res.json(excuses);
    } catch (error) {
        res.status(500).send('Failed to retrieve excuses');
    }
});

app.post('/api/excuses', (req, res) => {
    const { http_code, tag, message } = req.body;
    if (!http_code || !tag || !message) {
        return res.status(400).send('HTTP code, tag, and message are required');
    }

    try {
        const excuses = getExcuses();
        const newExcuse = { http_code: parseInt(http_code, 10), tag, message };
        excuses.push(newExcuse);
        saveExcuses(excuses);
        res.status(201).json(newExcuse);
    } catch (error) {
        res.status(500).send('Failed to add new excuse');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
