const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/create-order', async (req, res) => {
    const apiUrl = 'https://cloutsy.com/api/v2';
    const apiKey = '495fe7945ae09755a85336db1ba91596'; // Your Cloutsy API key

    try {
        const response = await fetch(`${apiUrl}?action=add&service=3723&link=${req.query.link}&quantity=${req.query.quantity}&key=${apiKey}`, {
            method: 'POST'
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
