const fetch = require('node-fetch');
const apiKey = require('./keys');

const fetchNews = async (source) => {
   let apiUrl = `https://newsapi.org/v2/top-headlines?sources=${source}-news&apiKey=${apiKey.newsApiKey}`
    try {
        const response = await fetch(apiUrl);
        return response.json();
    }
    catch(err){
        console.log(err)
    }
  }

module.exports = {
    fetchNews
}