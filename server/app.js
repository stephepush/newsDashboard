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
    //console.log(req.params);
    const api_url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
    const hn_response = await axios.get(api_url);
    //const top_story_data = await hn_response;
    const responseSliced = await hn_response.data.slice(0, 9)
    const responseLinks = await responseSliced.forEach(id => {
        axios.get(` https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            .then((response) => {
                const stories = []
                stories.push(response.data)
                console.log(stories)
                return stories
            }).catch((err) => {
                this.err = err
            })
    })
    console.log(responseLinks)
        /* const data = {
            content: hn_response
        } */
        //console.log(hn_response)
        /*try {


            const responseSliced = hn_response.data.slice(0, 9)

            const responseLinks = responseSliced.forEach(id => {

                axios.get(` https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                    .then((response) => {
                        const stories = []
                        stories.push(response.data)
                            //console.log(stories)
                        return stories
                    }).catch((err) => {
                        this.err = err
                    })
            })
            console.log(stories)
            console.log(responseLinks)
            return responseLinks
        } catch (error) {
            console.error(error)
        }*/

})

//the id's are being formatted into the item endpoint format on line 31... pass the array of those links
//back to the api to get the relevant info, then pass that to the frontend

app.listen(port, () => {
    console.log(`Running app on port ${port}`)
})