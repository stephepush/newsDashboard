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
    try {
        const api_url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$key"&limitToFirst=10`
        const hn_response = await axios.get(api_url);
        //const top_story_data = await hn_response;
        //const responseSliced = await hn_response.data.slice(0, 9)
        //console.log(responseSliced)
        const responseLinks = await hn_response.data.map(id => {
            return `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        })
        console.log(responseLinks)
        const res = await axios.all(responseLinks.map(link => axios.get(link)))
        const topStories = res.map(item => item.data)
        console.log(topStories)
    } catch (error) {
        console.error(error)
    }
});


//})

//the id's are being formatted into the item endpoint format on line 31... pass the array of those links
//back to the api to get the relevant info, then pass that to the frontend

app.listen(port, () => {
    console.log(`Running app on port ${port}`)
})