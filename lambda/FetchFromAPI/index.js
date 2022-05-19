const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});
const https = require('https');

exports.handler = async (event, context, callback) => {
  const data = await getRequest();
  const flightData = JSON.stringify(data.response);
     const params = {
        Item: {
            "CityType" : {
                S: "HELDEP"
            },
            "data" : {
                S: flightData.toString()
            }
    },
    TableName: "Timetables"
    };
dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            console.log(data);
            console.log(params);
            callback(null, data);
        }
        
    }
);
};


function getRequest() {
  const url = 'API_URL_AND_KEY_HERE';

  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
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
