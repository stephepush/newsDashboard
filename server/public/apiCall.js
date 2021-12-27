async function call() {
    const ul = document.getElementById('posts')
    const list = document.createDocumentFragment()
    try {


        const api_url = `/topStories`
        const response = await fetch(api_url)
        const json = await response.json()
        console.log(json)

        await json.forEach(post => {
            let li = document.createElement('li')
            let headline = document.createElement('h2')
            let poster = document.createElement('h3')
            let comments = document.createElement('p')
            let score = document.createElement('p')



            headline.innerText = `${post.title}`
            poster.innerText = `Posted by ${post.by}`
            comments.innerText = `${post.descendants} comments`
            score.innerText = `${post.score} points`

            li.appendChild(headline)
            li.appendChild(poster)
            li.appendChild(comments)
            li.appendChild(score)
            li.classList.add("list-group-item")
            list.appendChild(li)
        })
    } catch {
        console.error(error)
    } finally {
        ul.appendChild(list)
    }



}


call();