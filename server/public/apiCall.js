async function call() {
    const api_url = `/topStories`
    const response = await fetch(api_url)
    const json = await response.json()
    console.log(json)

    json.forEach(item => item)
}


call();