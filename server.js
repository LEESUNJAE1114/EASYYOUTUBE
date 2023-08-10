const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: 'https://LEESUNJAE1114.github.io', // GitHub Pages 도메인
}));

app.post('/search', async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm;
        const apiKey = 'AIzaSyA37ZVgKjAx0zsosami0N_aUYfrf0ZG7tw '; 
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                q: searchTerm,
                key: apiKey,
                maxResults: 10,
                part: 'snippet',
                type: 'video'
            }
        });

        const searchResults = response.data.items;
        res.json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
