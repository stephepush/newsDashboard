const express = require('express')
const app = express();
const path = require('path');
const axios = require('axios');
const port = 3000

/* app.get('/', (req, res) => {
    res.send('Hello World!')
}) */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})


app.get('/topStories', async(req, res) => {
    console.log(req.params);
    const api_url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
    const hn_response = await axios.get(api_url);
    //const top_story_data = await hn_response;

    /* const data = {
        content: hn_response
    } */
    try {
        hn_response
        console.log(hn_response.data)
    } catch (error) {
        console.error(error)
    }
})

app.listen(port, () => {
    console.log(`Running app on port ${port}`)
})