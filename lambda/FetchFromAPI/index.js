const https = require('https');
const save = require('./putItem');
const apikey = require('./keys')

const settings = {
  url: 'https://airlabs.co/api/v9/schedules',
  airport: 'HEL',
}

exports.handler = async (event, context, callback) => {
  const depData = await getRequest(settings, 'dep');
  const arrData = await getRequest(settings, 'arr')
  
  if (depData.hasOwnProperty('error') || arrData.hasOwnProperty('error')) {
    // If there are errors, those will be logged and storing data will be stopped. 
    console.log(depData)
    console.log(arrData)
    return
  }
  save.putItem(depData, settings.airport, 'DEP', callback)
  save.putItem(arrData, settings.airport, 'ARR', callback)
};


function getRequest(settings, flightType) {
  let apiUrl = `${settings.url}?${flightType}_iata=${settings.airport}&api_key=${apikey}`
  
  return new Promise((resolve, reject) => {
    const req = https.get(apiUrl, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          console.log(rawData)
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
}
