const fetch = require('node-fetch');

const fetchTrains = async () => {
  
const data = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    body: `{
  station(id: "HSL:4000213") {
    name
      stoptimesWithoutPatterns {
      scheduledDeparture
      headsign
    }
  }  
}`,
    headers: { "Content-Type": "application/graphql" },
})
const parsedData = await data.json()
return parsedData
}

module.exports = {
  fetchTrains
}
