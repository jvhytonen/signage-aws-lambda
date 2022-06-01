const fetch = require('node-fetch');
const newsApiKey = require('./newsapikeys')

const fetchNews = async () => {
  
const data = await fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=XXXX')
const parsed = data.json()
return parsed
}

module.exports = {
  fetchNews
}
